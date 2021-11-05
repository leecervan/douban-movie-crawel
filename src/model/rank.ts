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
export type NewestDocument = mongoose.Document & {
  list: TNewestItem[]
}

export const NewestSchema = new mongoose.Schema<NewestDocument>(
  {
    list: [{
      name: String,
      link: String,
      poster: String,
      intro: String,
      rate: Number,
      rater: Number
    }]
  },
  { timestamps: true }
)

NewestSchema.index(
  { createdAt: 1 },
  { expires: '1d' }
)

export const Newest = mongoose.model<NewestDocument>('Newest', NewestSchema)


// 一周口碑
export type TRankWeekItem = Partial<{
  order: number     // 排名：1～10
  name: string
  link: string      // 链接
  rank: number      // 排名上升或下降
}>

export type RankWeekDocument = mongoose.Document & {
  list: TRankWeekItem[]
}
export const RankWeekSchema = new mongoose.Schema<RankWeekDocument>(
  {
    list: [{
      order: Number,
      name: String,
      link: String,
      rank: Number,
    }]
  },
  { timestamps: true }
)

RankWeekSchema.index(
  { createdAt: 1 },
  { expires: '1d' }
)
export const RankWeek = mongoose.model<RankWeekDocument>('RankWeek', RankWeekSchema)


// 北美票房
export type TRankNAItem = Partial<{
  order: number
  name: string
  link: string
  box_office: string
}>

export type RankNADocument = mongoose.Document & {
  list: TRankNAItem[]
}
export const RankNASchema = new mongoose.Schema<RankNADocument>(
  {
    list: [{
      order: Number,
      name: String,
      link: String,
      box_office: String,
    }]
  },
  { timestamps: true }
)

RankNASchema.index(
  { createdAt: 1 },
  { expires: '1d' }
)

export const RankNA = mongoose.model<RankNADocument>('RankNA', RankNASchema)


// Top250 部分
export type TTop250Item = Partial<{
  name: string
  link: string
  poster: string
}>
export type Top250Document = mongoose.Document & {
  list: TTop250Item[]
}

export const Top250Schema = new mongoose.Schema<Top250Document>(
  {
    list: [{
      name: String,
      link: String,
      poster: String
    }]
  },
  { timestamps: true }
)

Top250Schema.index(
  { createdAt: 1 },
  { expires: '1d' }
)

export const Top250 = mongoose.model<Top250Document>('Top250', Top250Schema)

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
  { expires: '1d' }
)

export const RankSidebar = mongoose.model<RankSidebarDocument>('RankSidebar', RankSidebarSchema)
