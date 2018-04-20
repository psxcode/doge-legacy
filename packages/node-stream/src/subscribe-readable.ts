/* tslint:disable no-conditional-assignment */
import ReadableStream = NodeJS.ReadableStream
import { IObserver } from './subscribe'
import { on, onceAll, onEx } from './events'
import noop from './noop'

const subscribeReadable = ({ next, error, complete = noop }: IObserver) =>
  (...streams: ReadableStream[]) => {
    const onComplete = () => {
      unsubscribe()
      complete()
    }
    const unsub = [
      onEx('readable')(({ ee }) => {
        let chunk
        while (chunk = (ee as ReadableStream).read()) {
          next(chunk)
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

export default subscribeReadable
