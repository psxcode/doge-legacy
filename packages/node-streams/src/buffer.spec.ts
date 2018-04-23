import { iterate } from '@psxcode/iterable'
import { makeWritable } from '../../node-streams-test/src/writable'
import { makeReadable } from '../../node-streams-test/src/readable'
import { makeSmallRange, makeTransformTest, xmakeTransformTest } from '../../node-streams-test/src/helpers'
import buffer from './buffer'

const interval = (next: () => void) => {
  console.log('subscribe')
  const id = setTimeout(next, 30)
  return () => {
    console.log('clear')
    clearTimeout(id)
  }
}

describe('[ buffer ]', () => {
  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({ delayMs: 5 })({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => buffer(interval))
})
