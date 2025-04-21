export function parseIntInputValue(value: number | null | undefined): string {
  if (value || value === 0) {
    return String(value);
  }
  return '';
}
