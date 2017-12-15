export type RoundingFn = typeof Math.round
export const roundValue = (roundTo: number, roundingFn: RoundingFn) =>
  (value: number): number => roundingFn(value / roundTo) * roundTo
