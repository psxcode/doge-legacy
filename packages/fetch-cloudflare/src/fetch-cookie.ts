import { default as fetch, RequestInit, Response } from 'node-fetch'
import { CookieJar } from 'tough-cookie'
import { promisify } from './helpers'

export const storeCookiesFromResponse = (jar: CookieJar) => {
  const setCookie: (cookie: string, url: string) => Promise<void> = promisify(jar.setCookie.bind(jar))
  return (resp: Response): Promise<any> => {
    const { url, headers } = resp
    const cookieStr: string = headers.get('set-cookie') || ''
    const cookies: string[] = cookieStr ? cookieStr.split(',') : []
    return Promise.all(cookies.map((c: string) => setCookie(c, url))).then(() => resp)
  }
}

export const addCookiesToRequestInit = (jar: CookieJar) => {
  const gcs = promisify(jar.getCookieString.bind(jar))
  return (url: string, opts: RequestInit) => gcs(url)
    .then((cookieStr: string) => ({
      ...opts,
      headers: {
        ...opts.headers,
        cookie: cookieStr
      }
    }))
}

export const fetchCookie = (jar: CookieJar, request: typeof fetch): typeof fetch => {
  const get = addCookiesToRequestInit(jar)
  const set = storeCookiesFromResponse(jar)

  return (url: string, opts: RequestInit): Promise<Response> => get(opts)
    .then((opts: RequestInit) => request(url, opts))
    .then(set)
}
