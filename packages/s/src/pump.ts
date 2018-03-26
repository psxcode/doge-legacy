import { AsyncIteratorResult, PullProducer, PushConsumer } from './types'

export const pump = <T> (producer: PullProducer<T>) => async (consumer: PushConsumer<T>) => {
  let air: AsyncIteratorResult<T>
  while (await consumer(air = producer()) && !(await air).done);
}
