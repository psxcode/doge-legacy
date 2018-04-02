export type AsyncIteratorResult <T> = Promise<IteratorResult<T>>

export type PushConsumer <T> = (value: IteratorResult<T>) => boolean
export type AsyncPushConsumer <T> = (value: AsyncIteratorResult<T>) => Promise<boolean>

export type PushProducer <T> = (consumer: PushConsumer<T>) => void
export type AsyncPushProducer <T> = (consumer: AsyncPushConsumer<T>) => void

export type PullProducer <T> = () => IteratorResult<T>
export type AsyncPullProducer <T> = () => AsyncIteratorResult<T>

export type PullConsumer <T> = (producer: PullProducer<T>) => void
export type AsyncPullConsumer <T> = (producer: AsyncPullProducer<T>) => void

export interface IAsyncPool <T> {
  push: AsyncPushConsumer<T>,
  pull: AsyncPullProducer<T>
}
