import cheerio from 'cheerio'
import request from '../util/request'
import { Top250 } from '../model/top250'
import { sleep } from '../util/index'
import { TTop250 } from '../interface/top250'

async function getTop250Page(start: number): Promise<TTop250[]> {
  const data: TTop250[] = []
  await request({
    method: 'get',
    url: `/top250?start=${start}`,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
    }
  })
    .then(res => {
      const $ = cheerio.load(res.data)
      $('.grid_view li')
        .toArray()
        .forEach(el => {
          const item: TTop250 = {};
          const $el = cheerio.load(cheerio.html(el))
          item.order = parseInt($el('em').text())
          item.poster = $el('.pic img').attr('src')
          item.name = $el('.pic img').attr('alt')
          item.names = $el('.info .hd a').text().trim()
          item.link = $el('.info a').attr('href')
          item.playable = $el('.info .playable').text() === '[可播放]' ? true : false
          item.members = $el('.bd').children().first().text().trim()
          item.rate = parseInt($el('.bd .star .rating_num').text())
          item.rater = parseInt($el('.bd .star').children().last().text())
          item.quote = $el('.bd .inq').text()
          data.push(item)
        })
    })
    .catch(err => {
      console.log('Get top250 data fail: ', err.message)
    })
  return data
}

export const cTop250 = async (): Promise<TTop250[]> => {
  console.log('Start to ge top250 data...')
  const data: TTop250[] = []
  // 分页
  for (let i = 0; i < 250; i += 25) {
    // 请求分页
    console.log('get: ', i)
    const pageData = await sleep(getTop250Page, 20, i)
    data.push(...pageData)
  }

  console.log(data.length)
  // 写入数据库
  for (const item of data) {
    await new Top250(item).save()
      .then(doc => {
        console.log(doc._id)
      })
      .catch(err => {
        console.log(`Save  top250 of ${item.name} fail: `, err.message)
      })
  }

  return data
}
