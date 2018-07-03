const bindProps = (props0: IHash<any>) =>
  (fn: PositionalFn<any>) => (props1: IHash<any> = {}) => fn({ ...props0, ...props1 })

export default bindProps
