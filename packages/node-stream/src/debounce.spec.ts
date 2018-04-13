import { iterate } from '@doge/iterable'
import { makeWritable } from './helpers/writable'
import { makeReadable } from './helpers/readable'
import { makeSmallRange, makeTransformTest, xmakeTransformTest } from './helpers/helpers'
import { debounceTime, debounce } from './debounce'

describe('[ debounce ]', function () {
  const interval = (next: () => void) => {
    console.log('subscribe')
    const id = setTimeout(next, 30)
    return () => {
      console.log('clear')
      clearTimeout(id)
    }
  }

  describe('[debounce]', function () {
    xmakeTransformTest<number>(makeSmallRange(4),
      (data) => makeReadable({ delayMs: 0 })({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => debounce(interval))
  })

  describe('[debounceTime]', function () {
    xmakeTransformTest<number>(makeSmallRange(4),
      (data) => makeReadable({ delayMs: 0 })({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => debounceTime(30))
  })
})
