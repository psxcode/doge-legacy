import { expect } from 'chai'
import { pipe } from '@psxcode/compose'
import map from './map'
import first from './first'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ first ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...first(data)]
    expect(result).deep.eq([1])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(map(mult2), first)(data)]
    expect(result).deep.eq([2])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...first(data)]
    expect(result).deep.eq([0])
  })
})
