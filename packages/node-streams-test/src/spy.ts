import * as debug from 'debug'

export type SpyFn<T> = {
  (data?: T): void
  callCount (): number
  data (): T[]
}

export const makeSpy = <T> (name: string, message: string): SpyFn<T> => {
  let i = 0
  let data: T[] = []
  const dbg = debug(`stream-test:event-spy:${name}`)
  const spy = (value?: T) => {
    dbg(message, i, value)
    value != null && data.push(value)
    ++i
  }
  (spy as SpyFn<T>).callCount = () => i;
  (spy as SpyFn<T>).data = () => data
  return (spy as SpyFn<T>)
}

export const makeDataSpy = <T> () => makeSpy<T>('data', 'consume %d, value %s')

export const makeErrorSpy = <T> () => makeSpy<T>('error', 'error event #%d received')

export const makeEndSpy = <T> () => makeSpy<T>('end', 'end event received')
