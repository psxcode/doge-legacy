import * as sinon from 'sinon'
import gather from './gather'

describe('[ gather ]', function () {
  it('should work', function () {
    const spy = sinon.spy()
    const f = gather(spy)
    f('a', 'b', 'c')
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy, ['a', 'b', 'c'])
  })
})
