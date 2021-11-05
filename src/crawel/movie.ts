import cheerio from 'cheerio'
import request from '../util/request'

import { Movie } from '../model/movie'
import { Celebrities, CelebritiesDocument } from '../model/celebrities'
import { TCelebrities, IRole } from '../interface/Celebrities'
import { cCelebrities } from '../crawel/celebrities'
import { TMovie, TRecommend, TVideo } from '../interface/Movie'


export const cMovie = async (movieId: string): Promise<TMovie> => {
  const data: TMovie = {
    id: movieId,
    info: {},
    rating: {},
    media: {},
  };

  let actors: Partial<IRole>[]

  console.log('got movieId: ', movieId)
  await request.get(`/subject/${movieId}`)
    .then(async res => {
      const $ = cheerio.load(res.data)
      const json = JSON.parse($('script[type="application/ld+json"]').html())

      data.info.name = json.name
      data.info.directors = json.director
      data.info.authors = json.author
      data.info.actors = json.actor
      data.info.genres = json.genre
      data.info.duration = json.duration
      data.rating.rate = json.aggregateRating.ratingValue
      data.rating.rater = json.aggregateRating.ratingCount

      data.intro = $('.related-info .indent span').text()

      // 演职员：调用另一个服务 - 查询数据库或启动爬虫
      let doc: CelebritiesDocument
      try {
        doc = await Celebrities.findOne({ id: movieId })
        if (!doc) {
          await cCelebrities(movieId)
          doc = await Celebrities.findOne({ id: movieId })
        }
      } catch (e) {
        console.log('Get celebrities fail: ', e.message)
      }

      data.actors = doc._id     // 只存储 _id => Celebrities
      actors = doc.actors

      // 视频和图片（Todo：想办法爬取更多图片）
      const videos: TVideo[] = []
      const imgs: string[] = []
      $('.related-pic-bd li')
        .toArray()
        .forEach(el => {
          const $el = cheerio.load(cheerio.html(el))
          // 判断是视频还是图片
          if ($el('li').hasClass('label-trailer')) {
            const video: TVideo = {}
            video.poster = $el('.label-trailer a').attr('style').match(/\((.+)\)/)[1]
            video.link = $el('.label-trailer a').attr('href')
            videos.push(video)
          } else {
            imgs.push($el('a img').attr('src'))
          }
        })
      data.media.videos = videos
      data.media.imgs = imgs

      // 相关电影
      const recommendations: TRecommend[] = []
      $('.recommendations-bd dl')
        .toArray()
        .forEach(el => {
          const item: TRecommend = {}
          const $el = cheerio.load(cheerio.html(el))
          item.avatar = $el('img').attr('src')
          item.name = $el('dd a').text()
          item.link = $el('dt a').attr('href')
          recommendations.push(item)
        })
      data.recommendations = recommendations
    })
    .catch(err => {
      console.log('Get movie data fail: ', err.message)
    })

  // 写入数据库
  await new Movie(data).save()
    .then(doc => {
      console.log('Save movie data success: ', doc._id)
    })
    .catch(err => {
      console.log('Save movie data fail: ', err.message)
    })

  return Object.assign({}, data, { actors })
}