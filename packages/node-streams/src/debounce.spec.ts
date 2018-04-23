import { iterate } from '@psxcode/iterable'
import { makeWritable } from '../../node-streams-test/src/writable'
import { makeReadable } from '../../node-streams-test/src/readable'
import { makeSmallRange, makeTransformTest, xmakeTransformTest } from '../../node-streams-test/src/helpers'
import debounce from './debounce'

const interval = (next: () => void) => {
  console.log('subscribe')
  const id = setTimeout(next, 30)
  return () => {
    console.log('clear')
    clearTimeout(id)
  }
}

describe('[debounce]', () => {
  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({ delayMs: 0 })({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => debounce(interval))
})
