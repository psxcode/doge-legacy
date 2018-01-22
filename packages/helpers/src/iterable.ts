import { MapFn, PredicateFn, ReduceFn } from './types'

export function* map<T, R> (xf: MapFn<T, R>, iterable: Iterable<T>) {
  for (let value of iterable) {
    yield xf(value)
  }
}

export function* filter<T> (pred: PredicateFn<T>, iterable: Iterable<T>) {
  for (let value of iterable) {
    if (pred(value)) yield(value)
  }
}

export const reduce = <T, R> (reducer: ReduceFn<T, R>, initial: R, iterable: Iterable<T>): R => {
  let result = initial
  for (let value of iterable) {
    result = reducer(result, value)
  }
  return result
}
