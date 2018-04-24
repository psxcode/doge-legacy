/* tslint:disable:no-unused-expression no-duplicate-imports */
import { expect } from 'chai'
import * as sinon from 'sinon'
import { SinonSpy } from 'sinon'
import { Response } from 'node-fetch'
import { ResponseCookiesFn } from '../types'
import { fetchSetCookiesChallenge } from './fetch-cloudflare-cookie'

const testUrl = 'http://test.com'
const ignoreSettingCookies: ResponseCookiesFn = (cookies: string) => {}
const getCallArg = (spy: SinonSpy, argNumber = 0) => spy.getCall(0).args[argNumber]
const getUrl = (spy: SinonSpy) => {
  const url = getCallArg(spy, 0)
  expect(url).ok
  return url
}
const getInitOptions = (spy: SinonSpy) => {
  const opts = getCallArg(spy, 1)
  expect(opts).ok
  return opts
}
const makeNoCookiesRequestSpy = () => sinon.mock()
  .returns(Promise.resolve(new Response('{}', { status: 200 })))

describe('[ fetch-challenge-cookie ]', () => {
  it('should not touch url', async () => {
    const spy = makeNoCookiesRequestSpy()
    const url = `${testUrl}/?param1=value1&param2=value2`
    await fetchSetCookiesChallenge(ignoreSettingCookies)(spy)(url)

    expect(getUrl(spy)).eq(url)
  })

  it('should provide default init options', async () => {
    const spy = makeNoCookiesRequestSpy()
    await fetchSetCookiesChallenge(ignoreSettingCookies)(spy)(testUrl)

    getInitOptions(spy)
  })

  it('should not touch init options', async () => {
    const spy = makeNoCookiesRequestSpy()
    const opts = { body: 'body', size: 4 }
    await fetchSetCookiesChallenge(ignoreSettingCookies)(spy)(testUrl, opts)

    expect(getInitOptions(spy)).deep.eq(opts)
  })

  it('should not consume response', async () => {
    const spy = makeNoCookiesRequestSpy()
    const opts = { body: 'body', size: 4 }
    const resp = await fetchSetCookiesChallenge(ignoreSettingCookies)(spy)(testUrl, opts)
    const json = await resp.json()

    expect(json).ok
  })
})
