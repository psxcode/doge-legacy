import { Readable, ReadableOptions } from 'stream'

export const emptyRaw = (opts: ReadableOptions) => () =>
  new Readable({
    ...opts,
    read () {
      this.push(null)
    }
  })

const empty = emptyRaw({ objectMode: true })

export default empty
