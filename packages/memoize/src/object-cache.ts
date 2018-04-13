import { ICache } from './types'

class ObjectCache<V> implements ICache<string, V> {
  cache: { [k: string]: any }

  constructor (cache: { [k: string]: any } = Object.create(null)) {
    this.cache = cache
  }

  get (key: string) {
    return this.cache[key]
  }

  set (key: string, value: any) {
    this.cache[key] = value
    return this
  }

  has (key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.cache, key)
  }
}

export default ObjectCache
