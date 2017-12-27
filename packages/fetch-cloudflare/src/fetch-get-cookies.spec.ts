/* tslint:disable:no-unused-expression no-duplicate-imports */
import { expect } from 'chai'
import * as sinon from 'sinon'
import { SinonSpy } from 'sinon'
import { fetchGetCookies } from './fetch-cookie'
import { Response } from 'node-fetch'
import { GetCookiesFn } from './types'

const testUrl = 'http://test.com'
const mockedCookies = 'cookie-value=value'
const getCookies: GetCookiesFn = (url: string) => mockedCookies
const noCookies: GetCookiesFn = (url: string) => ''
const getCallArg = (spy: SinonSpy, argNumber = 0) => spy.getCall(0).args[argNumber]
const getOpts = (spy: SinonSpy) => {
  const opts = getCallArg(spy, 1)
  expect(opts).ok
  return opts
}
const getSpecificOpt = (spy: SinonSpy, name: string) => {
  const opt = getOpts(spy)[name]
  expect(opt).ok
  return opt
}
const getHeaders = (spy: SinonSpy) => {
  const { headers } = getOpts(spy)
  expect(headers).ok
  return headers
}
const getSpecificHeader = (spy: SinonSpy, key: string) => {
  const hdr = getHeaders(spy)[key]
  expect(hdr).ok
  return hdr
}
const hasSpecificHeader = (spy: SinonSpy, key: string) => {
  const headers = getHeaders(spy)
  return !!headers[key]
}
const makeRequestSpy = () => sinon.mock()
  .returns(Promise.resolve(new Response('{}', { status: 200 })))

describe('[ fetch-get-cookies ]', function () {
  it('should forward url', async function () {
    const spy = makeRequestSpy()
    await fetchGetCookies(getCookies)(spy)(testUrl)

    expect(getCallArg(spy)).eq(testUrl)
  })

  it('should forward url with path', async function () {
    const spy = makeRequestSpy()
    const url = `${testUrl}/custom/path`
    await fetchGetCookies(getCookies)(spy)(url)

    expect(getCallArg(spy)).eq(url)
  })

  it('should forward url with search', async function () {
    const spy = makeRequestSpy()
    const url = `${testUrl}/?param1=value1&param2=value2`
    await fetchGetCookies(getCookies)(spy)(url)

    expect(getCallArg(spy)).eq(url)
  })

  it('should provide default init options', async function () {
    const spy = makeRequestSpy()
    await fetchGetCookies(getCookies)(spy)(testUrl)

    getOpts(spy)
  })

  it('should merge init options', async function () {
    const spy = makeRequestSpy()
    const opts = { body: 'body', size: 4 }
    await fetchGetCookies(getCookies)(spy)(testUrl, opts)

    expect(getSpecificOpt(spy, 'body')).eq('body')
    expect(getSpecificOpt(spy, 'size')).eq(4)
  })

  it('should set default headers', async function () {
    const spy = makeRequestSpy()
    await fetchGetCookies(getCookies)(spy)(testUrl)

    expect(getHeaders(spy)).ok
  })

  it('should set \'cookie\' header', async function () {
    const spy = makeRequestSpy()
    await fetchGetCookies(getCookies)(spy)(testUrl)

    expect(getSpecificHeader(spy, 'cookie')).eq(mockedCookies)
  })

  it('should not set \'cookie\' header if no cookies', async function () {
    const spy = makeRequestSpy()
    await fetchGetCookies(noCookies)(spy)(testUrl)

    expect(hasSpecificHeader(spy, 'cookie')).eq(false)
  })

  it('should merge headers', async function () {
    const spy = makeRequestSpy()
    const opts = { headers: { 'custom-header': 'value' } }
    await fetchGetCookies(getCookies)(spy)(testUrl, opts)

    expect(getSpecificHeader(spy, 'custom-header')).eq('value')
  })
})
