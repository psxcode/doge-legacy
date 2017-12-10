import {
  IApiOptions,
  IBittrexBuySell,
  IBittrexCancel,
  IBittrexGetBalance,
  IBittrexGetBalances,
  IBittrexGetCurrencies,
  IBittrexGetDepositAddress,
  IBittrexGetDepositHistory,
  IBittrexGetLatestTick,
  IBittrexGetMarketHistory,
  IBittrexGetMarkets,
  IBittrexGetMarketSummaries,
  IBittrexGetMarketSummary,
  IBittrexGetOpenOrders,
  IBittrexGetOrder,
  IBittrexGetOrderBook,
  IBittrexGetOrderHistory,
  IBittrexGetTicker,
  IBittrexGetTicks,
  IBittrexGetWithdrawalHistory,
  IBittrexParams,
  IBittrexWithdraw, ICredentialsApi, IPublicApi,
  IPublicApiOptions
} from './types'
import { API_V1, API_V2, BASE_URL } from './config'
import { Response } from 'node-fetch'
import { URL, URLSearchParams } from 'url'
import { entries } from './helpers'

const BASE_URL_API_V1 = new URL(`${API_V1}/`, BASE_URL)
const BASE_URL_API_V2 = new URL(`${API_V2}/`, BASE_URL)

const getCall = ({ request, headers }: IPublicApiOptions) =>
  (apiUrl: URL) => (path: string) => (params: IBittrexParams = {}) => {
    const url = new URL(path, apiUrl)
    url.search = `${new URLSearchParams(entries(params))}`
    return request(`${url}`, {
      method: 'GET',
      headers: headers()
    }).then((resp: Response) => resp.json())
  }

const getCredentialsCall = ({ apikey, apisecret, request, nonce, hash, headers }: IApiOptions) => {
  const hashUri = hash(apisecret)
  return (apiUrl: URL) => (path: string) => (params: IBittrexParams = {}) => {
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

export function getPublicApi (opts: IPublicApiOptions): IPublicApi {
  const bxPubV1Get = getCall(opts)(BASE_URL_API_V1)
  const bxPubV2Get = getCall(opts)(BASE_URL_API_V2)

  const getmarkets = bxPubV1Get('public/getmarkets') as IBittrexGetMarkets
  const getcurrencies = bxPubV1Get('public/getcurrencies') as IBittrexGetCurrencies
  const getticker = bxPubV1Get('public/getticker') as IBittrexGetTicker
  const getticks = bxPubV2Get('pub/market/getticks') as IBittrexGetTicks
  const getlatesttick = bxPubV2Get('pub/market/getlatesttick') as IBittrexGetLatestTick
  const getmarketsummaries = bxPubV1Get('public/getmarketsummaries') as IBittrexGetMarketSummaries
  const getmarketsummary = bxPubV1Get('public/getmarketsummary') as IBittrexGetMarketSummary
  const getorderbook = bxPubV1Get('public/getorderbook') as IBittrexGetOrderBook
  const getmarkethistory = bxPubV1Get('public/getmarkethistory') as IBittrexGetMarketHistory

  return {
    getmarkets,
    getcurrencies,
    getticker,
    getmarketsummaries,
    getmarketsummary,
    getorderbook,
    getmarkethistory,
    getticks,
    getlatesttick
  }
}

export function getCredentialsApi (opts: IApiOptions): ICredentialsApi {
  const bxPrivV1Get = getCredentialsCall(opts)(BASE_URL_API_V1)

  const buylimit = bxPrivV1Get('market/buylimit') as IBittrexBuySell
  const buymarket = bxPrivV1Get('market/buymarket') as IBittrexBuySell
  const selllimit = bxPrivV1Get('market/selllimit') as IBittrexBuySell
  const sellmarket = bxPrivV1Get('market/sellmarket') as IBittrexBuySell
  const cancel = bxPrivV1Get('market/cancel') as IBittrexCancel
  const getopenorders = bxPrivV1Get('market/getopenorders') as IBittrexGetOpenOrders
  const getbalances = bxPrivV1Get('market/getbalances') as IBittrexGetBalances
  const getbalance = bxPrivV1Get('market/getbalance') as IBittrexGetBalance
  const getdepositaddress = bxPrivV1Get('account/getdepositaddress') as IBittrexGetDepositAddress
  const getwithdrawalhistory = bxPrivV1Get('account/getwithdrawalhistory') as IBittrexGetWithdrawalHistory
  const getdeposithistory = bxPrivV1Get('account/getdeposithistory') as IBittrexGetDepositHistory
  const getorderhistory = bxPrivV1Get('account/getorderhistory') as IBittrexGetOrderHistory
  const getorder = bxPrivV1Get('account/getorder') as IBittrexGetOrder
  const withdraw = bxPrivV1Get('account/withdraw') as IBittrexWithdraw

  return {
    buylimit,
    buymarket,
    selllimit,
    sellmarket,
    cancel,
    getopenorders,
    getbalances,
    getbalance,
    getwithdrawalhistory,
    getdepositaddress,
    getdeposithistory,
    getorderhistory,
    getorder,
    withdraw
  }
}
