import { expect } from 'chai'
import { pipe } from '@doge/helpers'
import { gen, mult2 } from './test-helpers'
import { map } from './map'
import { skip } from './skip'

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
