const named = (keys: () => string[]) =>
  <R> (fn: (props: {[k: string]: any}) => R) =>
    (...args: any[]) =>
      fn(keys().reduce((res: {[k: string]: any}, name, i) => {
        res[name] = args[i]
        return res
      }, {}))

export default named
