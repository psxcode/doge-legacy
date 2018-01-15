export type ReduceFn<T, R> = (acc: R, value: T) => R
export const reduce = <T, R> (f: ReduceFn<T, R>, initial: R, iterable: Iterable<T>): R => {
  let result = initial
  for (let value of iterable) {
    result = f(result, value)
  }
  return result
}
