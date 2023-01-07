export interface CreateIsolatedElementOptions {
  name: string;
  mode?: 'open' | 'closed';
  css?: { url: string } | { textContent: string };
}
