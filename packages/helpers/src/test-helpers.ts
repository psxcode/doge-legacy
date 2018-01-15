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
