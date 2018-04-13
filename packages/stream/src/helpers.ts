import { AsyncIteratorResult } from './types'

export const iteratorResult = <T> (value: T) => ({ value }) as IteratorResult<T>

export const doneIteratorResult = ({ done: true }) as IteratorResult<any>

export const asyncIteratorResult = <T> (value: T): AsyncIteratorResult<T> =>
  Promise.resolve({ value: value, done: false })

export const errorAsyncIteratorResult = (err?: any) => Promise.reject(err) as AsyncIteratorResult<any>

export const doneAsyncIteratorResult = Promise.resolve(doneIteratorResult) as AsyncIteratorResult<any>
