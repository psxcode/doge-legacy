export interface ICache<K, V> {
  get (key: K): V
  set (key: K, value: V): void
  has (key: K): boolean
}

export class ObjectCache implements ICache<string, any> {
  cache = Object.create(null)
  get (key: string) {
    return this.cache[key]
  }
  set (key: string, value: any) {
    this.cache[key] = value
  }
  has (key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.cache, key)
  }
}

export const makeObjectCache = () => new ObjectCache()

export const memoize = <K>(cache: ICache<K, any>, serializer: (val: any) => K) =>
  (fn: (arg: any) => any) => (arg: any): any => {
    const cacheKey: K = serializer(arg)

    if (!cache.has(cacheKey)) {
      const computedValue = fn(arg)
      cache.set(cacheKey, computedValue)
      return computedValue
    }

    return cache.get(cacheKey)
  }
