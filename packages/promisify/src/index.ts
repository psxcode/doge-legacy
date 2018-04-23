export type NotFunction <T> = T extends Function ? never : T
export type NodeCb <R> = (err: any, res: R) => void
export type NodeAsync <T, R> = (arg: T, cb: NodeCb<R>) => void
// function promisify <R> (fn: (cb: (err: any, res: R) => any) => any): () => Promise<R>
// function promisify <R1, R2> (fn: (cb: (err: any, res1: R1, res2: R2) => any) => any): () => Promise<[R1, R2]>
// function promisify <R1, R2, R3> (fn: (cb: (err: any, res1: R1, res2: R2, res3: R3) => any) => any): () => Promise<[R1, R2, R3]>
function promisify <T, R> (fn: (arg: T, cb: NodeCb<R>) => void): (arg: T) => Promise<R>
// function promisify <T, R1, R2> (fn: (arg: T, cb: (err: any, res1: R1, res2: R2) => any) => any): (arg: T) => Promise<[R1, R2]>
// function promisify <T, R1, R2, R3> (fn: (arg: T, cb: (err: any, res1: R1, res2: R2, res3: R3) => any) => any): (arg: T) => Promise<[R1, R2, R3]>
// function promisify <T1, T2, R> (fn: (arg1: T1, arg2: T2, cb: (err: any, res: R) => any) => any): (arg1: T1, arg2: T2) => Promise<R>
// function promisify <T1, T2, R1, R2> (fn: (arg1: T1, arg2: T2, cb: (err: any, res1: R1, res2: R2) => any) => any): (arg1: T1, arg2: T2) => Promise<[R1, R2]>
// function promisify <T1, T2, R1, R2, R3> (fn: (arg1: T1, arg2: T2, cb: (err: any, res1: R1, res2: R2, res3: R3) => any) => any): (arg1: T1, arg2: T2) => Promise<[R1, R2, R3]>
// function promisify <T1, T2, T3, R> (fn: (arg1: T1, arg2: T2, arg3: T3, cb: (err: any, res: R) => any) => any): (arg1: T1, arg2: T2, arg3: T3) => Promise<R>
// function promisify <T1, T2, T3, R1, R2> (fn: (arg1: T1, arg2: T2, arg3: T3, cb: (err: any, res1: R1, res2: R2) => any) => any): (arg1: T1, arg2: T2, arg3: T3) => Promise<[R1, R2]>
// function promisify <T1, T2, T3, R1, R2, R3> (fn: (arg1: T1, arg2: T2, arg3: T3, cb: (err: any, res1: R1, res2: R2, res3: R3) => any) => any): (arg1: T1, arg2: T2, arg3: T3) => Promise<[R1, R2, R3]>
function promisify (fn: Function) {
  return (...args: any[]) =>
    new Promise((resolve, reject) =>
      fn(...args, (err: any, ...results: any[]) => {
        err ? reject(err) : resolve(results.length > 1 ? results : results[0])
      }))
}

export default promisify
