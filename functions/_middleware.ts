export async function onRequest(context: { request: Request; next: () => Promise<Response> }) {
  const url = new URL(context.request.url);
  if (url.hostname === 'scbc-web.pages.dev') {
    url.hostname = 'scbck.dulith.me';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
