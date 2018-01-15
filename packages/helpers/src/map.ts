import { MapFn } from './types'

export function* map<T, R> (f: MapFn<T, R>, iterable: Iterable<T>) {
  for (let value of iterable) {
    yield f(value)
  }
}
