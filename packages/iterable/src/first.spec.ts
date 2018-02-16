import { expect } from 'chai'
import { pipe } from '@doge/helpers'
import { gen, mult2 } from './test-helpers'
import { map } from './map'
import { first } from './first'

describe('[ first ]', function () {
  it('works with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const result = [...first(data)]
    expect(result).deep.eq([1])
  })

  it('works chained', function () {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(map(mult2), first)(data)]
    expect(result).deep.eq([2])
  })

  it('works with Generators', function () {
    const data = gen(5)
    const result = [...first(data)]
    expect(result).deep.eq([0])
  })
})
