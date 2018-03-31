import { ReducerExFn, ReducerFn } from './reduce'

export const scan = <T, R> (reducer: ReducerFn<T, R>) => (iterable: Iterable<T>): Iterable<R> => ({
  * [Symbol.iterator] () {
    let state = reducer()
    for (let value of iterable) {
      yield state = reducer(state, value)
    }
  }
})

export const scanEx = <T, R> (initial: R, reducer: ReducerExFn<T, R>) => (iterable: Iterable<T>): Iterable<R> => ({
  * [Symbol.iterator] () {
    let state = initial
    let i = 0
    for (let value of iterable) {
      yield state = reducer(state, value, i++, iterable)
    }
  }
})
