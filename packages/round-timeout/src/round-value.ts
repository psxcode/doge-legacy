export type RoundingFn = typeof Math.round
export const roundValue = (roundTo: number, roundingFn: RoundingFn) =>
  (value: number) => roundingFn(value / roundTo) * roundTo
