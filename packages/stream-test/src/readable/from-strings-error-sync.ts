import { Readable, ReadableOptions } from 'stream'

export const readableFromStringsErrorSync = (errorAtStep = 0) =>
  (data: string[] = [], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        if (i === errorAtStep) {
          this.emit('error', new Error(`readableFromStringsErrorSync error at step ${i}`))
        } else {
          this.push(i >= data.length ? null : data[i++])
        }
      }
    })
  }
