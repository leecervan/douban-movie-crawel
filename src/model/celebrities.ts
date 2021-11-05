import * as mongoose from 'mongoose';

import { TCelebrities } from '../interface/Celebrities'

export type CelebritiesDocument = mongoose.Document & TCelebrities

const RoleSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  link: String,
  role: String,
  works: [{
    link: String,
    name: String
  }]
})

export const CelebritiesSchema = new mongoose.Schema<CelebritiesDocument>(
  {
    id: { type: String, required: true, unique: true },
    directors: [RoleSchema],
    authors: [RoleSchema],
    actors: [RoleSchema],
  },
  { timestamps: true }
)

CelebritiesSchema.index(
  { updatedAt: 1 },
  { expires: '12h' }
)

export const Celebrities = mongoose.model<CelebritiesDocument>('Celebrities', CelebritiesSchema)
