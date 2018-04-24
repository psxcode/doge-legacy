/* tslint:disable:no-unused-expression no-duplicate-imports */
import { expect } from 'chai'
import * as sinon from 'sinon'
import { SinonSpy } from 'sinon'
import { fetchApikey } from './fetch-bittrex-apikey'
import { URL } from 'url'

const testUrl = 'http://test.com/'
const apikey = 'secret_key'
const nonce = () => 42
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
const getUrlWithoutSearch = (spy: SinonSpy) => {
  const urlArg = callArg(spy)
  expect(urlArg).ok
  const url = new URL(urlArg)
  url.search = ''
  return `${url}`
}
const getSpecificSearchParam = (spy: SinonSpy, key: string) => {
  const url = callArg(spy)
  expect(url).ok
  const params = new URL(url).searchParams
  expect(params.has(key)).eq(true)
  return params.get(key)
}

describe('[ fetch-apikey ]', () => {
  it('should forward url', () => {
    const spy = sinon.spy()
    fetchApikey(apikey, nonce)(spy)(testUrl)

    expect(getUrlWithoutSearch(spy)).eq(testUrl)
  })

  it('should merge url search', () => {
    const spy = sinon.spy()
    fetchApikey(apikey, nonce)(spy)(`${testUrl}?param1=value1`)

    expect(getSpecificSearchParam(spy, 'param1')).eq('value1')
  })

  it('should add nonce to url search', () => {
    const spy = sinon.spy()
    fetchApikey(apikey, nonce)(spy)(`${testUrl}?param1=value1`)

    expect(getSpecificSearchParam(spy, 'nonce')).eq(`${nonce()}`)
  })

  it('should add apikey to url search', () => {
    const spy = sinon.spy()
    fetchApikey(apikey, nonce)(spy)(`${testUrl}?param1=value1`)

    expect(getSpecificSearchParam(spy, 'apikey')).eq(apikey)
  })

  it('should set init options', () => {
    const spy = sinon.spy()
    fetchApikey(apikey, nonce)(spy)(testUrl)

    getOpts(spy)
  })

  it('should not modify init options', () => {
    const spy = sinon.spy()
    const opts = { body: 'body', size: 4 }
    fetchApikey(apikey, nonce)(spy)(testUrl, opts)

    expect(getOpts(spy)).deep.eq(opts)
  })
})
