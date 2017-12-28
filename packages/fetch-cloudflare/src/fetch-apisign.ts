import { Request, RequestInit, Response } from 'node-fetch'
import { FetchFn, HashFn } from './types'

export const fetchApisign = (hash: HashFn) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> =>
      request(url, {
        ...opts,
        headers: {
          ...opts.headers,
          apisign: hash(url)
        }
      })
