const resolve = <T> (iterator: Iterator<T>) => {
  const handle = async (ir: IteratorResult<T>): Promise<any> => {
    if (!ir.done) {
      return handle(iterator.next(await ir.value))
    }
  }
  return handle(iterator.next())
}

export default resolve
