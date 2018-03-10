import { expect } from 'chai'
import * as sinon from 'sinon'
import { waitRaw, waitPromiseRaw, pingRaw } from './wait'

const timeoutId = 42
const expectedTimeoutMs = 1000
const getTimeoutMs = () => expectedTimeoutMs

const timeoutSpy = (cb: any, ms: number) => {
  expect(expectedTimeoutMs).eq(ms)
  setImmediate(cb)
  return timeoutId
}

const clearTimeoutSpy = (id: any) => {
  expect(timeoutId).eq(id)
}

describe('[ wait ]', function () {
  describe('[ waitRaw ]', function () {
    it('should work', function (done) {
      waitRaw(timeoutSpy, clearTimeoutSpy)(getTimeoutMs, done)()
    })

    it('should cancel', function () {
      const spy = sinon.spy()
      const unsub = waitRaw(timeoutSpy, clearTimeoutSpy)(getTimeoutMs, spy)()
      unsub()
      sinon.assert.notCalled(spy)
    })
  })

  describe('[ waitPromiseRaw ]', function () {
    it('should work', async function () {
      await waitPromiseRaw(timeoutSpy)(getTimeoutMs)()
    })
  })

  describe('[ pingRaw ]', function () {
    it('should work', async function () {
      let i = 0
      await new Promise(res => {
        const unsub = pingRaw(timeoutSpy, clearTimeoutSpy)(getTimeoutMs, () => {
          if (i++ > 2) {
            unsub()
            res()
          }
        })()
      }).then(() => {
        expect(i > 0).eq(true)
      })
    })
  })
})
