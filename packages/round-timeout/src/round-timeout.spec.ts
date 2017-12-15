import { assert, expect } from 'chai'
import { spy, assert as sinonAssert } from 'sinon'
import { roundTimeout, roundTimeoutPromise } from './index'
import { timeframes } from './timeframes'
import { roundValue } from './round-value'

const noop = () => void 0
const assertIsPositiveNumber = (x: number) => {
  assert(typeof x === 'number' && x > 0, 'value should be positive number')
}

const nows = [0, 1, 5, 5.5, 10, 11, 1000, 1001, 10000, 10000.5]

nows.forEach((now) => {

  describe(`[ roundTimeout ] [now = ${now}]`, function () {

    const timeoutSpy = (expectedCallback: any, expectedMs: number, next: any) =>
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
        const expectedEndTime = roundValue(timeStep, Math.ceil)(startTime + 1)
        const spy = timeoutSpy(noop, expectedEndTime - startTime, done)

        roundTimeout(spy, noop)(timeStep)(noop)(startTime)
      })
    })
  })

  describe(`[ roundTimeoutPromise ] [now = ${now}]`, function () {

    const timeoutSpy = (expectedMs: number) =>
      (resolve: Function, ms: number) => {
        expect(ms).eq(expectedMs)
        resolve()
      }

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

describe('[ roundTimeout ]', function () {
  it('', function () {
    const timeoutSpy = (resolve: any, ms: number) => 10
    const clearSpy = spy()
    const cancel = roundTimeout(timeoutSpy, clearSpy)(0)(noop)(0)

    /* invoke cancel */
    cancel()

    sinonAssert.calledOnce(clearSpy)
    sinonAssert.calledWith(clearSpy, 10)
  })
})
