import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Readable, ReadableOptions } from 'stream'

export function toStream<T extends string> (this: Observable<T>, opts: ReadableOptions = {}) {
  const source = this
  let sub: Subscription | null
  return new Readable({
    ...opts,
    encoding: opts.encoding || 'utf8',
    read () {
      if (!sub) {
        sub = source.subscribe(
          (data: T) => {
            if (!this.push(data)) {
              this.emit('error', new Error('Buffer limit reached'))
              sub && sub.unsubscribe()
              sub = null
            }
          },
          (e) => this.emit('error', e),
          () => this.push(null)
        )
      }
    },
    destroy () {
      sub && sub.unsubscribe()
      sub = null
    }
  })
}
