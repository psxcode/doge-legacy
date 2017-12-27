import { Request, RequestInit, Response } from 'node-fetch'
import { FetchFn, GetCookiesFn, SetCookiesFn } from './types'

export const fetchGetCookies = (getCookies: GetCookiesFn) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> => {
      const cookie = getCookies(url)
      return request(url, {
        ...opts,
        headers: {
          ...opts.headers,
          ...cookie ? { cookie } : {}
        }
      })
    }

export const fetchSetCookies = (setCookies: SetCookiesFn) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> =>
      request(url, opts).then((resp: Response) => {
        const { url, headers } = resp
        if (headers.has('set-cookie')) {
          setCookies(headers.get('set-cookie'), url)
        }
        return resp
      })
