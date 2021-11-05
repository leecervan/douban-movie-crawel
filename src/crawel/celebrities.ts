import cheerio from 'cheerio'
import request from '../util/request'

import { TWorks, TRole, TCelebrities } from '../interface/Celebrities'
import { Celebrities } from '../model/celebrities'


export const cCelebrities = async (movieId: string): Promise<TCelebrities> => {
  const data: TCelebrities = {
    id: movieId
  };

  await request.get(`/subject/${movieId}/celebrities`)
    .then(res => {
      const $ = cheerio.load(res.data)
      $('.list-wrapper')
        .toArray()
        .forEach(el => {
          const list: TRole[] = []
          const $el = cheerio.load(cheerio.html(el))
          // 搜索子条目
          $el('.celebrity')
            .toArray()
            .forEach(child => {
              const item: TRole = {}
              const $child = cheerio.load(cheerio.html(child))

              item.link = $child('.celebrity a').attr('href')
              item.name = $child('.info .name').text()
              item.avatar = $child('.celebrity .avatar').attr('style').match(/\((.+)\)/)[1]
              item.role = $child('.info .role').text()

              const works: TWorks[] = []
              // 搜索代表作
              $child('.works a')
                .toArray()
                .forEach(wr => {
                  const wrItem: TWorks = {}
                  const $wr = cheerio.load(cheerio.html(wr))
                  wrItem.link = $wr('a').attr('href')
                  wrItem.name = $wr('a').text()
                  works.push(wrItem)
                })
              item.works = works
              list.push(item)
            })

          // 检索分类
          const roleCur = $el('.list-wrapper h2').text().split(' ')[0]
          switch (roleCur) {
            case '导演':
              data.directors = list
              break
            case '编剧':
              data.authors = list
              break
            case '演员':
              data.actors = list
              break
          }
        })
    })
    .catch(err => {
      console.log('Fail to get celebrities data: ', err.message)
    })

  // 保存到数据库
  await new Celebrities(data).save()
    .then(() => {
      console.log('Celebrities save success.')
    })
    .catch((err: any) => {
      console.log('Celebrities save fail: ', err.message)
    })

  return data
}

