/* tslint:disable:no-unused-expression no-duplicate-imports comment-format */
import { expect } from 'chai'
import * as sinon from 'sinon'
import { SinonSpy } from 'sinon'
import { Headers, Response } from 'node-fetch'
import { fetchFollow } from './fetch-follow'
import { fetchGet } from './fetch-get'

const testUrl = 'http://test.com/path'
const testUrlSearch = `${testUrl}?param=value`
const testRedirectUrl = 'http://redirect.com/path'
const getCallArg = (spy: SinonSpy, argNumber = 0, callNumber = 0) => spy.getCall(callNumber).args[argNumber]
const getUrl = (spy: SinonSpy, callNumber = 0) => {
  const url = getCallArg(spy, 0, callNumber)
  expect(url).ok
  return url
}
const getInitOptions = (spy: SinonSpy, callNumber = 0) => {
  const opts = getCallArg(spy, 1, callNumber)
  expect(opts).ok
  return opts
}
const getSpecificOpt = (spy: SinonSpy, name: string) => {
  const opt = getInitOptions(spy)[name]
  expect(opt).ok
  return opt
}
const getMethod = (spy: SinonSpy) => {
  const { method } = getInitOptions(spy)
  expect(method).ok
  return method
}
const getHeaders = (spy: SinonSpy, callNumber = 0) => {
  const { headers } = getInitOptions(spy, callNumber)
  expect(headers).ok
  return headers
}
const getSpecificHeader = (spy: SinonSpy, key: string, callNumber = 0) => {
  const hdr = getHeaders(spy, callNumber)[key]
  expect(hdr).ok
  return hdr
}
const makeRedirectHeaders = () => {
  const headers = new Headers()
  headers.append('location', testRedirectUrl)
  return headers
}
const makeSuccessResponse = () =>
  new Response('{}', { status: 200, url: testUrl })
const makeSuccessAfterRedirectResponse = () =>
  new Response('{}', { status: 200, url: testRedirectUrl })
const makeRedirectResponse = () =>
  new Response('{}', { status: 302, url: testUrl, headers: makeRedirectHeaders() })
const makeRedirectNoLocationResponse = () =>
  new Response('{}', { status: 302, url: testUrl, headers: new Headers() })
const makeRequestSpy = () => sinon.mock()
  .returns(Promise.resolve(makeSuccessResponse()))
const makeRedirectRequestSpy = () => {
  const spy = sinon.stub()
  spy.withArgs(testRedirectUrl).returns(Promise.resolve(makeSuccessAfterRedirectResponse()))
  spy.returns(Promise.resolve(makeRedirectResponse()))
  return spy
}
const makeNumRedirectRequestSpy = (numRedirects: number) => {
  const spy = sinon.stub()
  spy.onCall(numRedirects).returns(Promise.resolve(makeSuccessAfterRedirectResponse()))
  spy.returns(Promise.resolve(makeRedirectResponse()))
  return spy
}

describe('[ fetch-follow ]', function () {
  it('should not touch url', async function () {
    const spy = makeRequestSpy()
    const url = `${testUrl}/?param1=value1&param2=value2`
    await fetchFollow(0)(spy)(url)

    expect(getUrl(spy)).eq(url)
  })

  it('should provide default init options', async function () {
    const spy = makeRequestSpy()
    await fetchFollow(0)(spy)(testUrl)

    getInitOptions(spy)
  })

  it('should set \'redirect\' to \'manual\'', async function () {
    const spy = makeRequestSpy()
    await fetchFollow(0)(spy)(testUrl)

    expect(getSpecificOpt(spy, 'redirect')).eq('manual')
  })

  it('should merge init options', function () {
    const spy = makeRequestSpy()
    const opts = { body: 'body', size: 4 }
    fetchGet(spy)(testUrl, opts)

    expect(getSpecificOpt(spy, 'body')).eq(opts.body)
    expect(getSpecificOpt(spy, 'size')).eq(opts.size)
  })

  it('should not follow if \'location\' is not set', async function () {
    const spy = sinon.mock().returns(Promise.resolve(makeRedirectNoLocationResponse()))
    const { status } = await fetchFollow(2)(spy)(testUrl)

    expect(spy.calledOnce).ok
    expect(status).eq(302)
  })

  it('should follow \'location\'', async function () {
    const spy = makeRedirectRequestSpy()
    await fetchFollow(2)(spy)(testUrl)

    expect(getUrl(spy, 1)).eq(testRedirectUrl)
  })

  it('should not follow if \'maxRedirects\' is 0', async function () {
    const spy = makeRedirectRequestSpy()
    const { status } = await fetchFollow(0)(spy)(testUrl)

    expect(spy.calledOnce).ok
    expect(status).eq(302)
  })

  it('should not follow if \'maxRedirects\' is reached', async function () {
    const spy = makeNumRedirectRequestSpy(3)
    const { status } = await fetchFollow(2)(spy)(testUrl)

    expect(spy.callCount).eq(3)
    expect(status).eq(302)
  })

  it('should follow if \'maxRedirects\' not reached', async function () {
    const spy = makeNumRedirectRequestSpy(2)
    const { status } = await fetchFollow(2)(spy)(testUrl)

    expect(spy.callCount).eq(3)
    expect(status).eq(200)
  })

  it('should provide \'referer\'', async function () {
    const spy = makeRedirectRequestSpy()
    await fetchFollow(2)(spy)(testUrlSearch)

    expect(getSpecificHeader(spy, 'referer', 1)).eq(testUrl)
  })
})
