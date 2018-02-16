export interface SpyFn {
  (arg: any): any
  callCount (): number
}
export const makeSpy = (fn: (...args: any[]) => any): SpyFn => {
  let i = 0
  function wrapper (...args: any[]) {
    ++i
    return fn(...args)
  }
  (wrapper as SpyFn).callCount = () => i;
  return (wrapper as SpyFn)
}

export const multBy = (x: number) => (val: number) => val * x
export const mult1 = multBy(1)
export const mult2 = multBy(2)
export const isEven = (x: number) => x % 2 === 0
export const add = (a: number = 0, b: number = 0) => a + b
export const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
