const spread = <R> (fn: (...args: any[]) => R) =>
  (args: any[]): R => fn(...args)

export default spread
