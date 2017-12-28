import { Request, RequestInit, Response } from 'node-fetch'
import { FetchFn, ResponseCookiesFn } from './types'

export const fetchCookiesResponse = (responseCookiesFn: ResponseCookiesFn) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> =>
      request(url, opts).then((resp: Response) => {
        const { url, headers } = resp
        if (headers.has('set-cookie')) {
          responseCookiesFn(headers.get('set-cookie'), url)
        }
        return resp
      })
