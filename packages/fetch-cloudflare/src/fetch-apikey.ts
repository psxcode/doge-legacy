import { Request, RequestInit, Response } from 'node-fetch'
import { FetchFn } from './types'
import { URL } from 'url'

export const fetchApikey = (apikey: string, nonce: () => number) =>
  (request: FetchFn): FetchFn =>
    (urlArg: string, opts: RequestInit = {}): Promise<Response> => {
      const url = new URL(urlArg)
      const params = url.searchParams
      params.append('apikey', apikey)
      params.append('nonce', `${nonce()}`)
      url.search = `${params}`
      return request(`${url}`, opts)
    }
