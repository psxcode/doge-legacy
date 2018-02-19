import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Readable, ReadableOptions } from 'stream'

export function toStream<T> (this: Observable<T>, opts: ReadableOptions = {}) {
  const source = this
  let sub: Subscription
  return new Readable({
    ...opts,
    read () {
      if (!sub) {
        sub = source.subscribe(
          (data: T) => {
            if (!this.push(data)) {
              sub && sub.unsubscribe()
              this.emit('error', new Error('Buffer limit reached'))
              this.push(null)
            }
          },
          (e) => {
            sub && sub.unsubscribe()
            this.emit('error', e)
            this.push(null)
          },
          () => {
            this.push(null)
          }
        )
      }
    },
    destroy () {
      sub && sub.unsubscribe()
    }
  })
}
