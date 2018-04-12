import { AsyncFn, AsyncPipeFn } from './pipe-async'

function allAsync<A> (): (arg: A) => Promise<[A]>
function allAsync<A, B> (fn: AsyncPipeFn<A, B>): AsyncFn<A, [B]>
function allAsync<A, B, C> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<A, C>): AsyncFn<A, [B, C]>
function allAsync<A, B, C, D> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<A, C>, fn2: AsyncPipeFn<A, D>): AsyncFn<A, [B, C, D]>
function allAsync<A, B, C, D, E> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<A, C>, fn2: AsyncPipeFn<A, D>, fn3: AsyncPipeFn<A, E>): AsyncFn<A, [B, C, D, E]>
function allAsync<A, B, C, D, E, F> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<A, C>, fn2: AsyncPipeFn<A, D>, fn3: AsyncPipeFn<A, E>, fn4: AsyncPipeFn<A, F>): AsyncFn<A, [B, C, D, E, F]>
function allAsync<A, B, C, D, E, F, G> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<A, C>, fn2: AsyncPipeFn<A, D>, fn3: AsyncPipeFn<A, E>, fn4: AsyncPipeFn<A, F>, fn5: AsyncPipeFn<A, G>): AsyncFn<A, [B, C, D, E, F, G]>
function allAsync<A, B, C, D, E, F, G, H> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<A, C>, fn2: AsyncPipeFn<A, D>, fn3: AsyncPipeFn<A, E>, fn4: AsyncPipeFn<A, F>, fn5: AsyncPipeFn<A, G>, fn6: AsyncPipeFn<A, H>): AsyncFn<A, [B, C, D, E, F, G, H]>
function allAsync<A, B, C, D, E, F, G, H, I> (fn0: AsyncPipeFn<A, B>, fn1: AsyncPipeFn<A, C>, fn2: AsyncPipeFn<A, D>, fn3: AsyncPipeFn<A, E>, fn4: AsyncPipeFn<A, F>, fn5: AsyncPipeFn<A, G>, fn6: AsyncPipeFn<A, H>, fn7: AsyncPipeFn<A, I>): AsyncFn<A, [B, C, D, E, F, G, H, I]>
function allAsync (...fns: AsyncPipeFn<any, any>[]) {
  return (value: any) => fns.length ? Promise.all(fns.map(fn => Promise.resolve(fn(value)))) : Promise.resolve([value])
}

export default allAsync
