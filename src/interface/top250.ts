export interface ITop250 {
  order: number       // 排名
  poster: string      // 海报
  name: string        // 名字
  names: string       // 所有名字
  link: string        // 链接
  playable: boolean   // 是否可播放
  members: string     // 演职员表
  rate: number        // 评分
  rater: number       // 评价数
  quote: string       // 引用名言
}

export type TTop250 = Partial<ITop250>
