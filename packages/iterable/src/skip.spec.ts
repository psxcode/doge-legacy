import { expect } from 'chai'
import { pipe } from '@doge/compose'
import map from './map'
import skip from './skip'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ skip ]', function () {
  it('works with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const result = [...skip(2)(data)]
    expect(result).deep.eq([3, 4, 5])
  })

  it('works chained', function () {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(skip(2), map(mult2))(data)]
    expect(result).deep.eq([6, 8, 10])
  })

  it('works with Generators', function () {
    const data = gen(5)
    const result = [...skip(2)(data)]
    expect(result).deep.eq([2, 3, 4])
  })
})
