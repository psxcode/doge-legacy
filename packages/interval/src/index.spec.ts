import { expect } from 'chai'
import { alignTime, alignTimePromise, roundTime, timebuckets } from './index'

describe('[ helpers / align-time / roundTime ]', function () {

  describe('[ helpers / align-time / roundTime / 15min - Math.floor ]', function () {
    const floor15min = roundTime(timebuckets['15m'], Math.floor)

    it('should return a time floored to 15min', function () {
      const given = new Date(2017, 0, 0, 0, 17).getTime()
      const expected = new Date(2017, 0, 0, 0, 15).getTime()
      const result = floor15min(given)

      expect(result).eq(expected)
    })

    it('should not ceil if already aligned', function () {
      const given = new Date(2017, 0).getTime()
      const expected = new Date(2017, 0).getTime()
      const result = floor15min(given)

      expect(result).eq(expected)
    })
  })

  describe('[ helpers / align-time / roundTime / 15min - Math.ceil ]', function () {
    const ceil15min = roundTime(timebuckets['15m'], Math.ceil)

    it('should return a time ceiled to 15min', function () {
      const given = new Date(2017, 0, 0, 0, 17).getTime()
      const expected = new Date(2017, 0, 0, 0, 30).getTime()
      const result = ceil15min(given)

      expect(result).eq(expected)
    })

    it('should not ceil if already aligned', function () {
      const given = new Date(2017, 0).getTime()
      const expected = new Date(2017, 0).getTime()
      const result = ceil15min(given)

      expect(result).eq(expected)
    })
  })

  describe('[ helpers / align-time / roundTime / 1h - Math.floor ]', function () {
    const floor1hr = roundTime(timebuckets['1h'], Math.floor)

    it('should return a time floored to hour', function () {
      const given = new Date(2017, 0, 0, 1, 25, 17).getTime()
      const expected = new Date(2017, 0, 0, 1).getTime()
      const result = floor1hr(given)

      expect(result).eq(expected)
    })

    it('should not ceil if already aligned', function () {
      const given = new Date(2017, 0, 0, 0).getTime()
      const expected = new Date(2017, 0, 0, 0).getTime()
      const result = floor1hr(given)

      expect(result).eq(expected)
    })
  })

  describe('[ helpers / align-time / roundTime / 1h - Math.ceil ]', function () {
    const ceil1hr = roundTime(timebuckets['1h'], Math.ceil)

    it('should return a time ceiled to hour', function () {
      const given = new Date(2017, 0, 0, 0, 0, 1).getTime()
      const expected = new Date(2017, 0, 0, 1).getTime()
      const result = ceil1hr(given)

      expect(result).eq(expected)
    })

    it('should not ceil if already aligned', function () {
      const given = new Date(2017, 0, 0, 0).getTime()
      const expected = new Date(2017, 0, 0, 0).getTime()
      const result = ceil1hr(given)

      expect(result).eq(expected)
    })
  })

})

describe('[ helpers / align-time / alignTime ]', function () {

  it('should call back within proper time', function (done) {
    this.timeout(10 * 1000)

    const startTime = new Date().getTime()
    const expectedEndTime = roundTime(timebuckets['10s'], Math.ceil)(startTime)

    alignTime('10s')(cb)(startTime)

    function cb () {
      const endTime = new Date().getTime()
      expect(Math.abs(expectedEndTime - endTime)).lessThan(1000)
      done()
    }
  })

})

describe('[ helpers / align-time / alignTimePromise ]', function () {

  it('should call back within proper time', async function () {
    this.timeout(10 * 1000)

    const startTime = new Date().getTime()
    const expectedEndTime = roundTime(timebuckets['10s'], Math.ceil)(startTime)

    await alignTimePromise('10s')(startTime)

    const endTime = new Date().getTime()
    expect(Math.abs(expectedEndTime - endTime)).lessThan(1000)
  })

})
