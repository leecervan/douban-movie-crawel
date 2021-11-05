import { ParameterizedContext } from 'koa'
import { cHome } from '../crawel/index'

// 正在热映、即将上映
export const getHomeMovie = async (ctx: ParameterizedContext): Promise<void> => {
  // Todo: 设置 expires 或者超时重新请求
  const res = await cHome()
  // console.log(res)
  ctx.body = res
}
