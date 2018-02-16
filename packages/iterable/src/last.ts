import { unshift } from '@doge/helpers'

export const lastn = <T> (n: number) => (iterable: Iterable<T>): Iterable<T> => ({
  [Symbol.iterator]: function* () {
    const last = new Array<T>(n)
    for (let value of iterable) {
      unshift.call(last, value)
    }
    for (let value of last) {
      yield value
    }
  }
})

export const last = <T> (iterable: Iterable<T>): Iterable<T> => lastn<T>(1)(iterable)
