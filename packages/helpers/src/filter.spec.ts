import { expect } from 'chai'
import { makeSpy } from './test-helpers'
import { filter } from './filter'

const isEven = (x: number) => x % 2 === 0
const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}

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
