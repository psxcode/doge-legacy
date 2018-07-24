type allFn = <T, R>(arg?: T) => R

function all<A> (): (arg: A) => [A]
function all<A, B> (fn: (arg?: A) => B): (arg?: A) => [B]
function all<A, B, C> (fn0: (arg?: A) => B, fn1: (arg?: A) => C): (arg?: A) => [B, C]
function all<A, B, C, D> (fn0: (arg?: A) => B, fn1: (arg?: A) => C, fn2: (arg?: A) => D): (arg?: A) => [B, C, D]
function all<A, B, C, D, E> (fn0: (arg?: A) => B, fn1: (arg?: A) => C, fn2: (arg?: A) => D, fn3: (arg?: A) => E): (arg?: A) => [B, C, D, E]
function all<A, B, C, D, E, F> (fn0: (arg?: A) => B, fn1: (arg?: A) => C, fn2: (arg?: A) => D, fn3: (arg?: A) => E, fn4: (arg?: A) => F): (arg?: A) => [B, C, D, E, F]
function all<A, B, C, D, E, F, G> (fn0: (arg?: A) => B, fn1: (arg?: A) => C, fn2: (arg?: A) => D, fn3: (arg?: A) => E, fn4: (arg?: A) => F, fn5: (arg?: A) => G): (arg?: A) => [B, C, D, E, F, G]
function all<A, B, C, D, E, F, G, H> (fn0: (arg?: A) => B, fn1: (arg?: A) => C, fn2: (arg?: A) => D, fn3: (arg?: A) => E, fn4: (arg?: A) => F, fn5: (arg?: A) => G, fn6: (arg?: A) => H): (arg?: A) => [B, C, D, E, F, G, H]
function all<A, B, C, D, E, F, G, H, I> (fn0: (arg?: A) => B, fn1: (arg?: A) => C, fn2: (arg?: A) => D, fn3: (arg?: A) => E, fn4: (arg?: A) => F, fn5: (arg?: A) => G, fn6: (arg?: A) => H, fn7: (arg?: A) => I): (arg?: A) => [B, C, D, E, F, G, H, I]
function all (...fns: any[]): any {
  return (value: any) => fns.length ? fns.map(fn => fn(value)) : [value]
}

export default all
