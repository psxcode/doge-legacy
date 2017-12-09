import { getCredentialsApi, getPublicApi } from './index'
import { API_V1, API_V2, BASE_URL } from './config'
import { Response, Headers } from 'node-fetch'
import { setUriParams } from '@doge/uri-params'
import { SinonSpy, mock, assert } from 'sinon'
import { expect } from 'chai'
import { IBittrexParams } from './types'

const hash = (secret: string) => (str: string) => `${secret}${str}`
const headers = () => new Headers()
const nonce = () => 42
const apikey = 'key'
const apisecret = 'secret'
const hashUri = hash(apisecret)
const fetchSpy = () => mock().returns(Promise.resolve(new Response('{}', { status: 200 })))
const expectCalledOnce = (spy: SinonSpy) => assert.calledOnce(spy)
const expectUrl = (spy: SinonSpy, expectedUrl: string) => assert.calledWith(spy, expectedUrl)
const expectApisign = (spy: SinonSpy, apisign: string) => {
  const opts = spy.getCall(0).args[1]
  const hdrs = opts.headers
  expect(hdrs.get('apisign')).eq(apisign)
}

describe('[ raw-api ]', function () {

  let api
  let spy

  beforeEach(() => {
    spy = fetchSpy()
    api = getPublicApi({ request: spy, headers })
  })

  describe('[ raw-api / getmarkets ]', function () {

    it('should call endpoint with proper params', async function () {
      const expectedUrl = `${BASE_URL}/${API_V1}/public/getmarkets`

      await api.getmarkets()

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getcurrencies ]', function () {

    it('should call endpoint with proper params', async function () {
      const expectedUrl = `${BASE_URL}/${API_V1}/public/getcurrencies`

      await api.getcurrencies()

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getticker ]', function () {

    it('should call endpoint with proper params', async function () {
      const expectedUrl = `${BASE_URL}/${API_V1}/public/getticker?market=BTC-DOGE`

      await api.getticker({
        market: 'BTC-DOGE'
      })

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getmarketsummaries ]', function () {

    it('should call endpoint with proper params', async function () {
      const expectedUrl = `${BASE_URL}/${API_V1}/public/getmarketsummaries`

      await api.getmarketsummaries()

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getmarketsummary ]', function () {

    it('should call endpoint with proper params', async function () {
      const expectedUrl = `${BASE_URL}/${API_V1}/public/getmarketsummary?market=BTC-LTC`

      await api.getmarketsummary({
        market: 'BTC-LTC'
      })

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getorderbook ]', function () {

    it('should call endpoint with proper params', async function () {
      const expectedUrl = `${BASE_URL}/${API_V1}/public/getorderbook?market=BTC-LTC&type=both`

      await api.getorderbook({
        market: 'BTC-LTC',
        type: 'both'
      })

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getmarkethistory ]', function () {

    it('should call endpoint with proper params', async function () {
      const expectedUrl = `${BASE_URL}/${API_V1}/public/getmarkethistory?market=BTC-DOGE`

      await api.getmarkethistory({
        market: 'BTC-DOGE'
      })

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getticks ]', function () {

    it('should call endpoint with proper params', async function () {
      const expectedUrl = `${BASE_URL}/${API_V2}/pub/market/getticks?marketname=BTC-DOGE&tickinterval=oneMin`

      await api.getticks({
        marketname: 'BTC-DOGE',
        tickinterval: 'oneMin'
      })

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getlatesttick ]', function () {

    it('should call endpoint with proper params', async function () {
      const expectedUrl = `${BASE_URL}/${API_V2}/pub/market/getlatesttick?marketname=BTC-DOGE&tickinterval=oneMin`

      await api.getlatesttick({
        marketname: 'BTC-DOGE',
        tickinterval: 'oneMin'
      })

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })
})

describe('[ credentials-api ]', function () {

  let spy
  let api
  const credParams = (params: IBittrexParams = {}) => ({ ...params, ...{ apikey, nonce: nonce() } })

  beforeEach(() => {
    spy = fetchSpy()
    api = getCredentialsApi({ apikey, apisecret, request: spy, headers, nonce, hash })
  })

  describe('[ raw-api / buylimit ]', function () {

    const url = `${BASE_URL}/${API_V1}/market/buylimit`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        market: 'BTC-DOGE',
        quantity: 1.2,
        rate: 1.3
      }
      const expectedUrl = setUriParams(credParams(uriParams), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.buylimit(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

  describe('[ raw-api / buymarket ]', function () {

    const url = `${BASE_URL}/${API_V1}/market/buymarket`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        market: 'BTC-DOGE',
        quantity: '1.2',
        rate: '1.3'
      }
      const expectedUrl = setUriParams(credParams(uriParams), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.buymarket(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

  describe('[ raw-api / selllimit ]', function () {

    const url = `${BASE_URL}/${API_V1}/market/selllimit`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        market: 'BTC-DOGE',
        quantity: '1.2',
        rate: '1.3'
      }
      const expectedUrl = setUriParams(credParams(uriParams), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.selllimit(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

  describe('[ raw-api / sellmarket ]', function () {

    const url = `${BASE_URL}/${API_V1}/market/sellmarket`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        market: 'BTC-DOGE',
        quantity: '1.2',
        rate: '1.3'
      }
      const expectedUrl = setUriParams(credParams(uriParams), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.sellmarket(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

  describe('[ raw-api / tradebuy ]', function () {

    const url = `${BASE_URL}/${API_V1}/key/market/tradebuy`

    it('should call endpoint with proper params', async function () {
      const expectedUrl = setUriParams(credParams(), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.tradebuy()

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

  describe('[ raw-api / tradesell ]', function () {

    const url = `${BASE_URL}/${API_V1}/key/market/tradesell`

    it('should call endpoint with proper params', async function () {
      const expectedUrl = setUriParams(credParams(), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.tradesell()

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

  describe('[ raw-api / cancel ]', function () {

    const url = `${BASE_URL}/${API_V1}/market/cancel`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        uuid: 'UUID'
      }
      const expectedUrl = setUriParams(credParams(uriParams), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.cancel(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

  describe('[ raw-api / getopenorders ]', function () {

    const url = `${BASE_URL}/${API_V1}/market/getopenorders`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        market: 'BTC-DOGE'
      }
      const expectedUrl = setUriParams(credParams(uriParams), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.getopenorders(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

  describe('[ raw-api / getbalances ]', function () {

    const url = `${BASE_URL}/${API_V1}/market/getbalances`

    it('should call endpoint with proper params', async function () {
      const expectedUrl = setUriParams(credParams(), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.getbalances()

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

  describe('[ raw-api / getbalance ]', function () {

    const url = `${BASE_URL}/${API_V1}/market/getbalance`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        currency: 'DOGE'
      }
      const expectedUrl = setUriParams(credParams(uriParams), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.getbalance(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

  describe('[ raw-api / getwithdrawalhistory ]', function () {

    const url = `${BASE_URL}/${API_V1}/account/getwithdrawalhistory`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        currency: 'DOGE'
      }
      const expectedUrl = setUriParams(credParams(uriParams), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.getwithdrawalhistory(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

  describe('[ raw-api / getdepositaddress ]', function () {

    const url = `${BASE_URL}/${API_V1}/account/getdepositaddress`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        currency: 'DOGE'
      }
      const expectedUrl = setUriParams(credParams(uriParams), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.getdepositaddress(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

  describe('[ raw-api / getdeposithistory ]', function () {

    const url = `${BASE_URL}/${API_V1}/account/getdeposithistory`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        currency: 'DOGE'
      }
      const expectedUrl = setUriParams(credParams(uriParams), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.getdeposithistory(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

  describe('[ raw-api / getorderhistory ]', function () {

    const url = `${BASE_URL}/${API_V1}/account/getorderhistory`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        market: 'BTC-DOGE'
      }
      const expectedUrl = setUriParams(credParams(uriParams), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.getorderhistory(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

  describe('[ raw-api / getorder ]', function () {

    const url = `${BASE_URL}/${API_V1}/account/getorder`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        uuid: 'UUID'
      }
      const expectedUrl = setUriParams(credParams(uriParams), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.getorder(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

  describe('[ raw-api / withdraw ]', function () {

    const url = `${BASE_URL}/${API_V1}/account/withdraw`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        currency: 'DOGE',
        quantity: '42.0',
        address: 'address',
        paymentId: 'ID'
      }
      const expectedUrl = setUriParams(credParams(uriParams), url)
      const expectedApisign = hashUri(expectedUrl)

      await api.withdraw(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
      expectApisign(spy, expectedApisign)
    })
  })

})
