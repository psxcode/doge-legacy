import { Request, RequestInit, Response } from 'node-fetch'
import { FetchFn } from './types'
import { URL } from 'url'

export const fetchApikey = (apikey: string, nonce: () => number) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> => {
      const u = new URL(url)
      const params = u.searchParams
      params.append('apikey', apikey)
      params.append('nonce', `${nonce()}`)
      u.search = `${params}`
      return request(`${u}`, opts)
    }
