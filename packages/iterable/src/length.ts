import { iterate } from './iterate'

export const length = (maxLength = Number.POSITIVE_INFINITY) => {
  if (maxLength < 0) {
    maxLength = Number.POSITIVE_INFINITY
  }
  return (iterable: Iterable<any>): number => {
    let i = 0
    const it = iterate(iterable)
    while (i < maxLength && !it.next().done) {
      ++i
    }
    return i
  }
}
