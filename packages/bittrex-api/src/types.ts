import { Observable } from 'rxjs/Observable'
import { Timeframe } from '@doge/round-timeout'

export type JsonObject = {
  [key: string]: string | string[] | number | number[] | boolean | boolean[]
}

export interface IBittrexParams {
  [key: string]: string | undefined
}

export interface IBittrexResponse {
  success: boolean,
  message: string
}

/**
 * Public Api
 */

/**
 * GetMarkets
 * public/getmarkets
 */
export interface IBittrexMarketItem {
  'MarketCurrency': string,
  'BaseCurrency': string,
  'MarketCurrencyLong': string,
  'BaseCurrencyLong': string,
  'MinTradeSize': number,
  'MarketName': string,
  'IsActive': boolean,
  'Created': string
}

export interface IBittrexGetMarketsResponse extends IBittrexResponse {
  result: IBittrexMarketItem[]
}

export type BittrexGetMarketsPromise = () => Promise<IBittrexGetMarketsResponse>
export type BittrexGetMarketsObservable = (updateInterval?: Timeframe) => Observable<IBittrexGetMarketsResponse>

/**
 * GetCurrencies
 * public/getcurrencies
 */
export interface IBittrexCurrencyItem {
  'Currency': string,
  'CurrencyLong': string,
  'MinConfirmation': number,
  'TxFee': number,
  'IsActive': boolean,
  'CoinType': string,
  'BaseAddress': null
}

export interface IBittrexGetCurrenciesResponse extends IBittrexResponse {
  result: IBittrexCurrencyItem[]
}

export type BittrexGetCurrenciesPromise = () => Promise<IBittrexGetCurrenciesResponse>
export type BittrexGetCurrenciesObservable = () => Observable<IBittrexGetCurrenciesResponse>

/**
 * GetTicker
 * public/getticker
 */
export interface IBittrexTicker {
  'Bid': number,
  'Ask': number,
  'Last': number
}

export interface IBittrexGetTickerParams extends IBittrexParams {
  market: string
}

export interface IBittrexGetTickerResponse extends IBittrexResponse {
  result: IBittrexTicker
}

export type BittrexGetTickerPromise = (params: IBittrexGetTickerParams) => Promise<IBittrexGetTickerResponse>
export type BittrexGetTickerObservable = (params: IBittrexGetTickerParams) => Observable<IBittrexGetTickerResponse>

/**
 * GetTicks
 * pub/market/getticks
 */
export interface IBittrexTickItem {
  O: number,
  H: number,
  L: number,
  C: number,
  V: number,
  T: string,
  BV: number
}

export type IBittrexTickInterval = 'oneMin' | 'fiveMin' | 'thirtyMin' | 'hour' | 'day'

export interface IBittrexGetTicksParams extends IBittrexParams {
  marketname: string,
  tickinterval: IBittrexTickInterval
  _?: string
}

export interface IBittrexGetTicksResponse extends IBittrexResponse {
  result: IBittrexTickItem[]
}

export type BittrexGetTicksPromise = (params: IBittrexGetTicksParams) => Promise<IBittrexGetTicksResponse>
export type BittrexGetTicksObservable = (params: IBittrexGetTicksParams) => Observable<IBittrexGetTicksResponse>

/**
 * GetLatestTick
 */
export interface IBittrexGetLatestTickParams extends IBittrexParams {
  marketname: string,
  tickinterval: IBittrexTickInterval
  _?: string
}

export interface IBittrexGetLatestTickResponse extends IBittrexResponse {
  result: IBittrexTickItem
}

export type BittrexGetLatestTickPromise = (params: IBittrexGetLatestTickParams) => Promise<IBittrexGetLatestTickResponse>
export type BittrexGetLatestTickObservable = (params: IBittrexGetLatestTickParams) => Observable<IBittrexGetLatestTickResponse>

/**
 * GetMarketSummaries
 * public/getmarketsummaries
 */
export interface IBittrexMarketSummaryItem {
  'MarketName': string,
  'High': number,
  'Low': number,
  'Volume': number,
  'Last': number,
  'BaseVolume': number,
  'TimeStamp': string,
  'Bid': number,
  'Ask': number,
  'OpenBuyOrders': number,
  'OpenSellOrders': number,
  'PrevDay': number,
  'Created': string,
  'DisplayMarketName': null
}

