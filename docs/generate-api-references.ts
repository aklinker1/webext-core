import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { Listr, type ListrTask, ListrTaskWrapper } from 'listr2';
import { Project, Symbol, SourceFile, Node, ts, JSDocableNode, JSDoc } from 'ts-morph';
import * as prettier from 'prettier';
import { CodeBlockWriter } from 'ts-morph';

const packagesDir = path.resolve('../packages');

/**
 * If the main entrypoint for a file is different than src/index.ts, list them below.
 */
const CUSTOM_ENTRYPOINTS: Record<string, string[]> = {
  messaging: ['src/index.ts', 'src/page.ts'],
};

export async function generateApiReferences() {
  const ctx: Ctx = {
    symbolMap: {},
  };
  const allPackages = await getPackages();
  await generateAll(ctx, allPackages);
}

type SymbolLinks = { [symbolName: string]: string };

const EXTERNAL_SYMBOLS: SymbolLinks = {
  Promise:
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
  'Storage.StorageArea':
    'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea',
  StorageArea:
    'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea',
  CustomEvent: 'https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent',
};

const EXCLUDED_SYMBOLS = [
  // name of an anonymous type
  '__type',
  // Generic type params
  'TData',
  'TReturn',
  'TType',
];

/**
 * context passed into each task
 */
interface Ctx {
  /**
   * Map of symbols to the packages they are found in.
   */
  symbolMap: { [symbolName: string]: string[] };
}

/**
 * Return the package folder names that documentation will be generated for.
 */
async function getPackages(): Promise<string[]> {
  const all = await fs.readdir(packagesDir);
  return all.filter(folderName => !folderName.endsWith('-demo') && folderName !== 'tsconfig');
}

