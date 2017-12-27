/* tslint:disable:no-unused-expression no-duplicate-imports */
import { expect } from 'chai'
import * as sinon from 'sinon'
import { SinonSpy } from 'sinon'
import { Response } from 'node-fetch'
import { SetCookiesFn } from './types'
import { fetchSetCookiesAndReloadChallenge } from './fetch-challenge'

const testUrl = 'http://test.com'
const ignoreSettingCookies: SetCookiesFn = (cookies: string) => {}
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

describe('[ fetch-challenge-cookie ]', function () {
  it('should not touch url', async function () {
    const spy = makeNoCookiesRequestSpy()
    const url = `${testUrl}/?param1=value1&param2=value2`
    await fetchSetCookiesAndReloadChallenge(ignoreSettingCookies)(spy)(url)

    expect(getUrl(spy)).eq(url)
  })

  it('should provide default init options', async function () {
    const spy = makeNoCookiesRequestSpy()
    await fetchSetCookiesAndReloadChallenge(ignoreSettingCookies)(spy)(testUrl)

    getInitOptions(spy)
  })

  it('should not touch init options', async function () {
    const spy = makeNoCookiesRequestSpy()
    const opts = { body: 'body', size: 4 }
    await fetchSetCookiesAndReloadChallenge(ignoreSettingCookies)(spy)(testUrl, opts)

    expect(getInitOptions(spy)).deep.eq(opts)
  })

  it('should not consume response', async function () {
    const spy = makeNoCookiesRequestSpy()
    const opts = { body: 'body', size: 4 }
    const resp = await fetchSetCookiesAndReloadChallenge(ignoreSettingCookies)(spy)(testUrl, opts)
    const json = await resp.json()

    expect(json).ok
  })
})
