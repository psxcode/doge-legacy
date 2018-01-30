export const throwOn = <T> (predicate: (arg: T) => boolean, throwFn: () => never) =>
  (fn: (...args: any[]) => T) => (...args: any[]): T | never => {
    const result: T = fn(...args)
    if (!predicate(result)) {
      throwFn()
    }
    return result
  }
