const unary = <A, R> (fn: (arg: A, ...args: any[]) => R) =>
  (arg: A, ..._: any[]): R => fn(arg)

export default unary