export interface IBittrexGetMarketSummariesResponse extends IBittrexResponse {
  result: IBittrexMarketSummaryItem[]
}

export type BittrexGetMarketSummariesPromise = () => Promise<IBittrexGetMarketSummariesResponse>
export type BittrexGetMarketSummariesObservable = () => Observable<IBittrexGetMarketSummariesResponse>

/**
 * GetMarketSummary
 */
export interface IBittrexGetMarketSummaryParams extends IBittrexParams {
  market: string
}

export interface IBittrexGetMarketSummaryResponse extends IBittrexResponse {
  result: IBittrexMarketSummaryItem
}

export type BittrexGetMarketSummaryPromise = (params: IBittrexGetMarketSummaryParams) => Promise<IBittrexGetMarketSummaryResponse>
export type BittrexGetMarketSummaryObservable = (params: IBittrexGetMarketSummaryParams) => Observable<IBittrexGetMarketSummaryResponse>

/**
 * GetOrderBook
 */
export type BittrexOrderBookType = 'buy' | 'sell' | 'both'

export interface IBittrexOrderBookItem {
  'Quantity': number,
  'Rate': number
}

export interface IBittrexGetOrderBookParams extends IBittrexParams {
  market: string,
  type: string
}

export interface IBittrexGetOrderBookResponse extends IBittrexResponse {
  buy?: IBittrexOrderBookItem[]
  sell?: IBittrexOrderBookItem[]
}

export type BittrexGetOrderBookPromise = (params: IBittrexGetOrderBookParams) => Promise<IBittrexGetOrderBookResponse>
export type BittrexGetOrderBookObservable = (params: IBittrexGetOrderBookParams) => Observable<IBittrexGetOrderBookResponse>

/**
 * GetMarketHistory
 */
export interface IBittrexMarketHistoryItem {
  'Id': number,
  'TimeStamp': string,
  'Quantity': number,
  'Price': number,
  'Total': number,
  'FillType': string,
  'OrderType': string
}

export interface IBittrexGetMarketHistoryParams extends IBittrexParams {
  market: string
}

export interface IBittrexGetMarketHistoryResponse extends IBittrexResponse {
  result: IBittrexMarketHistoryItem[]
}

export type BittrexGetMarketHistoryPromise = (params: IBittrexGetMarketHistoryParams) => Promise<IBittrexGetMarketHistoryResponse>
export type BittrexGetMarketHistoryObservable = (params: IBittrexGetMarketHistoryParams) => Observable<IBittrexGetMarketHistoryResponse>

/**
 * Market Apis
 */

/**
 * BuySell
 */
export interface IBittrexBuySellParams extends IBittrexParams {
  market: string,
  quantity: string,
  rate: string
}

export interface IBittrexBuySellResponse extends IBittrexResponse {
  uuid: string
}

export type BittrexBuySellPromise = (params: IBittrexBuySellParams) => Promise<IBittrexBuySellResponse>
export type BittrexBuySellObservable = (params: IBittrexBuySellParams) => Observable<IBittrexBuySellResponse>

/**
 * Cancel
 */
export interface IBittrexCancelParams extends IBittrexParams {
  uuid: string
}

export interface IBittrexCancelResponse extends IBittrexResponse {
  uuid: null
}

export type BittrexCancelPromise = (params: IBittrexCancelParams) => Promise<IBittrexCancelResponse>
export type BittrexCancelObservable = (params: IBittrexCancelParams) => Observable<IBittrexCancelResponse>

/**
 * GetOpenOrders
 */
export type BittrexOrderType = 'limit_buy' | 'limit_sell'

export interface IBittrexOpenOrderItem {
  'Uuid': null,
  'OrderUuid': string,
  'Exchange': string,
  'OrderType': string,
  'Quantity': number,
  'QuantityRemaining': number,
  'Limit': number,
  'CommissionPaid': number,
  'Price': number,
  'PricePerUnit': null,
  'Opened': string,
  'Closed': null,
  'CancelInitiated': boolean,
  'ImmediateOrCancel': boolean,
  'IsConditional': boolean,
  'Condition': null,
  'ConditionTarget': null
}

