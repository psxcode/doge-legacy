export const isPositiveNumber = (num: any): boolean => {
  return num && isFinite(num) && num >= 0
}
