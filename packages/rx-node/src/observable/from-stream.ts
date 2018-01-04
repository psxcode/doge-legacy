import ReadableStream = NodeJS.ReadableStream
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/share'

export function fromStream<T extends string | Buffer> (source: ReadableStream): Observable<T> {
  return new Observable<T>((observer) => {
    const onData = (chunk: T) => {
      observer.next(chunk)
    }
    const onEnd = () => {
      source.removeListener('data', onData)
      source.removeListener('end', onEnd)
      source.removeListener('error', onError)
      observer.complete()
    }
    const onError = (e: any) => {
      source.removeListener('data', onData)
      source.removeListener('end', onEnd)
      source.removeListener('error', onError)
      observer.error(e)
    }
    source.on('data', onData)
    source.on('end', onEnd)
    source.on('error', onError)
  }).share()
}
