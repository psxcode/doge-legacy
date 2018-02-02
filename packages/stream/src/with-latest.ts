import ReadableStream = NodeJS.ReadableStream
import { Readable, ReadableOptions } from 'stream'
import { emptyRaw } from './empty'
import { subscribe, subscribeEx } from './subscribe'
import { IEEValue } from './events'

export const withLatestRaw = (opts: ReadableOptions) =>
  (...streams: ReadableStream[]) => (main: ReadableStream): ReadableStream => {
    let unsubscribeMain: (() => void) | undefined
    let unsubscribeRest: (() => void) | undefined
    let latest = new Array(streams.length)
    return streams.length
      ? new Readable({
        ...opts,
        read () {
          if (!unsubscribeMain) {
            unsubscribeMain = subscribe({
              next: (value: any) => {
                this.push([value, ...latest])
              },
              error: (e: any) => this.emit('error', e),
              complete: () => {
                this.push(null)
                unsubscribeMain && unsubscribeMain()
                unsubscribeRest && unsubscribeRest()
                unsubscribeMain = unsubscribeRest = undefined
              }
            })(main)

            unsubscribeRest = subscribeEx(
              ({ value, index }: IEEValue) => latest[index] = value
            )(...streams)
          }
        },
        destroy () {
          unsubscribeMain && unsubscribeMain()
          unsubscribeRest && unsubscribeRest()
          unsubscribeMain = unsubscribeRest = undefined
        }
      })
      : emptyRaw(opts)()
  }

export const withLatest = withLatestRaw({ objectMode: true })
