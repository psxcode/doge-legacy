export type RoundingFn = typeof Math.round
export const round = (roundTo: number, roundingFn: RoundingFn) =>
  (value: number) => roundingFn(value / roundTo) * roundTo
