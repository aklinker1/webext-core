import { printNode, Project, Symbol, ts, Type, TypeAliasDeclaration } from 'ts-morph';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { writeJsdoc } from './code-writer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '..', 'src', 'base.gen.ts');
const project = new Project();
const w = project.createWriter();
writeJsdoc(w, 'DO NOT EDIT. THIS IS A GENERATED FILE.\n\n```bash\npnpm gen\n```');

const TS_FIELDS_WITH_ERRORS = ['Browser.declarativeContent.ShowAction'];

function writeToFile() {
  project.getFileSystem().writeFileSync(outputPath, w.toString());
}

const src = project.createSourceFile(
  'webextension-polyfill.ts',
  `
    import type { Browser } from 'webextension-polyfill';
    type BrowserToGenerate = Browser;
  `,
);

const Browser = src.getTypeAlias('BrowserToGenerate')?.getType();

function generateType(parents: string[], name: string, type: Type<ts.Type> | undefined) {
  if (type == null) return;
  const propertyChain = [...parents, name].join('.');

  if (type.getCallSignatures().length > 0) {
    // Functions need mocked
    w.write(`() => `).block(() => {
      w.writeLine(
        `throw Error(\`${propertyChain} not implemented.\n\nMock the function yourself using your testing framework, or submit a PR with an in-memory implementation.\`)`,
      );
    });
  } else if (type.isAnonymous()) {
    // Anonymous classes need mocked
    w.write(`class ${name} {}`);
  } else if (type.isClass()) {
    // Classes need mocked
    w.write(`class ${name} {}`);
  } else if (type.isObject()) {
    // Interfaces have properties that need generated
    w.inlineBlock(() => {
      type.getProperties().forEach(prop => {
        const nextPropertyChain = [propertyChain, prop.getName()].join('.');
        if (TS_FIELDS_WITH_ERRORS.includes(nextPropertyChain)) {
          w.writeLine('// @ts-expect-error: Generated type is known to be wrong');
        }
        w.write(`${prop.getName()}: `);
        generateType([...parents, name], prop.getName(), prop.getValueDeclaration()?.getType());
        w.write(',').newLineIfLastNot();
      });
    });
  } else if (type.isLiteral()) {
    w.write(type.getText());
  } else if (type.isString()) {
    w.write(`"string"`);
  } else if (type.isBoolean()) {
    w.write(`false`);
  } else if (type.isNumber()) {
    w.write(`0`);
  } else {
    console.warn(`[${propertyChain}] Unknown type: ${type.getText()}`);
  }
}

w.write(`
import type { Browser } from 'webextension-polyfill';

export const GeneratedBrowser: Browser = `);

generateType([], 'Browser', Browser);

writeToFile();
