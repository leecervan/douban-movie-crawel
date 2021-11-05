export interface IMovieNowPlaying {
  name: string;
  poster: string;
  link_url: string;
  ticket_url: string;
  release: string;      // 年份
  rate: number;
  rater: number;        // 评价数
  duration: string;
  region: string;
  directors: string[];
  actors: string[];
}

export type MovieNowPlaying = Partial<IMovieNowPlaying>
