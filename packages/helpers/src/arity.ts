import { IHash, NamedFn, PositionalFn } from './types'

export const nullary = <R> (fn: (...args: any[]) => R) =>
  (..._: any[]): R => fn()

export const unary = <A, R> (fn: (arg: A, ...args: any[]) => R) =>
  (arg: A, ..._: any[]): R => fn(arg)

export const binary = <A, B, R> (fn: (arg1: A, arg2: B, ...args: any[]) => R) =>
  (arg1: A, arg2: B, ..._: any[]): R => fn(arg1, arg2)

export const ternary = <A, B, C, R> (fn: (arg1: A, arg2: B, arg3: C, ...args: any[]) => R) =>
  (arg1: A, arg2: B, arg3: C, ..._: any[]): R => fn(arg1, arg2, arg3)

export const voidify = (fn: (...args: any[]) => any) =>
  (...args: any[]): void => { fn(...args) }

export const spread = (fn: (...args: any[]) => any) =>
  (args: any[]): any => fn(...args)

export const gather = (fn: (args: any[]) => any) =>
  (...args: any[]): any => fn(args)

export const named = (keys: () => string[]) => (fn: NamedFn<any>) =>
  (...args: any[]) => fn(keys().reduce((res: IHash, name, i) => {
    res[name] = args[i]
    return res
  }, {}))

export const positional = (keys = Object.keys) => (fn: PositionalFn<any>) =>
    (props: IHash) => fn(...keys(props).map((name) => props[name]))

export const bind = (...args0: any[]) =>
  (fn: (...args: any[]) => any) =>
    (...args1: any[]) => fn(...args0, ...args1)

export const bindCtx = (ctx: IHash) =>
  (fn: (...args: any[]) => any) =>
    (...args: any[]) => fn.apply(ctx, args)

export const withArgs = (props0: IHash) =>
  (fn: (props: IHash) => any) =>
    (props1: IHash = {}) => fn({ ...props0, ...props1 })

export const identity = <T> (arg: T) => arg

export const identityAsync = <T> (arg: T) => Promise.resolve(arg)

export const constant = <T> (arg: T) => () => arg

export const constantAsync = <T> (arg: T) => () => Promise.resolve(arg)
