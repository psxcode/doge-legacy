import { expect } from 'chai'
import { wait } from './wait'

const timeoutSpy = (expectMs: number) => (cb: any, ms: number) => {
  expect(expectMs).eq(ms)
  cb()
}

describe('[ wait ]', function () {
  it('should work', function (done) {
    wait(timeoutSpy(1000))(1000).then(done)
  })
})
