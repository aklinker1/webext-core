import { UserConfig } from 'vitepress';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Listr, ListrTask, ListrTaskWrapper } from 'listr2';
import { Project, Symbol, SourceFile, Node, ts } from 'ts-morph';
import * as prettier from 'prettier';

type Plugin = NonNullable<NonNullable<UserConfig['vite']>['plugins']>[0];
type SymbolLinks = { [symbolName: string]: string };

const EXTERNAL_SYMBOLS: SymbolLinks = {
  Promise:
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
  StorageArea:
    'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea',
};

const EXCLUDED_SYMBOLS = [
  // name of an anonymous type
  '__type',
];

export function typescriptDocs(): Plugin {
  const ctx: Ctx = {};

  return {
    name: 'typescript-docs',
    async buildStart() {
      const allPackages = await getPackages();

      generateAll(ctx, allPackages);
    },
  };
}

/**
 * context passed into each task
 */
interface Ctx {}

/**
 * Return the package folder names that documentation will be generated for.
 */
async function getPackages(): Promise<string[]> {
  const all = await fs.readdir('packages');
  return all.filter(folderName => !folderName.endsWith('-demo') && folderName !== 'tsconfig');
}

async function generateAll(ctx: Ctx, projectDirNames: string[]) {
  const tasks = new Listr<Ctx>(
    [
      {
        title: 'Generating TS Docs',
        task: (ctx, task) =>
          task.newListr(
            projectDirNames.map<ListrTask<Ctx>>(dirname => ({
              title: dirname,
              task: (ctx, task) => generateProjectDocs(ctx, task, dirname),
            })),
            {
              exitOnError: false,
              concurrent: true,
            },
          ),
      },
    ],
    { ctx },
  );

  try {
    await tasks.run();
  } catch (e) {
    console.error(e);
  } finally {
  }
}

async function generateProjectDocs(
  ctx: Ctx,
  task: ListrTaskWrapper<Ctx, any>,
  projectDirname: string,
) {
  // Project setup

  task.output = 'Loaded TS project...';
  const projectDir = path.resolve('packages', projectDirname);
  const entrypointPath = path.resolve(projectDir, 'src/index.ts');
  const outputDir = path.resolve('docs/api');
  const outputFile = path.resolve(outputDir, `${projectDirname}.md`);
  const tsConfigFilePath = path.resolve(projectDir, 'tsconfig.json');
  // Load TS Project
  const project = new Project({ tsConfigFilePath });
  const entrypoint = project.addSourceFileAtPath(entrypointPath);
  project.resolveSourceFileDependencies();

  // Type Generation

  task.output = 'Generating types for ' + path.relative(projectDir, entrypointPath);
  const publicSymbols = getPublicSymbols(project, entrypoint);
  // Sort alphabetically
  publicSymbols.sort((l, r) => l.getName().toLowerCase().localeCompare(r.getName().toLowerCase()));
  const docs = renderDocs(projectDirname, project, publicSymbols);
  // Write to file
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputFile, docs, 'utf-8');
  task.output = 'Written to ' + path.relative(process.cwd(), outputFile);
}

function getPublicSymbols(project: Project, entrypoint: SourceFile): Symbol[] {
  // Get all exported declarations from the source file
  const exportedDeclarations = entrypoint.getExportedDeclarations();

  // Collect all exported symbols
  const exportedSymbols: Symbol[] = [];
  for (const declarations of exportedDeclarations.values()) {
    for (const declaration of declarations) {
      exportedSymbols.push(declaration.getSymbolOrThrow());
    }
  }

  // Collect all referenced symbols in exported declarations
  const referencedSymbols: Symbol[] = [];
  for (const declaration of exportedSymbols) {
    const declarationNode = declaration.getDeclarations()[0];
    collectReferencedSymbols(declarationNode, referencedSymbols);
  }

  // Combine and return the package's exported and referenced symbols
  const allSymbols = Array.from(new Set([...exportedSymbols, ...referencedSymbols]));
  return allSymbols.filter(
    s => !EXTERNAL_SYMBOLS[s.getName()] && !EXCLUDED_SYMBOLS.includes(s.getName()),
  );
}

function collectReferencedSymbols(node: Node, symbols: Symbol[]): void {
  const symbol = node.getSymbolOrThrow();

  const typeRef = node.asKind(ts.SyntaxKind.TypeReference);
  if (typeRef) {
    symbols.push(symbol);

    // Check referenced type for additional referenced symbols
    const type = typeRef.getType();
    const typeSymbol = type.getSymbolOrThrow();
    symbols.push(typeSymbol);

    // Check type arguments for additional referenced symbols
    typeRef.getTypeArguments().forEach(typeArg => {
      collectReferencedSymbols(typeArg, symbols);
    });
    return;
  }

  const interfaceDec = node.asKind(ts.SyntaxKind.InterfaceDeclaration);
  if (interfaceDec) {
    symbols.push(symbol);

    // Check properties for additional referenced symbols
    interfaceDec.getProperties().forEach(property => {
      collectReferencedSymbols(property, symbols);
    });
    return;
  }

  const typeAliasDec = node.asKind(ts.SyntaxKind.TypeAliasDeclaration);
  if (typeAliasDec) {
    symbols.push(symbol);
    return;
  }

  const propertySignature = node.asKind(ts.SyntaxKind.PropertySignature);
  if (propertySignature) {
    const typeSymbol = propertySignature.getType().getSymbol();
    if (typeSymbol) symbols.push(typeSymbol);
    return;
  }

  const variableDec = node.asKind(ts.SyntaxKind.VariableDeclaration);
  if (variableDec) {
    const typeSymbol = variableDec.getType().getSymbol();
    if (typeSymbol) symbols.push(typeSymbol);
    return;
  }

  const functionDec = node.asKind(ts.SyntaxKind.FunctionDeclaration);
  if (functionDec) {
    functionDec.getParameters().forEach(parameter => collectReferencedSymbols(parameter, symbols));
    const returnTypeSymbol = functionDec.getReturnType().getSymbol();
    if (returnTypeSymbol) symbols.push(returnTypeSymbol);
    return;
  }

  const parameter = node.asKind(ts.SyntaxKind.Parameter);
  if (parameter) {
    const typeSymbol = parameter.getType().getSymbol();
    if (typeSymbol) symbols.push(typeSymbol);
    return;
  }

  warn(`Unknown kind, cannot extract symbols: ${node.getKindName()}`);
}

