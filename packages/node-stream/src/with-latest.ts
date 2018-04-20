import ReadableStream = NodeJS.ReadableStream
import { Readable, ReadableOptions } from 'stream'
import { emptyRaw } from './empty'
import subscribe from './subscribe'
import subscribeEx from './subscribe-ex'
import { IEEValue } from './events'

export const withLatestRaw = (opts: ReadableOptions) =>
  (...streams: ReadableStream[]) => (main: ReadableStream): ReadableStream => {
    let unsubscribeMain: (() => void) | undefined
    let unsubscribeRest: (() => void) | undefined
    let latest = new Array(streams.length)
    const unsub = () => {
      unsubscribeMain && unsubscribeMain()
      unsubscribeRest && unsubscribeRest()
      unsubscribeMain = unsubscribeRest = undefined
    }
    return streams.length
      ? new Readable({
        ...opts,
        read () {
          if (!unsubscribeMain) {
            unsubscribeMain = subscribe({
              next: value => this.push([value, ...latest]),
              error: e => this.emit('error', e),
              complete: () => {
                this.push(null)
                unsub()
              }
            })(main)
            unsubscribeRest = subscribeEx({
              next: ({ value, index }: IEEValue) => latest[index] = value
            })(...streams)
          }
        },
        destroy: unsub
      })
      : emptyRaw(opts)()
  }

const withLatest = withLatestRaw({ objectMode: true })

export default withLatest
