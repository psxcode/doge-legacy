import { assert, expect } from 'chai'
import { roundTimeoutPromise } from './round-timeout-promise'
import { timeframes } from './timeframes'
import { roundValue } from './round-value'

const noop = () => void 0
const assertIsPositiveNumber = (x: number) => {
  assert(typeof x === 'number' && x > 0, 'value should be positive number')
}

const nows = [0, 1, 5, 5.5, 10, 11, 1000, 1001, 10000, 10000.5]
const timeoutSpy = (expectedMs: number) =>
  (resolve: Function, ms: number) => {
    expect(ms).eq(expectedMs)
    resolve()
  }

nows.forEach((now) => {
  describe(`[ roundTimeoutPromise ] [now = ${now}]`, function () {
    Object.keys(timeframes).forEach((timeframeName) => {
      it(`should resolve a promise within time aligned to ${timeframeName}`, function () {
        const startTime = now
        const timeStep = timeframes[timeframeName]
        assertIsPositiveNumber(timeStep)
        const expectedEndTime = roundValue(timeStep, Math.ceil)(startTime + 1)
        const spy = timeoutSpy(expectedEndTime - startTime)

        return roundTimeoutPromise(spy, noop)(timeStep)(startTime)
      })
    })
  })
})
