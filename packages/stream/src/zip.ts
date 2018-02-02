import ReadableStream = NodeJS.ReadableStream
import { Readable, ReadableOptions } from 'stream'
import { emptyRaw } from './empty'
import { subscribeEx } from './subscribe'
import { IEEValue, onEx } from './events'

export const zipRaw = (opts: ReadableOptions) => (...streams: ReadableStream[]): ReadableStream => {
  let unsubscribe: (() => void) | undefined
  let unsubscribeEnd: (() => void) | undefined
  let latest: any[][] = streams.map(() => [])
  let done = streams.map(() => false)
  const checkDone = () => done.some((d, i) => d && !latest[i].length)
  const unsub = () => {
    unsubscribe && unsubscribe()
    unsubscribeEnd && unsubscribeEnd()
    unsubscribe = unsubscribeEnd = undefined
  }
  return streams.length
    ? new Readable({
      ...opts,
      read () {
        if (!unsubscribe) {
          unsubscribe = subscribeEx({
            next: ({ value, index }: IEEValue) => {
              latest[index].push(value)
              if (latest.every(l => l.length > 0)) {
                this.push(latest.map(l => l.shift()))
                if (checkDone()) {
                  this.push(null)
                  unsub()
                }
              }
            },
            error: ({ value }: IEEValue) => this.emit('error', value)
          })(...streams)
          unsubscribeEnd = onEx('end')(({ index }) => {
            done[index] = true
            if (checkDone()) {
              this.push(null)
              unsub()
            }
          })(...streams)
        }
      },
      destroy: unsub
    })
    : emptyRaw(opts)()
}

export const zip = zipRaw({ objectMode: true })
