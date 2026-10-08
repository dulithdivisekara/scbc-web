// TODO: TEMPORARY REDIRECT
// Redirect Cloudflare Pages default domain (scbc-web.pages.dev) to temporary subdomain (scbck.dulith.me).
// Remove or update this middleware once the permanent custom domain is purchased and configured.
export async function onRequest(context: { request: Request; next: () => Promise<Response> }) {
  const url = new URL(context.request.url);
  if (url.hostname === 'scbc-web.pages.dev') {
    url.hostname = 'scbck.dulith.me';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
