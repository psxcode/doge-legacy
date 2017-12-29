import {
  BittrexBuySellPromise,
  BittrexCancelPromise,
  BittrexGetBalancePromise,
  BittrexGetBalancesPromise,
  BittrexGetCurrenciesPromise,
  BittrexGetDepositAddressPromise,
  BittrexGetDepositHistoryPromise,
  BittrexGetLatestTickPromise,
  BittrexGetMarketHistoryPromise,
  BittrexGetMarketsPromise,
  BittrexGetMarketSummariesPromise,
  BittrexGetMarketSummaryPromise,
  BittrexGetOpenOrdersPromise,
  BittrexGetOrderPromise,
  BittrexGetOrderBookPromise,
  BittrexGetOrderHistoryPromise,
  BittrexGetTickerPromise,
  BittrexGetTicksPromise,
  BittrexGetWithdrawalHistoryPromise,
  IBittrexParams,
  IBittrexResponse,
  BittrexWithdrawPromise,
  ICredentialsApi,
  IPublicApi
} from './types'
import { API_V1, API_V2, BASE_URL } from './config'
import { Response } from 'node-fetch'
import { FetchFn } from '@doge/fetch'
import { URL, URLSearchParams } from 'url'

const BASE_URL_API_V1 = `${BASE_URL}/${API_V1}/`
const BASE_URL_API_V2 = `${BASE_URL}/${API_V2}/`

export type BittrexRequestFn = (params?: IBittrexParams) => Promise<IBittrexResponse>
const apiRequest = (request: FetchFn) => (baseUrl: string) => (path: string): BittrexRequestFn => {
  const url = new URL(path, baseUrl)
  return (params?: IBittrexParams): Promise<IBittrexResponse> => {
    url.search = params ? `${new URLSearchParams(params)}` : ''
    return request(`${url}`).then((resp: Response) => resp.json())
  }
}

export function getPublicApi (request: FetchFn): IPublicApi {
  const v1 = apiRequest(request)(BASE_URL_API_V1)
  const v2 = apiRequest(request)(BASE_URL_API_V2)

  const getmarkets = v1('public/getmarkets') as BittrexGetMarketsPromise
  const getcurrencies = v1('public/getcurrencies') as BittrexGetCurrenciesPromise
  const getticker = v1('public/getticker') as BittrexGetTickerPromise
  const getticks = v2('pub/market/getticks') as BittrexGetTicksPromise
  const getlatesttick = v2('pub/market/getlatesttick') as BittrexGetLatestTickPromise
  const getmarketsummaries = v1('public/getmarketsummaries') as BittrexGetMarketSummariesPromise
  const getmarketsummary = v1('public/getmarketsummary') as BittrexGetMarketSummaryPromise
  const getorderbook = v1('public/getorderbook') as BittrexGetOrderBookPromise
  const getmarkethistory = v1('public/getmarkethistory') as BittrexGetMarketHistoryPromise

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

export function getCredentialsApi (request: FetchFn): ICredentialsApi {
  const v1 = apiRequest(request)(BASE_URL_API_V1)

  const buylimit = v1('market/buylimit') as BittrexBuySellPromise
  const buymarket = v1('market/buymarket') as BittrexBuySellPromise
  const selllimit = v1('market/selllimit') as BittrexBuySellPromise
  const sellmarket = v1('market/sellmarket') as BittrexBuySellPromise
  const cancel = v1('market/cancel') as BittrexCancelPromise
  const getopenorders = v1('market/getopenorders') as BittrexGetOpenOrdersPromise
  const getbalances = v1('market/getbalances') as BittrexGetBalancesPromise
  const getbalance = v1('market/getbalance') as BittrexGetBalancePromise
  const getdepositaddress = v1('account/getdepositaddress') as BittrexGetDepositAddressPromise
  const getwithdrawalhistory = v1('account/getwithdrawalhistory') as BittrexGetWithdrawalHistoryPromise
  const getdeposithistory = v1('account/getdeposithistory') as BittrexGetDepositHistoryPromise
  const getorderhistory = v1('account/getorderhistory') as BittrexGetOrderHistoryPromise
  const getorder = v1('account/getorder') as BittrexGetOrderPromise
  const withdraw = v1('account/withdraw') as BittrexWithdrawPromise

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
