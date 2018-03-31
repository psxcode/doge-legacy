import { iterate } from './iterate'

export const skip = (n: number) => <T> (iterable: Iterable<T>): Iterable<T> => ({
  * [Symbol.iterator] () {
    const it = iterate(iterable)
    let i = 0
    while (i++ < n && !it.next().done);
    for (let value of it) {
      yield value
    }
  }
})
