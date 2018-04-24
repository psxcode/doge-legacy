import { expect } from 'chai'
import { pipe } from '@psxcode/compose'
import map from './map'
import last from './last'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ last ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...last(data)]
    expect(result).deep.eq([5])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(map(mult2), last)(data)]
    expect(result).deep.eq([10])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...last(data)]
    expect(result).deep.eq([4])
  })
})
