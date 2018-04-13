const nullary = <R> (fn: (...args: any[]) => R) =>
  (..._: any[]): R => fn()

export default nullary
