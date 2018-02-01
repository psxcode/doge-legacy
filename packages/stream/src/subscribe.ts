import ReadableStream = NodeJS.ReadableStream
import { on, onceAll } from './events'
import { all, voidify } from '@doge/helpers'

const noop = () => void 0

export interface IObserver {
  next: (chunk: any) => void
  error?: (err: Error) => void,
  complete?: () => void
}

export const isObserver = (obj: any): obj is IObserver => {
  return 'next' in obj && typeof obj.next === 'function'
}

export function subscribe (observer: IObserver | ((chunk: any) => void)) {
  const { next, error, complete } = isObserver(observer)
    ? observer
    : { next: observer, error: undefined, complete: undefined }
  return (...streams: ReadableStream[]) => {
    const onComplete = voidify(all(unsubscribe, complete || noop))
    const unsub = [
      on('data')(next)(...streams),
      error ? on('error')(error)(...streams) : noop,
      onceAll('end')(onComplete)(...streams)
    ]
    return unsubscribe

    function unsubscribe () {
      unsub.forEach(u => u())
    }
  }
}

export const subscribeReadable = (next: (chunk: string | Buffer) => void,
                                  error?: (err: Error) => void,
                                  complete?: () => void) =>
  (...streams: ReadableStream[]) => {
    function onReadable (this: ReadableStream) {
      const chunk = this.read()
      if (chunk) {
        next(chunk)
      }
    }
    const onComplete = voidify(all(unsubscribe, complete || noop))
    const unsub = [
      on('readable')(onReadable)(...streams),
      error ? on('error')(error)(...streams) : noop,
      onceAll('end')(onComplete)(...streams)
    ]
    return unsubscribe

    function unsubscribe () {
      unsub.forEach(u => u())
    }
  }
