import { expect } from 'chai'
import { pipe } from '@doge/helpers'
import { add, gen, makeSpy, mult2 } from './test-helpers'
import { map } from './map'
import { reduce, reduceEx } from './reduce'

describe('[ reduce ]', function () {
  it('works with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(add)
    expect(spy.callCount()).eq(0)
    const result = [...reduce(spy)(data)]
    expect(spy.callCount()).eq(data.length + 1)
    expect(result).deep.eq([15])
  })

  it('works chained', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(add)
    expect(spy.callCount()).eq(0)
    const result = [...pipe(reduce(spy), map(mult2))(data)]
    expect(spy.callCount()).eq(data.length + 1)
    expect(result).deep.eq([30])
  })

  it('works with Generators', function () {
    const data = gen(6)
    const spy = makeSpy(add)
    expect(spy.callCount()).eq(0)
    const result = [...reduce(spy)(data)]
    expect(spy.callCount()).eq(6 + 1)
    expect(result).deep.eq([15])
  })
})

describe('[ reduceEx ]', function () {
  it('works with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(add)
    expect(spy.callCount()).eq(0)
    const result = [...reduceEx(0, spy)(data)]
    expect(spy.callCount()).eq(data.length)
    expect(result).deep.eq([15])
  })

  it('works chained', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(add)
    expect(spy.callCount()).eq(0)
    const result = [...pipe(reduceEx(0, spy), map(mult2))(data)]
    expect(spy.callCount()).eq(data.length)
    expect(result).deep.eq([30])
  })

  it('works with Generators', function () {
    const data = gen(6)
    const spy = makeSpy(add)
    expect(spy.callCount()).eq(0)
    const result = [...reduceEx(0, spy)(data)]
    expect(spy.callCount()).eq(6)
    expect(result).deep.eq([15])
  })
})
