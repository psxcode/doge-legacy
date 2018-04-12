import { AsyncFn, AsyncPipeFn } from './pipe-async'

function composeAsync<A> (): (arg: A) => A
function composeAsync<A, B> (fn: AsyncPipeFn<A, B>): AsyncFn<A, B>
function composeAsync<A, B, C> (fn0: AsyncPipeFn<B, C>, fn1: AsyncPipeFn<A, B>): AsyncFn<A, C>
function composeAsync<A, B, C, D> (fn0: AsyncPipeFn<C, D>, fn1: AsyncPipeFn<B, C>, fn2: AsyncPipeFn<A, B>): AsyncFn<A, D>
function composeAsync<A, B, C, D, E> (fn0: AsyncPipeFn<D, E>, fn1: AsyncPipeFn<C, D>, fn2: AsyncPipeFn<B, C>, fn3: AsyncPipeFn<A, B>): AsyncFn<A, E>
function composeAsync<A, B, C, D, E, F> (fn0: AsyncPipeFn<E, F>, fn1: AsyncPipeFn<D, E>, fn2: AsyncPipeFn<C, D>, fn3: AsyncPipeFn<B, C>, fn4: AsyncPipeFn<A, B>): AsyncFn<A, F>
function composeAsync<A, B, C, D, E, F, G> (fn0: AsyncPipeFn<F, G>, fn1: AsyncPipeFn<E, F>, fn2: AsyncPipeFn<D, E>, fn3: AsyncPipeFn<D, C>, fn4: AsyncPipeFn<B, C>, fn5: AsyncPipeFn<A, B>): AsyncFn<A, G>
function composeAsync<A, B, C, D, E, F, G, H> (fn0: AsyncPipeFn<G, H>, fn1: AsyncPipeFn<F, G>, fn2: AsyncPipeFn<E, F>, fn3: AsyncPipeFn<D, E>, fn4: AsyncPipeFn<C, D>, fn5: AsyncPipeFn<B, C>, fn6: AsyncPipeFn<A, B>): AsyncFn<A, H>
function composeAsync<A, B, C, D, E, F, G, H, I> (fn0: AsyncPipeFn<H, I>, fn1: AsyncPipeFn<G, H>, fn2: AsyncPipeFn<F, G>, fn3: AsyncPipeFn<E, F>, fn4: AsyncPipeFn<D, E>, fn5: AsyncPipeFn<C, D>, fn6: AsyncPipeFn<B, C>, fn7: AsyncPipeFn<A, B>): AsyncFn<A, I>
function composeAsync (...fns: AsyncPipeFn<any, any>[]) {
  return (initial: any) => fns.reduceRight((arg, fn) => arg.then(fn), Promise.resolve(initial))
}

export default composeAsync
