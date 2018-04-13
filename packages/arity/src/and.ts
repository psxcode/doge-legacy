const and = <T> (...preds: Array<(arg?: T) => boolean>) =>
  (arg?: T): boolean => preds.every(pred => pred(arg))

export default and
