import * as sinon from 'sinon'
import { roundIntervalObservable } from './round-interval-observable'
import { waitPromise } from '@doge/helpers'

const noop = () => void 0
const now = () => 0
const wait = waitPromise(setTimeout)

describe(`[ roundIntervalObservable ]`, function () {

  it(`should call back within time aligned to `, function () {
    const clearSpy = sinon.spy()
    const timeoutSpy = sinon.spy(() => clearSpy)
    const nextSpy = sinon.spy()
    const completeSpy = sinon.spy()

    const sub = roundIntervalObservable(timeoutSpy, now)(1000)
      .subscribe(nextSpy, noop, completeSpy)

    sub.unsubscribe()

    sinon.assert.notCalled(nextSpy)
    sinon.assert.notCalled(completeSpy)
    sinon.assert.calledOnce(timeoutSpy)
    sinon.assert.calledOnce(clearSpy)
  })

  it(`should call back within time aligned to `, async function () {
    const clearSpy = sinon.spy()
    const timeoutSpy = sinon.spy((cb: any) => {
      setImmediate(cb)
      return clearSpy
    })
    const nextSpy = sinon.spy()
    const completeSpy = sinon.spy()

    roundIntervalObservable(timeoutSpy, now)(1000)
      .take(2)
      .subscribe(nextSpy, noop, completeSpy)

    await wait(100)

    sinon.assert.calledTwice(nextSpy)
    sinon.assert.calledOnce(completeSpy)
    sinon.assert.calledTwice(timeoutSpy)
    sinon.assert.notCalled(clearSpy)
  })
})
