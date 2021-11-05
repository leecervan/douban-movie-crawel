export interface IMovieLater {
  name: string;
  poster: string;
  link_url: string;
  trailer_url: string;
  date: string;
  genres: string[];     // 类型
  region: string;
  wanted: number;       // 多少人想看
}

export type MovieLater = Partial<IMovieLater>
