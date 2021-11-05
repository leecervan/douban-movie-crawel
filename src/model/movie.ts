import * as mongoose from 'mongoose';

import { TMovie } from '../interface/Movie'


export type MovieDocument = mongoose.Document & TMovie

const RoleSchema = new mongoose.Schema({
  '@type': String,
  name: String,
  url: String,
})

export const MovieSchema = new mongoose.Schema<MovieDocument>(
  {
    id: { type: String, required: true, unique: true },
    info: {
      name: String,
      directors: [RoleSchema],
      authors: [RoleSchema],
      actors: [RoleSchema],
      genres: [String],
      region: [String],
      language: [String],
      release: [String],
      duration: String,
      alias: [String],
      imdb: String
    },
    rating: {
      rate: Number,
      rater: Number,
      levels: [String],
      betters: [{
        genre: String,
        link: String,
        percent: String,
      }],
    },
    intro: String,
    actors: String,
    media: {
      videos: [{
        link: String,
        poster: String
      }],
      imgs: [String]
    },
    recommendations: [{
      name: String,
      avatar: String,
      link: String
    }]
  },
  { timestamps: true }
);

MovieSchema.index(
  { updatedAt: 1 },
  { expires: '7h' }
)

export const Movie = mongoose.model<MovieDocument>('Movie', MovieSchema)
