import { expect } from 'chai'
import * as sinon from 'sinon'
import * as debug from 'debug'
import { makeSmallStrings, makeSpy, waitForEnd } from './test-helpers'
import { readableFromStringsBlockingSync } from './from-strings-blocking-sync'

describe('[ stream-test / readable ]', function () {
  it('should', async function () {
    const data = makeSmallStrings(3)
    const stream = readableFromStringsBlockingSync()(data, { highWaterMark: 30 })
    const dataSpy = makeSpy()
    stream.on('data', dataSpy)

    await waitForEnd(stream)
    expect(dataSpy.data()).deep.eq(data)
    expect(dataSpy.callCount()).eq(data.length)
    // sinon.assert.callCount(dataSpy, data.length)
  })
})
