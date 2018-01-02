import { EventEmitter } from 'events'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

declare module 'events' {
  export interface EventEmitter {
    publish (): Subscription
  }
}

export function toEventEmitter<T> (this: Observable<T>, eventName = 'data'): EventEmitter {
  const ee = new EventEmitter()

  ee.publish = () => this.subscribe(
    (x: T) => ee.emit(eventName, x),
    (err: any) => ee.emit('error', err),
    () => ee.emit('end')
  )

  return ee
}
