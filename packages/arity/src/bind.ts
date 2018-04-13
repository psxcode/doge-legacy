import { AnyFn } from './types'

const bind = (...args0: any[]) =>
  (fn: AnyFn) => (...args1: any[]) => fn(...args0, ...args1)

export default bind
