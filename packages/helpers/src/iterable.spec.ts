import { expect } from 'chai'
import { filter, iterate, length, map, reduce } from './iterable'
import { makeSpy } from './test-helpers'

const multBy = (x: number) => (val: number) => val * x
const isEven = (x: number) => x % 2 === 0
const add = (a: number, b: number) => a + b
const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}

describe('[ iterable ]', function () {
  describe('[ iterate ]', function () {
    it('should work with arrays', function () {
      const data = [1, 2, 3, 4, 5]
      const result = [...iterate(data)]
      expect(result).deep.eq([1, 2, 3, 4, 5])
    })

    it('should work with Sets', function () {
      const data = new Set([1, 2, 3, 4, 5])
      const result = [...iterate(data)]
      expect(result).deep.eq([1, 2, 3, 4, 5])
    })

    it('should work with Generators', function () {
      const data = gen(5)
      const result = [...iterate(data)]
      expect(result).deep.eq([0, 1, 2, 3, 4])
    })
  })

  describe('[ map ]', function () {
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

  describe('[ filter ]', function () {
    it('works with arrays', function () {
      const data = [1, 2, 3, 4, 5]
      const spy = makeSpy(isEven)
      expect(spy.callCount()).eq(0)
      const result = [...filter(spy, data)]
      expect(result).deep.eq([2, 4])
      expect(spy.callCount()).eq(data.length)
    })

    it('works with Generators', function () {
      const iterator = gen(5)
      const spy = makeSpy(isEven)
      expect(spy.callCount()).eq(0)
      const result = [...filter(spy, iterator)]
      expect(result).deep.eq([0, 2, 4])
      expect(spy.callCount()).eq(5)
    })
  })

  describe('[ reduce ]', function () {
    it('works with arrays', function () {
      const data = [1, 2, 3, 4, 5]
      const spy = makeSpy(add)
      expect(spy.callCount()).eq(0)
      const result = reduce(spy, 0, data)
      expect(spy.callCount()).eq(data.length)
      expect(result).eq(15)
    })

    it('works with Generators', function () {
      const data = gen(6)
      const spy = makeSpy(add)
      expect(spy.callCount()).eq(0)
      const result = reduce(spy, 0, data)
      expect(spy.callCount()).eq(6)
      expect(result).eq(15)
    })
  })

  describe('[ length ]', function () {
    it('should work with arrays', function () {
      const data = [1, 2, 3, 4, 5]
      const result = length()(data)
      expect(result).eq(data.length)
    })

    it('should work with maxLength', function () {
      const data = [1, 2, 3, 4, 5]
      const result = length(2)(data)
      expect(result).eq(2)
    })

    it('should work negative maxLength', function () {
      const data = [1, 2, 3, 4, 5]
      const result = length(-2)(data)
      expect(result).eq(data.length)
    })

    it('should work maxLength === 0', function () {
      const data = [1, 2, 3, 4, 5]
      const result = length(0)(data)
      expect(result).eq(0)
    })

    it('should work with Sets', function () {
      const data = new Set([1, 2, 3, 4, 5])
      const result = length()(data)
      expect(result).eq(5)
    })

    it('should work with Generators', function () {
      const data = gen(5)
      const result = length()(data)
      expect(result).eq(5)
    })
  })
})
