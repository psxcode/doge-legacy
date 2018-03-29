import { AsyncFn, PipeFn, AsyncPipeFn } from './types'

export function pipe<A> (): (arg: A) => A
export function pipe<A, B> (fn: PipeFn<A, B>): PipeFn<A, B>
export function pipe<A, B, C> (fn0: PipeFn<A, B>, fn1: PipeFn<B, C>): PipeFn<A, C>
export function pipe<A, B, C, D> (fn0: PipeFn<A, B>, fn1: PipeFn<B, C>, fn2: PipeFn<C, D>): PipeFn<A, D>
export function pipe<A, B, C, D, E> (fn0: PipeFn<A, B>, fn1: PipeFn<B, C>, fn2: PipeFn<C, D>, fn3: PipeFn<D, E>): PipeFn<A, E>
export function pipe<A, B, C, D, E, F> (fn0: PipeFn<A, B>, fn1: PipeFn<B, C>, fn2: PipeFn<C, D>, fn3: PipeFn<D, E>, fn4: PipeFn<E, F>): PipeFn<A, F>
export function pipe<A, B, C, D, E, F, G> (fn0: PipeFn<A, B>, fn1: PipeFn<B, C>, fn2: PipeFn<C, D>, fn3: PipeFn<D, E>, fn4: PipeFn<E, F>, fn5: PipeFn<F, G>): PipeFn<A, G>
export function pipe<A, B, C, D, E, F, G, H> (fn0: PipeFn<A, B>, fn1: PipeFn<B, C>, fn2: PipeFn<C, D>, fn3: PipeFn<D, E>, fn4: PipeFn<E, F>, fn5: PipeFn<F, G>, fn6: PipeFn<G, H>): PipeFn<A, H>
export function pipe<A, B, C, D, E, F, G, H, I> (fn0: PipeFn<A, B>, fn1: PipeFn<B, C>, fn2: PipeFn<C, D>, fn3: PipeFn<D, E>, fn4: PipeFn<E, F>, fn5: PipeFn<F, G>, fn6: PipeFn<G, H>, fn7: PipeFn<H, I>): PipeFn<A, I>
export function pipe (...fns: PipeFn<any, any>[]) {
  return (initial: any) => fns.reduce((arg, fn) => fn(arg), initial)
}

export function pipeAsync<A> (): (arg: A) => Promise<A>
export function pipeAsync<A, B> (fn0: AsyncPipeFn<A, B>): AsyncFn<A, B>
export function pipeAsync<A, B, C> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<B, C>): AsyncFn<A, C>
export function pipeAsync<A, B, C, D> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<B, C>, fn2: AsyncPipeFn<C, D>): AsyncFn<A, D>
export function pipeAsync<A, B, C, D, E> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<B, C>, fn2: AsyncPipeFn<C, D>, fn3: AsyncPipeFn<D, E>): AsyncFn<A, E>
export function pipeAsync<A, B, C, D, E, F> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<B, C>, fn2: AsyncPipeFn<C, D>, fn3: AsyncPipeFn<D, E>, fn4: AsyncPipeFn<E, F>): AsyncFn<A, F>
export function pipeAsync<A, B, C, D, E, F, G> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<B, C>, fn2: AsyncPipeFn<C, D>, fn3: AsyncPipeFn<D, E>, fn4: AsyncPipeFn<E, F>, fn5: AsyncPipeFn<F, G>): AsyncFn<A, G>
export function pipeAsync<A, B, C, D, E, F, G, H> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<B, C>, fn2: AsyncPipeFn<C, D>, fn3: AsyncPipeFn<D, E>, fn4: AsyncPipeFn<E, F>, fn5: AsyncPipeFn<F, G>, fn6: AsyncPipeFn<G, H>): AsyncFn<A, H>
export function pipeAsync<A, B, C, D, E, F, G, H, I> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<B, C>, fn2: AsyncPipeFn<C, D>, fn3: AsyncPipeFn<D, E>, fn4: AsyncPipeFn<E, F>, fn5: AsyncPipeFn<F, G>, fn6: AsyncPipeFn<G, H>, fn7: AsyncPipeFn<H, I>): AsyncFn<A, I>
export function pipeAsync (...fns: AsyncPipeFn<any, any>[]): AsyncFn<any, any> {
  return (initial: any) => fns.reduce((arg, fn) => arg.then(fn), Promise.resolve(initial))
}

