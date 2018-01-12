export type IdentityFn<T> = (arg: T) => T
export type AsyncIdentityFn<T> = (arg: T) => Promise<T>
export type AnyFn = (...args: any[]) => any
export type PipeFn<T, R> = (arg?: T) => R
export type PipeEnterFn<T, R> = (arg?: T) => R
export type PipeExitFn<T, R> = (arg: T) => R
export type AsyncFn <A, B> = (arg?: A) => Promise<B>
export type AsyncPipeFn<A, B> = PipeFn<A, B> | AsyncFn<A, B>
export type PredicateFn = (arg: any) => boolean
