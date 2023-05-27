import { UserConfig } from 'vitepress';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Listr, ListrTask, ListrTaskWrapper } from 'listr2';
import {
  Project,
  Symbol,
  SourceFile,
  Node,
  ts,
  JSDocableNode,
  JSDoc,
  ExportedDeclarations,
} from 'ts-morph';
import * as prettier from 'prettier';
import chokidar from 'chokidar';
import { defineConfig } from 'vitepress';
import { parseHTML } from 'linkedom';
import { CodeBlockWriter } from 'ts-morph';

/**
 * If the main entrypoint for a file is different than src/index.ts, list them below.
 */
const CUSTOM_ENTRYPOINTS: Record<string, string[]> = {
  messaging: ['src/index.ts', 'src/page.ts'],
};

export function defineTypescriptDocs(packageDirnames: string[]) {
  const ctx: Ctx = {
    watchers: [],
    symbolMap: {},
  };

  function plugin(): Plugin {
    let mode: 'build' | 'serve';
    let hasGenerated = false;

    return {
      name: 'generate-ts-docs',
      configResolved(config) {
        mode = config.command;
      },
      async buildStart() {
        if (hasGenerated) return;
        hasGenerated = true;

        const allPackages = await getPackages();
        await generateAll(ctx, allPackages, mode, mode === 'serve');
      },
      async buildEnd() {
        removeWatchListeners(ctx);
      },
    };
  }

  return defineConfig({
    ignoreDeadLinks: [/^\/api\/.*/],

    vite: {
      plugins: [plugin()],
      define: {
        __PACKAGES__: JSON.stringify(packageDirnames),
      },
    },

    transformHtml(code, id) {
      const [_, thisPkg] = id.match(/\/api\/(.*)\.html$/) ?? [];
      if (!thisPkg) return;

      const { document } = parseHTML(code);
      /**
       * Creates an anchor element to a symbol's package.
       */
      const createLink = (
        symbolName: string,
        thisPkg: string,
        packages: string[],
      ): HTMLAnchorElement => {
        const a = document.createElement('a');
        a.textContent = symbolName;
        if (packages.includes(thisPkg)) {
          a.href = '#' + symbolName.toLowerCase();
        } else {
          a.href = `/api/${packages[0]}#${symbolName.toLowerCase()}`;
        }
        return a;
      };

      // Code blocks - same text color, underlined
      document.querySelectorAll('pre span').forEach(span => {
        Object.entries(ctx.symbolMap).forEach(([symbolName, packages]) => {
          if (span.textContent !== symbolName) return;

          const a = createLink(symbolName, thisPkg, packages);
          a.style.color = 'inherit';
          a.style.textDecoration = 'underline';
          span.replaceChildren(a);
        });
      });

      // Inline code - primary color, underlined links
      document.querySelectorAll('p code, li code').forEach(block =>
        Object.entries(ctx.symbolMap).forEach(([symbolName, packages]) => {
          // Look for matching full word
          if (
            !block.textContent
              ?.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
              .split(/\s+/)
              .includes(symbolName)
          )
            return;

          const a = createLink(symbolName, thisPkg, packages);
          a.style.textDecoration = 'underline';
          block.innerHTML = block.innerHTML.replace(symbolName, a.outerHTML);
        }),
      );

      return document.toString();
    },
  });
}

type Plugin = NonNullable<NonNullable<UserConfig['vite']>['plugins']>[0];
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
  watchers: chokidar.FSWatcher[];
  /**
   * Map of symbols to the packages they are found in.
   */
  symbolMap: { [symbolName: string]: string[] };
}

async function removeWatchListeners(ctx: Ctx) {
  for (const w of ctx.watchers) {
    await w.close();
  }
  ctx.watchers = [];
}

/**
 * Return the package folder names that documentation will be generated for.
 */
async function getPackages(): Promise<string[]> {
  const all = await fs.readdir('packages');
  return all.filter(folderName => !folderName.endsWith('-demo') && folderName !== 'tsconfig');
}

async function generateAll(
  ctx: Ctx,
  projectDirNames: string[],
  mode: 'build' | 'serve',
  watch?: boolean,
) {
  if (watch) {
    await removeWatchListeners(ctx);
  }

  const tasks = new Listr<Ctx>(
    {
      title: 'Generating TS Docs',
      task: (ctx, topTask) =>
        topTask.newListr(
          projectDirNames.map<ListrTask<Ctx>>(dirname => ({
            title: dirname,
            task: (ctx, task) => {
              if (watch) {
                const watcher = chokidar.watch(`packages/${dirname}/src`);
                watcher.on('change', changedPath => {
                  console.log(
                    `\n\x1b[2mChanged: ${path.relative(process.cwd(), changedPath)}\x1b[0m`,
                  );
                  generateAll(ctx, [dirname], mode);
                });
                ctx.watchers.push(watcher);
              }

              return generateProjectDocs(ctx, task, dirname);
            },
          })),
        ),
    },
    {
      ctx,
      silentRendererCondition: () => mode === 'build',
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

  const projectDir = path.resolve('packages', projectDirname);
  const entrypointPaths = (CUSTOM_ENTRYPOINTS[projectDirname] ?? ['src/index.ts']).map(entry =>
    path.resolve(projectDir, entry),
  );
  const outputDir = path.resolve('docs/api');
  const outputFile = path.resolve(outputDir, `${projectDirname}.md`);
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
  const docs = renderDocs(projectDirname, project, publicSymbols);
  publicSymbols.forEach(s => {
    (ctx.symbolMap[s.getName()] ??= []).push(projectDirname);
  });
  // Write to file
  await fs.mkdir(outputDir, { recursive: true });
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

function renderDocs(projectDirname: string, project: Project, symbols: Symbol[]): string {
  const sections = [
    // Header
    `<!-- GENERATED FILE, DO NOT EDIT -->`,
    `# API Reference - \`${projectDirname}\``,
    `> [\`@webext-core/${projectDirname}\`](/guide/${projectDirname}/)`,
    // Symbols
    ...symbols.map(symbol => renderSymbol(project, symbol).trim()),
    // Footer
    '<br/><br/>',
    '---',
    '_API reference generated by [`plugins/typescript-docs.ts`](https://github.com/aklinker1/webext-core/blob/main/docs/.vitepress/plugins/typescript-docs.ts)_',
  ];
  return sections.join('\n\n');
}

function renderSymbol(project: Project, symbol: Symbol): string {
  const { examples, description, parameters, returns, deprecated } = parseJsdoc(symbol);
  const typeDefinition = getTypeDeclarations(project, symbol).join('\n\n');
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

function getTypeDeclarations(project: Project, symbol: Symbol): string[] {
  return symbol
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
    .map(text => prettier.format(text, { printWidth: 80, parser: 'typescript' }).trimEnd());
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
