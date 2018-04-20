/* tslint:disable no-conditional-assignment */
import ReadableStream = NodeJS.ReadableStream
import { on, onceAll, onEx } from './events'
import { IObserverEx } from './subscribe-ex'
import noop from './noop'

const subscribeReadableEx = ({ next, error, complete = noop }: IObserverEx) =>
  (...streams: ReadableStream[]) => {
    const onComplete = () => {
      unsubscribe()
      complete()
    }
    const unsub = [
      onEx('readable')(({ index, ee }) => {
        let value
        while (value = (ee as ReadableStream).read()) {
          next({ value, index, ee })
        }
      })(...streams),
      error ? on('error')(error)(...streams) : noop,
      onceAll('end')(onComplete)(...streams)
    ]
    return unsubscribe

    function unsubscribe () {
      for (let u of unsub) u()
    }
  }

export default subscribeReadableEx
