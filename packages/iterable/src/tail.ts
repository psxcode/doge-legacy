import { unshift } from '@doge/array-shift'

const tail = (n: number) => <T> (iterable: Iterable<T>): Iterable<T> => ({
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

export default tail
