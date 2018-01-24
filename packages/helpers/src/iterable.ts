import { MapFn, PredicateFn, ReduceFn } from './types'

export function* iterate<T> (iterable: Iterable<T>) {
  for (let value of iterable) {
    yield value
  }
}

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

export const length = (maxLength = Number.POSITIVE_INFINITY) => {
  if (maxLength < 0) {
    maxLength = Number.POSITIVE_INFINITY
  }
  return (iterable: Iterable<any>): number => {
    let i = 0
    const it = iterate(iterable)
    while (i < maxLength && !it.next().done) {
      ++i
    }
    return i
  }
}
