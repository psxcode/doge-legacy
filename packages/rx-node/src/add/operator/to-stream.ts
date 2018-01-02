import { Observable } from 'rxjs/Observable'
import { writeToStream } from '../../operator/to-stream'

Observable.prototype.toStream = writeToStream

declare module 'rxjs/Observable' {
  interface Observable<T> {
    toStream: typeof writeToStream
  }
}
