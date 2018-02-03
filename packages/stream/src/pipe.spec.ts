import { expect } from 'chai'
import { iterate } from '@doge/helpers'
import { pipe } from './pipe'
import { filter } from './filter'
import { map } from './map'
import { first } from './first'
import {
  makeSmallRange,
  makeTransformTest,
  xmakeTransformTest
} from './helpers/helpers'
import { makeReadable } from './helpers/readable'
import { makeWritable } from './helpers/writable'

const isEqual = (value: number) => (arg: number) => value === arg
const multiply = (multiplier: number) => (value: number) => value * multiplier

describe('[ pipe ]', function () {
  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({})({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => pipe(filter(isEqual(10)), first(), map(multiply(2))),
    (data, spy) => {
      expect(spy.callCount()).eq(1)
      expect(spy.data()).deep.eq([20])
    })
})