export interface IBittrexGetOpenOrdersParams extends IBittrexParams {
  market?: string
}

export interface IBittrexGetOpenOrdersResponse extends IBittrexResponse {
  result: IBittrexOpenOrderItem[]
}

export type BittrexGetOpenOrdersPromise = (params: IBittrexGetOpenOrdersParams) => Promise<IBittrexGetOpenOrdersResponse>
export type BittrexGetOpenOrdersObservable = (params: IBittrexGetOpenOrdersParams) => Observable<IBittrexGetOpenOrdersResponse>

/**
 * Account Api
 */

/**
 * GetBalances
 */
export interface IBittrexBalanceItem {
  'Currency': string,
  'Balance': number,
  'Available': number,
  'Pending': number,
  'CryptoAddress': string,
  'Requested': boolean,
  'Uuid': null
}

export interface IBittrexGetBalancesResponse extends IBittrexResponse {
  result: IBittrexBalanceItem[]
}

export type BittrexGetBalancesPromise = () => Promise<IBittrexGetBalancesResponse>

export interface IBittrexGetBalanseParams extends IBittrexParams {
  currency: string
}

export interface IBittrexGetBalanceResponse extends IBittrexResponse {
  result: IBittrexBalanceItem
}

export type BittrexGetBalancePromise = (params: IBittrexGetBalanseParams) => Promise<IBittrexGetBalanceResponse>
export type BittrexGetBalanceObservable = (params: IBittrexGetBalanseParams) => Observable<IBittrexGetBalanceResponse>

/**
 * GetDepositAddress
 */
export interface IBittrexGetDepositAddressParams extends IBittrexParams {
  currency: string
}

export interface IBittrexGetDepositAddressResponse extends IBittrexResponse {
  result: {
    'Currency': string,
    'Address': string
  }
}

export type BittrexGetDepositAddressPromise = (params: IBittrexGetDepositAddressParams) => Promise<IBittrexGetDepositAddressResponse>
export type BittrexGetDepositAddressObservable = (params: IBittrexGetDepositAddressParams) => Observable<IBittrexGetDepositAddressResponse>

/**
 * Withdraw
 */
export interface IBittrexWithdrawParams extends IBittrexParams {
  currency: string,
  quantity: string,
  address: string
}

export interface IBittrexWithdrawResponse extends IBittrexResponse {
  result: {
    uuid: string
  }
}

export type BittrexWithdrawPromise = (params: IBittrexWithdrawParams) => Promise<IBittrexWithdrawResponse>
export type BittrexWithdrawObservable = (params: IBittrexWithdrawParams) => Observable<IBittrexWithdrawResponse>

/**
 * GetOrder
 */
export interface IBittrexOrderItem {
  'AccountId': null,
  'OrderUuid': string,
  'Exchange': string,
  'Type': string,
  'Quantity': number,
  'QuantityRemaining': number,
  'Limit': number,
  'Reserved': number,
  'ReserveRemaining': number,
  'CommissionReserved': number,
  'CommissionReserveRemaining': number,
  'CommissionPaid': number,
  'Price': number,
  'PricePerUnit': null,
  'Opened': string,
  'Closed': null,
  'IsOpen': boolean,
  'Sentinel': string,
  'CancelInitiated': boolean,
  'ImmediateOrCancel': boolean,
  'IsConditional': boolean,
  'Condition': string,
  'ConditionTarget': null
}

export interface IBittrexGetOrderParams extends IBittrexParams {
  uuid: string
}

export interface IBittrexGetOrderResponse extends IBittrexResponse {
  result: IBittrexOrderItem
}

export type BittrexGetOrderPromise = (params: IBittrexGetOrderParams) => Promise<IBittrexGetOrderResponse>
export type BittrexGetOrderObservable = (params: IBittrexGetOrderParams) => Observable<IBittrexGetOrderResponse>

/**
 * GetOrderHistory
 * account/getorderhistory
 */
export interface IBittrexOrderHistoryItem {
  'OrderUuid': string,
  'Exchange': string,
  'TimeStamp': string,
  'OrderType': string,
  'Limit': number,
  'Quantity': number,
  'QuantityRemaining': number,
  'Commission': number,
  'Price': number,
  'PricePerUnit': null,
  'IsConditional': boolean,
  'Condition': null,
  'ConditionTarget': null,
  'ImmediateOrCancel': boolean
}

