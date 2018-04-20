import { expect } from 'chai'
import { iterate } from '@psxcode/iterable'
import { makeWritable } from './helpers/writable'
import { makeReadable } from './helpers/readable'
import { makeSmallRange, xmakeTransformTest } from './helpers/helpers'
import pipe from './pipe'
import filter from './filter'
import last from './last'
import map from './map'

const isEqual = (value: number) => (arg: number) => value === arg
const multiply = (multiplier: number) => (value: number) => value * multiplier

describe('[ last ]', () => {
  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({})({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => pipe(filter(isEqual(10)), last(), map(multiply(2))),
    (data, spy) => {
      expect(spy.data()).deep.eq([20])
    })
})
