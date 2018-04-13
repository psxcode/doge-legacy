import { Observable } from 'rxjs/Observable'
import { toEventEmitter } from '../../operator/to-event-emitter'

Observable.prototype.toEventEmitter = toEventEmitter

declare module 'rxjs/Observable' {
  interface Observable<T> {
    toEventEmitter: typeof toEventEmitter
  }
}
