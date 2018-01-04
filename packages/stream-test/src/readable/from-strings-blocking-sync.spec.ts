import { expect } from 'chai'
import * as sinon from 'sinon'
import * as debug from 'debug'
import {
  makeDataSpy,
  waitForEnd,
  makeMediumStrings,
  makePullConsumer,
  makeDelayPullConsumer
} from './test-helpers'
import { readableFromStringsBlockingSync } from './from-strings-blocking-sync'

describe('[ stream-test / readable ]', function () {
  it('should', async function () {
    const data = makeMediumStrings()
    const stream = readableFromStringsBlockingSync()(data, { highWaterMark: 64 })
    const dataSpy = makeDataSpy()
    stream.on('data', dataSpy)

    await waitForEnd(stream)
    expect(dataSpy.data()).deep.eq(data)
    expect(dataSpy.callCount()).eq(data.length)
  })

  it('should', async function () {
    this.timeout(10000)
    const data = makeMediumStrings()
    const stream = readableFromStringsBlockingSync()(data, { highWaterMark: 64 })
    const dataSpy = makeDataSpy()
    makePullConsumer(stream, dataSpy)

    await waitForEnd(stream)
    expect(dataSpy.data().join('')).deep.eq(data.join(''))
  })

  it('should', async function () {
    this.timeout(10000)
    const data = makeMediumStrings()
    const stream = readableFromStringsBlockingSync()(data, { highWaterMark: 64 })
    const dataSpy = makeDataSpy()
    makeDelayPullConsumer(stream, dataSpy, 50)

    await waitForEnd(stream)
    expect(dataSpy.data().join('')).deep.eq(data.join(''))
  })
})
