import { identity } from './identity'
import { PipeFn } from './types'

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
  return fns.reduce((acc, fn) => (arg: any) => fn(acc(arg)), identity)
}
