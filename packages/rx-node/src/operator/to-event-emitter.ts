import { EventEmitter } from 'events'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

declare module 'events' {
  export interface EventEmitter {
    publish (): Subscription
  }
}

export function toEventEmitter<T> (this: Observable<T>, eventName = 'data', selector?: (arg: T) => any): EventEmitter {
  const e = new EventEmitter()

  e.publish = () => this.subscribe(
    (x: T) => {
      try {
        e.emit(eventName, selector ? selector(x) : x)
      } catch (e) {
        e.emit('error', e)
      }
    },
    (err: any) => e.emit('error', err),
    () => e.emit('end')
  )

  return e
}
