export type PredicateFn<T> = (arg: T) => boolean
export type PredicateExFn<T> = (arg: T, i: number, iterable: Iterable<T>) => boolean

export const filter = <T> (pred: PredicateFn<T>) => (iterable: Iterable<T>): Iterable<T> => ({
  * [Symbol.iterator] () {
    for (let value of iterable) {
      if (pred(value)) yield(value)
    }
  }
})

export const filterEx = <T> (pred: PredicateExFn<T>) => (iterable: Iterable<T>): Iterable<T> => ({
  * [Symbol.iterator] () {
    let i = 0
    for (let value of iterable) {
      if (pred(value, i++, iterable)) yield(value)
    }
  }
})
