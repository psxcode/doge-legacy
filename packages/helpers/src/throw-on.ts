import { AnyFn } from './promisify'

export type PredicateFn = (arg: any) => boolean
export const throwOn = (predicate: PredicateFn, errorMessage = '', Err = Error) =>
  (fn: AnyFn) =>
    (...args: any[]): any | never => {
      const res: any = fn(...args)
      if (predicate(res) !== true) {
        throw new Err(errorMessage)
      }
      return res
    }
