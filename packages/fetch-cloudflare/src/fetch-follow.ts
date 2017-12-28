import { Request, RequestInit, Response } from 'node-fetch'
import { FetchFn } from './types'
import { URL } from 'url'

/**
 * number of calls will be 'maxRedirects' + 1,
 * and if last call is also redirect,
 * then return as is
 * 'numRedirects' is reset when user makes new call
 */
export const fetchFollow = (maxRedirects: number) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> => {
      let numRedirects = 0
      const innerRequest = (url: string, opts: RequestInit): Promise<Response> =>
        request(url, { ...opts, redirect: 'manual' }).then((resp: Response) => {
          const { headers, url, status } = resp
          if (status === 302 && headers && headers.has('location') && numRedirects < maxRedirects) {
            const location = headers.get('location')
            const { origin, pathname } = new URL(url)
            ++numRedirects
            return innerRequest(location, {
              ...opts,
              headers: { ...opts.headers, referer: `${origin}${pathname}` }
            })
          }
          return resp
        })
      return innerRequest(url, opts)
    }
