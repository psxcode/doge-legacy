function unshift<T> (this: Array<T>, value?: T): T {
  const res = this[0]
  for (let i = 1; i < this.length; ++i) {
    this[i - 1] = this[i]
  }
  this[this.length - 1] = value as any
  return res
}

export default unshift
