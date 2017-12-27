import { getCredentialsApi, getPublicApi } from './api'
import { API_V1, API_V2, BASE_URL } from './config'
import { Response, Headers } from 'node-fetch'
import { SinonSpy, mock, assert } from 'sinon'
import { IBittrexParams, ICredentialsApi, IPublicApi } from './types'
import { URL, URLSearchParams } from 'url'
import { entries } from '@doge/helpers'

const fetchSpy = () => mock().returns(Promise.resolve(new Response('{}', { status: 200 })))
const expectCalledOnce = (spy: SinonSpy) => assert.calledOnce(spy)
const expectUrl = (spy: SinonSpy, expectedUrl: string) => assert.calledWith(spy, expectedUrl)
const setUriParams = (params: IBittrexParams, baseUrl: string) => {
  const url = new URL(baseUrl)
  const search = new URLSearchParams(entries(params))
  url.search = `${search}`
  return `${url}`
}

describe('[ raw-api ]', function () {

  let api: IPublicApi
  let spy: any

  beforeEach(() => {
    spy = fetchSpy()
    api = getPublicApi({ request: spy })
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

  let spy: any
  let api: ICredentialsApi

  beforeEach(() => {
    spy = fetchSpy()
    api = getCredentialsApi({ request: spy })
  })

  describe('[ raw-api / buylimit ]', function () {

    const url = `${BASE_URL}/${API_V1}/market/buylimit`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        market: 'BTC-DOGE',
        quantity: '1.2',
        rate: '1.3'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.buylimit(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
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
      const expectedUrl = setUriParams(uriParams, url)

      await api.buymarket(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
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
      const expectedUrl = setUriParams(uriParams, url)

      await api.selllimit(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
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
      const expectedUrl = setUriParams(uriParams, url)

      await api.sellmarket(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / cancel ]', function () {

    const url = `${BASE_URL}/${API_V1}/market/cancel`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        uuid: 'UUID'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.cancel(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getopenorders ]', function () {

    const url = `${BASE_URL}/${API_V1}/market/getopenorders`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        market: 'BTC-DOGE'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.getopenorders(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getbalances ]', function () {

    const url = `${BASE_URL}/${API_V1}/market/getbalances`

    it('should call endpoint with proper params', async function () {
      const expectedUrl = setUriParams({}, url)

      await api.getbalances()

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getbalance ]', function () {

    const url = `${BASE_URL}/${API_V1}/market/getbalance`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        currency: 'DOGE'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.getbalance(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getwithdrawalhistory ]', function () {

    const url = `${BASE_URL}/${API_V1}/account/getwithdrawalhistory`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        currency: 'DOGE'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.getwithdrawalhistory(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getdepositaddress ]', function () {

    const url = `${BASE_URL}/${API_V1}/account/getdepositaddress`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        currency: 'DOGE'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.getdepositaddress(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getdeposithistory ]', function () {

    const url = `${BASE_URL}/${API_V1}/account/getdeposithistory`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        currency: 'DOGE'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.getdeposithistory(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getorderhistory ]', function () {

    const url = `${BASE_URL}/${API_V1}/account/getorderhistory`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        market: 'BTC-DOGE'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.getorderhistory(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getorder ]', function () {

    const url = `${BASE_URL}/${API_V1}/account/getorder`

    it('should call endpoint with proper params', async function () {
      const uriParams = {
        uuid: 'UUID'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.getorder(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
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
      const expectedUrl = setUriParams(uriParams, url)

      await api.withdraw(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

})
