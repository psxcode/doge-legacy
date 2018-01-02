import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subscription } from 'rxjs/Subscription'
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/mergeAll'
import 'rxjs/add/operator/first'
import 'rxjs/add/operator/last'
import 'rxjs/add/operator/publish'
import 'rxjs/add/operator/buffer'
import 'rxjs/add/operator/take'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/merge'
import 'rxjs/add/observable/fromEvent'
import WritableStream = NodeJS.WritableStream
import { identity, PredicateFn } from '@doge/helpers'

const not = (fn: PredicateFn) => (arg: any) => !fn(arg)
const isStdIo = (stream: WritableStream) => (stream as any)['_isStdio']
const drainStream = (paused: boolean, trigger: Observable<boolean>) =>
  (source: Observable<any>): Observable<any> => paused
    // Buffer this stream while we wait to become unpaused
    ? source.buffer(trigger.first(not(identity))).take(1)
    // Lift this stream so that it has the same order as the buffered stream
    : Observable.of(source.takeUntil(trigger.first(identity)))

export function writeToStream<T> (this: Observable<T>, stream: WritableStream, encoding = 'utf8') {
  // Used to trigger the pausing
  const pauser = new BehaviorSubject(true)

  // Used for triggering a drain event
  const trigger: Observable<boolean> = Observable.merge(
    Observable.fromEvent(stream, 'drain').mapTo(false),
    pauser
  )

  // Make sure the source is now hot
  const hotSource: ConnectableObservable<T> = this.publish()

  const sub: Subscription = trigger
    .takeUntil(hotSource.last())
    .switchMap(paused => this.let(drainStream(paused, trigger)))
    .mergeAll()
    .subscribe(
      (data: T) => !stream.write(String(data), encoding) && pauser.next(true),
      (err: any) => stream.emit('error', err),
      () => {
        !isStdIo(stream) && stream.end()
      }
    )

  pauser.next(false)
  sub.add(hotSource.connect())

  return sub
}
