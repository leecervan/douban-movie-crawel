## 目录

+ 2021-11-07：IP 被封了，暂时停止开发



## 爬虫

### 策略

+ 数据存储：写入 MongoDB
+ 数据更新：与上次爬取时间对比，重新爬取超过 12h 的数据


### 页面

+ ✅ 页面 [首页](https://movie.douban.com/) 正在热映、即将上映
+ ✅ 页面 [电影详情](https://movie.douban.com/subject/20276229/)
+ ✅ 页面 [电影演职员表](https://movie.douban.com/subject/20276229/celebrities)
+ 页面 [影人详情](https://movie.douban.com/celebrity/1009531/)
+ ✅ 页面 [排行榜](https://movie.douban.com/chart) 新片榜、一周口碑榜、北美票房榜 
+ 页面 [Top250](https://movie.douban.com/top250) 榜单


## MongoDB

### Model

+ Movie：电影
+ Celebrity：影人（导演、编剧、演员等）
+ User：用户（Todo）


## 豆瓣请求

直接请求至豆瓣服务器（movie.douban.com），返回 JSON 数据

### 电影分类

示例：
```
https://movie.douban.com/j/search_subjects?type=movie&tag=热门&sort=recommend&page_limit=20&page_start=0
```

参数：
+ type: `movie`
+ tag: `热门 最新 经典 可播放 豆瓣高分 冷门佳片 华语 欧美 韩国 日本 动作 喜剧 爱情 科幻 悬疑 恐怖 治愈`
+ sort: 排序方式
  + `recommend`：热度
  + `time`：时间
  + `rank`：评价
+ page_limit: 返回数目
+ page_start: 条目下标（第一条下标为 0）



### 电视剧分类

示例：
```
https://movie.douban.com/j/search_subjects?type=tv&tag=热门&sort=recommend&page_limit=20&page_start=0
```

参数：
+ type: `tv`
+ tag: `热门 美剧 英剧 韩剧 日剧 国产剧 港剧 日本动画 综艺 纪录片`
+ sort: 排序方式
  + `recommend`：热度
  + `time`：时间
  + `rank`：评价
+ page_limit: 返回数目
+ page_start: 条目下标（第一条下标为 0）


### 所有分类（选影视）

示例：
```
https://movie.douban.com/j/new_search_subjects?sort=U&range=0,5&tags=电影&playable=1&start=0&genres=喜剧&countries=中国大陆
```

参数：
+ sort: 排序方式，`U-近期热门, T-标记最多, S-评分最多, R-最新上映,`
+ range: 评分范围（可选 1～10），格式 `6,10`
+ tags: 形式和特色，使用 `,` 分隔，如 `电影,经典`
  + 形式：可选 `电影 电视剧 综艺 动漫 纪录片 短片`
  + 电影：可选 `经典 青春 文艺 搞笑 励志 魔幻 感人 女性`
+ playable: 是否可播放，`默认全部, 0 否, 1 是`
+ genres: 类型，可选 `剧情 喜剧 动作 爱情 科幻 动画 悬疑 惊悚 恐怖 犯罪 同性 音乐 歌舞 传记 历史 战争 西部 奇幻 冒险 灾难 武侠 情色`
+ countries: 地区，可选 `中国大陆 欧美 美国 中国香港 中国台湾 日本 韩国 英国 法国 德国 意大利 西班牙 印度 泰国 俄罗斯 伊朗 加拿大 澳大利亚 爱尔兰 瑞典 巴西 丹麦`


### 排行榜

示例：
```
https://movie.douban.com/j/chart/top_list?type=11&interval_id=100:90&action=&start=0&limit=20
```

参数：
+ type: 所属分类 id(1~31, 没有 9、21)
  + 剧情 - 11
  + 喜剧 - 24
  + 动作 - 5
  + 爱情 - 13
  + 科幻 - 17
  + 动画 - 25
  + 悬疑 - 10
  + 惊悚 - 19
  + 恐怖 - 20
  + 纪录片 - 1
  + 短片 - 23
  + 情色 - 6
  + 同性 - 26
  + 音乐 - 14
  + 歌舞 - 7
  + 家庭 - 28
  + 儿童 - 8
  + 传记 - 2
  + 历史 - 4
  + 战争 - 22
  + 犯罪 - 3
  + 西部 - 27
  + 奇幻 - 16
  + 冒险 - 15
  + 灾难 - 12
  + 武侠 - 29
  + 古装 - 30
  + 运动 - 18
  + 黑色电影 - 31
+ interval_id: 区间，`100:90` 表示好于 100%~90% 的同类型影片
+ action: 可在线播放，`默认 ''-否, playable-是`
+ start: 开始下标
+ limit: 条目数





## 注意事项

+ mongoose 更改 Model 后要删除该集合并重启服务器才会生效（特别是在添加 `unique`, `required` 等限制时）
+ MongoDB TTL 索引，可以设置数据的自动删除，[参考](https://www.cnblogs.com/Mr-Kahn/articles/11254654.html)

