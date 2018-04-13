import ReadableStream = NodeJS.ReadableStream
import { Readable, ReadableOptions } from 'stream'
import { emptyRaw } from './empty'
import { subscribe } from './subscribe'

export const mergeRaw = (opts: ReadableOptions) => (...streams: ReadableStream[]): ReadableStream => {
  let unsubscribe: (() => void) | undefined
  return streams.length
    ? new Readable({
      ...opts,
      read () {
        if (!unsubscribe) {
          unsubscribe = subscribe({
            next: (value: any) => this.push(value),
            error: (e?: any) => this.emit('error', e),
            complete: () => this.push(null)
          })(...streams)
        }
      },
      destroy () {
        unsubscribe && unsubscribe()
        unsubscribe = undefined
      }
    })
    : emptyRaw(opts)()
}

export const merge = mergeRaw({ objectMode: true })
