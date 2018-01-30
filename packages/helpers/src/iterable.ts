export function* iterate (iterable: Iterable<any>) {
  for (let value of iterable) {
    yield value
  }
}

export const map = <T, R> (xf: (arg: T) => R) => (iterable: Iterable<T>): Iterable<R> => ({
  [Symbol.iterator]: function* () {
    for (let value of iterable) {
      yield xf(value)
    }
  }
})

export const filter = <T> (pred: (arg: T) => boolean) => (iterable: Iterable<T>): Iterable<T> => ({
  [Symbol.iterator]: function* () {
    for (let value of iterable) {
      if (pred(value)) yield(value)
    }
  }
})

export const reduce = <T, R> (reducer: (acc: R, val: T) => R, initial: R) => (iterable: Iterable<T>): Iterable<R> => ({
  [Symbol.iterator]: function* () {
    let state = initial
    for (let value of iterable) {
      state = reducer(state, value)
    }
    yield state
  }
})

export const scan = <T, R> (reducer: (acc: R, val: T) => R, initial: R) => (iterable: Iterable<T>): Iterable<R> => ({
  [Symbol.iterator]: function* () {
    let state = initial
    for (let value of iterable) {
      yield state = reducer(state, value)
    }
  }
})

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

export const unique = (iterable: Iterable<any>) => ({
  [Symbol.iterator]: function* () {
    const buffer: any[] = []
    for (let value of iterable) {
      if (!buffer.includes(value)) {
        buffer.push(value)
        yield value
      }
    }
  }
})
