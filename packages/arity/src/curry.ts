import { AnyFn } from './types'

const curry = (fn: AnyFn, fnLength = fn.length) => {
  let allArgs: any[] = []
  return function curried (...args: any[]) {
    allArgs = [...allArgs, ...args]
    return allArgs.length < fnLength ? curried : fn(...allArgs)
  }
}

export default curry
