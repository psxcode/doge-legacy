import { expect } from 'chai'
import * as sinon from 'sinon'
import * as debug from 'debug'
import { makeSmallStrings, makeDataSpy, waitForEnd, waitForEvent } from './test-helpers'
import {
  readableFromStringsBlockingAsync,
  readableFromStringsBlockingAsyncErrorContinue,
  readableFromStringsBlockingAsyncErrorBreak,
  readableFromStringsBlockingAsyncErrorHang
} from './from-strings-blocking-async'

describe('[ stream-test / readable / from-strings-blocking-async ]', function () {
  it('should', async function () {
    const data = makeSmallStrings(3)
    const stream = readableFromStringsBlockingAsync(100)(data, { highWaterMark: 1 })
    const dataSpy = makeDataSpy()
    stream.on('data', dataSpy)

    await waitForEnd(stream)
    expect(dataSpy.data()).deep.eq(data)
    expect(dataSpy.callCount()).eq(data.length)
  })

  it('should', async function () {
    const data = makeSmallStrings()
    const stream = readableFromStringsBlockingAsyncErrorContinue(10, 1)(data)
    const dataSpy = makeDataSpy()
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()
    stream.on('data', dataSpy)
    stream.on('error', errSpy)
    stream.on('end', endSpy)

    await waitForEvent(stream, ['error', 'end'], 100)
    expect(dataSpy.callCount()).eq(data.length)
    expect(dataSpy.data()).deep.eq(data)
    sinon.assert.calledOnce(errSpy)
    sinon.assert.calledOnce(endSpy)
  })

  it('should', async function () {
    const data = makeSmallStrings()
    const stream = readableFromStringsBlockingAsyncErrorBreak(10, 1)(data)
    const dataSpy = makeDataSpy()
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()
    stream.on('data', dataSpy)
    stream.on('error', errSpy)
    stream.on('end', endSpy)

    await waitForEvent(stream, ['error', 'end'], 100)
    expect(dataSpy.callCount()).eq(1)
    sinon.assert.calledOnce(errSpy)
    sinon.assert.calledOnce(endSpy)
  })

  it('should', async function () {
    const data = makeSmallStrings()
    const stream = readableFromStringsBlockingAsyncErrorHang(10, 1)(data)
    const dataSpy = makeDataSpy()
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()
    stream.on('data', dataSpy)
    stream.on('error', errSpy)
    stream.on('end', endSpy)

    await waitForEvent(stream, ['error', 'end'], 100)
    expect(dataSpy.callCount()).eq(1)
    sinon.assert.calledOnce(errSpy)
    sinon.assert.notCalled(endSpy)
  })
})