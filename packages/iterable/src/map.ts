export type TransformFn<T, R> = (value: T) => R
export type TransformExFn<T, R> = (value: T, i: number, iterable: Iterable<T>) => R

export const map = <T, R> (xf: TransformFn<T, R>) => (iterable: Iterable<T>): Iterable<R> => ({
  * [Symbol.iterator] () {
    for (let value of iterable) {
      yield xf(value)
    }
  }
})

export const mapEx = <T, R> (xf: TransformExFn<T, R>) => (iterable: Iterable<T>): Iterable<R> => ({
  * [Symbol.iterator] () {
    let i = 0
    for (let value of iterable) {
      yield xf(value, i++, iterable)
    }
  }
})
