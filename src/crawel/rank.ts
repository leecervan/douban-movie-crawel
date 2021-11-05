import cheerio, { CheerioAPI } from 'cheerio'
import request from '../util/request'
import { RankSidebar } from '../model/rank'

import {
  TNewestItem,
  TRankWeekItem,
  TRankNAItem,
  TTop250Item
} from '../model/rank'


export type TRankSidebar = {
  newest: TNewestItem[]
  rank_week: TRankWeekItem[]
  rank_na: TRankNAItem[]
  top250: TTop250Item[]
}

export const cRank = async (): Promise<TRankSidebar> => {
  const data: TRankSidebar = {
    newest: [],
    rank_week: [],
    rank_na: [],
    top250: []
  }

  await request('/chart')
    .then(res => {
      const $ = cheerio.load(res.data)
      extractNewest($, data.newest)         // newest
      extractRankWeek($, data.rank_week)    // rank_week
      extractRankNA($, data.rank_na)        // rank_na
      extractTop250($, data.top250)         // top250
    })
    .catch(err => {
      console.log('Get rank-sidebar data fail: ', err.message)
    })
  
  // 写入数据库
  await new RankSidebar(data).save()
    .then(doc => {
      console.log('Save rank-sidebar data success: ', doc._id)
    })
    .catch(err => {
      console.log('Save rank-sidebar data fail: ', err.message)
    })

  return data
}

function extractNewest($: CheerioAPI, newest: TNewestItem[]): void {
  $('.article table')
    .toArray()
    .forEach(el => {
      const item: TNewestItem = {}
      const $el = cheerio.load(cheerio.html(el))

      item.name = $el('.pl2 a').text()
      item.link = $el('.nbg').attr('href')
      item.poster = $el('.nbg img').attr('src')
      item.intro = $el('.pl2 .pl').text()
      item.rate = parseFloat($el('.rating_nums').text())
      item.rater = parseInt($el('.star .pl').text().match(/\d+/)[0])

      newest.push(item)
    })
}

function extractRankWeek($: CheerioAPI, rank_week: TRankWeekItem[]): void {
  $('#listCont2 li')
    .toArray()
    .forEach(el => {
      const item: TRankWeekItem = {}
      const $el = cheerio.load(cheerio.html(el))
      item.order = parseInt($el('.no').text())
      item.name = $el('.name a').text().trim()
      item.link = $el('.name a').attr('href')

      const tmpEl = $el('li > span > div')
      switch (tmpEl.attr('class')) {
        case 'up':
        case 'stay':
          item.rank = parseInt(tmpEl.text())
          break
        case 'down':
          item.rank = -parseInt(tmpEl.text())
          break
        default:
          item.rank = 0
      }

      rank_week.push(item)
    })

}

function extractRankNA($: CheerioAPI, rank_na: TRankNAItem[]): void {
  $('#listCont1 li')
    .toArray()
    .forEach(el => {
      const item: TRankNAItem = {}
      const $el = cheerio.load(cheerio.html(el))
      item.order = parseInt($el('.no').text())
      item.name = $el('.box_chart a').text().trim()
      item.link = $el('.box_chart a').attr('href')
      item.box_office = $el('.box_chart_num').text()

      rank_na.push(item)
    })
}

function extractTop250($: CheerioAPI, top250: TTop250Item[]): void {
  $('#douban-top250 dl')
    .toArray()
    .forEach(el => {
      const $el = cheerio.load(cheerio.html(el))
      const item: TTop250Item = {}
      item.name = $el('dd a').text().trim()
      item.poster = $el('dt img').attr('src')
      item.link = $el('dt a').attr('href')

      top250.push(item)
    })
}
