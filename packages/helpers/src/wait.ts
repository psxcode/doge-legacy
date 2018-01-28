export const wait = (timeout: (cb: Function, ms: number) => any) => (ms: number): Promise<void> =>
  new Promise(resolve => timeout(resolve, ms))
