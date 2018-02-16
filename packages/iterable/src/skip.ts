import { iterate } from './iterate'

export const skip = <T> (n: number) => (iterable: Iterable<T>): Iterable<T> => ({
  [Symbol.iterator]: function* () {
    const it = iterate(iterable)
    let i = 0
    while (i++ < n && !it.next().done);
    for (let value of it) {
      yield value
    }
  }
})
