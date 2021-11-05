export type TWorks = {
  link?: string;
  name?: string;
}

export interface IRole {
  name: string;
  avatar: string;
  link: string;
  role: string;
  works: TWorks[];
}

export type TRole = Partial<IRole>


export type TCelebrities = {
  id?: string;            // 电影 id
  directors?: TRole[];   // 导演
  authors?: TRole[];     // 编剧
  actors?: TRole[];      // 演员
  // ...更多其他角色
}
