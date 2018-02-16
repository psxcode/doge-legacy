export type TransformFn<T, R> = (arg: T) => R
export type TransformExFn<T, R> = (arg: T, i: number, iterable: Iterable<T>) => R

export const map = <T, R> (xf: TransformFn<T, R>) => (iterable: Iterable<T>): Iterable<R> => ({
  [Symbol.iterator]: function* () {
    for (let value of iterable) {
      yield xf(value)
    }
  }
})

export const mapEx = <T, R> (xf: TransformExFn<T, R>) => (iterable: Iterable<T>): Iterable<R> => ({
  [Symbol.iterator]: function* () {
    let i = 0
    for (let value of iterable) {
      yield xf(value, i++, iterable)
    }
  }
})
