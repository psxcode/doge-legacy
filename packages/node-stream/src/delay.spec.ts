import { expect } from 'chai'
import { iterate } from '@psxcode/iterable'
import { waitTimePromise as wait } from '@doge/wait'
import { makeReadable } from './helpers/readable'
import { makeWritable } from './helpers/writable'
import {
  makeSmallRange,
  makeTransformTest,
  xmakeTransformTest
} from './helpers/helpers'
import delay from './delay'

describe('[ delay ]', () => {
  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({ delayMs: 30 })({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => delay(wait, Date.now)(1000),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data))
    })
})
