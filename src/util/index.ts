export function splitWith(str: any, sep = ' ') {
  if (typeof str !== 'string') return []
  return str.split(sep)
}
