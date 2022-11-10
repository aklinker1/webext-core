import { CodeBlockWriter } from 'ts-morph';

export function writeJsdoc(w: CodeBlockWriter, comment: string): CodeBlockWriter {
  const lines = ['/**', ...comment.split('\n').map(line => ` * ${line}`), ' */'];
  w.writeLine(lines.join('\n'));
  return w;
}
