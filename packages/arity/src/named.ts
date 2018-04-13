import { IHash, NamedFn } from './types'

const named = (keys: () => string[]) =>
  (fn: NamedFn<any>) =>
    (...args: any[]) =>
      fn(keys().reduce((res: IHash<any>, name, i) => {
        res[name] = args[i]
        return res
      }, {}))

export default named
