export const resolve = <T> (iterator: Iterator<T>) => {
  const handle = async (ir: IteratorResult<T>) => {
    if (!ir.done) {
      handle(iterator.next(await ir.value))
    }
  }
  return handle(iterator.next())
}
