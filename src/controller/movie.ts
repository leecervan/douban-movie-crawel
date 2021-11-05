import { ParameterizedContext } from 'koa'
import { Movie, MovieDocument } from '../model/movie'
import { cCelebrities } from '../crawel/celebrities'
import { cMovie } from '../crawel/movie'
import { cRank } from '../crawel/rank'

export const getMovie = async (ctx: ParameterizedContext): Promise<void> => {
  const { id } = ctx.params

  ctx.body = await cMovie(id)
}

export const postMovie = async (ctx: ParameterizedContext): Promise<void> => {
  const { body } = ctx.request
  const movie = new Movie(Object.assign({}, body))
  movie.save()

  ctx.body = {
    status: 'OK',
    req: ctx.request,
    body: ctx.request.body
  }
}

/**
 * 获取指定 id 电影的全部演职员
 * @GET
 */
export const getCelebrities = async (ctx: ParameterizedContext): Promise<void> => {
  const { id } = ctx.params

  ctx.body = await cCelebrities(id)
}

/**
 * 获取电影排行榜页面的边栏信息
 * @GET /movie/rank
 */
 export const getSidebarRank = async (ctx: ParameterizedContext): Promise<void> => {
  ctx.body = await cRank()
}