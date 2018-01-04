import { expect } from 'chai'
import * as sinon from 'sinon'
import * as debug from 'debug'
import { makeSmallStrings, makeSpy, waitForEnd } from './test-helpers'
import { readableFromStringsBlockingAsync } from './from-strings-blocking-async'

describe('[ stream-test / readable ]', function () {
  it.only('should', async function () {
    const data = makeSmallStrings(3)
    const stream = readableFromStringsBlockingAsync(100)(data, { highWaterMark: 1 })
    const dataSpy = makeSpy()
    stream.on('data', dataSpy)

    await waitForEnd(stream)
    expect(dataSpy.data()).deep.eq(data)
    expect(dataSpy.callCount()).eq(data.length)
    debug('stream-test:from-strings-one-push-async:test')('call count %d', dataSpy.callCount())
  })
})
