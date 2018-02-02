import ReadableStream = NodeJS.ReadableStream
import { Readable, ReadableOptions } from 'stream'
import { emptyRaw } from './empty'
import { subscribeEx } from './subscribe'
import { IEEValue } from './events'

export const combineRaw = (opts: ReadableOptions) => (...streams: ReadableStream[]): ReadableStream => {
  let unsubscribe: (() => void) | undefined
  let latest = new Array(streams.length)
  return streams.length
    ? new Readable({
      ...opts,
      read () {
        if (!unsubscribe) {
          unsubscribe = subscribeEx({
            next: ({ value, index }: IEEValue) => {
              latest[index] = value
              this.push(latest.slice())
            },
            error: ({ value }: IEEValue) => this.emit('error', value),
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

export const combine = combineRaw({ objectMode: true })
