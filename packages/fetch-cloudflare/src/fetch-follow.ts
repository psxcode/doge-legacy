import { RequestInit, Response } from 'node-fetch'
import { FetchFn } from './types'
import { URL } from 'url'

export const fetchFollow = (maxRedirects: number) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> => {
      let numRedirects = 0
      const r = (url: string, opts: RequestInit): Promise<Response> =>
        request(url, opts).then((resp: Response) => {
          if (resp.status === 302 && numRedirects++ < maxRedirects) {
            const { headers, url } = resp
            if (headers && headers.has('location')) {
              const location = headers.get('location')
              const referer = new URL(url).origin
              return r(location, { ...opts, headers: { ...opts.headers, referer } })
            }
          }
          return resp
        })
      return r(url, opts)
    }
