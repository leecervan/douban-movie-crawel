import * as mongoose from 'mongoose'
import { TTop250 } from '../interface/top250'

export type Top250Document = mongoose.Document & TTop250

export const Top250Schema = new mongoose.Schema<Top250Document>(
  {
    order: { type: Number, required: true, unique: true },
    poster: String,
    name: String,
    names: String,
    link: String,
    playable: Boolean,
    members: String,
    rate: Number,
    rater: Number,
    quote: String
  },
  { timestamps: true }
)

Top250Schema.index(
  { order: 1 }
)

Top250Schema.index(
  { updatedAt: 1 },
  { expires: '1w' }
)

export const Top250 = mongoose.model<Top250Document>('Top250', Top250Schema)
