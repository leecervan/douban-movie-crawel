import { ParameterizedContext } from 'koa'
import { cRank } from '../crawel/rank'

/**
 * 获取电影排行榜页面的边栏信息
 * @GET /movie/rank
 */
export const getSidebarRank = async (ctx: ParameterizedContext): Promise<void> => {
  ctx.body = await cRank()
}
