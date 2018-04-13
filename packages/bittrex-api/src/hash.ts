import { createHmac } from 'crypto'
import { makeJsonSerializer, makeObjectCache, memoize } from '@doge/memoize'

export const hash = (secret: string) =>
  memoize<string, string>(makeObjectCache(), makeJsonSerializer())(
    (value: string) => createHmac('sha512', secret).update(value).digest('hex')
  )
