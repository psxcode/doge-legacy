import { default as fetch, Request, RequestInit, Response } from 'node-fetch'

export type FetchFn = typeof fetch

export const fetchGet =
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> =>
      request(url, { ...opts, method: 'GET' })

export const fetchApisign = (hash: (url: string) => string) =>
  (request: FetchFn): FetchFn =>
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

export type GetCookieFn = (url: string) => Promise<string>
export type SetCookieFn = (cookie: string, url: string) => Promise<void>

export const fetchCookies = (getCookie: GetCookieFn, setCookie: SetCookieFn) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> =>
      getCookie(url)
        .then((cookie: string) => {
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
          const cookieStr = headers.get('set-cookie') || ''
          return cookieStr
            ? setCookie(cookieStr, url).then(() => resp)
            : resp
        })
