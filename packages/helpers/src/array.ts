/* tslint:disable one-variable-per-declaration */
export function shift<T> (this: Array<T>, value?: T): T {
  const res = this[this.length - 1]
  for (let i = this.length - 1; i > 0; --i) {
    this[i] = this[i - 1]
  }
  this[0] = value as any
  return res
}

export function unshift<T> (this: Array<T>, value?: T): T {
  const res = this[0]
  for (let i = 1, l = this.length; i < l; ++i) {
    this[i - 1] = this[i]
  }
  this[this.length - 1] = value as any
  return res
}
