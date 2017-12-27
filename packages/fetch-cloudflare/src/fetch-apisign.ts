import { Request, RequestInit, Response } from 'node-fetch'
import { FetchFn } from './types'

export const fetchApisign = (hash: (url: string) => string) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> =>
      request(url, {
        ...opts,
        headers: {
          ...opts.headers,
          apisign: hash(url)
        }
      })
