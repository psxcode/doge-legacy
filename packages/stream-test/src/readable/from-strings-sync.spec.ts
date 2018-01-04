/* tslint:disable no-conditional-assignment */
import { expect } from 'chai'
import * as sinon from 'sinon'
import * as debug from 'debug'
import {
  makeLargeStrings,
  makeMediumStrings,
  makeSmallStrings,
  makeDataSpy,
  waitForEnd,
  waitForEvent,
  makeErrorSpy,
  makeEndSpy,
  makePullConsumer, makeDelayPullConsumer
} from './test-helpers'
import {
  readableFromStringsSync,
  readableFromStringsSyncErrorBreak,
  readableFromStringsSyncErrorContinue,
  readableFromStringsSyncErrorHang
} from './from-strings-sync'

describe('[ stream-test / readable / from-strings-sync ]', function () {
  this.slow(1000)

  it('should', async function () {
    const data = makeSmallStrings()
    const stream = readableFromStringsSync()(data)
    const dataSpy = makeDataSpy()
    stream.on('data', dataSpy)

    await waitForEnd(stream)
    expect(dataSpy.data()).deep.eq(data)
    expect(dataSpy.callCount()).eq(data.length)
  })

  it('should', async function () {
    const data = makeSmallStrings()
    const stream = readableFromStringsSync()(data, { objectMode: true })
    const dataSpy = makeDataSpy()
    makePullConsumer(stream, dataSpy)

    await waitForEnd(stream)
    expect(dataSpy.data()).deep.eq(data)
    expect(dataSpy.callCount()).eq(data.length)
  })

  it('should', async function () {
    const data = makeMediumStrings()
    const stream = readableFromStringsSync()(data, { highWaterMark: 64 })
    const dataSpy = makeDataSpy()
    makePullConsumer(stream, dataSpy)

    await waitForEnd(stream)
    expect(dataSpy.data().join('')).deep.eq(data.join(''))
  })

  it('should', async function () {
    const data = makeMediumStrings()
    const stream = readableFromStringsSync()(data, { highWaterMark: 64 })
    const dataSpy = makeDataSpy()
    makeDelayPullConsumer(stream, dataSpy, 50)

    await waitForEnd(stream)
    expect(dataSpy.data().join('')).deep.eq(data.join(''))
  })

  it('should', async function () {
    const data = makeLargeStrings()
    const stream = readableFromStringsSyncErrorContinue(10)(data)
    const dataSpy = makeDataSpy()
    const errSpy = makeErrorSpy()
    const endSpy = makeEndSpy()
    stream.on('data', dataSpy)
    stream.on('error', errSpy)
    stream.on('end', endSpy)

    await waitForEvent(stream, ['error', 'end'], 100)
    expect(dataSpy.callCount()).eq(data.length)
    expect(dataSpy.data()).deep.eq(data)
    expect(errSpy.callCount()).eq(1)
    expect(endSpy.callCount()).eq(1)
  })

  it('should', async function () {
    const data = makeSmallStrings()
    const stream = readableFromStringsSyncErrorContinue(1)(data)
    const dataSpy = makeDataSpy()
    const errSpy = makeErrorSpy()
    const endSpy = makeEndSpy()
    makePullConsumer(stream, dataSpy)
    stream.on('error', errSpy)
    stream.on('end', endSpy)

    await waitForEvent(stream, ['error', 'end'], 100)
    expect(dataSpy.callCount()).eq(data.length)
    expect(dataSpy.data()).deep.eq(data)
    expect(errSpy.callCount()).eq(1)
    expect(endSpy.callCount()).eq(1)
  })

  it('should', async function () {
    const data = makeLargeStrings()
    const stream = readableFromStringsSyncErrorBreak(10)(data)
    const dataSpy = makeDataSpy()
    const errSpy = makeErrorSpy()
    const endSpy = makeEndSpy()
    stream.on('data', dataSpy)
    stream.on('error', errSpy)
    stream.on('end', endSpy)

    await waitForEvent(stream, ['error', 'end'], 100)
    expect(dataSpy.callCount()).eq(10)
    expect(errSpy.callCount()).eq(1)
    expect(endSpy.callCount()).eq(1)
  })

  it('should', async function () {
    const data = makeLargeStrings()
    const stream = readableFromStringsSyncErrorHang(10)(data)
    const dataSpy = makeDataSpy()
    const errSpy = makeErrorSpy()
    const endSpy = makeEndSpy()
    stream.on('data', dataSpy)
    stream.on('error', errSpy)
    stream.on('end', endSpy)

    await waitForEvent(stream, ['error', 'end'], 100)
    expect(dataSpy.callCount()).eq(10)
    expect(errSpy.callCount()).eq(1)
    expect(endSpy.callCount()).eq(0)
  })
})
