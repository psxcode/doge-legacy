import { Readable, ReadableOptions } from 'stream'

export const emptyRaw = (opts: ReadableOptions) => () =>
  new Readable({
    ...opts,
    read () {
      this.push(null)
    }
  })

export const empty = emptyRaw({ objectMode: true })
