import { iterate } from '@doge/helpers'
import { makeWritable } from './helpers/writable'
import { makeReadable } from './helpers/readable'
import { makeSmallRange, makeTransformTest, xmakeTransformTest } from './helpers/helpers'
import { throttle, throttleTime } from './throttle'

describe('[ throttle ]', function () {
  const interval = (next: () => void) => {
    console.log('subscribe')
    const id = setInterval(next, 30)
    return () => {
      console.log('clear')
      clearInterval(id)
    }
  }

  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({ delayMs: 0 })({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => throttle(interval))
})

describe('[ throttleTime ]', function () {

  makeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({ delayMs: 0 })({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => throttleTime(setTimeout, clearTimeout)(30))
})
