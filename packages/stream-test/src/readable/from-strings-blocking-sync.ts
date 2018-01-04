import * as debugFactory from 'debug'
import { Readable, ReadableOptions } from 'stream'

export const readableFromStringsBlockingSync = () => {
  const debug = debugFactory('stream-test:from-strings-blocking-sync')
  return (data: string[] = [], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read at %d', i)
        while (true) {
          if (i >= data.length) {
            debug('complete at %d', i)
            this.push(null)
            break
          }
          debug('pushing %d', i)
          const res = this.push(data[i++])
          if (!res) {
            debug('backpressure at %d', i - 1)
            break
          }
        }
      }
    })
  }
}
