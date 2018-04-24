import { expect } from 'chai'
import { pipe } from '@psxcode/compose'
import bindCtx from './bind-ctx'

const getCtx = () => {
  return this
}

describe('[ bindCtx ]', () => {
  it('should work as a constant', () => {
    const ctx = {
      value: 10
    }
    const binded = bindCtx(ctx)(getCtx)
    expect(binded()).deep.eq(ctx)
  })

  it('should work with pipe', () => {
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
