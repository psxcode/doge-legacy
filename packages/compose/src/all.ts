import { PipeFn } from './pipe'

function all<A> (): (arg: A) => [A]
function all<A, B> (fn: PipeFn<A, B>): PipeFn<A, [B]>
function all<A, B, C> (fn0: PipeFn<A, B>, fn1: PipeFn<A, C>): PipeFn<A, [B, C]>
function all<A, B, C, D> (fn0: PipeFn<A, B>, fn1: PipeFn<A, C>, fn2: PipeFn<A, D>): PipeFn<A, [B, C, D]>
function all<A, B, C, D, E> (fn0: PipeFn<A, B>, fn1: PipeFn<A, C>, fn2: PipeFn<A, D>, fn3: PipeFn<A, E>): PipeFn<A, [B, C, D, E]>
function all<A, B, C, D, E, F> (fn0: PipeFn<A, B>, fn1: PipeFn<A, C>, fn2: PipeFn<A, D>, fn3: PipeFn<A, E>, fn4: PipeFn<A, F>): PipeFn<A, [B, C, D, E, F]>
function all<A, B, C, D, E, F, G> (fn0: PipeFn<A, B>, fn1: PipeFn<A, C>, fn2: PipeFn<A, D>, fn3: PipeFn<A, E>, fn4: PipeFn<A, F>, fn5: PipeFn<A, G>): PipeFn<A, [B, C, D, E, F, G]>
function all<A, B, C, D, E, F, G, H> (fn0: PipeFn<A, B>, fn1: PipeFn<A, C>, fn2: PipeFn<A, D>, fn3: PipeFn<A, E>, fn4: PipeFn<A, F>, fn5: PipeFn<A, G>, fn6: PipeFn<A, H>): PipeFn<A, [B, C, D, E, F, G, H]>
function all<A, B, C, D, E, F, G, H, I> (fn0: PipeFn<A, B>, fn1: PipeFn<A, C>, fn2: PipeFn<A, D>, fn3: PipeFn<A, E>, fn4: PipeFn<A, F>, fn5: PipeFn<A, G>, fn6: PipeFn<A, H>, fn7: PipeFn<A, I>): PipeFn<A, [B, C, D, E, F, G, H, I]>
function all (...fns: PipeFn<any, any>[]) {
  return (value: any) => fns.length ? fns.map(fn => fn(value)) : [value]
}

export default all
