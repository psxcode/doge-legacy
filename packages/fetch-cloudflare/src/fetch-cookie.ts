import { Request, RequestInit, Response } from 'node-fetch'
import { FetchFn, GetCookieFn, SetCookieFn } from './types'

export const fetchGetCookies = (getCookie: GetCookieFn) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> =>
      getCookie(url).then((cookie: string) =>
        request(url, {
          ...opts,
          headers: {
            ...opts.headers,
            ...cookie ? { cookie } : {}
          }
        }))

export const fetchSetCookies = (setCookie: SetCookieFn) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> =>
      request(url, opts).then((resp: Response) => {
        const { url, headers } = resp
        const cookieStr = headers.get('set-cookie')
        return cookieStr
          ? setCookie(cookieStr, url).then(() => resp)
          : resp
      })
