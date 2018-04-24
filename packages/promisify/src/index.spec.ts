/* tslint:disable:no-unused-expression no-duplicate-imports */
import { expect } from 'chai'
import * as fs from 'fs'
import promisify, { NodeCb } from './index'

type NodeCallback<R> = (err: Error | null, result?: R) => void
const makeNodeAsyncSpy = <T, R> (res: R) => (arg: T, cb: NodeCallback<R>) => cb(null, res)
const makeNodeAsyncNoArgSpy = <R> (res: R) => (cb: NodeCallback<R>) => cb(null, res)
const makeNodeErrorSpy = <T> () => (arg: T, cb: NodeCallback<null>) => cb(new Error('error result'))
const makeNodeThrowingSpy = <T> () => (arg: T, cb: NodeCallback<never>) => {
  throw new Error('crash during async operation')
}

describe('[ promisify ]', () => {
  it('should work with \'node-async-style\' function', async () => {
    const spy = promisify(makeNodeAsyncSpy<string, number>(42))
    expect(await spy('answer')).eq(42)
  })

  /*it('should work with \'node-async-style\' function without input', async () => {
    const spy = promisify(makeNodeAsyncNoArgSpy(42))
    expect(await spy(null)).eq(42)
  })*/

  it('should handle error returned from async operation', async () => {
    const spy = promisify(makeNodeErrorSpy<number>())
    try {
      await spy(42)
      throw new Error('should not reach this point')
    } catch (e) {
      expect(e.message).eq('error result')
    }
  })

  it('should handle async operation crash', async () => {
    const spy = promisify(makeNodeThrowingSpy<number>())
    try {
      await spy(42)
      throw new Error('should not reach this point')
    } catch (e) {
      expect(e.message).eq('crash during async operation')
    }
  })

  function over (arg: number, cb: (err: any, res: string) => void): void
  function over (arg: boolean, cb: (err: any, res: number) => void): void
  function over (arg: any, cb: Function): void {
    cb(arg)
  }

  it('should handle node functions', async () => {
    const read = promisify(over)
    const val = read('')
  })
})
