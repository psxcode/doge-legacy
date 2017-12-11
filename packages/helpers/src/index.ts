import { IBittrexParams } from '../../bittrex-raw-api/src/types'

export const pipe = (...functions: any[]): any => {
  const [fn, ...fns] = functions
  return (...args: any[]) => fns.length ? pipe(...fns)(fn(...args)) : fn(...args)
}

export const entries = (params: {[key: string]: any}) =>
  Object.keys(params).map((k: string): [string, any] => [k, `${params[k]}`])
