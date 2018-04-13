import { expect } from 'chai'
import { makeReadable } from './helpers/readable'
import { makeWritable } from './helpers/writable'
import { makeTransformTest, xmakeTransformTest } from './helpers/helpers'
import { distinct, distinctUntilChanged } from './distinct'
import { iterate } from '@doge/iterable'

describe('[ distinct ]', function () {
  const isEqual = (a: any, b: any) => a === b

  xmakeTransformTest<number>([0, 1, 2, 2, 2, 3, 4, 4, 5, 5, 6, 7, 7, 8, 9, 9, 9],
    (data) => makeReadable({ delayMs: 30 })({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => distinct(isEqual),
    (data, spy) => {
      expect(spy.data()).deep.eq([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
})

describe('[ distinct ]', function () {
  xmakeTransformTest<number>([0, 1, 2, 2, 2, 3, 4, 4, 5, 5, 6, 7, 7, 8, 9, 9, 9],
    (data) => makeReadable({ delayMs: 30 })({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => distinctUntilChanged(),
    (data, spy) => {
      expect(spy.data()).deep.eq([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
})
