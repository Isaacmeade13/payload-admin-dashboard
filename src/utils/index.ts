function isNumeric(str: unknown): boolean {
  if (typeof str != 'string') return false;
  return !isNaN(Number(str)) && !isNaN(parseFloat(str));
}

export { isNumeric };
