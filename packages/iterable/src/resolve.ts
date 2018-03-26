export const resolve = (iter: Iterator<any>) => {
  const handle = async (ir: IteratorResult<any>) => {
    if (!ir.done) {
      handle(iter.next(await ir.value))
    }
  }
  return handle(iter.next())
}
