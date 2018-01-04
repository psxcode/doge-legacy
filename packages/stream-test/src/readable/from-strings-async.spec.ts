import { expect } from 'chai'
import * as sinon from 'sinon'
import * as debug from 'debug'
import { makeSmallStrings, makeDataSpy, waitForEnd, waitForEvent } from './test-helpers'
import {
  readableFromStringsAsync, readableFromStringsAsyncErrorBreak,
  readableFromStringsAsyncErrorContinue, readableFromStringsAsyncErrorHang
} from './from-strings-async'

describe('[ stream-test / readable / from-strings-async ]', function () {
  it('should', async function () {
    const data = makeSmallStrings()
    const stream = readableFromStringsAsync(100)(data, { highWaterMark: 10 })
    const dataSpy = makeDataSpy()
    stream.on('data', dataSpy)

    await waitForEnd(stream)
    expect(dataSpy.data()).deep.eq(data)
    expect(dataSpy.callCount()).eq(data.length)
  })

  it('should', async function () {
    const data = makeSmallStrings()
    const stream = readableFromStringsAsyncErrorContinue(10, 1)(data)
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
    const stream = readableFromStringsAsyncErrorBreak(10, 1)(data)
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
    const stream = readableFromStringsAsyncErrorHang(10, 1)(data)
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
