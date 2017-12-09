import { assert, expect } from 'chai'
import * as sinon from 'sinon'
import { roundIntervalObservable } from './index'

const noop = () => void 0
const assertIsPositiveNumber = (x: number) => {
  assert(typeof x === 'number' && x > 0, 'value should be positive number')
}
const now = (offset: number) => () => 0

describe(`[ roundIntervalObservable ]`, function () {

  it(`should call back within time aligned to `, function (done) {
    const timeoutSpy = sinon.spy(() => 42)
    const clearSpy = sinon.spy()
    const nextSpy = sinon.spy()
    const completeSpy = sinon.spy()

    const sub = roundIntervalObservable(timeoutSpy, clearSpy, now)(1000, 0)
      .subscribe(nextSpy, noop, completeSpy)

    sub.unsubscribe()

    sinon.assert.notCalled(nextSpy)
    sinon.assert.notCalled(completeSpy)
    sinon.assert.calledOnce(timeoutSpy)
    sinon.assert.calledOnce(clearSpy)
    sinon.assert.calledWith(clearSpy, 42)
    done()
  })

  it(`should call back within time aligned to `, function (done) {
    const timeoutSpy = sinon.spy((cb: any) => {
      setImmediate(cb)
      return 42
    })
    const clearSpy = sinon.spy()
    const nextSpy = sinon.spy()
    const completeSpy = sinon.spy()

    roundIntervalObservable(timeoutSpy, clearSpy, now)(1000, 0)
      .take(2)
      .subscribe(nextSpy, noop, completeSpy)

    setTimeout(() => {
      sinon.assert.calledTwice(nextSpy)
      sinon.assert.calledOnce(completeSpy)
      sinon.assert.calledTwice(timeoutSpy)
      sinon.assert.notCalled(clearSpy)
      done()
    }, 100)
  })
})
