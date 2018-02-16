export const distinct = <T> (iterable: Iterable<T>): Iterable<T> => ({
  [Symbol.iterator]: function* () {
    let last: T
    for (let value of iterable) {
      if (value !== last!) {
        last = value
        yield value
      }
    }
  }
})
