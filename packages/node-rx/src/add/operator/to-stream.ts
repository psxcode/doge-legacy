import { Observable } from 'rxjs/Observable'
import { toStream } from '../../operator/to-stream'

Observable.prototype.toStream = toStream

declare module 'rxjs/Observable' {
  interface Observable<T> {
    toStream: typeof toStream
  }
}
