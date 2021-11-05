export type Role = {
  '@type': string;
  name: string;
  url: string;
}

export type Better = {
  genre: string;
  link: string;
  percent: string;
}

export type TVideo = Partial<{
  link: string;
  poster: string;
}>

export type TRecommend = Partial<{
  name: string;
  avatar: string;
  link: string;
}>

export interface IMovie {
  id: string;
  info: {
    name: string;             // 名字
    directors: Role[];    // 导演: list
    authors: Role[];      // 编剧: list
    actors: Role[];          // 演员: list
    genres: string[];         // 类型
    region: string[];         // 国家/地区
    language: string[];       // 语言
    release: string[];        // 上映时间
    duration: string;         // 片长
    alias: string[];          // 别名
    imdb: string;             // IMDB 编号
  };
  rating: {
    rate: number;             // 评分
    rater: number;            // 评价数
    levels: string[];
    betters: Better[];
  };
  intro: string;              // 剧情简介
  actors: string;          // 演职员 _id => Celebrities
  media: {
    videos: TVideo[];
    imgs: string[];
  },
  recommendations: TRecommend[];
}

export type PowerPartial<T> = {
  [U in keyof T] ?: T[U] extends object ? PowerPartial<T[U]> : T[U];
}

export type TMovie = PowerPartial<IMovie>
