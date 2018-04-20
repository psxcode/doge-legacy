/* tslint:disable no-conditional-assignment */
import ReadableStream = NodeJS.ReadableStream
import { IEEValue, onceAll, onEx } from './events'
import noop from './noop'

export interface IObserverEx {
  next: (chunk: IEEValue) => void
  error?: (err: IEEValue) => void,
  complete?: () => void
}

const subscribeEx = ({ next, error, complete = noop }: IObserverEx) =>
  (...streams: ReadableStream[]) => {
    const onComplete = () => {
      unsubscribe()
      complete()
    }
    const unsub = [
      onEx('data')(next)(...streams),
      error ? onEx('error')(error)(...streams) : noop,
      onceAll('end')(onComplete)(...streams)
    ]
    return unsubscribe

    function unsubscribe () {
      for (let u of unsub) u()
    }
  }

export default subscribeEx
