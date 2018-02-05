import { createHmac } from 'crypto'

export const hash = (secret: string) => (value: string) => {
  return createHmac('sha512', secret).update(value).digest('hex')
}
