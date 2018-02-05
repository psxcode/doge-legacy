export const wait = (setTimeout: (cb: () => void, ms: number) => any, clearTimeout: (id: any) => void) =>
  (ms: number) => (cb: () => void) => {
    const id = setTimeout(cb, ms)
    return () => {
      clearTimeout(id)
    }
  }

export const waitPromise = (timeout: (cb: Function, ms: number) => any) => (ms: number): Promise<void> =>
  new Promise(resolve => timeout(resolve, ms))
