import ReadableStream = NodeJS.ReadableStream
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/let'
import 'rxjs/add/operator/share'

const afterSubscribe = (fn: () => void) => (source: Observable<any>) =>
  new Observable(observer => {
    const subscription = source.subscribe(observer)
    try {
      fn()
    } catch (e) {
      observer.error(e)
      subscription.unsubscribe()
    }

    return subscription
  })

export function fromStreamStatic (stream: ReadableStream, finishEventName = 'end', dataEventName = 'data'): Observable<any> {
  stream.pause()

  return Observable.merge(
    Observable.fromEvent(stream, dataEventName),
    Observable.fromEvent(stream, 'error', (e: any) => {
      throw e
    })
  )
    .takeUntil(Observable.fromEvent(stream, finishEventName))
    .let(afterSubscribe(() => stream.resume()))
    .share()
}

export function fromReadableStreamStatic (stream: ReadableStream, dataEventName = 'data') {
  return fromStreamStatic(stream, 'end', dataEventName)
}

export function fromReadLineStreamStatic (stream: ReadableStream) {
  return fromStreamStatic(stream, 'close', 'line')
}

export function fromWritableStreamStatic (stream: ReadableStream) {
  return fromStreamStatic(stream, 'finish')
}

export function fromTransformStreamStatic (stream: ReadableStream, dataEventName = 'data') {
  return fromStreamStatic(stream, 'finish', dataEventName)
}
