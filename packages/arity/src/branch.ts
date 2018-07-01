const branch = <T, R1, R2> (pred: (arg?: T) => boolean, fn0: (p?: T) => R1, fn1: (p?: T) => R2) =>
  (arg?: T) => pred(arg) ? fn0(arg) : fn1(arg)

export default branch
