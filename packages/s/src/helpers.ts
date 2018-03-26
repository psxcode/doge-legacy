import { AsyncIteratorResult } from './types'

export const asyncIteratorResult = <T> (value: T): AsyncIteratorResult<T> =>
  Promise.resolve({ value: value, done: false })

export const errorAsyncIteratorResult = (err?: any): AsyncIteratorResult<any> =>
  Promise.reject(err)

export const doneAsyncIteratorResult: AsyncIteratorResult<any> =
  Promise.resolve({ value: undefined, done: true })
