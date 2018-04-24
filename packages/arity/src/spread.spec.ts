import * as sinon from 'sinon'
import spread from './spread'

describe('[ spread ]', () => {
  it('should work', () => {
    const spy = sinon.spy()
    const f = spread(spy)
    f(['a', 'b', 'c'])
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy, 'a', 'b', 'c')
  })
})
