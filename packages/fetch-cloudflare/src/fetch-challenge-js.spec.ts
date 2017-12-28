/* tslint:disable:no-unused-expression no-duplicate-imports */
import { expect } from 'chai'
import * as sinon from 'sinon'
import { SinonSpy } from 'sinon'
import { Response } from 'node-fetch'
import { fetchJsChallenge } from './fetch-challenge-js'

const testUrl = 'http://test.com'
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
const makeRequestSpy = () => sinon.mock()
  .returns(Promise.resolve(new Response('{}', { status: 200 })))

describe('[ fetch-challenge-js ]', function () {
  it('should not touch url', async function () {
    const spy = makeRequestSpy()
    const url = `${testUrl}/?param1=value1&param2=value2`
    await fetchJsChallenge(spy)(url)

    expect(getUrl(spy)).eq(url)
  })

  it('should provide default init options', async function () {
    const spy = makeRequestSpy()
    await fetchJsChallenge(spy)(testUrl)

    getInitOptions(spy)
  })

  it('should not touch init options', async function () {
    const spy = makeRequestSpy()
    const opts = { body: 'body', size: 4 }
    await fetchJsChallenge(spy)(testUrl, opts)

    expect(getInitOptions(spy)).deep.eq(opts)
  })

  it('should not consume response', async function () {
    const spy = makeRequestSpy()
    const opts = { body: 'body', size: 4 }
    const resp = await fetchJsChallenge(spy)(testUrl, opts)
    const json = await resp.json()

    expect(json).ok
  })
})
