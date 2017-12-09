export const roundValue = (roundTo: number, roundingOperation = Math.round) =>
  (value: number): number => roundingOperation(value / roundTo) * roundTo
