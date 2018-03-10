export type PipeFn<T, R> = (arg?: T) => R
export type AsyncFn <A, B> = (arg?: A) => Promise<B>
export type AsyncPipeFn<A, B> = (arg?: A) => B | Promise<B>
export type IHash <T> = {[key: string]: T}
export type NamedFn <R> = (props: IHash<any>) => R
export type PositionalFn <R> = (...args: any[]) => R
export type AnyFn = (...args: any[]) => any
