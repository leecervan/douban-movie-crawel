export function splitWith(str: any, sep = ' ') {
  if (typeof str !== 'string') return []
  return str.split(sep)
}

export function sleep(fn: Function, timer: number, ...args: any[]): Promise<any> {
  return new Promise(resolve => {
    setTimeout(async () => {
      resolve(await fn.apply(this, args))
    }, timer)
  })
}

