import ReadableStream = NodeJS.ReadableStream
import { Readable, ReadableOptions } from 'stream'
import { emptyRaw } from './empty'
import { subscribe } from './subscribe'

export const mergeRaw = (opts: ReadableOptions) => (...streams: ReadableStream[]) => {
  let subscriptions: any[]
  return streams.length
    ? new Readable({
      ...opts,
      read () {
        if (!subscriptions) {
          const next = this.push.bind(this)
          const error = this.emit.bind(this, 'error')
          subscriptions = streams.map(subscribe(next, error))
        }
      }
    })
    : emptyRaw(opts)
}
