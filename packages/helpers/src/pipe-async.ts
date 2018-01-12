import { identityAsync } from './identity'
import { AsyncFn, AsyncPipeFn } from './types'

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
  return fns.reduce((acc, fn) => (arg: any) => acc(arg).then(fn), identityAsync)
}
