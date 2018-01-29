import ReadableStream = NodeJS.ReadableStream

const noop = () => void 0

export const subscribe = (next: (chunk: any) => void,
                          error?: (err: Error) => void,
                          complete?: () => void) =>
  (stream: ReadableStream) => {
    const unsubscribe = () => {
      stream.removeListener('data', next)
      stream.removeListener('error', onError)
      stream.removeListener('end', onComplete)
    }
    const onComplete = () => {
      complete && complete()
      unsubscribe()
    }
    const onError = error ? error : noop
    stream.on('data', next)
    stream.on('error', onError)
    stream.on('end', onComplete)
    return unsubscribe
  }

export const subscribeConcatable = (next: (chunk: string | Buffer) => void,
                                    error?: (err: Error) => void,
                                    complete?: () => void) =>
  (stream: ReadableStream) => {
    const unsubscribe = () => {
      stream.removeListener('readable', onReadable)
      stream.removeListener('error', onError)
      stream.removeListener('end', onComplete)
    }
    const onReadable = () => {
      const chunk = stream.read()
      if (chunk) {
        next(chunk)
      }
    }
    const onComplete = () => {
      complete && complete()
      unsubscribe()
    }
    const onError = error ? error : noop
    stream.on('readable', onReadable)
    stream.on('error', onError)
    stream.on('end', onComplete)
    return unsubscribe
  }
