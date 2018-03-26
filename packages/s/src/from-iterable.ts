import { iterate } from '@doge/iterable'
import { identityAsync } from '@doge/helpers'
import { PullProducer, PushConsumer, PushProducer } from './types'

export const pushFromIterable = <T> (iterable: Iterable<T>): PushProducer<T> =>
  async (consumer: PushConsumer<T>) => {
    const it = iterate(iterable)
    let ir: IteratorResult<T>
    while (await consumer(identityAsync(ir = it.next())) && !ir.done);
  }

export const pullFromIterable = <T> (iterable: Iterable<T>): PullProducer<T> => {
  const it = iterate(iterable)
  return () => identityAsync(it.next())
}