export function compose<A> (): (arg: A) => A
export function compose<A, B> (fn: PipeFn<A, B>): PipeFn<A, B>
export function compose<A, B, C> (fn0: PipeFn<B, C>, fn1: PipeFn<A, B>): PipeFn<A, C>
export function compose<A, B, C, D> (fn0: PipeFn<C, D>, fn1: PipeFn<B, C>, fn2: PipeFn<A, B>): PipeFn<A, D>
export function compose<A, B, C, D, E> (fn0: PipeFn<D, E>, fn1: PipeFn<C, D>, fn2: PipeFn<B, C>, fn3: PipeFn<A, B>): PipeFn<A, E>
export function compose<A, B, C, D, E, F> (fn0: PipeFn<E, F>, fn1: PipeFn<D, E>, fn2: PipeFn<C, D>, fn3: PipeFn<B, C>, fn4: PipeFn<A, B>): PipeFn<A, F>
export function compose<A, B, C, D, E, F, G> (fn0: PipeFn<F, G>, fn1: PipeFn<E, F>, fn2: PipeFn<D, E>, fn3: PipeFn<D, C>, fn4: PipeFn<B, C>, fn5: PipeFn<A, B>): PipeFn<A, G>
export function compose<A, B, C, D, E, F, G, H> (fn0: PipeFn<G, H>, fn1: PipeFn<F, G>, fn2: PipeFn<E, F>, fn3: PipeFn<D, E>, fn4: PipeFn<C, D>, fn5: PipeFn<B, C>, fn6: PipeFn<A, B>): PipeFn<A, H>
export function compose<A, B, C, D, E, F, G, H, I> (fn0: PipeFn<H, I>, fn1: PipeFn<G, H>, fn2: PipeFn<F, G>, fn3: PipeFn<E, F>, fn4: PipeFn<D, E>, fn5: PipeFn<C, D>, fn6: PipeFn<B, C>, fn7: PipeFn<A, B>): PipeFn<A, I>
export function compose (...fns: PipeFn<any, any>[]) {
  return (initial: any) => fns.reduceRight((arg, fn) => fn(arg), initial)
}

export function composeAsync<A> (): (arg: A) => A
export function composeAsync<A, B> (fn: AsyncPipeFn<A, B>): AsyncPipeFn<A, B>
export function composeAsync<A, B, C> (fn0: AsyncPipeFn<B, C>, fn1: AsyncPipeFn<A, B>): AsyncPipeFn<A, C>
export function composeAsync<A, B, C, D> (fn0: AsyncPipeFn<C, D>, fn1: AsyncPipeFn<B, C>, fn2: AsyncPipeFn<A, B>): AsyncPipeFn<A, D>
export function composeAsync<A, B, C, D, E> (fn0: AsyncPipeFn<D, E>, fn1: AsyncPipeFn<C, D>, fn2: AsyncPipeFn<B, C>, fn3: AsyncPipeFn<A, B>): AsyncPipeFn<A, E>
export function composeAsync<A, B, C, D, E, F> (fn0: AsyncPipeFn<E, F>, fn1: AsyncPipeFn<D, E>, fn2: AsyncPipeFn<C, D>, fn3: AsyncPipeFn<B, C>, fn4: AsyncPipeFn<A, B>): AsyncPipeFn<A, F>
export function composeAsync<A, B, C, D, E, F, G> (fn0: AsyncPipeFn<F, G>, fn1: AsyncPipeFn<E, F>, fn2: AsyncPipeFn<D, E>, fn3: AsyncPipeFn<D, C>, fn4: AsyncPipeFn<B, C>, fn5: AsyncPipeFn<A, B>): AsyncPipeFn<A, G>
export function composeAsync<A, B, C, D, E, F, G, H> (fn0: AsyncPipeFn<G, H>, fn1: AsyncPipeFn<F, G>, fn2: AsyncPipeFn<E, F>, fn3: AsyncPipeFn<D, E>, fn4: AsyncPipeFn<C, D>, fn5: AsyncPipeFn<B, C>, fn6: AsyncPipeFn<A, B>): AsyncPipeFn<A, H>
export function composeAsync<A, B, C, D, E, F, G, H, I> (fn0: AsyncPipeFn<H, I>, fn1: AsyncPipeFn<G, H>, fn2: AsyncPipeFn<F, G>, fn3: AsyncPipeFn<E, F>, fn4: AsyncPipeFn<D, E>, fn5: AsyncPipeFn<C, D>, fn6: AsyncPipeFn<B, C>, fn7: AsyncPipeFn<A, B>): AsyncPipeFn<A, I>
export function composeAsync (...fns: AsyncPipeFn<any, any>[]) {
  return (initial: any) => fns.reduceRight((arg, fn) => arg.then(fn), Promise.resolve(initial))
}

