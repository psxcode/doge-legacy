import ReadableStream = NodeJS.ReadableStream
import { AsyncPushProducer, PushProducer, PullProducer } from './types'
import { subscribe, subscribeReadable, on } from '@doge/stream'
import {
  asyncIteratorResult,
  doneAsyncIteratorResult,
  doneIteratorResult,
  errorAsyncIteratorResult,
  iteratorResult
} from './helpers'

export const push = <T> (stream: ReadableStream): PushProducer<T> => (consumer) => {
  const unsubscribe = subscribe({
    next (value) {
      consumer(iteratorResult(value)) || unsubscribe()
    },
    complete () {
      consumer(doneIteratorResult)
    }
  })(stream)
}

export const pushAsync = <T> (stream: ReadableStream): AsyncPushProducer<T> => (consumer) => {
  const unsubscribe = subscribeReadable({
    next ({ value }) {
      consumer()
    }
  })(stream)
}

export const pull = <T> (stream: ReadableStream): PullProducer<T> => {

}
