import * as sinon from 'sinon'
import spread from './spread'

describe('[ spread ]', function () {
  it('should work', function () {
    const spy = sinon.spy()
    const f = spread(spy)
    f(['a', 'b', 'c'])
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy, 'a', 'b', 'c')
  })
})
