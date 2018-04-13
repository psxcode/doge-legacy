export type IHash <T> = {[key: string]: T}
export type NamedFn <R> = (props: IHash<any>) => R
export type PositionalFn <R> = (...args: any[]) => R
export type AnyFn = (...args: any[]) => any
