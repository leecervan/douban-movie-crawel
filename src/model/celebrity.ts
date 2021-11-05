import * as mongoose from 'mongoose';

type Award = {
  year: string;
  type: {
    title: string,
    link: string
  };
  own: string;
  movie: {
    id: string,
    name: string
  };
}

// 导演
export type CelebrityDocument = mongoose.Document & {
  uid: string;              // id
  sex: 'male' | 'female';   // 性别
  constellation: string;    // 星座
  birth: string;            // 生日
  born: string;             // 出生地
  job: string[];            // 职业
  name_foreign: string[];   // 外文名
  name_chinese: string[];   // 中文名
  imdb: {                   // IMDB 编号
    num: string;
    link: string;
  };
  intro: string;            // 简介
  pic: string[];            // 图片: url list
  award: Award[];           // 获奖情况
  works: string[];          // 作品: id list
  cooperation: string[];    // 合作的影人: id list
}

export const celebrityDocument = new mongoose.Schema<CelebrityDocument>(
  {
    uid: { type: String, required: true, unique: true },
    sex: String,
    constellation: String,
    birth: String,
    born: String,
    job: [String],
    name_foreign: [String],
    name_chinese: [String],
    imdb: {
      num: String,
      link: String
    },
    intro: String,
    pic: [String],
    award:  [],
    works: [String],
    cooperation: [String]
  },
  { timestamps: true }
)

export const Celebrity = mongoose.model<CelebrityDocument>('celebrity', celebrityDocument)
