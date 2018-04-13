const ternary = <A, B, C, R> (fn: (arg1: A, arg2: B, arg3: C, ...args: any[]) => R) =>
  (arg1: A, arg2: B, arg3: C, ..._: any[]): R => fn(arg1, arg2, arg3)

export default ternary