function renderDocs(projectDirname: string, project: Project, symbols: Symbol[]): string {
  const symbolLinks = symbols.reduce<SymbolLinks>((map, symbol) => map, { ...EXTERNAL_SYMBOLS });

  const sections = [
    // Header
    `# API`,
    ':::info\nThe entire API reference is also available in your editor via [JSDocs](https://jsdoc.app/).\n:::',
    // Symbols
    ...symbols.map(symbol => renderSymbol(project, symbolLinks, symbol).trim()),
    // Footer
    '---',
    '_Reference generated by [`plugins/typescript-docs.ts`](https://github.com/aklinker1/webext-core/blob/main/docs/.vitepress/plugins/typescript-docs.ts)_',
  ];
  return sections.join('\n\n');
}

function renderSymbol(project: Project, symbolLinks: SymbolLinks, symbol: Symbol): string {
  const checker = project.getTypeChecker();
  const examples = symbol
    .getJsDocTags()
    .filter(tag => tag.getName() === 'example')
    .flatMap(tag => tag.getText())
    .map(part => part.text);
  const typeDefinitions = getTypeDeclarations(project, symbol).join('\n\n');
  const description = '';

  const template = `
## \`${symbol.getName()}\`

<details>
<summary><i>Type Declarations</i></summary>

\`\`\`ts
${typeDefinitions}
\`\`\`

</details>

${description}

${
  examples.length > 0
    ? `### Examples\n\n${examples.map(ex => `\`\`\`ts\n${ex}\n\`\`\``).join('\n\n')}`
    : ''
}
`;
  return template;
}

function getTypeDeclarations(project: Project, symbol: Symbol): string[] {
  const checker = project.getTypeChecker();
  const cleanTypeText = (text: string) => {
    text = text
      // Remove "export " from start
      .replace(/^export /, '')
      // Remove any inline JSDoc and whitespace
      .replace(/\s*\/\*\*[\S\s]*?\*\//gm, '');

    // Remove "import(...)." from types
    text.match(/import\(.*?\)\./gm)?.forEach(importText => {
      if (!importText.includes('node_modules')) {
        text = text.replace(importText, '');
      } else {
      }
    });
    return text;
  };
  return symbol
    .getDeclarations()
    .flatMap(dec => {
      // Remove body from function declarations.
      if (dec.isKind(ts.SyntaxKind.FunctionDeclaration)) dec.setBodyText('// ...');

      const text = cleanTypeText(dec.getText());

      // text ~= "() => void"
      if (dec.isKind(ts.SyntaxKind.FunctionType)) return text;
      // text ~= "type Abc = Something"
      if (dec.isKind(ts.SyntaxKind.TypeAliasDeclaration)) return text;
      // text ~= "interface Abc { ... }"
      if (dec.isKind(ts.SyntaxKind.InterfaceDeclaration)) return text;
      // text ~= "function abc() { ... }"
      if (dec.isKind(ts.SyntaxKind.FunctionDeclaration)) return text;
      // text ~= "varName = ...";
      if (dec.isKind(ts.SyntaxKind.VariableDeclaration)) {
        const name = dec.getName();
        let declarationKeyword = dec.getVariableStatementOrThrow().getDeclarationKind();
        const type = cleanTypeText(dec.getType().getText());
        return `${declarationKeyword} ${name}: ${type}`;
      }

      // const interfaceDec = dec.asKind(ts.SyntaxKind.InterfaceDeclaration);
      // if (interfaceDec) {
      //   // remove comments, remove blank lines
      //   return text.replace(/\/\*.*?\*\//gm, '');
      // }

      // const fn =
      //   dec.asKind(ts.SyntaxKind.FunctionDeclaration) ?? dec.asKind(ts.SyntaxKind.MethodSignature);

      // if (!fn) return dec.getText().replace(/^export/, '');

      // const text1 = dec.getType().getText();
      // // console.log({ text1 });
      // if (!text1.includes('import(')) return text1;

      // const text2 = dec.getType().getText(dec);
      // // console.log({ text2 });
      // if (!text2.startsWith('typeof')) return text2;

      // Resolve import('...').namedExport symbols
      throw Error(
        `ts.SyntaxKind.${dec.getKindName()} cannot convert to type declaration:\n${
          dec.getText().split('\n')[0]
        }`,
      );
    })
    .map(text => prettier.format(text, { printWidth: 80, parser: 'typescript' }).trimEnd());
}

function warn(message: string) {
  console.log(`\x1b[1m\x1b[33m${message}\x1b[0m`);
}
