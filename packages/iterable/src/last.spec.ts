import { expect } from 'chai'
import { pipe } from '@doge/helpers'
import { gen, mult2 } from './test-helpers'
import { map } from './map'
import { last, lastn } from './last'

describe('[ last ]', function () {
  it('works with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const result = [...last(data)]
    expect(result).deep.eq([5])
  })

  it('works chained', function () {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(map(mult2), last)(data)]
    expect(result).deep.eq([10])
  })

  it('works with Generators', function () {
    const data = gen(5)
    const result = [...last(data)]
    expect(result).deep.eq([4])
  })
})

describe('[ lastn ]', function () {
  it('works with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const result = [...lastn(2)(data)]
    expect(result).deep.eq([4, 5])
  })

  it('works chained', function () {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(map(mult2), lastn(2))(data)]
    expect(result).deep.eq([8, 10])
  })

  it('works with Generators', function () {
    const data = gen(5)
    const result = [...lastn(2)(data)]
    expect(result).deep.eq([3, 4])
  })
})
