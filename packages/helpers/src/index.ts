export type Fn = (...args: any[]) => any
export const pipe = (...functions: Fn[]): Fn => {
  const [fn, ...fns] = functions
  return (...args: any[]) => fns.length
    ? pipe(...fns)(fn(...args))
    : fn(...args)
}

export type asyncFn = (...args: any[]) => Promise<any>
export const pipeAsync = (...functions: asyncFn[]): asyncFn => {
  const [fn, ...fns] = functions
  return (...args: any[]) => fns.length
    ? fn(...args).then((res: any) => pipeAsync(...fns)(res))
    : fn(...args)
}

export type Params = {
  [key: string]: any
}
export const entries = (params: Params) =>
  Object
    .keys(params)
    .map((k: string): [string, any] => [k, `${params[k]}`])

export type AnyFn = (...args: any[]) => any
export const promisify = (f: AnyFn) => (...args: any[]) =>
  new Promise((resolve, reject) => f(...args, (err: any, val: any) => err ? reject(err) : resolve(val)))
