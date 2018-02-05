import { iterate } from '@doge/helpers'
import { makeWritable } from './helpers/writable'
import { makeReadable } from './helpers/readable'
import { makeSmallRange, makeTransformTest, xmakeTransformTest } from './helpers/helpers'
import { buffer, bufferTime } from './buffer'

describe('[ buffer ]', function () {
  const interval = (next: () => void) => {
    console.log('subscribe')
    const id = setTimeout(next, 30)
    return () => {
      console.log('clear')
      clearTimeout(id)
    }
  }

  describe('[ buffer ]', function () {
    xmakeTransformTest<number>(makeSmallRange(4),
      (data) => makeReadable({ delayMs: 5 })({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => buffer(interval))
  })

  describe('[ bufferTime ]', function () {
    xmakeTransformTest<number>(makeSmallRange(4),
      (data) => makeReadable({ delayMs: 5 })({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => bufferTime(30))
  })
})
