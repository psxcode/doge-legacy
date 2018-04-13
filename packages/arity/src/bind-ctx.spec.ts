import { expect } from 'chai'
import { pipe } from '@doge/compose'
import bindCtx from './bind-ctx'

const getCtx = function () {
  return this
}

describe('[ bindCtx ]', function () {
  it('should work as a constant', function () {
    const ctx = {
      value: 10
    }
    const binded = bindCtx(ctx)(getCtx)
    expect(binded()).deep.eq(ctx)
  })

  it('should work with pipe', function () {
    const ctx = {
      value: 10
    }
    const ctx2 = {
      value: 20
    }
    const binded = pipe(bindCtx(ctx), bindCtx(ctx2))(getCtx)
    expect(binded()).deep.eq(ctx)
  })
})
