import ReadableStream = NodeJS.ReadableStream
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/share'
import { subscribe } from '@doge/stream'

export function fromStream<T> (source: ReadableStream) {
  return new Observable<T>(observer => subscribe(observer)(source)).share()
}