export function all<A> (): (arg: A) => [A]
export function all<A, B> (fn: PipeFn<A, B>): PipeFn<A, [B]>
export function all<A, B, C> (fn0: PipeFn<A, B>, fn1: PipeFn<A, C>): PipeFn<A, [B, C]>
export function all<A, B, C, D> (fn0: PipeFn<A, B>, fn1: PipeFn<A, C>, fn2: PipeFn<A, D>): PipeFn<A, [B, C, D]>
export function all<A, B, C, D, E> (fn0: PipeFn<A, B>, fn1: PipeFn<A, C>, fn2: PipeFn<A, D>, fn3: PipeFn<A, E>): PipeFn<A, [B, C, D, E]>
export function all<A, B, C, D, E, F> (fn0: PipeFn<A, B>, fn1: PipeFn<A, C>, fn2: PipeFn<A, D>, fn3: PipeFn<A, E>, fn4: PipeFn<A, F>): PipeFn<A, [B, C, D, E, F]>
export function all<A, B, C, D, E, F, G> (fn0: PipeFn<A, B>, fn1: PipeFn<A, C>, fn2: PipeFn<A, D>, fn3: PipeFn<A, E>, fn4: PipeFn<A, F>, fn5: PipeFn<A, G>): PipeFn<A, [B, C, D, E, F, G]>
export function all<A, B, C, D, E, F, G, H> (fn0: PipeFn<A, B>, fn1: PipeFn<A, C>, fn2: PipeFn<A, D>, fn3: PipeFn<A, E>, fn4: PipeFn<A, F>, fn5: PipeFn<A, G>, fn6: PipeFn<A, H>): PipeFn<A, [B, C, D, E, F, G, H]>
export function all<A, B, C, D, E, F, G, H, I> (fn0: PipeFn<A, B>, fn1: PipeFn<A, C>, fn2: PipeFn<A, D>, fn3: PipeFn<A, E>, fn4: PipeFn<A, F>, fn5: PipeFn<A, G>, fn6: PipeFn<A, H>, fn7: PipeFn<A, I>): PipeFn<A, [B, C, D, E, F, G, H, I]>
export function all (...fns: PipeFn<any, any>[]) {
  return (value: any) => fns.length ? fns.map(fn => fn(value)) : [value]
}

export function allAsync<A> (): (arg: A) => Promise<[A]>
export function allAsync<A, B> (fn: AsyncPipeFn<A, B>): AsyncFn<A, [B]>
export function allAsync<A, B, C> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<A, C>): AsyncFn<A, [B, C]>
export function allAsync<A, B, C, D> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<A, C>, fn2: AsyncPipeFn<A, D>): AsyncFn<A, [B, C, D]>
export function allAsync<A, B, C, D, E> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<A, C>, fn2: AsyncPipeFn<A, D>, fn3: AsyncPipeFn<A, E>): AsyncFn<A, [B, C, D, E]>
export function allAsync<A, B, C, D, E, F> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<A, C>, fn2: AsyncPipeFn<A, D>, fn3: AsyncPipeFn<A, E>, fn4: AsyncPipeFn<A, F>): AsyncFn<A, [B, C, D, E, F]>
export function allAsync<A, B, C, D, E, F, G> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<A, C>, fn2: AsyncPipeFn<A, D>, fn3: AsyncPipeFn<A, E>, fn4: AsyncPipeFn<A, F>, fn5: AsyncPipeFn<A, G>): AsyncFn<A, [B, C, D, E, F, G]>
export function allAsync<A, B, C, D, E, F, G, H> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<A, C>, fn2: AsyncPipeFn<A, D>, fn3: AsyncPipeFn<A, E>, fn4: AsyncPipeFn<A, F>, fn5: AsyncPipeFn<A, G>, fn6: AsyncPipeFn<A, H>): AsyncFn<A, [B, C, D, E, F, G, H]>
export function allAsync<A, B, C, D, E, F, G, H, I> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<A, C>, fn2: AsyncPipeFn<A, D>, fn3: AsyncPipeFn<A, E>, fn4: AsyncPipeFn<A, F>, fn5: AsyncPipeFn<A, G>, fn6: AsyncPipeFn<A, H>, fn7: AsyncPipeFn<A, I>): AsyncFn<A, [B, C, D, E, F, G, H, I]>
export function allAsync (...fns: AsyncPipeFn<any, any>[]) {
  return (value: any) => fns.length ? Promise.all(fns.map(fn => Promise.resolve(fn(value)))) : Promise.resolve([value])
}
