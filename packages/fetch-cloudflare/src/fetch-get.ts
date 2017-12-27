import { Request, RequestInit, Response } from 'node-fetch'
import { FetchFn } from './types'

export const fetchGet = (request: FetchFn): FetchFn =>
  (url: string, opts: RequestInit = {}): Promise<Response> =>
    request(url, {
      ...opts,
      method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        ...opts.headers
      }
    })
