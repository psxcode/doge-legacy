export type ReducerFn<T, R> = (acc?: R, val?: T) => R
export type ReducerExFn<T, R> = (acc: R, val: T, i: number, iterable: Iterable<T>) => R

export const reduce = <T, R> (reducer: ReducerFn<T, R>) => (iterable: Iterable<T>): Iterable<R> => ({
  * [Symbol.iterator] () {
    let state = reducer()
    for (let value of iterable) {
      state = reducer(state, value)
    }
    yield state
  }
})

export const reduceEx = <T, R> (initial: R, reducer: ReducerExFn<T, R>) => (iterable: Iterable<T>): Iterable<R> => ({
  * [Symbol.iterator] () {
    let state = initial
    let i = 0
    for (let value of iterable) {
      state = reducer(state, value, i++, iterable)
    }
    yield state
  }
})
