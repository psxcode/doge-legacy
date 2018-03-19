export interface IPushConsumer <T> {
  next (value: Iterable<T> | null): Promise<boolean>
  error (e: any): void
  complete (): void
}

export interface IPushProducer <T> {
  subscribe (consumer: IPushConsumer<T>): () => void
}

export interface IPullProducer <T> {
  next (): Promise<Iterable<T> | null>
  error (e: any): void
  complete (): void
}

export interface IPullConsumer <T> {
  consume (producer: IPullProducer<T>): void
}
