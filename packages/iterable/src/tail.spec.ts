import { expect } from 'chai'
import { pipe } from '@doge/compose'
import map from './map'
import tail from './tail'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ tail ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...tail(2)(data)]
    expect(result).deep.eq([4, 5])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(map(mult2), tail(2))(data)]
    expect(result).deep.eq([8, 10])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...tail(2)(data)]
    expect(result).deep.eq([3, 4])
  })
})
