import ReadableStream = NodeJS.ReadableStream
import WritableStream = NodeJS.WritableStream

export const streamChainPromise = <T>(readable: ReadableStream, writable: WritableStream) => {
  return (value: T): Promise<T> => {
    writable.write(value as any)
    return new Promise((res, rej) => {
      const resolve = () => {
        unsubscribe()
        res(readable.read() as any)
      }
      const reject = () => {
        unsubscribe()
        rej()
      }
      const unsubscribe = () => {
        readable.removeListener('readable', resolve)
        readable.removeListener('error', reject)
      }
      readable.on('readable', resolve)
      readable.on('error', reject)
    })
  }
}
