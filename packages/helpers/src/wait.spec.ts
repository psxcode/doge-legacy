import { expect } from 'chai'
import { wait, waitPromise } from './wait'

const timeoutSpy = (expectMs: number, returnId: any) => (cb: any, ms: number) => {
  expect(expectMs).eq(ms)
  cb()
  return returnId
}

const clearTimeoutSpy = (expectId: any) => (id: any) => {
  expect(expectId).eq(id)
}

describe('[ wait ]', function () {
  describe('[ wait ]', function () {
    it('should work', function (done) {
      wait(timeoutSpy(1000, 42), clearTimeoutSpy(42))(1000)(done)
    })
  })

  describe('[ wait ]', function () {
    it('should work', function (done) {
      waitPromise(timeoutSpy(1000, null))(1000).then(done)
    })
  })
})
