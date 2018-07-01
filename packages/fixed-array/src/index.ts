class FixedArray <T> {
  data: T[]
  index = 0
  constructor (length: number) {
    this.data = new Array<T>(length)
  }

  get length () {
    return this.data.length
  }

  static from <T> (source: T[]) {
    const c = new FixedArray<T>(source.length)
    for (let i = 0; i < source.length; ++i) {
      c.data[i] = source[i]
    }
    return c
  }

  * [Symbol.iterator] () {
    for (let i = 0; i < this.data.length; ++i) {
      yield this.data[(i + this.index) % this.data.length]
    }
  }

  fill (value: T): this {
    for (let i = 0; i < this.data.length; ++i) {
      this.data[i] = value
    }
    this.index = 0
    return this
  }

  shift (value: T): T {
    const returnValue = this.data[this.index]
    this.data[this.index] = value
    this.index = (this.index + 1) % this.data.length
    return returnValue
  }

  unshift (value: T): T {
    this.index = (this.index + this.data.length - 1) % this.data.length
    const returnValue = this.data[this.index]
    this.data[this.index] = value
    return returnValue
  }
}

export default FixedArray