async function generateAll(ctx: Ctx, projectDirNames: string[]) {
  const tasks = new Listr<Ctx>(
    {
      title: 'Generating TS Docs',
      task: (ctx, topTask) =>
        topTask.newListr(
          projectDirNames.map<ListrTask<Ctx>>(dirname => ({
            title: dirname,
            task: (ctx, task) => {
              return generateProjectDocs(ctx, task, dirname);
            },
          })),
        ),
    },
    {
      ctx,
    },
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

  const projectDir = path.resolve(packagesDir, projectDirname);
  const entrypointPaths = (CUSTOM_ENTRYPOINTS[projectDirname] ?? ['src/index.ts']).map(entry =>
    path.resolve(projectDir, entry),
  );
  const outputFile = path.resolve(`content/${projectDirname}/api.md`);
  const tsConfigFilePath = path.resolve(projectDir, 'tsconfig.json');
  // Load TS Project
  const project = new Project({ tsConfigFilePath });
  const entrypoints = entrypointPaths.map(entrypointPath =>
    project.addSourceFileAtPath(entrypointPath),
  );
  project.resolveSourceFileDependencies();

  // Type Generation

  const publicSymbols = getPublicSymbols(project, entrypoints);
  // Sort alphabetically
  publicSymbols.sort((l, r) => l.getName().toLowerCase().localeCompare(r.getName().toLowerCase()));
  const docs = await renderDocs(projectDirname, project, publicSymbols);
  publicSymbols.forEach(s => {
    (ctx.symbolMap[s.getName()] ??= []).push(projectDirname);
  });
  // Write to file
  await fs.writeFile(outputFile, docs, 'utf-8');
}

function getPublicSymbols(project: Project, entrypoints: SourceFile[]): Symbol[] {
  // Get all exported declarations from the source file
  const exportedDeclarations = entrypoints
    .flatMap(entry => Array.from(entry.getExportedDeclarations().values()))
    .flat();

  // Collect all exported symbols
  const exportedSymbols: Symbol[] = [];
  for (const declaration of exportedDeclarations) {
    exportedSymbols.push(declaration.getSymbolOrThrow());
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
  const symbol = node.getSymbol();
  if (symbol == null) return;

  if (node.isKind(ts.SyntaxKind.TypeReference)) {
    symbols.push(symbol);

    // Check referenced type for additional referenced symbols
    const type = node.getType();
    const typeSymbol = type.getSymbolOrThrow();
    symbols.push(typeSymbol);

    // Check type arguments for additional referenced symbols
    node.getTypeArguments().forEach(typeArg => {
      collectReferencedSymbols(typeArg, symbols);
    });
    return;
  }

  if (node.isKind(ts.SyntaxKind.InterfaceDeclaration)) {
    symbols.push(symbol);

    // Check properties for additional referenced symbols
    node.getProperties().forEach(property => {
      collectReferencedSymbols(property, symbols);
    });

    // TODO: extends
    return;
  }

  if (node.isKind(ts.SyntaxKind.TypeAliasDeclaration)) {
    symbols.push(symbol);
    return;
  }

  if (node.isKind(ts.SyntaxKind.PropertySignature)) {
    const typeSymbol = node.getType().getSymbol();
    if (typeSymbol) symbols.push(typeSymbol);
    return;
  }

  if (node.isKind(ts.SyntaxKind.VariableDeclaration)) {
    const typeSymbol = node.getType().getSymbol();
    if (typeSymbol) symbols.push(typeSymbol);
    return;
  }

  if (node.isKind(ts.SyntaxKind.FunctionDeclaration)) {
    node.getParameters().forEach(parameter => collectReferencedSymbols(parameter, symbols));
    const returnTypeSymbol = node.getReturnType().getSymbol();
    if (returnTypeSymbol) symbols.push(returnTypeSymbol);
    return;
  }

  if (node.isKind(ts.SyntaxKind.Parameter)) {
    const typeSymbol = node.getType().getSymbol();
    if (typeSymbol) symbols.push(typeSymbol);
    return;
  }

  if (node.isKind(ts.SyntaxKind.ClassDeclaration)) {
    symbols.push(symbol);

    // Add references from extends
    const extend = node.getExtends();
    if (extend) collectReferencedSymbols(extend, symbols);
    return;
  }

  warn(`Unknown kind, cannot extract symbols: ${node.getKindName()}`);
}

async function renderDocs(
  projectDirname: string,
  project: Project,
  symbols: Symbol[],
): Promise<string> {
  const renderedSymbols = await Promise.all(
    symbols.map(async symbol => {
      const rendered = await renderSymbol(project, symbol);
      return rendered.trim();
    }),
  );
  const sections = [
    // Header
    `<!-- GENERATED FILE, DO NOT EDIT -->`,
    `---\ndescription: ""\n---`,
    `::alert`,
    `See [\`@webext-core/${projectDirname}\`](/${projectDirname}/installation/)`,
    `::`,
    // Symbols
    ...renderedSymbols,
    // Footer
    '<br/><br/>',
    '---',
    '_API reference generated by [`docs/generate-api-references.ts`](https://github.com/aklinker1/webext-core/blob/main/docs/generate-api-references.ts)_',
  ];
  return sections.join('\n\n');
}

async function renderSymbol(project: Project, symbol: Symbol): Promise<string> {
  const { examples, description, parameters, returns, deprecated } = parseJsdoc(symbol);
  const typeDefinition = (await getTypeDeclarations(project, symbol)).join('\n\n');
  const properties: string[] = symbol
    .getDeclarations()
    .flatMap(dec => dec.asKind(ts.SyntaxKind.InterfaceDeclaration))
    .flatMap(i => i?.getProperties() ?? [])
    .map(prop => {
      const dec = prop.getSymbolOrThrow().getDeclarations()[0];
      const docs = prop
        .getJsDocs()
        .map(doc => doc.getCommentText())
        .join(' ');
      const defaultValue = prop
        .getSymbol()
        ?.getJsDocTags()
        .find(tag => tag.getName() === 'default')
        ?.getText()
        .map(part => part.text)
        .join(' ');
      return `***\`${dec.getText().replace(/;$/, '')}\`***${
        defaultValue ? ` (default: \`${defaultValue}\`)` : ''
      }${docs ? '<br/>' + docs : ''}`;
    });

  let template = `
## \`${symbol.getName()}\`

${deprecated ? `:::danger Deprecated\n${deprecated}\n:::` : ''}

\`\`\`ts
${typeDefinition}
\`\`\`

${description}

${
  parameters.length > 0
    ? `### Parameters\n\n${parameters.map(parameter => `- ${parameter}`).join('\n\n')}`
    : ''
}

${returns ? `### Returns \n\n${returns}` : ''}

${
  properties.length > 0
    ? `### Properties \n\n${properties.map(property => `- ${property}`).join('\n\n')}`
    : ''
}

${
  examples.length > 0
    ? `### Examples\n\n${examples.map(ex => `\`\`\`ts\n${ex}\n\`\`\``).join('\n\n')}`
    : ''
}
`;

  while (template.includes('\n\n\n')) template = template.replace('\n\n\n', '\n\n');
  return template.replace(/\n\n\n/gm, '\n\n');
}

function cleanTypeText(text: string): string {
  text = text
    // Remove "export " from start
    .replace(/^export /, '')
    // Remove any inline JSDoc and whitespace
    .replace(/\s*\/\*\*[\S\s]*?\*\//gm, '');

  // Remove "import(...)." from types
  text.match(/import\(.*?\)\./gm)?.forEach(importText => {
    text = text.replace(importText, '');
  });
  return text;
}

async function getTypeDeclarations(project: Project, symbol: Symbol): Promise<string[]> {
  return await Promise.all(
    symbol
      .getDeclarations()
      .flatMap(dec => {
        // Remove body from function declarations.
        if (dec.isKind(ts.SyntaxKind.FunctionDeclaration)) dec.setBodyText('// ...');

        const text = cleanTypeText(dec.getText());
        // console.log(text);

        // text ~= "() => void"
        if (dec.isKind(ts.SyntaxKind.FunctionType)) return text;
        // text ~= "type Abc = Something"
        if (dec.isKind(ts.SyntaxKind.TypeAliasDeclaration)) return text;
        // text ~= "interface Abc { ... }"
        if (dec.isKind(ts.SyntaxKind.InterfaceDeclaration)) return text;
        // text ~= "function abc() { ... }"
        if (dec.isKind(ts.SyntaxKind.FunctionDeclaration)) return text;
        // text ~= "T"
        if (dec.isKind(ts.SyntaxKind.TypeParameter)) return text;
        // text ~= "varName = ...";
        if (dec.isKind(ts.SyntaxKind.VariableDeclaration)) {
          const name = dec.getName();
          let declarationKeyword = dec.getVariableStatementOrThrow().getDeclarationKind();
          const type = cleanTypeText(dec.getType().getText());
          return `${declarationKeyword} ${name}: ${type}`;
        }
        // text ~= "class ... extends  { ... }";
        if (dec.isKind(ts.SyntaxKind.ClassDeclaration)) {
          const w = new CodeBlockWriter();
          const extend = dec.getExtends();
          w.write(`class ${dec.getName()} `)
            .conditionalWrite(!!extend, () => `extends ${extend?.getText()} `)
            .inlineBlock(() => {
              dec.getStaticMethods().forEach(method => {
                if (method.hasModifier(ts.SyntaxKind.PrivateKeyword)) return;
                w.writeLine(method.getText().replace(method.getBodyText() ?? '', '// ...'));
              });
              dec.getConstructors().forEach(con => {
                if (con.hasModifier(ts.SyntaxKind.PrivateKeyword)) return;
                w.writeLine(
                  con
                    .getText()
                    .replace(con.getBodyText() ?? '', '// ...')
                    .replace(/(private|readonly) /g, ''),
                );
              });
              dec.getMethods().forEach(method => {
                if (method.hasModifier(ts.SyntaxKind.PrivateKeyword)) return;
                w.writeLine(method.getText().replace(method.getBodyText() ?? '', '// ...'));
              });
            });
          return w.toString();
        }

        throw Error(
          `ts.SyntaxKind.${dec.getKindName()} cannot convert to type declaration:\n${
            dec.getText().split('\n')[0]
          }`,
        );
      })
      .map(async text => {
        const res = await prettier.format(text, { printWidth: 80, parser: 'typescript' });
        return res.trimEnd();
      }),
  );
}

function warn(message: string) {
  console.log(`\x1b[1m\x1b[33m${message}\x1b[0m`);
}

function parseJsdoc(symbol: Symbol) {
  const dec = symbol.getDeclarations()[0] as Node;
  const docsNode = dec.getFirstAncestorByKind(ts.SyntaxKind.VariableStatement) ?? dec;
  let docs: JSDoc[] | undefined;
  if ('getJsDocs' in docsNode) {
    docs = (docsNode as unknown as JSDocableNode).getJsDocs();
  }

  const examples: string[] = symbol
    .getJsDocTags()
    .filter(tag => tag.getName() === 'example')
    .flatMap(tag => tag.getText())
    .map(part => part.text);

  const functionDec = symbol.getDeclarations()[0].asKind(ts.SyntaxKind.FunctionDeclaration);
  const parameters: string[] = symbol
    .getJsDocTags()
    .filter(tag => tag.getName() === 'param')
    .map(tag => {
      const parts = tag.getText();
      let name: string;
      let docs: string[] = [];
      if (parts.length === 1) {
        name = parts[0].text;
      } else {
        name = parts.find(p => p.kind === 'parameterName')!.text;
        docs = parts.filter(p => p.kind === 'text').map(p => p.text);
      }
      const type = functionDec?.getParameterOrThrow(name).print() ?? 'unknown';
      return `***\`${type}\`***${docs.length > 0 ? '<br/>' + docs.join('\n\n') : ''}`;
    });

  const description: string | undefined = docs?.flatMap(doc => doc.getCommentText()).join('\n\n');

  const returns = symbol
    .getJsDocTags()
    .find(tag => tag.getName() === 'returns')
    ?.getText()
    .map(part => part.text)
    .join(' ');

  const deprecated = symbol
    .getJsDocTags()
    .find(tag => tag.getName() === 'deprecated')
    ?.getText()
    .map(part => part.text)
    .join(' ');

  return {
    examples,
    description,
    returns,
    parameters,
    deprecated,
  };
}

await generateApiReferences();
