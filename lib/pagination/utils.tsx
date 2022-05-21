// Clamp a number between a min and max
export function clamp(num: number, minNum: number, maxNum: number) {
  return Math.min(Math.max(num, minNum), maxNum);
}
