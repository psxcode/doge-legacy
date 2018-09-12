import { iterate } from 'iterama'
import { identityAsync } from '@psxcode/arity'
import {
  AsyncPullProducer,
  AsyncPushConsumer,
  AsyncPushProducer,
  PullProducer,
  PushConsumer,
  PushProducer
} from './types'

export const push = <T> (iterable: Iterable<T>): PushProducer<T> =>
  (consumer: PushConsumer<T>) => {
    const it = iterate(iterable)
    let ir: IteratorResult<T>
    while (consumer(ir = it.next()) && !ir.done);
  }

export const pushAsync = <T> (iterable: Iterable<T>): AsyncPushProducer<T> =>
  async (consumer: AsyncPushConsumer<T>) => {
    const it = iterate(iterable)
    let ir: IteratorResult<T>
    while (await consumer(identityAsync(ir = it.next())) && !ir.done);
  }

export const pull = <T> (iterable: Iterable<T>): PullProducer<T> => {
  const it = iterate(iterable)
  return () => it.next()
}

export const pullAsync = <T> (iterable: Iterable<T>): AsyncPullProducer<T> => {
  const it = iterate(iterable)
  return () => identityAsync(it.next())
}
