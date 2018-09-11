export interface IMemoizeCache<Key, Value> {
  get (key: Key): Value | undefined
  set (key: Key, value: Value): this
  has (key: Key): boolean
}

export interface IMemoizeKeySerializer<Key, Value> {
  (val: Value): Key
}
