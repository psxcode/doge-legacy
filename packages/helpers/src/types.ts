export type PipeFn<T, R> = (arg?: T) => R
export type AsyncFn <A, B> = (arg?: A) => Promise<B>
export type AsyncPipeFn<A, B> = PipeFn<A, B> | AsyncFn<A, B>
export type PredicateFn<T> = (arg: T) => boolean
export type MapFn<A, B> = (value: A) => B
export type ReduceFn<T, R> = (acc: R, value: T) => R
