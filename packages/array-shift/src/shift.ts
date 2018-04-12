function shift<T> (this: Array<T>, value?: T): T {
  const res = this[this.length - 1]
  for (let i = this.length - 1; i > 0; --i) {
    this[i] = this[i - 1]
  }
  this[0] = value as any
  return res
}

export default shift
