import iterate from './iterate'

const take = (n: number) => <T> (iterable: Iterable<T>): Iterable<T> => ({
  * [Symbol.iterator] () {
    const it = iterate(iterable)
    let i = 0
    let ir: any
    while (i++ < n && !(ir = it.next()).done) {
      yield ir.value
    }
  }
})

export default take
