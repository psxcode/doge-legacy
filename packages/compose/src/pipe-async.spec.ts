import { expect } from 'chai'
import pipeAsync from './pipe-async'

const add = (arg0: number) => (arg1: number): number => arg0 + arg1
const addAsync = (arg0: number) => (arg1: number): Promise<number> => Promise.resolve(arg0 + arg1)
const mult = (arg0: number) => (arg1: number): number => arg0 * arg1
const multAsync = (arg0: number) => (arg1: number): Promise<number> => Promise.resolve(arg0 * arg1)
const constant = <T> (arg: T) => () => arg
const toString = (arg: any): string => `${arg}`
const toNumber = (arg: string): number => Number(arg)
const throwing = (message: string) => (): any => {
  throw new Error(message)
}

describe('[ pipeAsync ]', function () {
  it('should return async \'identity\' function', async function () {
    const piped = pipeAsync()
    const res = await piped(1)
    expect(res).eq(1)
  })

  it('should work with sync \'constant\' function', async function () {
    const piped = pipeAsync(constant('aaa'))
    const res = await piped()
    expect(res).eq('aaa')
  })

  it('should work with a discarding \'constant\' function', async function () {
    const piped = pipeAsync(add(2), constant(10), toString)
    expect(await piped(2)).eq('10')
  })

  it('should work with single sync function', async function () {
    const piped = pipeAsync(add(2))
    const res = await piped(2)
    expect(res).eq(4)
  })

  it('should work with multiple sync functions', async function () {
    const piped = pipeAsync(add(2), mult(10))
    const res = await piped(0)
    expect(res).eq(20)
  })

  it('should work with multiple async functions', async function () {
    const piped = pipeAsync(addAsync(2), multAsync(10))
    const res = await piped(0)
    expect(res).eq(20)
  })

  it('should work with multiple sync functions with type conversion in between', async function () {
    const piped = pipeAsync(mult(10), toString)
    const res = await piped(1)
    expect(res).eq('10')
  })

  it('should work with multiple functions with type conversion in between', async function () {
    const piped = pipeAsync(multAsync(10), toString)
    const res = await piped(1)
    expect(res).eq('10')
  })

  it('should work with multiple sync functions with type conversion in between', async function () {
    const piped = pipeAsync(toNumber, multAsync(10))
    const res = await piped('1')
    expect(res).eq(10)
  })

  it('should handle throwing function', async function () {
    const piped = pipeAsync(throwing('error'))
    try {
      await piped()
      expect.fail('should not reach this point')
    } catch (e) {
      expect(e.message).eq('error')
    }
  })

  it('should handle throwing function inside pipe', async function () {
    const piped = pipeAsync(addAsync(2), throwing('error'), toString)
    try {
      await piped()
      expect.fail('should not reach this point')
    } catch (e) {
      expect(e.message).eq('error')
    }
  })
})