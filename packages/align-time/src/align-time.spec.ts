import { assert, expect } from 'chai'
import { alignTime, alignTimePromise } from './index'
import { timeframes } from './timeframes'
import { alignValue } from './align-value'

const noop = () => void 0
const assertIsPositiveNumber = (x: number) => {
  assert(typeof x === 'number' && x > 0, 'value should be positive number')
}

const nows = [0, 1, 5, 5.5, 10, 11, 1000, 1001, 10000, 10000.5]

nows.forEach((now) => {

  describe(`[ helpers / align-time / alignTime ] [now = ${now}]`, function () {

    const timeoutSpy = (expectedCallback, expectedMs, next) =>
      (cb: Function, ms: number) => {
        expect(cb).eq(expectedCallback)
        expect(ms).eq(expectedMs)
        return next()
      }

    Object.keys(timeframes).forEach((timeframeName) => {
      it(`should call back within time aligned to ${timeframeName}`, function (done) {
        const startTime = now
        const timeStep = timeframes[timeframeName]
        assertIsPositiveNumber(timeStep)
        const expectedEndTime = alignValue(timeStep, Math.ceil)(startTime + 1)
        const spy = timeoutSpy(noop, expectedEndTime - startTime, done)

        alignTime(spy, noop)(timeStep)(noop)(startTime)
      })
    })
  })

  describe(`[ helpers / align-time / alignTimePromise ] [now = ${now}]`, function () {

    const timeoutSpy = (expectedMs) =>
      (resolve: Function, ms: number) => {
        expect(ms).eq(expectedMs)
        resolve()
      }

    Object.keys(timeframes).forEach((timeframeName) => {
      it(`should resolve a promise within time aligned to ${timeframeName}`, function () {
        const startTime = now
        const timeStep = timeframes[timeframeName]
        assertIsPositiveNumber(timeStep)
        const expectedEndTime = alignValue(timeStep, Math.ceil)(startTime + 1)
        const spy = timeoutSpy(expectedEndTime - startTime)

        return alignTimePromise(spy, noop)(timeStep)(startTime)
      })
    })
  })
})
