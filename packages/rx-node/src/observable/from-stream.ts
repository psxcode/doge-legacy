import ReadableStream = NodeJS.ReadableStream
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/share'

export function fromStream<T extends string | Buffer> (source: ReadableStream): Observable<T> {
  return new Observable<T>((observer) => {
    source.on('data', (chunk: T) => {
      observer.next(chunk)
    })
    source.on('end', () => {
      observer.complete()
    })
    source.on('error', (e) => {
      observer.error(e)
    })
  }).share()
}
