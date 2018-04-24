import { getCredentialsApi, getPublicApi } from './api-raw'
import { API_V1, API_V2, BASE_URL } from './config'
import { Response } from 'node-fetch'
import { SinonSpy, mock, assert } from 'sinon'
import { IBittrexParams, ICredentialsApiRaw, IPublicApiRaw } from './types'
import { URL, URLSearchParams } from 'url'

const makeRequestSpy = () => mock().returns(Promise.resolve(new Response('{}', { status: 200 })))
const expectCalledOnce = (spy: SinonSpy) => assert.calledOnce(spy)
const expectUrl = (spy: SinonSpy, expectedUrl: string) => assert.calledWith(spy, expectedUrl)
const setUriParams = (params: IBittrexParams, baseUrl: string) => {
  const url = new URL(baseUrl)
  const search = new URLSearchParams(params)
  url.search = `${search}`
  return `${url}`
}

describe('[ raw-api ]', () => {

  let api: IPublicApiRaw
  let spy: SinonSpy

  beforeEach(() => {
    spy = makeRequestSpy()
    api = getPublicApi(spy)
  })

  describe('[ raw-api / getmarkets ]', () => {

    it('should call endpoint with proper params', async () => {
      const expectedUrl = `${BASE_URL}/${API_V1}/public/getmarkets`

      await api.getmarkets()

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getcurrencies ]', () => {

    it('should call endpoint with proper params', async () => {
      const expectedUrl = `${BASE_URL}/${API_V1}/public/getcurrencies`

      await api.getcurrencies()

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getticker ]', () => {

    it('should call endpoint with proper params', async () => {
      const expectedUrl = `${BASE_URL}/${API_V1}/public/getticker?market=BTC-DOGE`

      await api.getticker({
        market: 'BTC-DOGE'
      })

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getmarketsummaries ]', () => {

    it('should call endpoint with proper params', async () => {
      const expectedUrl = `${BASE_URL}/${API_V1}/public/getmarketsummaries`

      await api.getmarketsummaries()

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getmarketsummary ]', () => {

    it('should call endpoint with proper params', async () => {
      const expectedUrl = `${BASE_URL}/${API_V1}/public/getmarketsummary?market=BTC-LTC`

      await api.getmarketsummary({
        market: 'BTC-LTC'
      })

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getorderbook ]', () => {

    it('should call endpoint with proper params', async () => {
      const expectedUrl = `${BASE_URL}/${API_V1}/public/getorderbook?market=BTC-LTC&type=both`

      await api.getorderbook({
        market: 'BTC-LTC',
        type: 'both'
      })

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getmarkethistory ]', () => {

    it('should call endpoint with proper params', async () => {
      const expectedUrl = `${BASE_URL}/${API_V1}/public/getmarkethistory?market=BTC-DOGE`

      await api.getmarkethistory({
        market: 'BTC-DOGE'
      })

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getticks ]', () => {

    it('should call endpoint with proper params', async () => {
      const expectedUrl = `${BASE_URL}/${API_V2}/pub/market/getticks?marketname=BTC-DOGE&tickinterval=oneMin`

      await api.getticks({
        marketname: 'BTC-DOGE',
        tickinterval: 'oneMin'
      })

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getlatesttick ]', () => {

    it('should call endpoint with proper params', async () => {
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

describe('[ credentials-api ]', () => {

  let spy: SinonSpy
  let api: ICredentialsApiRaw

  beforeEach(() => {
    spy = makeRequestSpy()
    api = getCredentialsApi(spy)
  })

  describe('[ raw-api / buylimit ]', () => {

    const url = `${BASE_URL}/${API_V1}/market/buylimit`

    it('should call endpoint with proper params', async () => {
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

  describe('[ raw-api / buymarket ]', () => {

    const url = `${BASE_URL}/${API_V1}/market/buymarket`

    it('should call endpoint with proper params', async () => {
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

  describe('[ raw-api / selllimit ]', () => {

    const url = `${BASE_URL}/${API_V1}/market/selllimit`

    it('should call endpoint with proper params', async () => {
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

  describe('[ raw-api / sellmarket ]', () => {

    const url = `${BASE_URL}/${API_V1}/market/sellmarket`

    it('should call endpoint with proper params', async () => {
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

  describe('[ raw-api / cancel ]', () => {

    const url = `${BASE_URL}/${API_V1}/market/cancel`

    it('should call endpoint with proper params', async () => {
      const uriParams = {
        uuid: 'UUID'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.cancel(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getopenorders ]', () => {

    const url = `${BASE_URL}/${API_V1}/market/getopenorders`

    it('should call endpoint with proper params', async () => {
      const uriParams = {
        market: 'BTC-DOGE'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.getopenorders(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getbalances ]', () => {

    const url = `${BASE_URL}/${API_V1}/market/getbalances`

    it('should call endpoint with proper params', async () => {
      const expectedUrl = setUriParams({}, url)

      await api.getbalances()

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getbalance ]', () => {

    const url = `${BASE_URL}/${API_V1}/market/getbalance`

    it('should call endpoint with proper params', async () => {
      const uriParams = {
        currency: 'DOGE'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.getbalance(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getwithdrawalhistory ]', () => {

    const url = `${BASE_URL}/${API_V1}/account/getwithdrawalhistory`

    it('should call endpoint with proper params', async () => {
      const uriParams = {
        currency: 'DOGE'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.getwithdrawalhistory(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getdepositaddress ]', () => {

    const url = `${BASE_URL}/${API_V1}/account/getdepositaddress`

    it('should call endpoint with proper params', async () => {
      const uriParams = {
        currency: 'DOGE'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.getdepositaddress(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getdeposithistory ]', () => {

    const url = `${BASE_URL}/${API_V1}/account/getdeposithistory`

    it('should call endpoint with proper params', async () => {
      const uriParams = {
        currency: 'DOGE'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.getdeposithistory(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getorderhistory ]', () => {

    const url = `${BASE_URL}/${API_V1}/account/getorderhistory`

    it('should call endpoint with proper params', async () => {
      const uriParams = {
        market: 'BTC-DOGE'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.getorderhistory(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / getorder ]', () => {

    const url = `${BASE_URL}/${API_V1}/account/getorder`

    it('should call endpoint with proper params', async () => {
      const uriParams = {
        uuid: 'UUID'
      }
      const expectedUrl = setUriParams(uriParams, url)

      await api.getorder(uriParams)

      expectCalledOnce(spy)
      expectUrl(spy, expectedUrl)
    })
  })

  describe('[ raw-api / withdraw ]', () => {

    const url = `${BASE_URL}/${API_V1}/account/withdraw`

    it('should call endpoint with proper params', async () => {
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
