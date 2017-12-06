export const alignValue = (alignStep: number, roundingOperation = Math.round) =>
  (value: number): number => roundingOperation(value / alignStep) * alignStep
