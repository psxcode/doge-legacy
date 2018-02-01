export const nullary = <R> (fn: (...args: any[]) => R) =>
  (...args: any[]): R => fn()

export const unary = <A, R> (fn: (arg: A, ...args: any[]) => R) =>
  (arg: A, ...args: any[]): R => fn(arg)

export const binary = <A, B, R> (fn: (arg1: A, arg2: B, ...args: any[]) => R) =>
  (arg1: A, arg2: B, ...args: any[]): R => fn(arg1, arg2)

export const ternary = <A, B, C, R> (fn: (arg1: A, arg2: B, arg3: C, ...args: any[]) => R) =>
  (arg1: A, arg2: B, arg3: C, ...args: any[]): R => fn(arg1, arg2, arg3)

export const voidify = (fn: (...args: any[]) => any) =>
  (...args: any[]): void => { fn(...args) }
