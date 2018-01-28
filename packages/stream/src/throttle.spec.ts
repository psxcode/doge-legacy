import { iterate } from '@doge/helpers'
import { makeWritable } from './helpers/writable'
import { makeReadable } from './helpers/readable'
import { makeSmallRange, makeTransformTest } from './helpers/helpers'
import { throttle } from './throttle'

describe('[ throttle ]', function () {
  const interval = (next: () => void) => {
    console.log('subscribe')
    const id = setInterval(next, 30)
    return () => {
      console.log('clear')
      clearInterval(id)
    }
  }

  makeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({ delayMs: 0 })({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => throttle(interval))
})
