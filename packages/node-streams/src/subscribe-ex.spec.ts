import { expect } from 'chai'
import * as sinon from 'sinon'
import { IEEValue } from './types'
import subscribeEx from './subscribe-ex'
import { makeNumbers, readable, wait, waitForEvents } from '@psxcode/node-streams-test'

describe('[ subscribeEx ]', () => {
  xit('should work with single stream', async () => {
    const d1 = [0, 1]
    const s1 = readable({})({ objectMode: true })(d1)
    const expextedData = Array.from(d1).map((v): IEEValue => ({ value: v, index: 0, ee: s1 }))
    const spy = makeDataSpy()

    await wait(100)
    subscribeEx({ next: spy })(s1)

    await waitForEvents('end', 'error')(s1)
    await wait(20)
    console.log(spy.data())
    expect(spy.data()).deep.eq(expextedData)
  })

  xit('should work with multiple streams', async () => {
    const d1 = [0, 1, 2, 3, 4]
    const d2 = makeNumbers(8)
    const s1 = readable({ delayMs: 10 })({ objectMode: true })(d1)
    const s2 = readable({ delayMs: 15 })({ objectMode: true })(d2)
    const spy = makeDataSpy()

    await wait(100)
    subscribeEx({ next: spy })(s1, s2)

    await waitForEvents('end', 'error')(s1)
    await wait(20)
    expect(spy.data().length).eq(10)
  })

  xit('should work with complete', async () => {
    const d1 = [0, 1, 2, 3, 4]
    const d2 = makeNumbers(8)
    const s1 = readable({ delayMs: 10 })({ objectMode: true })(d1)
    const s2 = readable({ delayMs: 15 })({ objectMode: true })(d2)
    const spy = makeDataSpy()
    const completeSpy = sinon.spy()

    await wait(100)
    subscribeEx({ next: spy, complete: completeSpy })(s1, s2)

    await waitForEvents('end', 'error')(s1)
    await wait(20)
    expect(spy.data().length).eq(10)
    sinon.assert.calledOnce(completeSpy)
  })

  xit('should work with unsubscribe', async () => {
    const d1 = makeNumbers(8)
    const s1 = readable({ delayMs: 10 })({ objectMode: true })(d1)
    const spy = makeDataSpy()
    const completeSpy = sinon.spy()

    await wait(100)
    const unsub = subscribeEx({ next: spy, complete: completeSpy })(s1)

    await wait(30)
    unsub()

    await waitForEvents('end', 'error')(s1)
    await wait(20)
    expect(spy.data().length).not.eq(Array.from(d1).length)
    sinon.assert.notCalled(completeSpy)
  })
})
