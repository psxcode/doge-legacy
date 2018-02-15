import { pipe } from './pipe'
import { isFunction } from 'util'
import { unshift } from './array'

export function* iterate (iterable: Iterable<any>) {
  for (let value of iterable) {
    yield value
  }
}

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

export type PredicateFn<T> = (arg: T) => boolean
export type PredicateExFn<T> = (arg: T, i: number, iterable: Iterable<T>) => boolean

export const filter = <T> (pred: PredicateFn<T>) => (iterable: Iterable<T>): Iterable<T> => ({
  [Symbol.iterator]: function* () {
    for (let value of iterable) {
      if (pred(value)) yield(value)
    }
  }
})

export const filterEx = <T> (pred: PredicateExFn<T>) => (iterable: Iterable<T>): Iterable<T> => ({
  [Symbol.iterator]: function* () {
    let i = 0
    for (let value of iterable) {
      if (pred(value, i++, iterable)) yield(value)
    }
  }
})

export type ReducerFn<T, R> = (acc?: R, val?: T) => R
export type ReducerExFn<T, R> = (acc: R, val: T, i: number, iterable: Iterable<T>) => R

export const reduce = <T, R> (reducer: ReducerFn<T, R>) => (iterable: Iterable<T>): Iterable<R> => ({
  [Symbol.iterator]: function* () {
    let state = reducer()
    for (let value of iterable) {
      state = reducer(state, value)
    }
    yield state
  }
})

export const reduceEx = <T, R> (initial: R, reducer: ReducerExFn<T, R>) => (iterable: Iterable<T>): Iterable<R> => ({
  [Symbol.iterator]: function* () {
    let state = initial
    let i = 0
    for (let value of iterable) {
      state = reducer(state, value, i++, iterable)
    }
    yield state
  }
})

export const scan = <T, R> (reducer: ReducerFn<T, R>) => (iterable: Iterable<T>): Iterable<R> => ({
  [Symbol.iterator]: function* () {
    let state = reducer()
    for (let value of iterable) {
      yield state = reducer(state, value)
    }
  }
})

export const scanEx = <T, R> (initial: R, reducer: ReducerExFn<T, R>) => (iterable: Iterable<T>): Iterable<R> => ({
  [Symbol.iterator]: function* () {
    let state = initial
    let i = 0
    for (let value of iterable) {
      yield state = reducer(state, value, i++, iterable)
    }
  }
})

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

export const take = <T> (n: number) => (iterable: Iterable<T>): Iterable<T> => ({
  [Symbol.iterator]: function* () {
    const it = iterate(iterable)
    let i = 0
    let ir: any
    while (i++ < n && !(ir = it.next()).done) {
      yield ir.value
    }
  }
})

export const slice = <T> (numSkip: number, numTake: number) => pipe(skip<T>(numSkip), take<T>(numTake))

export const lastn = <T> (n: number) => (iterable: Iterable<T>): Iterable<T> => ({
  [Symbol.iterator]: function* () {
    const last = new Array<T>(n)
    for (let value of iterable) {
      unshift.call(last, value)
    }
    for (let value of last) {
      yield value
    }
  }
})

export const first = take(1)

export const last = lastn(1)

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

export const unique = <T> (iterable: Iterable<T>): Iterable<T> => ({
  [Symbol.iterator]: function* () {
    const buffer: T[] = []
    for (let value of iterable) {
      if (!buffer.includes(value)) {
        buffer.push(value)
        yield value
      }
    }
  }
})

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

export const resolve = (iter: Iterator<any>) => {
  const handle = (ir: IteratorResult<any>) => {
    if (!ir.done) {
      Promise.resolve(ir.value)
        .then(val => handle(iter.next(val)))
    }
  }
  handle(iter.next())
}
