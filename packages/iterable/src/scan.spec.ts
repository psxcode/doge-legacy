import { expect } from 'chai'
import { pipe } from '@doge/compose'
import { add, gen, makeSpy, mult2 } from './test-helpers'
import { map } from './map'
import { scan, scanEx } from './scan'

describe('[ scan ]', function () {
  it('works with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(add)
    expect(spy.callCount()).eq(0)
    const result = [...scan(spy)(data)]
    expect(spy.callCount()).eq(data.length + 1)
    expect(result).deep.eq([1, 3, 6, 10, 15])
  })

  it('works chained', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(add)
    expect(spy.callCount()).eq(0)
    const result = [...pipe(scan(spy), map(mult2))(data)]
    expect(spy.callCount()).eq(data.length + 1)
    expect(result).deep.eq([2, 6, 12, 20, 30])
  })

  it('works with Generators', function () {
    const data = gen(6)
    const spy = makeSpy(add)
    expect(spy.callCount()).eq(0)
    const result = [...scan(spy)(data)]
    expect(spy.callCount()).eq(6 + 1)
    expect(result).deep.eq([0, 1, 3, 6, 10, 15])
  })
})

describe('[ scanEx ]', function () {
  it('works with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(add)
    expect(spy.callCount()).eq(0)
    const result = [...scanEx(spy, 0)(data)]
    expect(spy.callCount()).eq(data.length)
    expect(result).deep.eq([1, 3, 6, 10, 15])
  })

  it('works chained', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(add)
    expect(spy.callCount()).eq(0)
    const result = [...pipe(scanEx(spy, 0), map(mult2))(data)]
    expect(spy.callCount()).eq(data.length)
    expect(result).deep.eq([2, 6, 12, 20, 30])
  })

  it('works with Generators', function () {
    const data = gen(6)
    const spy = makeSpy(add)
    expect(spy.callCount()).eq(0)
    const result = [...scanEx(spy, 0)(data)]
    expect(spy.callCount()).eq(6)
    expect(result).deep.eq([0, 1, 3, 6, 10, 15])
  })
})
