import { expect } from 'chai'
import { iterate, map as mapIterable } from '@doge/helpers'
import { makeWritable } from './helpers/writable'
import { makeReadable } from './helpers/readable'
import { filter } from './filter'
import { pipe } from './pipe'
import { first } from './first'
import { pluck } from './pluck'
import { map } from './map'
import { makeSmallRange, makeTransformTest, xmakeTransformTest } from './helpers/helpers'

const isEqual = (value: number) => (arg: number) => value === arg
const multiply = (multiplier: number) => (value: number) => value * multiplier

describe('[ pluck ]', function () {
  xmakeTransformTest(mapIterable(value => ({ value }))(makeSmallRange(4)),
    (data) => makeReadable({})({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => pipe(pluck('value'), filter(isEqual(10)), first(), map(multiply(2))),
    (data, spy) => {
      expect(spy.callCount()).eq(1)
      expect(spy.data()).deep.eq([20])
    })
})
