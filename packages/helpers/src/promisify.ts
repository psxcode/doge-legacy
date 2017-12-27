export type AnyFn = (...args: any[]) => any
export const promisify = (fn: AnyFn) => (...args: any[]) =>
  new Promise((resolve, reject) => fn(...args, (err: any, val: any) => err ? reject(err) : resolve(val)))
