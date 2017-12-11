import { IApiOptions, IBittrexParams, IPublicApiOptions } from './types'
import { Response } from 'node-fetch'
import { entries } from '@doge/helpers'
import { URL, URLSearchParams } from 'url'

export const publicGet = ({ request, headers }: IPublicApiOptions) =>
  (apiUrl: string) => (path: string) => (params: IBittrexParams = {}) => {
    const url = new URL(path, apiUrl)

    url.search = `${new URLSearchParams(entries(params))}`
    return request(`${url}`, {
      method: 'GET',
      headers: headers()
    }).then((resp: Response) => resp.json())
  }

export const credentialsGet = ({ apikey, apisecret, request, nonce, hash, headers }: IApiOptions) => {
  const hashUri = hash(apisecret)
  return (apiUrl: string) => (path: string) => (params: IBittrexParams = {}) => {
    const url = new URL(path, apiUrl)
    const searchParams: IBittrexParams = {
      ...params,
      apikey: apikey,
      nonce: nonce()
    }
    url.search = `${new URLSearchParams(entries(searchParams))}`

    return request(`${url}`, {
      method: 'GET',
      headers: {
        ...headers(),
        apisign: hashUri(`${url}`)
      }
    }).then((resp: Response) => resp.json())
  }
}
