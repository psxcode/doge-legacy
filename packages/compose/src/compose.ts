import { PipeFn } from './pipe'

function compose<A> (): (arg: A) => A
function compose<A, B> (fn: PipeFn<A, B>): PipeFn<A, B>
function compose<A, B, C> (fn0: PipeFn<B, C>, fn1: PipeFn<A, B>): PipeFn<A, C>
function compose<A, B, C, D> (fn0: PipeFn<C, D>, fn1: PipeFn<B, C>, fn2: PipeFn<A, B>): PipeFn<A, D>
function compose<A, B, C, D, E> (fn0: PipeFn<D, E>, fn1: PipeFn<C, D>, fn2: PipeFn<B, C>, fn3: PipeFn<A, B>): PipeFn<A, E>
function compose<A, B, C, D, E, F> (fn0: PipeFn<E, F>, fn1: PipeFn<D, E>, fn2: PipeFn<C, D>, fn3: PipeFn<B, C>, fn4: PipeFn<A, B>): PipeFn<A, F>
function compose<A, B, C, D, E, F, G> (fn0: PipeFn<F, G>, fn1: PipeFn<E, F>, fn2: PipeFn<D, E>, fn3: PipeFn<D, C>, fn4: PipeFn<B, C>, fn5: PipeFn<A, B>): PipeFn<A, G>
function compose<A, B, C, D, E, F, G, H> (fn0: PipeFn<G, H>, fn1: PipeFn<F, G>, fn2: PipeFn<E, F>, fn3: PipeFn<D, E>, fn4: PipeFn<C, D>, fn5: PipeFn<B, C>, fn6: PipeFn<A, B>): PipeFn<A, H>
function compose<A, B, C, D, E, F, G, H, I> (fn0: PipeFn<H, I>, fn1: PipeFn<G, H>, fn2: PipeFn<F, G>, fn3: PipeFn<E, F>, fn4: PipeFn<D, E>, fn5: PipeFn<C, D>, fn6: PipeFn<B, C>, fn7: PipeFn<A, B>): PipeFn<A, I>
function compose (...fns: PipeFn<any, any>[]) {
  return (initial: any) => fns.reduceRight((arg, fn) => fn(arg), initial)
}

export default compose
