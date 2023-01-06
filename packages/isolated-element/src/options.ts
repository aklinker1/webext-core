export interface CreateIsolatedElementOptions {
  name: string;
  tag?: string;
  mode?: 'open' | 'closed';
  css?: { url: string } | { textContent: string };
}
