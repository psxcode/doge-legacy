import { expect } from 'chai'
import { makeSpy } from './test-helpers'
import { reduce } from './reduce'

const add = (a: number, b: number) => a + b
const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}

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
