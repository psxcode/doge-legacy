import ReadableStream = NodeJS.ReadableStream
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/share'

export function fromStream<T> (source: ReadableStream): Observable<T> {
  const subscribeToStream = (onData: (data?: T) => void,
                             onError: (e: any) => void,
                             onEnd: () => void) => {
    source.on('data', onData)
    source.on('end', onEnd)
    source.on('error', onError)
    return () => {
      source.removeListener('data', onData)
      source.removeListener('end', onEnd)
      source.removeListener('error', onError)
    }
  }
  return new Observable<T>((observer) => {
    const unsub = subscribeToStream(
      (chunk: T) => {
        observer.next(chunk)
      },
      (e: any) => {
        unsub && unsub()
        observer.error(e)
      },
      () => {
        unsub && unsub()
        observer.complete()
      })
    return unsub
  }).share()
}
