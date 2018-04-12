import { expect } from 'chai'
import { pipe } from '@doge/compose'
import { mult2 } from './test-helpers'
import { map } from './map'
import { distinct } from './distinct'

describe('[ distinct ]', function () {
  it('works with arrays', function () {
    const data = [1, 1, 3, 3, 4, 3]
    const result = [...distinct(data)]
    expect(result).deep.eq([1, 3, 4, 3])
  })

  it('works chained', function () {
    const data = [1, 1, 3, 3, 4, 3]
    const result = [...pipe(map(mult2), distinct)(data)]
    expect(result).deep.eq([2, 6, 8, 6])
  })
})
