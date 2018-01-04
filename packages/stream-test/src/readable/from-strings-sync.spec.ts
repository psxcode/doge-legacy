import * as sinon from 'sinon'
import * as debug from 'debug'
import { makeLargeStrings, waitForEnd } from './test-helpers'
import { readableFromStringsSync } from './from-strings-sync'

describe('[ stream-test / readable / from-strings-sync ]', function () {
  it('should', async function () {
    const data = makeLargeStrings()
    const stream = readableFromStringsSync()(data)
    const dataSpy = sinon.spy()
    stream.on('data', dataSpy)

    await waitForEnd(stream)
    sinon.assert.callCount(dataSpy, data.length)
  })
})
