import fetch, { Headers } from 'node-fetch'

export interface IPublicApiOptions {
  request: typeof fetch
  headers: () => Headers
}

export interface IApiOptions {
  apikey?: string
  apisecret?: string
  request: typeof fetch
  nonce: () => number
  hash: (secret: string) => (str: string) => string
  headers: () => Headers
}

export type Timeframe =
  '1s'
  | '5s'
  | '10s'
  | '15s'
  | '30s'
  | '1m'
  | '5m'
  | '10m'
  | '15m'
  | '30m'
  | '1h'
  | '3h'
  | '6h'
  | '12h'
  | '1d'

export interface IBittrexParams {
  [key: string]: string | number | undefined
}

export interface IBittrexResponse {
  success: boolean,
  message: string
}

/**
 * Public Api
 */

/* public/getmarkets */
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

export type IBittrexGetMarkets = () => Promise<IBittrexGetMarketsResponse>

/* public/getcurrencies */
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

export type IBittrexGetCurrencies = () => Promise<IBittrexGetCurrenciesResponse>

/* public/getticker */
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

export type IBittrexGetTicker = (params: IBittrexGetTickerParams) => Promise<IBittrexGetTickerResponse>

/* pub/market/getticks */
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

export type IBittrexGetTicks = (params: IBittrexGetTicksParams) => Promise<IBittrexGetTicksResponse>

/*  */
export interface IBittrexGetLatestTickParams extends IBittrexParams {
  marketname: string,
  tickinterval: IBittrexTickInterval
  _?: string
}

export interface IBittrexGetLatestTickResponse extends IBittrexResponse {
  result: IBittrexTickItem
}

export type IBittrexGetLatestTick = (params: IBittrexGetLatestTickParams) => Promise<IBittrexGetLatestTickResponse>

/* public/getmarketsummaries */
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

export type IBittrexGetMarketSummaries = () => Promise<IBittrexGetMarketSummariesResponse>

/*  */
export interface IBittrexGetMarketSummaryParams extends IBittrexParams {
  market: string
}

export interface IBittrexGetMarketSummaryResponse extends IBittrexResponse {
  result: IBittrexMarketSummaryItem
}

export type IBittrexGetMarketSummary = (params: IBittrexGetMarketSummaryParams) => Promise<IBittrexGetMarketSummaryResponse>

/*  */
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

export type IBittrexGetOrderBook = (params: IBittrexGetOrderBookParams) => Promise<IBittrexGetOrderBookResponse>

/*  */
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

export type IBittrexGetMarketHistory = (params: IBittrexGetMarketHistoryParams) => Promise<IBittrexGetMarketHistoryResponse>

/**
 * Market Apis
 */

/*  */
export interface IBittrexBuySellParams extends IBittrexParams {
  market: string,
  quantity: string,
  rate: string
}

export interface IBittrexBuySellResponse extends IBittrexResponse {
  uuid: string
}

export type IBittrexBuySell = (params: IBittrexBuySellParams) => Promise<IBittrexBuySellResponse>

/*  */
export interface IBittrexCancelParams extends IBittrexParams {
  uuid: string
}

export interface IBittrexCancelResponse extends IBittrexResponse {
  uuid: null
}

export type IBittrexCancel = (params: IBittrexCancelParams) => Promise<IBittrexCancelResponse>

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

export type IBittrexGetOpenOrders = (params: IBittrexGetOpenOrdersParams) => Promise<IBittrexGetOpenOrdersResponse>

/**
 * Account Api
 */

/*  */
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

export type IBittrexGetBalances = () => Promise<IBittrexGetBalancesResponse>

export interface IBittrexGetBalanseParams extends IBittrexParams {
  currency: string
}

export interface IBittrexGetBalanceResponse extends IBittrexResponse {
  result: IBittrexBalanceItem
}

export type IBittrexGetBalance = (params: IBittrexGetBalanseParams) => Promise<IBittrexGetBalanceResponse>

/*  */
export interface IBittrexGetDepositAddressParams extends IBittrexParams {
  currency: string
}

export interface IBittrexGetDepositAddressResponse extends IBittrexResponse {
  result: {
    'Currency': string,
    'Address': string
  }
}

export type IBittrexGetDepositAddress = (params: IBittrexGetDepositAddressParams) => Promise<IBittrexGetDepositAddressResponse>

/*  */
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

export type IBittrexWithdraw = (params: IBittrexWithdrawParams) => Promise<IBittrexWithdrawResponse>

/*  */
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

export type IBittrexGetOrder = (params: IBittrexGetOrderParams) => Promise<IBittrexGetOrderResponse>

/* account/getorderhistory */
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

export type IBittrexGetOrderHistory = (params: IBittrexGetOrderHistoryParams) => Promise<IBittrexGetOrderHistoryResponse>

/* account/getwithdrawalhistory */
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

export type IBittrexGetWithdrawalHistory = (params: IBittrexGetWithdrawalHistoryParams) => Promise<IBittrexGetWithdrawalHistoryResponse>

/* account/getdeposithistory */
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

export type IBittrexGetDepositHistory = (params: IBittrexGetDepositHistoryParams) => Promise<IBittrexGetDepositHistoryResponse>
