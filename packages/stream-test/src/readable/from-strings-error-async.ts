import { Readable, ReadableOptions } from 'stream'

export const readableFromStringsErrorAsync = (delay = 0, errorAtStep = 0) =>
  (data: string[] = [], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        if (i === errorAtStep) {
          this.emit('error')
        }
        this.push(i >= data.length ? null : data[i++])
      }
    })
  }
