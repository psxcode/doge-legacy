import { expect } from 'chai'
import { pipe, pipeAsync, all, allAsync } from './pipe'
import { waitPromise } from './wait'

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
const wait = waitPromise(setTimeout)

describe('[ pipe ]', function () {
  describe('[ pipe ]', function () {
    it('should return the identity function', function () {
      const piped = pipe()
      expect(piped(1)).eq(1)
    })

    it('should work with a constant function', function () {
      const piped = pipe(constant(10))
      expect(piped()).eq(10)
    })

    it('should work with a constant function', function () {
      const piped = pipe(constant(10), add(2), toString)
      expect(piped()).eq('12')
    })

    it('should work with a discarding constant function', function () {
      const piped = pipe(add(2), constant(10), toString)
      expect(piped(2)).eq('10')
    })

    it('should work with one function', function () {
      const piped = pipe(add(2))
      expect(piped(2)).eq(4)
    })

    it('should work with two functions', function () {
      const piped = pipe(add(2), mult(10))
      expect(piped(0)).eq(20)
    })

    it('should work with functions returning different type', function () {
      const piped = pipe(mult(10), toString)
      expect(piped(1)).eq('10')
    })

    it('should work with functions returning different type', function () {
      const piped = pipe(toNumber, mult(10))
      expect(piped('10')).eq(100)
    })
  })

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

  describe('[ all ]', function () {
    it('should return the identity function', function () {
      const piped = all()
      expect(piped(1)).deep.eq([1])
    })

    it('should work with a constant function', function () {
      const piped = all(constant(10))
      expect(piped(4)).deep.eq([10])
    })

    it('should work with one function', function () {
      const piped = all(add(2))
      expect(piped(2)).deep.eq([4])
    })

    it('should work with multiple functions', function () {
      const piped = all(constant(10), add(2), toString)
      expect(piped(4)).deep.eq([10, 6, '4'])
    })

    it('should work with functions returning different type', function () {
      const piped = all(toNumber, pipe(toNumber, mult(10)))
      expect(piped('10')).deep.eq([10, 100])
    })
  })

  describe('[ allAsync ]', function () {
    it('should return the identity function', async function () {
      const piped = allAsync()
      expect(await piped(1)).deep.eq([1])
    })

    it('should work with a constant function', async function () {
      const piped = allAsync(constant(10))
      expect(await piped(4)).deep.eq([10])
    })

    it('should work with one function', async function () {
      const piped = allAsync(add(2))
      expect(await piped(2)).deep.eq([4])
    })

    it('should work with multiple functions', async function () {
      const piped = allAsync(constant(10), addAsync(2), toString)
      expect(await piped(4)).deep.eq([10, 6, '4'])
    })

    it('should work with functions returning different type', async function () {
      const piped = allAsync(toNumber, pipe(toNumber, multAsync(10)))
      expect(await piped('10')).deep.eq([10, 100])
    })
  })
})
