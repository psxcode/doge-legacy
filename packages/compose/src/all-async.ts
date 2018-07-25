function allAsync<A, B, C, D, E, F, G, H, I> (fn0: (arg?: A) => Promise<B> | B, fn1: (arg?: A) => Promise<C> | C, fn2: (arg?: A) => Promise<D> | D, fn3: (arg?: A) => Promise<E> | E, fn4: (arg?: A) => Promise<F> | F, fn5: (arg?: A) => Promise<G> | G, fn6: (arg?: A) => Promise<H> | H, fn7: (arg?: A) => Promise<I> | I): Promise<[B, C, D, E, F, G, H, I]>
function allAsync<A, B, C, D, E, F, G, H> (fn0: (arg?: A) => Promise<B> | B, fn1: (arg?: A) => Promise<C> | C, fn2: (arg?: A) => Promise<D> | D, fn3: (arg?: A) => Promise<E> | E, fn4: (arg?: A) => Promise<F> | F, fn5: (arg?: A) => Promise<G> | G, fn6: (arg?: A) => Promise<H> | H): Promise<[B, C, D, E, F, G, H]>
function allAsync<A, B, C, D, E, F, G> (fn0: (arg?: A) => Promise<B> | B, fn1: (arg?: A) => Promise<C> | C, fn2: (arg?: A) => Promise<D> | D, fn3: (arg?: A) => Promise<E> | E, fn4: (arg?: A) => Promise<F> | F, fn5: (arg?: A) => Promise<G> | G): (arg?: A) => Promise<[B, C, D, E, F, G]>
function allAsync<A, B, C, D, E, F> (fn0: (arg?: A) => Promise<B> | B, fn1: (arg?: A) => Promise<C> | C, fn2: (arg?: A) => Promise<D> | D, fn3: (arg?: A) => Promise<E> | E, fn4: (arg?: A) => Promise<F> | F): (arg?: A) => Promise<[B, C, D, E, F]>
function allAsync<A, B, C, D, E> (fn0: (arg?: A) => Promise<B> | B, fn1: (arg?: A) => Promise<C> | C, fn2: (arg?: A) => Promise<D> | D, fn3: (arg?: A) => Promise<E> | E): (arg?: A) => Promise<[B, C, D, E]>
function allAsync<A, B, C, D> (fn0: (arg?: A) => Promise<B> | B, fn1: (arg?: A) => Promise<C> | C, fn2: (arg?: A) => Promise<D> | D): (arg?: A) => Promise<[B, C, D]>
function allAsync<A, B, C> (fn0: (arg?: A) => Promise<B> | B, fn1: (arg?: A) => Promise<C> | C): (arg?: A) => Promise<[B, C]>
function allAsync<A, B> (fn: (arg?: A) => Promise<B> | B): (arg?: A) => Promise<[B]>
function allAsync<A> (): (arg: A) => Promise<[A]>
function allAsync (...fns: any[]): any {
  return (value: any) => Promise.all(
    fns.length
      ? fns.map(fn => Promise.resolve(fn(value)))
      : [Promise.resolve(value)]
  )
}

export default allAsync
