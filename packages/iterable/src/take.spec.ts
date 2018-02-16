import { expect } from 'chai'
import { pipe } from '@doge/helpers'
import { gen, mult2 } from './test-helpers'
import { map } from './map'
import { take } from './take'

describe('[ take ]', function () {
  it('works with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const result = [...take(3)(data)]
    expect(result).deep.eq([1, 2, 3])
  })

  it('works chained', function () {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(map(mult2), take(2))(data)]
    expect(result).deep.eq([2, 4])
  })

  it('works with Generators', function () {
    const data = gen(5)
    const result = [...take(2)(data)]
    expect(result).deep.eq([0, 1])
  })
})
