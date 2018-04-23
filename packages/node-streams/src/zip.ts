import ReadableStream = NodeJS.ReadableStream
import { Readable, ReadableOptions } from 'stream'
import { emptyRaw } from './empty'
import subscribeEx from './subscribe-ex'
import { onEx } from './events'
import { IEEValue, UnsubFn } from './types'

export const zipRaw = (opts: ReadableOptions) => (...streams: ReadableStream[]): ReadableStream => {
  let unsubscribe: UnsubFn
  let unsubscribeEnd: UnsubFn
  let latest: any[][] = streams.map(() => [])
  let done: boolean[] = streams.map(() => false)
  const checkDone = () => done.some((d, i) => d && !latest[i].length)
  const hasValueForZip = () => latest.every(l => l.length > 0)
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
              if (hasValueForZip()) {
                this.push(latest.map(l => l.shift()))
                if (checkDone()) {
                  this.push(null)
                  unsub()
                }
              }
            },
            error: ({ value }: IEEValue) => this.emit('error', value)
          })(...streams)
          unsubscribeEnd = onEx('end')(({ index }: IEEValue) => {
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

const zip = zipRaw({ objectMode: true })

export default zip
