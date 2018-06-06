const gather = <T, R> (fn: (args: T[]) => R) =>
  (...args: T[]): R => fn(args)

export default gather
