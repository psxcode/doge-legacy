import { AnyFn } from './types'

export const promisify = (fn: AnyFn) => (...args: any[]) =>
  new Promise((resolve, reject) =>
    fn(...args, (err: any, val: any) => { err ? reject(err) : resolve(val) }))
