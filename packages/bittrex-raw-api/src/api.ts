import {
  IApiOptions, IBittrexBuySell, IBittrexCancel, IBittrexGetBalance, IBittrexGetBalances, IBittrexGetCurrencies,
  IBittrexGetDepositAddress, IBittrexGetDepositHistory, IBittrexGetLatestTick, IBittrexGetMarketHistory,
  IBittrexGetMarkets, IBittrexGetMarketSummaries, IBittrexGetMarketSummary, IBittrexGetOpenOrders, IBittrexGetOrder,
  IBittrexGetOrderBook, IBittrexGetOrderHistory, IBittrexGetTicker, IBittrexGetTicks, IBittrexGetWithdrawalHistory,
  IBittrexParams, IBittrexResponse,
  IBittrexWithdraw, ICredentialsApi, IPublicApi
} from './types'
import { API_V1, API_V2, BASE_URL } from './config'
import { default as fetch, Response } from 'node-fetch'
import { URL, URLSearchParams } from 'url'
import { entries } from '@doge/helpers'

const BASE_URL_API_V1 = `${BASE_URL}/${API_V1}/`
const BASE_URL_API_V2 = `${BASE_URL}/${API_V2}/`

const apiRequest = (request: typeof fetch) =>
  (baseUrl: string) => (path: string) => {
    const url = new URL(path, baseUrl)
    return (params: IBittrexParams): Promise<IBittrexResponse> => {
      url.search = `${new URLSearchParams(entries(params))}`
      return request(`${url}`).then((resp: Response) => resp.json())
    }
  }

export function getPublicApi ({ request }: IApiOptions): IPublicApi {
  const bxPubV1Get = apiRequest(request)(BASE_URL_API_V1)
  const bxPubV2Get = apiRequest(request)(BASE_URL_API_V2)

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

export function getCredentialsApi ({ request }: IApiOptions): ICredentialsApi {
  const bxPrivV1Get = apiRequest(request)(BASE_URL_API_V1)

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
