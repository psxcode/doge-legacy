import { default as fetch, RequestInit, Response } from 'node-fetch'
import { CookieJar } from 'tough-cookie'
import { promisify } from './helpers'

export const getFetch = (request: typeof fetch) =>
  (url: string, opts: RequestInit = {}): Promise<Response> =>
    request(url, { ...opts, method: 'GET' })

export const apisignFetch = (hash: (url: string) => string) => (request: typeof fetch) =>
  (url: string, opts: RequestInit = {}): Promise<Response> => {
    const { headers = {} } = opts
    return request(url, {
      ...opts,
      headers: {
        ...headers,
        apisign: hash(url)
      }
    })
  }

export const cookiesFetch = (jar: CookieJar) => (request: typeof fetch) => {
  const setCookie: (cookie: string, url: string) => Promise<void> = promisify(jar.setCookie.bind(jar))
  const getCookie: (url: string) => Promise<string> = promisify(jar.getCookieString.bind(jar))
  return (url: string, opts: RequestInit = {}): Promise<Response> =>
    getCookie(url)
      .then((cookie: string): Promise<Response> => {
        const { headers = {} } = opts
        return request(url, {
          ...opts,
          headers: {
            ...headers,
            ...cookie ? { cookie } : {}
          }
        })
      })
      .then((resp: Response) => {
        const { url, headers } = resp
        const cookieStr: string = headers.get('set-cookie') || ''
        const cookies: string[] = cookieStr ? cookieStr.split(',') : []
        return Promise
          .all(cookies.map((c: string) => setCookie(c, url)))
          .then(() => resp)
      })
}
