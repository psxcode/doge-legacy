const round = (roundTo: number, roundingFn: typeof Math.round) =>
  (value: number) => roundingFn(value / roundTo) * roundTo

export default round
