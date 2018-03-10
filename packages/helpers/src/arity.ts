/* tslint:disable no-empty */
import { AnyFn, IHash, NamedFn, PositionalFn } from './types'

export const nullary = <R> (fn: (...args: any[]) => R) =>
  (..._: any[]): R => fn()

export const unary = <A, R> (fn: (arg: A, ...args: any[]) => R) =>
  (arg: A, ..._: any[]): R => fn(arg)

export const binary = <A, B, R> (fn: (arg1: A, arg2: B, ...args: any[]) => R) =>
  (arg1: A, arg2: B, ..._: any[]): R => fn(arg1, arg2)

export const ternary = <A, B, C, R> (fn: (arg1: A, arg2: B, arg3: C, ...args: any[]) => R) =>
  (arg1: A, arg2: B, arg3: C, ..._: any[]): R => fn(arg1, arg2, arg3)

export const voidify = (fn: AnyFn) =>
  (...args: any[]): void => {
    fn(...args)
  }

export const spread = (fn: AnyFn) =>
  (args: any[]): any => fn(...args)

export const gather = (fn: (args: any[]) => any) =>
  (...args: any[]): any => fn(args)

export const named = (keys: () => string[]) =>
  (fn: NamedFn<any>) =>
    (...args: any[]) =>
      fn(keys().reduce((res: IHash<any>, name, i) => {
        res[name] = args[i]
        return res
      }, {}))

export const positional = (keys = Object.keys) =>
  (fn: PositionalFn<any>) =>
    (props: IHash<any>) =>
      fn(...keys(props).map(name => props[name]))

export const bind = (...args0: any[]) =>
  (fn: AnyFn) => (...args1: any[]) => fn(...args0, ...args1)

export const bindCtx = (ctx: IHash<any>) =>
  (fn: AnyFn) => (...args: any[]) => fn.apply(ctx, args)

export const bindProps = (props0: IHash<any>) =>
  (fn: PositionalFn<any>) => (props1: IHash<any> = {}) => fn({ ...props0, ...props1 })

export const curry = (fn: AnyFn, fnLength = fn.length) => {
  let allArgs: any[] = []
  return function curried (...args: any[]) {
    allArgs = [...allArgs, ...args]
    return allArgs.length < fnLength ? curried : fn(...allArgs)
  }
}

export const noop = () => {}

export const identity = <T> (arg: T) => arg

export const identityAsync = <T> (arg: T) => Promise.resolve(arg)

export const constant = <T> (arg: T) => () => arg

export const constantAsync = <T> (arg: T) => () => Promise.resolve(arg)

export const branch = <T> (pred: (arg?: T) => boolean, fn0: AnyFn, fn1: AnyFn) =>
  (arg?: T) => pred(arg) ? fn0(arg) : fn1(arg)
