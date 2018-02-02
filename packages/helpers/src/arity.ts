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

export const named = (...propNames: string[]) => (fn: (props: { [key: string]: any }) => any) =>
  (...args: any[]): any => fn(propNames.reduce((res: { [key: string]: any }, name, i) => {
    res[name] = args[i]
    return res
  }, {}))

export const positional = (...propNames: string[]) => (fn: (...args: any[]) => any) =>
  (props: { [key: string]: any }): any => fn(...propNames.map((name) => props[name]))
