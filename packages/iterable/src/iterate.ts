export function* iterate (iterable: Iterable<any>) {
  for (let value of iterable) {
    yield value
  }
}
