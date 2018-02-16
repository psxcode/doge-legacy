import { expect } from 'chai'
import { pipe, bind } from '@doge/helpers'
import { mult2 } from './test-helpers'
import { map } from './map'
import { concat } from './concat'

describe('[ concat ]', function () {
  it('works with arrays', function () {
    const data0 = [1, 2, 3, 4, 5]
    const data1 = [6, 7, 8, 9]
    const result = [...concat(data0, data1)]
    expect(result).deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('works chained', function () {
    const data0 = [1, 2, 3, 4, 5]
    const data1 = [6, 7, 8, 9]
    const result = [...pipe(bind(data0)(concat), map(mult2))(data1)]
    expect(result).deep.eq([2, 4, 6, 8, 10, 12, 14, 16, 18])
  })
})
