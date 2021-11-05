import * as mongoose from 'mongoose'

import { MovieNowPlaying } from '../interface/MovieNowPlaying'
import { MovieLater } from '../interface/MovieLater'


export type HomeMovieDocument = mongoose.Document & {
  city: string;                     // 所属城市
  nowPlaying: MovieNowPlaying[];
  later: MovieLater[];
}

export const HomeMovieSchema = new mongoose.Schema<HomeMovieDocument>(
  {
    city: { type: String, required: true, unique: true },  // 城市唯一
    nowPlaying: [{
      name: String,
      poster: String,
      link_url: String,
      ticket_url: String,
      release: String,      // 年份
      rate: Number,
      rater: Number,        // 评价数
      duration: String,
      region: String,
      directors: [String],
      actors: [String],
    }],
    later: [{
      name: String,
      poster: String,
      link_url: String,
      trailer_url: String,
      date: String,
      genres: [String],     // 类型
      region: String,
      wanted: Number,       // 多少人想看
    }]
  },
  { timestamps: true }
)

HomeMovieSchema.index(
  { updatedAt: 1 },
  { expires: '7h' }
)

export const HomeMovie = mongoose.model<HomeMovieDocument>('HomeMovie', HomeMovieSchema)
