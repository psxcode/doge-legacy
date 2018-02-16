export const resolve = (iter: Iterator<any>) => {
  const handle = (ir: IteratorResult<any>) => {
    if (!ir.done) {
      Promise.resolve(ir.value)
        .then(val => handle(iter.next(val)))
    }
  }
  handle(iter.next())
}
