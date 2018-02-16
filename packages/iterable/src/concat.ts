import { iterate } from './iterate'

export const concat = <T> (...iterables: Iterable<T>[]): Iterable<T> => ({
  [Symbol.iterator]: function* () {
    for (let it of iterables) {
      yield* iterate(it)
    }
  }
})
