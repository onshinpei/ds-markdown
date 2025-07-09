export function getObjectKeys(obj: Record<string, unknown>, prefix: string = '') {
  const keys: string[] = [];
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'object') {
      keys.push(...getObjectKeys(obj[key] as Record<string, unknown>, `${prefix ? `${prefix}.` : ''}${key}`));
    } else {
      keys.push(`${prefix ? `${prefix}.` : ''}${key}`);
    }
  }
  return keys;
}
