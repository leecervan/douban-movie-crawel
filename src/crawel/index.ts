import cheerio from 'cheerio'
import request from '../util/request'
import { splitWith } from '../util'

import { MovieNowPlaying } from '../interface/MovieNowPlaying'
import { MovieLater } from '../interface/MovieLater'

import { HomeMovie } from '../model/home'


// 首页：正在热映、即将上映
export const cHome = async (city: string = 'shenzhen'): Promise<any> => {
  const nowPlaying: MovieNowPlaying[] = [];
  const later: MovieLater[] = [];
  // nowPlaying
  await request.get(`/cinema/nowplaying/${city}/`)
    .then(res => {
      const $ = cheerio.load(res.data)
      $('#nowplaying div.mod-bd .list-item')
        .toArray()
        .forEach(el => {
          const item: MovieNowPlaying = {}
          const $el = cheerio.load(cheerio.html(el))

          item.name = $el('.list-item').attr('data-title')
          item.poster = $el('.poster img').attr('src')
          item.link_url = $el('.poster a').attr('href')
          item.ticket_url = $('.sbtn .ticket-btn').attr('href')
          item.release = $('.list-item').attr('data-release')
          item.rate = parseFloat($('.list-item').attr('data-score'))
          item.rater = parseInt($('.list-item').attr('data-votecount'))
          item.duration = $('.list-item').attr('data-duration')
          item.region = $('.list-item').attr('data-region')
          item.directors = splitWith($el('.list-item').attr('data-director'), ' / ')
          item.actors = splitWith($el('.list-item').attr('data-actors'), ' / ')

          // console.log(item)
          nowPlaying.push(item)
        })
    })
    .catch(err => {
      console.log('Get movie-now-playing data fail: ', err.message)
    })


  // later
  await request.get(`/cinema/later/${city}/`)
    .then(res => {
      const $ = cheerio.load(res.data)
      $('.item.mod')
        .toArray()
        .forEach(el => {
          const item: MovieLater = {}
          const $el = cheerio.load(cheerio.html(el))

          item.name = $el('.intro h3 a').text()
          item.poster = $el('.thumb img').attr('src')
          item.link_url = $el('.thumb').attr('href')
          item.trailer_url = $el('.trailer_icon').attr('href')
          item.date = $el('.intro .dt').eq(0).text()
          item.region = $el('.intro .dt').eq(2).text()
          item.genres = splitWith($el('.intro .dt').eq(1).text(), ' / ')
          item.wanted = parseInt($el('.intro .last').text())

          later.push(item)
        })
    })
    .catch(err => {
      console.log('Get movie-later data fail: ', err.message)
    })

  // 写入数据库
  await new HomeMovie({
    city,
    nowPlaying,
    later
  }).save()
    .then(res => {
      console.log('Success to save homeMovie: ', res._id)
    })
    .catch(err => {
      console.log('Fail to save homeMovie: ', err.message)
    })


  // 返回数据
  return {
    nowPlaying,
    later
  }
}



// 电影详情页
export const cMovie = async (id: string): Promise<any> => {
  
  request.get(`/subject/${id}`)
    .then(res => {

    })
    .catch(err => {
      console.log('Get movie data fail: ', err.message)
    })
}


// 影人详情页


