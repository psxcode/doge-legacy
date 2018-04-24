/* tslint:disable:no-unused-expression no-duplicate-imports */
import { expect } from 'chai'
import * as sinon from 'sinon'
import { SinonSpy } from 'sinon'
import { fetchGet } from './fetch-get'
import { Response } from 'node-fetch'

const testUrl = 'http://test.com'
const callArg = (spy: SinonSpy, argNumber = 0) => spy.getCall(0).args[argNumber]
const getOpts = (spy: SinonSpy) => {
  const opts = callArg(spy, 1)
  expect(opts).ok
  return opts
}
const getSpecificOpt = (spy: SinonSpy, name: string) => {
  const opt = getOpts(spy)[name]
  expect(opt).ok
  return opt
}
const getMethod = (spy: SinonSpy) => {
  const { method } = getOpts(spy)
  expect(method).ok
  return method
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
const makeRequestSpy = () => sinon.mock()
  .returns(Promise.resolve(new Response('{}', { status: 200 })))

describe('[ fetch-get ]', () => {
  it('should forward url', () => {
    const spy = makeRequestSpy()
    fetchGet(spy)(testUrl)
    expect(callArg(spy)).eq(testUrl)
  })

  it('should forward url with path', () => {
    const spy = makeRequestSpy()
    const url = `${testUrl}/custom/path`
    fetchGet(spy)(url)
    expect(callArg(spy)).eq(url)
  })

  it('should forward url with search', () => {
    const spy = makeRequestSpy()
    const url = `${testUrl}/?param1=value1&param2=value2`
    fetchGet(spy)(url)
    expect(callArg(spy)).eq(url)
  })

  it('should provide default init options', () => {
    const spy = makeRequestSpy()
    fetchGet(spy)(testUrl)

    getOpts(spy)
  })

  it('should merge init options', () => {
    const spy = makeRequestSpy()
    const opts = { body: 'body', size: 4 }
    fetchGet(spy)(testUrl, opts)

    expect(getSpecificOpt(spy, 'body')).eq(opts.body)
    expect(getSpecificOpt(spy, 'size')).eq(opts.size)
  })

  it('should set method GET', () => {
    const spy = makeRequestSpy()
    fetchGet(spy)(testUrl)

    expect(getMethod(spy)).eq('GET')
  })

  it('should override method', () => {
    const spy = makeRequestSpy()
    const opts = { method: 'POST' }
    fetchGet(spy)(testUrl, opts)

    expect(getMethod(spy)).eq('GET')
  })

  it('should set default headers', () => {
    const spy = makeRequestSpy()
    fetchGet(spy)(testUrl)

    getHeaders(spy)
  })

  it('should set user-agent header', () => {
    const spy = makeRequestSpy()
    fetchGet(spy)(testUrl)

    getSpecificHeader(spy, 'user-agent')
  })

  it('should set accept header', () => {
    const spy = makeRequestSpy()
    fetchGet(spy)(testUrl)

    getSpecificHeader(spy, 'accept')
  })

  it('should set \'accept-encoding\' header', () => {
    const spy = makeRequestSpy()
    fetchGet(spy)(testUrl)

    getSpecificHeader(spy, 'accept-encoding')
  })

  it('should allow override header', () => {
    const spy = makeRequestSpy()
    const opts = { headers: { accept: '*/*' } }
    fetchGet(spy)(testUrl, opts)

    expect(getSpecificHeader(spy, 'accept')).eq(opts.headers.accept)
  })

  it('should merge header', () => {
    const spy = makeRequestSpy()
    const opts = { headers: { 'custom-header': 'value' } }
    fetchGet(spy)(testUrl, opts)

    expect(getSpecificHeader(spy, 'custom-header')).eq('value')
  })
})
