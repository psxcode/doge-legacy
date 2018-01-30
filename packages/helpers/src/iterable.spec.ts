import { expect } from 'chai'
import { filter, iterate, length, map, reduce, scan, unique } from './iterable'
import { makeSpy } from './test-helpers'
import { pipe } from './pipe'

const multBy = (x: number) => (val: number) => val * x
const mult1 = multBy(1)
const mult2 = multBy(2)
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
      const result = [...pipe(map(multBy(2)), map(spy))(data)]
      expect(result).deep.eq([4, 8, 12, 16, 20])
      expect(spy.callCount()).eq(data.length)
    })
  })

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

  describe('[ reduce ]', function () {
    it('works with arrays', function () {
      const data = [1, 2, 3, 4, 5]
      const spy = makeSpy(add)
      expect(spy.callCount()).eq(0)
      const result = [...reduce(spy, 0)(data)]
      expect(spy.callCount()).eq(data.length)
      expect(result).deep.eq([15])
    })

    it('works chained', function () {
      const data = [1, 2, 3, 4, 5]
      const spy = makeSpy(add)
      expect(spy.callCount()).eq(0)
      const result = [...pipe(reduce(spy, 0), map(mult2))(data)]
      expect(spy.callCount()).eq(data.length)
      expect(result).deep.eq([30])
    })

    it('works with Generators', function () {
      const data = gen(6)
      const spy = makeSpy(add)
      expect(spy.callCount()).eq(0)
      const result = [...reduce(spy, 0)(data)]
      expect(spy.callCount()).eq(6)
      expect(result).deep.eq([15])
    })
  })

  describe('[ scan ]', function () {
    it('works with arrays', function () {
      const data = [1, 2, 3, 4, 5]
      const spy = makeSpy(add)
      expect(spy.callCount()).eq(0)
      const result = [...scan(spy, 0)(data)]
      expect(spy.callCount()).eq(data.length)
      expect(result).deep.eq([1, 3, 6, 10, 15])
    })

    it('works chained', function () {
      const data = [1, 2, 3, 4, 5]
      const spy = makeSpy(add)
      expect(spy.callCount()).eq(0)
      const result = [...pipe(scan(spy, 0), map(mult2))(data)]
      expect(spy.callCount()).eq(data.length)
      expect(result).deep.eq([2, 6, 12, 20, 30])
    })

    it('works with Generators', function () {
      const data = gen(6)
      const spy = makeSpy(add)
      expect(spy.callCount()).eq(0)
      const result = [...scan(spy, 0)(data)]
      expect(spy.callCount()).eq(6)
      expect(result).deep.eq([0, 1, 3, 6, 10, 15])
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

  describe('[ unique ]', function () {
    it('works with arrays', function () {
      const data = [1, 1, 3, 4, 3]
      const result = [...unique(data)]
      expect(result).deep.eq([1, 3, 4])
    })

    it('works chained', function () {
      const data = [1, 1, 3, 4, 3]
      const result = [...pipe(map(mult2), unique)(data)]
      expect(result).deep.eq([2, 6, 8])
    })
  })
})
