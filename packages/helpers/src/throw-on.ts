import { PredicateFn } from './types'

export const throwOn = <T> (predicate: PredicateFn<T>, throwFn: () => never) =>
  (fn: (...args: any[]) => T) => (...args: any[]): T | never => {
    const result: T = fn(...args)
    if (!predicate(result)) {
      throwFn()
    }
    return result
  }
