import * as mongoose from 'mongoose'

// 新片
export type TNewestItem = Partial<{
  name: string
  link: string
  poster: string
  intro: string
  rate: number
  rater: number
}>
// 一周口碑
export type TRankWeekItem = Partial<{
  order: number     // 排名：1～10
  name: string
  link: string      // 链接
  rank: number      // 排名上升或下降
}>
// 北美票房
export type TRankNAItem = Partial<{
  order: number
  name: string
  link: string
  box_office: string
}>
// Top250 部分（会伴随页面刷新，可考虑直接从 Top250 提取）
export type TTop250Item = Partial<{
  name: string
  link: string
  poster: string
}>


export type RankSidebarDocument = mongoose.Document & {
  newest: TNewestItem[]
  rank_week: TRankWeekItem[]
  rank_na: TRankNAItem[]
  top250: TTop250Item[]
}

export const RankSidebarSchema = new mongoose.Schema<RankSidebarDocument>(
  {
    newest: [{
      name: String,
      link: String,
      poster: String,
      intro: String,
      rate: Number,
      rater: Number
    }],
    rank_week: [{
      order: Number,
      name: String,
      link: String,
      rank: Number
    }],
    rank_na: [{
      order: Number,
      name: String,
      link: String,
      box_office: String
    }],
    top250: [{
      name: String,
      link: String,
      poster: String
    }]
  },
  { timestamps: true }
)

RankSidebarSchema.index(
  { updatedAt: 1 },
  { expires: '2m' }
)

export const RankSidebar = mongoose.model<RankSidebarDocument>('RankSidebar', RankSidebarSchema)
