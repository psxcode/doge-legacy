export interface ICache<K, V> {
  get (key: K): V | undefined
  set (key: K, value: V): this
  has (key: K): boolean
}

export interface ISerializer<K, V> {
  (val: V): K
}

export class ObjectCache <V> implements ICache<string, V> {
  cache = Object.create(null)
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

export const makeObjectCache = <V> (): ICache<string, V> => new ObjectCache<V>()

export const makeMapCache = <K, V> (): ICache<K, V> => new Map<K, V>()

export const makeJsonSerializer = (): ISerializer<string, any> => JSON.stringify

export const memoize = <P, V> (cache: ICache<string, V>, serializer: ISerializer<string, P>) =>
  (fn: (arg: P) => V) => (arg: P): V => {
    const cacheKey = serializer(arg)

    if (!cache.has(cacheKey)) {
      const computedValue = fn(arg)
      cache.set(cacheKey, computedValue)
      return computedValue
    }

    return cache.get(cacheKey)!
  }
