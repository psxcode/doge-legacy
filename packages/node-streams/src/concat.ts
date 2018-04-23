import { Readable, ReadableOptions } from 'stream'
import ReadableStream = NodeJS.ReadableStream
import { emptyRaw } from './empty'
import subscribe from './subscribe'
import { UnsubFn } from './types'

export const concatRaw = (opts: ReadableOptions) => (...streams: ReadableStream[]): ReadableStream => {
  let unsubscribe: UnsubFn
  let index = 0
  function read (this: Readable) {
    if (!unsubscribe) {
      if (index >= streams.length) {
        this.push(null)
      } else {
        unsubscribe = subscribe({
          next: chunk => this.push(chunk),
          error: e => this.emit('error', e),
          complete: () => {
            unsubscribe = undefined
            return read.call(this)
          }
        })(streams[index++])
      }
    }
  }
  return streams.length
    ? new Readable({
      ...opts,
      read,
      destroy () {
        unsubscribe && unsubscribe()
        unsubscribe = undefined
      }
    })
    : emptyRaw(opts)()
}

const concat = concatRaw({ objectMode: true })

export default concat
