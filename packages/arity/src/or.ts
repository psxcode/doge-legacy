const or = <T> (...preds: Array<(arg?: T) => boolean>) =>
  (arg?: T): boolean => preds.some(pred => pred(arg))

export default or
