/* tslint:disable:no-unused-expression no-duplicate-imports */
import { expect } from 'chai'
import * as sinon from 'sinon'
import { SinonSpy } from 'sinon'
import { fetchApisign } from './fetch-bittrex-apisign'

const testUrl = 'http://test.com/'
const hash = (stringToHash: string) => `hashed_${stringToHash}`
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

describe('[ fetch-apisign ]', () => {
  it('should forward url', () => {
    const spy = sinon.spy()
    fetchApisign(hash)(spy)(testUrl)
    expect(callArg(spy)).eq(testUrl)
  })

  it('should forward url with path', () => {
    const spy = sinon.spy()
    const url = `${testUrl}/custom/path`
    fetchApisign(hash)(spy)(url)
    expect(callArg(spy)).eq(url)
  })

  it('should forward url with search', () => {
    const spy = sinon.spy()
    const url = `${testUrl}/?param1=value1&param2=value2`
    fetchApisign(hash)(spy)(url)
    expect(callArg(spy)).eq(url)
  })

  it('should provide default init options', () => {
    const spy = sinon.spy()
    fetchApisign(hash)(spy)(testUrl)

    getOpts(spy)
  })

  it('should merge init options', () => {
    const spy = sinon.spy()
    fetchApisign(hash)(spy)(testUrl, { body: 'body', size: 4 })

    expect(getSpecificOpt(spy, 'body')).eq('body')
    expect(getSpecificOpt(spy, 'size')).eq(4)
  })

  it('should merge headers', () => {
    const spy = sinon.spy()
    fetchApisign(hash)(spy)(testUrl, { headers: { 'custom-header': 'value' } })

    expect(getSpecificHeader(spy, 'custom-header')).eq('value')
  })

  it('should set \'apisign\' header', () => {
    const spy = sinon.spy()
    const url = `${testUrl}/?param1=value1&param2=value2`
    fetchApisign(hash)(spy)(url)

    expect(getSpecificHeader(spy, 'apisign')).eq(hash(url))
  })
})
