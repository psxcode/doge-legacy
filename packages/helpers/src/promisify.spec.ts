/* tslint:disable:no-unused-expression no-duplicate-imports */
import { expect } from 'chai'
import { promisify } from './promisify'

type NodeCallback = (err: Error | null, result?: any) => void
const makeNodeAsyncSpy = (res: any) =>
  (arg: any, callback: NodeCallback) => {
    callback(null, res)
  }
const makeNodeAsyncNoArgSpy = (res: any) =>
  (callback: NodeCallback) => {
    callback(null, res)
  }
const makeNodeErrorSpy = () =>
  (arg: any, callback: NodeCallback) => {
    callback(new Error('error result'))
  }
const makeNodeThrowingSpy = () =>
  (arg: any, callback: NodeCallback) => {
    throw new Error('crash during async operation')
  }

describe('[ promisify ]', function () {
  it('should work with \'node-async-style\' function', async function () {
    const spy = promisify(makeNodeAsyncSpy(42))
    expect(await spy('answer')).eq(42)
  })

  it('should work with \'node-async-style\' function without input', async function () {
    const spy = promisify(makeNodeAsyncNoArgSpy(42))
    expect(await spy()).eq(42)
  })

  it('should handle error returned from async operation', async function () {
    const spy = promisify(makeNodeErrorSpy())
    try {
      await spy(42)
      throw new Error('should not reach this point')
    } catch (e) {
      expect(e.message).eq('error result')
    }
  })

  it('should handle async operation crash', async function () {
    const spy = promisify(makeNodeThrowingSpy())
    try {
      await spy(42)
      throw new Error('should not reach this point')
    } catch (e) {
      expect(e.message).eq('crash during async operation')
    }
  })
})
