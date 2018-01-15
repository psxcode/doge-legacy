import { expect } from 'chai'
import { map } from './map'
import { reduce } from './reduce'
import { makeSpy } from './test-helpers'

const multBy = (x: number) => (val: number) => val * x
const isEven = (x: number) => x % 2 === 0
const add = (a: number, b: number) => a + b
const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}

describe.only('[ map ]', function () {
  it('works with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(multBy(2))
    expect(spy.callCount()).eq(0)
    const result = [...map(spy, data)]
    expect(result).deep.eq([2, 4, 6, 8, 10])
    expect(spy.callCount()).eq(data.length)
  })

  it('works with Sets', function () {
    const data = new Set([1, 2, 3, 4, 5])
    const spy = makeSpy(multBy(1))
    expect(spy.callCount()).eq(0)
    for (let val of map(spy, data)) {
      expect(data.has(val)).eq(true)
    }
    expect(spy.callCount()).eq(5)
  })

  it('works with Generators', function () {
    const iterator = gen(5)
    const spy = makeSpy(multBy(2))
    expect(spy.callCount()).eq(0)
    const result = [...map(spy, iterator)]
    expect(result).deep.eq([0, 2, 4, 6, 8])
    expect(spy.callCount()).eq(5)
  })

  it('works chained', function () {
    const data = [1, 2, 3, 4, 5]
    const spy = makeSpy(multBy(2))
    expect(spy.callCount()).eq(0)
    const result = [...map(spy, map(multBy(2), data))]
    expect(result).deep.eq([4, 8, 12, 16, 20])
    expect(spy.callCount()).eq(data.length)
  })
})
