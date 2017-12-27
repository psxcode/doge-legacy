import { expect } from 'chai'
import { pipeAsync } from './pipe-async'

const add = (arg0: number) => (arg1: number): number => arg0 + arg1
const mult = (arg0: number) => (arg1: number): number => arg0 * arg1
const constant = <T>(arg: T) => (): T => arg
const toString = (arg: any): string => `${arg}`
const toNumber = (arg: string): number => Number(arg)

describe('[ pipe-async ]', function () {
  it('', async function () {
    const piped = pipeAsync()
    const res = await piped(1)
    expect(res).eq(1)
  })

  it('', async function () {
    const piped = pipeAsync(constant('aaa'))
    const res = await piped()
    expect(res).eq('aaa')
  })

  it('', async function () {
    const piped = pipeAsync(add(2))
    const res = await piped(2)
    expect(res).eq(4)
  })

  it('', async function () {
    const piped = pipeAsync(add(2), mult(10))
    const res = await piped(0)
    expect(res).eq(20)
  })

  it('', async function () {
    const piped = pipeAsync(mult(10), add(2))
    const res = await piped(1)
    expect(res).eq(12)
  })

  it('', async function () {
    const piped = pipeAsync(mult(10), toString)
    const res = await piped(1)
    expect(res).eq('10')
  })

  it('', async function () {
    const piped = pipeAsync(toNumber, mult(10))
    const res = await piped('1')
    expect(res).eq(10)
  })
})
