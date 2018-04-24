import { expect } from 'chai'
import * as sinon from 'sinon'
import { pipe } from '@psxcode/compose'
import map from './map'
import scanEx from './scan-ex'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
export const add = (a = 0, b = 0) => a + b
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ scanEx ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = sinon.spy(add)
    const result = [...scanEx(spy, 0)(data)]
    expect(spy.callCount).eq(data.length)
    expect(result).deep.eq([1, 3, 6, 10, 15])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = sinon.spy(add)
    const result = [...pipe(scanEx(spy, 0), map(mult2))(data)]
    expect(spy.callCount).eq(data.length)
    expect(result).deep.eq([2, 6, 12, 20, 30])
  })

  it('works with Generators', () => {
    const data = gen(6)
    const spy = sinon.spy(add)
    const result = [...scanEx(spy, 0)(data)]
    expect(spy.callCount).eq(6)
    expect(result).deep.eq([0, 1, 3, 6, 10, 15])
  })
})
