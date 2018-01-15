import { PredicateFn } from './types'

export function* filter<T> (f: PredicateFn<T>, iterable: Iterable<T>) {
  for (let value of iterable) {
    if (f(value)) yield(value)
  }
}
