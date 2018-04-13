/* tslint:disable no-conditional-assignment */
import ReadableStream = NodeJS.ReadableStream
import { PushConsumer, PushProducer } from './types'
import { on } from '@psxcode/node-stream'
import { all } from '@doge/compose'
import { asyncIteratorResult, doneAsyncIteratorResult, errorAsyncIteratorResult } from './helpers'

export const pushFromStream = <T> (stream: ReadableStream): PushProducer<Iterable<T>> =>
  async (consumer) => {
    let consumerPressure: Promise<boolean>
    const onReadable = async () => {
      if (!consumerPressure || await consumerPressure) {
        const data: T[] = []
        let chunk: any
        while (chunk = stream.read()) {
          data.push(chunk)
        }
        consumerPressure = consumer(asyncIteratorResult(data))
      } else {
        unsubscribe()
      }
    }
    const onError = async (err?: any) => {
      if (!consumerPressure || await consumerPressure) {
        consumerPressure = consumer(errorAsyncIteratorResult(err))
      } else {
        unsubscribe()
      }
    }
    const onComplete = async () => {
      if (!consumerPressure || await consumerPressure) {
        consumerPressure = consumer(doneAsyncIteratorResult)
      }
    }
    const unsub = [
      on('readable')(onReadable)(stream),
      on('error')(onError)(stream),
      on('end')(all(onComplete, unsubscribe))(stream)
    ]

    function unsubscribe () {
      unsub.forEach(u => u())
    }
  }
