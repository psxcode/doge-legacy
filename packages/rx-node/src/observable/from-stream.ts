import ReadableStream = NodeJS.ReadableStream
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/share'
import { subscribe, bindObserver } from '@doge/stream'

export function fromStream<T> (source: ReadableStream) {
  return new Observable<T>(observer => subscribe(bindObserver(observer))(source)).share()
}
