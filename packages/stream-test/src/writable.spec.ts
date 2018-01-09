import { expect } from 'chai'
import {
  makeMediumStrings,
  makeSmallStrings,
  makeWritableProducer,
  makeWritableTest,
  xmakeWritableTest
} from './test-helpers'
import { makeWritable } from './writable'

describe('', function () {
  this.slow(1000)

  makeWritableTest(makeMediumStrings(),
    (spy) => makeWritable({ writeDelayMs: undefined })(spy, { highWaterMark: 256 }),
    (stream, data) => makeWritableProducer(stream, data, { eager: false })
    )
})
