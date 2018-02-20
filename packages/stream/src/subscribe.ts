import ReadableStream = NodeJS.ReadableStream
import { IEEValue, on, onceAll, onEx } from './events'
import { all, voidify, bindCtx } from '@doge/helpers'

const noop = () => void 0

export interface IObserver {
  next: (chunk: any) => void
  error?: (err: Error) => void,
  complete?: () => void
}

export interface IObserverEx {
  next: (chunk: IEEValue) => void
  error?: (err: IEEValue) => void,
  complete?: () => void
}

export const bindObserver = (observer: IObserver) => {
  const binded = bindCtx(observer)
  const { next, error, complete } = observer
  return {
    next: binded(next),
    error: error && binded(error),
    complete: complete && binded(complete)
  }
}

export const subscribe = ({ next, error, complete }: IObserver) =>
  (...streams: ReadableStream[]) => {
    const onComplete = voidify(all(unsubscribe, complete || noop))
    const unsub = [
      on('data')(next)(...streams),
      error ? on('error')(error)(...streams) : noop,
      onceAll('end')(onComplete)(...streams)
    ]
    return unsubscribe

    function unsubscribe () {
      for (let u of unsub) u()
    }
  }

export const subscribeEx = ({ next, error, complete }: IObserverEx) =>
  (...streams: ReadableStream[]) => {
    const onComplete = voidify(all(unsubscribe, complete || noop))
    const unsub = [
      onEx('data')(next)(...streams),
      error ? onEx('error')(error)(...streams) : noop,
      onceAll('end')(onComplete)(...streams)
    ]
    return unsubscribe

    function unsubscribe () {
      unsub.forEach(u => u())
    }
  }
