/* tslint:disable:no-unused-expression no-duplicate-imports no-empty */
import { expect } from 'chai'
import * as sinon from 'sinon'
import { SinonSpy } from 'sinon'
import { fetchCookiesResponse } from './fetch-cookies-response'
import { Headers, Response } from 'node-fetch'
import { ResponseCookiesFn } from './types'

const testUrl = 'http://test.com'
const ignoreSettingCookies: ResponseCookiesFn = (cookies: string) => {}
const getCallArg = (spy: SinonSpy, argNumber = 0) => spy.getCall(0).args[argNumber]
const getInitOptions = (spy: SinonSpy) => {
  const opts = getCallArg(spy, 1)
  expect(opts).ok
  return opts
}
const getUrl = (spy: SinonSpy) => {
  const url = getCallArg(spy, 0)
  expect(url).ok
  return url
}
const mockedCookie = 'cookie=value'
const makeSetCookieHeaders = (): Headers => {
  const headers = new Headers()
  headers.append('set-cookie', mockedCookie)
  return headers
}
const makeNoCookiesRequestSpy = () => sinon.mock()
  .returns(Promise.resolve(
    new Response('{}', { status: 200 })
  ))
const makeSetCookiesRequestSpy = () => sinon.mock()
  .returns(Promise.resolve(
    new Response('{}', { status: 200, headers: makeSetCookieHeaders() })
  ))
const makeSetCookiesSpy = () => sinon.spy()
const getSetCookiesCookies = (spy: SinonSpy) => getCallArg(spy, 0)

describe('[ fetch-set-cookies ]', function () {
  it('should not touch url', async function () {
    const spy = makeNoCookiesRequestSpy()
    const url = `${testUrl}/?param1=value1&param2=value2`
    await fetchCookiesResponse(ignoreSettingCookies)(spy)(url)

    expect(getUrl(spy)).eq(url)
  })

  it('should provide default init options', async function () {
    const spy = makeNoCookiesRequestSpy()
    await fetchCookiesResponse(ignoreSettingCookies)(spy)(testUrl)

    getInitOptions(spy)
  })

  it('should not touch init options', async function () {
    const spy = makeNoCookiesRequestSpy()
    const opts = { body: 'body', size: 4 }
    await fetchCookiesResponse(ignoreSettingCookies)(spy)(testUrl, opts)

    expect(getInitOptions(spy)).deep.eq(opts)
  })

  it('should provide cookies to setCookies', async function () {
    const spy = makeSetCookiesRequestSpy()
    const cookieSpy = makeSetCookiesSpy()
    await fetchCookiesResponse(cookieSpy)(spy)(testUrl)

    sinon.assert.calledOnce(cookieSpy)
    expect(getSetCookiesCookies(cookieSpy)).eq(mockedCookie)
  })

  it('should not call setCookies if no \'set-cookie\' header', async function () {
    const spy = makeNoCookiesRequestSpy()
    const cookieSpy = makeSetCookiesSpy()
    await fetchCookiesResponse(cookieSpy)(spy)(testUrl)

    sinon.assert.notCalled(cookieSpy)
  })
})
