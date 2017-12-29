import { AnyFn, PredicateFn } from './types'

export const throwOn = (predicate: PredicateFn, errorMessage = '', ErrorContructor = Error) =>
  (fn: AnyFn) =>
    (...args: any[]): any | never => {
      const res: any = fn(...args)
      if (!predicate(res)) {
        throw new ErrorContructor(errorMessage)
      }
      return res
    }
