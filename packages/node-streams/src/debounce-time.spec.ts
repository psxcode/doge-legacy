import { iterate } from '@psxcode/iterable'
import { makeWritable } from '../../node-streams-test/src/writable'
import { makeReadable } from '../../node-streams-test/src/readable'
import { makeSmallRange, makeTransformTest, xmakeTransformTest } from '../../node-streams-test/src/helpers'
import debounceTime from './debounce-time'

describe('[debounceTime]', () => {
  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({ delayMs: 0 })({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => debounceTime(30))
})
