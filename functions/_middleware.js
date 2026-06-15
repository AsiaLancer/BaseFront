/**
 * Cloudflare Pages 中间件 — 域名白名单
 * 只允许自定义域名访问，其他所有域名 301 到 moxue.tech
 */
export async function onRequest(context) {
  const url = new URL(context.request.url)
  const host = url.hostname

  // 允许的域名
  const ALLOWED = ['moxue.tech', 'www.moxue.tech']

  if (ALLOWED.includes(host)) {
    return context.next()
  }

  // 其他域名 → 拒之门外，不给任何响应内容
  return new Response('Not Found', { status: 404 })
}
