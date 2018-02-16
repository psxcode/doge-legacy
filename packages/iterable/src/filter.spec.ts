import { expect } from 'chai'
import { pipe } from '@doge/helpers'
import { makeSpy, isEven, mult2, gen } from './test-helpers'
import { map } from './map'
import { filter, filterEx } from './filter'

describe('[ filter ]', function () {
  it('works with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(isEven)
    expect(spy.callCount()).eq(0)
    const result = [...filter(spy)(data)]
    expect(result).deep.eq([2, 4])
    expect(spy.callCount()).eq(data.length)
  })

  it('works chained', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(isEven)
    expect(spy.callCount()).eq(0)
    const result = [...pipe(filter(spy), map(mult2))(data)]
    expect(result).deep.eq([4, 8])
    expect(spy.callCount()).eq(data.length)
  })

  it('works with Generators', function () {
    const iterator = gen(5)
    const spy = makeSpy(isEven)
    expect(spy.callCount()).eq(0)
    const result = [...filter(spy)(iterator)]
    expect(result).deep.eq([0, 2, 4])
    expect(spy.callCount()).eq(5)
  })
})

describe('[ filterEx ]', function () {
  it('works with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(isEven)
    expect(spy.callCount()).eq(0)
    const result = [...filterEx(spy)(data)]
    expect(result).deep.eq([2, 4])
    expect(spy.callCount()).eq(data.length)
  })

  it('works chained', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(isEven)
    expect(spy.callCount()).eq(0)
    const result = [...pipe(filterEx(spy), map(mult2))(data)]
    expect(result).deep.eq([4, 8])
    expect(spy.callCount()).eq(data.length)
  })

  it('works with Generators', function () {
    const iterator = gen(5)
    const spy = makeSpy(isEven)
    expect(spy.callCount()).eq(0)
    const result = [...filterEx(spy)(iterator)]
    expect(result).deep.eq([0, 2, 4])
    expect(spy.callCount()).eq(5)
  })
})
