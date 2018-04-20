import { expect } from 'chai'
import * as sinon from 'sinon'
import { iterate } from '@psxcode/iterable'
import { waitTimePromise as wait } from '@doge/wait'
import { makeDataSpy, makeSmallRange, waitForEndOrError } from './helpers/helpers'
import { makeReadable } from './helpers/readable'
import { IEEValue } from './events'
import subscribeEx from './subscribe-ex'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}

describe('[ subscribeEx ]', () => {
  xit('should work with single stream', async () => {
    const d1 = [0, 1]
    const s1 = makeReadable({})({ objectMode: true })(iterate(d1))
    const expextedData = Array.from(d1).map((v): IEEValue => ({ value: v, index: 0, ee: s1 }))
    const spy = makeDataSpy()

    await wait(100)
    subscribeEx({ next: spy })(s1)

    await waitForEndOrError(s1, 10)
    console.log(spy.data())
    expect(spy.data()).deep.eq(expextedData)
  })

  xit('should work with multiple streams', async () => {
    const d1 = [0, 1, 2, 3, 4]
    const d2 = gen(5)
    const s1 = makeReadable({ delayMs: 10 })({ objectMode: true })(iterate(d1))
    const s2 = makeReadable({ delayMs: 15 })({ objectMode: true })(iterate(d2))
    const spy = makeDataSpy()

    await wait(100)
    subscribeEx({ next: spy })(s1, s2)

    await waitForEndOrError(s2, 10)
    expect(spy.data().length).eq(10)
  })

  xit('should work with complete', async () => {
    const d1 = [0, 1, 2, 3, 4]
    const d2 = gen(5)
    const s1 = makeReadable({ delayMs: 10 })({ objectMode: true })(iterate(d1))
    const s2 = makeReadable({ delayMs: 15 })({ objectMode: true })(iterate(d2))
    const spy = makeDataSpy()
    const completeSpy = sinon.spy()

    await wait(100)
    subscribeEx({ next: spy, complete: completeSpy })(s1, s2)

    await waitForEndOrError(s2, 10)
    expect(spy.data().length).eq(10)
    sinon.assert.calledOnce(completeSpy)
  })

  xit('should work with unsubscribe', async () => {
    const d1 = makeSmallRange(2)
    const s1 = makeReadable({ delayMs: 10 })({ objectMode: true })(iterate(d1))
    const spy = makeDataSpy()
    const completeSpy = sinon.spy()

    await wait(100)
    const unsub = subscribeEx({ next: spy, complete: completeSpy })(s1)

    await wait(30)
    unsub()

    await waitForEndOrError(s1, 10)
    expect(spy.data().length).not.eq(Array.from(d1).length)
    sinon.assert.notCalled(completeSpy)
  })
})
