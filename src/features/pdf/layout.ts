export function computeColumns(n: number): 2 | 3 | 4 {
  if (n <= 6) return 2;
  if (n <= 18) return 3;
  return 4;
}
