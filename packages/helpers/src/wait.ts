export const wait = (timeout: (cb: Function, ms: number) => any) => (ms: number) =>
  new Promise(resolve => timeout(resolve, ms))
