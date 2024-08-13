import redirects from '../_redirects.txt?raw';

const parsedRedirects = redirects
  .split('\n')
  .map(line => line.trim())
  .filter(line => !!line && !line.startsWith('#'))
  .map(line => {
    const [from, to] = line.trim().split(/\s+/);
    return {
      from,
      to,
    };
  })
  .filter(redirect => redirect.from && redirect.to);

console.log(parsedRedirects);

export default defineNuxtPlugin(() => {
  // Client side redirects only since it is hosted as a SSG app
  if (process.server) return;

  const router = useRouter();
  router.beforeEach(route => {
    const redirect = parsedRedirects.find(({ from }) => route.path === from);
    if (redirect == null) return;

    const newUrl = new URL(location.href);
    newUrl.pathname = redirect.to;
    location.href = newUrl.href;
  });
});
