export type AsyncIteratorResult <T> = Promise<IteratorResult<T>>

export type PushConsumer <T> = (value: AsyncIteratorResult<T>) => Promise<boolean>

export type PushProducer <T> = (consumer: PushConsumer<T>) => void

export type PullProducer <T> = () => AsyncIteratorResult<T>

export type PullConsumer <T> = (producer: PullProducer<T>) => void

export interface IPool <T> {
  push: PushConsumer<T>,
  pull: PullProducer<T>
}
