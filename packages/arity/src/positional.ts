const positional = (keys = Object.keys) =>
  (fn: PositionalFn<any>) =>
    (props: IHash<any>) =>
      fn(...keys(props).map(name => props[name]))

export default positional
