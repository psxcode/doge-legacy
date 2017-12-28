import { Request, RequestInit, Response } from 'node-fetch'
import { FetchFn, RequestCookiesFn } from './types'

export const fetchCookiesRequest = (requestCookiesFn: RequestCookiesFn) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> => {
      const cookie = requestCookiesFn(url)
      return request(url, {
        ...opts,
        headers: {
          ...opts.headers,
          ...cookie ? { cookie } : {}
        }
      })
    }
