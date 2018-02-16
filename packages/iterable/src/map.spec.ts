import { expect } from 'chai'
import { pipe } from '@doge/helpers'
import { gen, makeSpy, mult1, mult2 } from './test-helpers'
import { map, mapEx } from './map'

describe('[ map ]', function () {
  it('works with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(mult2)
    expect(spy.callCount()).eq(0)
    const result = [...map(spy)(data)]
    expect(result).deep.eq([2, 4, 6, 8, 10])
    expect(spy.callCount()).eq(data.length)
  })

  it('works with Sets', function () {
    const data = new Set([1, 2, 3, 4, 5])
    const spy = makeSpy(mult1)
    expect(spy.callCount()).eq(0)
    for (let val of map(spy)(data)) {
      expect(data.has(val)).eq(true)
    }
    expect(spy.callCount()).eq(5)
  })

  it('works with Generators', function () {
    const iterator = gen(5)
    const spy = makeSpy(mult2)
    expect(spy.callCount()).eq(0)
    const result = [...map(spy)(iterator)]
    expect(result).deep.eq([0, 2, 4, 6, 8])
    expect(spy.callCount()).eq(5)
  })

  it('works chained', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(mult2)
    expect(spy.callCount()).eq(0)
    const result = [...pipe(map(mult2), map(spy))(data)]
    expect(result).deep.eq([4, 8, 12, 16, 20])
    expect(spy.callCount()).eq(data.length)
  })
})

describe('[ mapEx ]', function () {
  it('works with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(mult2)
    expect(spy.callCount()).eq(0)
    const result = [...mapEx(spy)(data)]
    expect(result).deep.eq([2, 4, 6, 8, 10])
    expect(spy.callCount()).eq(data.length)
  })

  it('works with Sets', function () {
    const data = new Set([1, 2, 3, 4, 5])
    const spy = makeSpy(mult1)
    expect(spy.callCount()).eq(0)
    for (let val of mapEx(spy)(data)) {
      expect(data.has(val)).eq(true)
    }
    expect(spy.callCount()).eq(5)
  })

  it('works with Generators', function () {
    const iterator = gen(5)
    const spy = makeSpy(mult2)
    expect(spy.callCount()).eq(0)
    const result = [...mapEx(spy)(iterator)]
    expect(result).deep.eq([0, 2, 4, 6, 8])
    expect(spy.callCount()).eq(5)
  })

  it('works chained', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(mult2)
    expect(spy.callCount()).eq(0)
    const result = [...pipe(mapEx(mult2), mapEx(spy))(data)]
    expect(result).deep.eq([4, 8, 12, 16, 20])
    expect(spy.callCount()).eq(data.length)
  })
})
