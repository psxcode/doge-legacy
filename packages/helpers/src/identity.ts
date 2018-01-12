export function identity<T> (arg: T): T {
  return arg
}

export function identityAsync<T> (arg: T): Promise<T> {
  return Promise.resolve(arg)
}
