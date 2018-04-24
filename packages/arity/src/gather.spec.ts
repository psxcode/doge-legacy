import * as sinon from 'sinon'
import gather from './gather'

describe('[ gather ]', () => {
  it('should work', () => {
    const spy = sinon.spy()
    const f = gather(spy)
    f('a', 'b', 'c')
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy, ['a', 'b', 'c'])
  })
})
