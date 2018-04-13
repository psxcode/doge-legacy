import { unshift } from '@doge/array-shift'

export const lastn = (n: number) => <T> (iterable: Iterable<T>): Iterable<T> => ({
  * [Symbol.iterator] () {
    const last = new Array<T>(n)
    for (let value of iterable) {
      unshift.call(last, value)
    }
    for (let value of last) {
      yield value
    }
  }
})

export const last = lastn(1)
