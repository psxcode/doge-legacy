import { AnyFn } from './types'

const branch = <T> (pred: (arg?: T) => boolean, fn0: AnyFn, fn1: AnyFn) =>
  (arg?: T) => pred(arg) ? fn0(arg) : fn1(arg)

export default branch