export interface IBittrexGetOrderHistoryParams extends IBittrexParams {
  market?: string
}

export interface IBittrexGetOrderHistoryResponse extends IBittrexResponse {
  result: IBittrexOrderHistoryItem[]
}

export type BittrexGetOrderHistoryPromise = (params: IBittrexGetOrderHistoryParams) => Promise<IBittrexGetOrderHistoryResponse>
export type BittrexGetOrderHistoryObservable = (params: IBittrexGetOrderHistoryParams) => Observable<IBittrexGetOrderHistoryResponse>

/**
 * GetWithdrawalHistory
 * account/getwithdrawalhistory
 */
export interface IBittrexWithdrawalHistoryItem {
  'PaymentUuid': string,
  'Currency': string,
  'Amount': number,
  'Address': string,
  'Opened': string,
  'Authorized': boolean,
  'PendingPayment': boolean,
  'TxCost': number,
  'TxId': null,
  'Canceled': boolean,
  'InvalidAddress': boolean
}

export interface IBittrexGetWithdrawalHistoryParams extends IBittrexParams {
  currency?: string
}

export interface IBittrexGetWithdrawalHistoryResponse extends IBittrexResponse {
  result: IBittrexWithdrawalHistoryItem[]
}

export type BittrexGetWithdrawalHistoryPromise = (params: IBittrexGetWithdrawalHistoryParams) => Promise<IBittrexGetWithdrawalHistoryResponse>
export type BittrexGetWithdrawalHistoryObservable = (params: IBittrexGetWithdrawalHistoryParams) => Observable<IBittrexGetWithdrawalHistoryResponse>

/**
 * GetDepositHistory
 * account/getdeposithistory
 */
export interface IBittrexDepositHistoryItem {
  'PaymentUuid': string,
  'Currency': string,
  'Amount': number,
  'Address': string,
  'Opened': string,
  'Authorized': boolean,
  'PendingPayment': boolean,
  'TxCost': number,
  'TxId': string,
  'Canceled': boolean,
  'InvalidAddress': boolean
}

export interface IBittrexGetDepositHistoryParams extends IBittrexParams {
  currency?: string
}

export interface IBittrexGetDepositHistoryResponse extends IBittrexResponse {
  result: IBittrexDepositHistoryItem[]
}

export type BittrexGetDepositHistoryPromise = (params: IBittrexGetDepositHistoryParams) => Promise<IBittrexGetDepositHistoryResponse>
export type BittrexGetDepositHistoryObservable = (params: IBittrexGetDepositHistoryParams) => Observable<IBittrexGetDepositHistoryResponse>

export interface IPublicApiRaw {
  getmarkets: BittrexGetMarketsPromise,
  getcurrencies: BittrexGetCurrenciesPromise,
  getticker: BittrexGetTickerPromise,
  getticks: BittrexGetTicksPromise,
  getlatesttick: BittrexGetLatestTickPromise,
  getmarketsummaries: BittrexGetMarketSummariesPromise,
  getmarketsummary: BittrexGetMarketSummaryPromise,
  getorderbook: BittrexGetOrderBookPromise,
  getmarkethistory: BittrexGetMarketHistoryPromise
}

export interface ICredentialsApiRaw {
  buylimit: BittrexBuySellPromise,
  buymarket: BittrexBuySellPromise,
  selllimit: BittrexBuySellPromise,
  sellmarket: BittrexBuySellPromise,
  cancel: BittrexCancelPromise,
  getopenorders: BittrexGetOpenOrdersPromise,
  getbalances: BittrexGetBalancesPromise,
  getbalance: BittrexGetBalancePromise,
  getwithdrawalhistory: BittrexGetWithdrawalHistoryPromise,
  getdepositaddress: BittrexGetDepositAddressPromise,
  getdeposithistory: BittrexGetDepositHistoryPromise,
  getorderhistory: BittrexGetOrderHistoryPromise,
  getorder: BittrexGetOrderPromise,
  withdraw: BittrexWithdrawPromise
}

export interface IPublicApi {

}

export interface ICredentialApiInit {
  apikey: string,
  apisecret: string
}
