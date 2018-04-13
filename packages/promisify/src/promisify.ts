const promisify = (fn: (...args: any[]) => any) => (...args: any[]) =>
  new Promise((resolve, reject) =>
    fn(...args, (err: any, val: any) => { err ? reject(err) : resolve(val) }))

export default promisify
