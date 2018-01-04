import * as debugFactory from 'debug'
import { Readable, ReadableOptions } from 'stream'

export const readableFromStringsBlockingAsync = (delay = 0) => {
  const debug = debugFactory('stream-test:from-strings-one-push-async')
  let inProgress = false
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read more at %d', i)
        if (inProgress) {
          return // debug('already in progress at pos %d', i)
        }
        inProgress = true
        setTimeout(() => {
          debug('blocking multiple pushes: begin at %d', i)
          while (true) {
            if (i >= data.length) {
              debug('data complete at %d', i)
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
          inProgress = false
        }, delay)
      }
    })
  }
}
