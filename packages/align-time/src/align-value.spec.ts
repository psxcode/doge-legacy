import { expect } from 'chai'
import { alignValue } from './align-value'

describe('[ alignValue ]', function () {

  it('should floor values properly', function () {
    const floor15 = alignValue(15, Math.floor)
    const given = [59, 32, 15, 0, -4, 37.5]
    const expected = [45, 30, 15, 0, -15, 30]
    const result = given.map(floor15)

    expect(result).deep.eq(expected)
  })

  it('should ceil values properly', function () {
    const floor15 = alignValue(15, Math.ceil)
    const given = [59, 32, 15, 0, -4, 37.5]
    const expected = [60, 45, 15, 0, -0, 45]
    const result = given.map(floor15)

    expect(result).deep.eq(expected)
  })
})
