import { expect } from 'chai'
import { pipe } from '@doge/helpers'
import { gen, mult2 } from './test-helpers'
import { map } from './map'
import { slice } from './slice'

describe('[ slice ]', function () {
  it('works with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const result = [...slice(1, 3)(data)]
    expect(result).deep.eq([2, 3, 4])
  })

  it('works chained', function () {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(map(mult2), slice(2, 2))(data)]
    expect(result).deep.eq([6, 8])
  })

  it('works with Generators', function () {
    const data = gen(5)
    const result = [...slice(2, 1)(data)]
    expect(result).deep.eq([2])
  })
})
