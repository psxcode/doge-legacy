export interface ICache<K, V> {
  get (key: K): V | undefined
  set (key: K, value: V): this
  has (key: K): boolean
}

export interface ISerializer<K, V> {
  (val: V): K
}
