import * as debugFactory from 'debug'
import { Readable, ReadableOptions } from 'stream'

export const readableFromStringsAsync = (delay = 0) => {
  const debug = debugFactory('stream-test:from-strings-async')
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read %d begin', i)
        setTimeout(() => {
          debug('push %d', i)
          return this.push(i >= data.length ? null : data[i++])
        }, delay)
      }
    })
  }
}
