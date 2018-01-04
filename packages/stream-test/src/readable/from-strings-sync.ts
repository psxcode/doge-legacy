import * as debugFactory from 'debug'
import { Readable, ReadableOptions } from 'stream'

export const readableFromStringsSync = () => {
  const debug = debugFactory('stream-test:from-strings-sync')
  return (data: string[] = [], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read %d', i)
        return this.push(i >= data.length ? null : data[i++])
      }
    })
  }
}
