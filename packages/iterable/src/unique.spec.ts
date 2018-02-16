import { expect } from 'chai'
import { pipe } from '@doge/helpers'
import { mult2 } from './test-helpers'
import { map } from './map'
import { unique } from './unique'

describe('[ unique ]', function () {
  it('works with arrays', function () {
    const data = [1, 1, 3, 4, 3]
    const result = [...unique(data)]
    expect(result).deep.eq([1, 3, 4])
  })

  it('works chained', function () {
    const data = [1, 1, 3, 4, 3]
    const result = [...pipe(map(mult2), unique)(data)]
    expect(result).deep.eq([2, 6, 8])
  })
})
