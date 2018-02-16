import { iterate } from './iterate'

export const take = <T> (n: number) => (iterable: Iterable<T>): Iterable<T> => ({
  [Symbol.iterator]: function* () {
    const it = iterate(iterable)
    let i = 0
    let ir: any
    while (i++ < n && !(ir = it.next()).done) {
      yield ir.value
    }
  }
})
