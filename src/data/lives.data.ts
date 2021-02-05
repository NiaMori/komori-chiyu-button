export interface Live {
  desc: string,
  date: string,
  url: string
}

export const lives = {
  '2019-05-26-YTB收益化纪念-生放送歌回-2nd-live': {
    desc: '【YTB 收益化纪念】古守血遊 生放送歌回 2nd live',
    date: '2019-05-26',
    url: 'https://www.youtube.com/watch?v=knHhUNX_zSs'
  } as Live,

  '2020-08-19-LOL-古守-雛月': {
    desc: 'LOL 古守 & 雛月',
    date: '2020-08-19',
    url: 'https://www.bilibili.com/video/BV1MT4y1E7Lh?p=22'
  } as Live,

  '2020-10-27-打工人集合！': {
    desc: '打工人集合！',
    date: '2020-10-27',
    url: 'https://www.bilibili.com/video/BV1hD4y1o7SJ?p=22'
  } as Live,

  '2020-12-06-高速ringfit': {
    desc: '高速ringfit',
    date: '2020-12-06',
    url: 'https://www.bilibili.com/video/BV12t4y1Y7Z4'
  } as Live,

  '2020-12-16-古守唄~认真唱了哦': {
    desc: '古守唄~认真唱了哦',
    date: '2020-12-16',
    url: 'https://www.bilibili.com/video/BV1SK411u7Bu'
  } as Live,

  '2020-12-24-古守平安夜': {
    desc: '古守平安夜',
    date: '2020-12-24',
    url: 'https://www.bilibili.com/video/BV18A411p7Ka'
  } as Live,

  '2021-01-02-新年麻将古守视点': {
    desc: '新年麻将古守视点',
    date: '2021-01-02',
    url: 'https://www.bilibili.com/video/BV1Eh411274v'
  } as Live,

  '2021-01-14-YTB一万人纪念歌回': {
    desc: 'YTB 一万人纪念歌回',
    date: '2021-01-14',
    url: 'https://www.bilibili.com/video/BV1St4y1z7Ry'
  } as Live,

  '2021-01-17-P家AmongUs联动': {
    desc: 'P 家 Among Us 联动',
    date: '2021-01-17',
    url: 'https://www.bilibili.com/video/BV1Wh411y7M8'
  } as Live,

  '2021-01-17-突击杂谈': {
    desc: '突击杂谈',
    date: '2021-01-17',
    url: 'https://www.bilibili.com/video/BV1mr4y1T7g6'
  } as Live,

  '2021-01-21-TFT新赛季': {
    desc: 'TFT 新赛季',
    date: '2021-01-21',
    url: 'https://www.bilibili.com/video/BV1TX4y1T7Es'
  } as Live,

  '2021-01-22-Apex联动古守视角': {
    desc: 'Apex 联动古守视角',
    date: '2021-01-22',
    url: 'https://www.bilibili.com/video/BV1Wo4y1R78C'
  } as Live,

  '2021-01-25-歌回': {
    desc: '歌回',
    date: '2021-01-25',
    url: ''
  } as Live,

  '2021-01-27-LPL同时视听': {
    desc: 'LPL 同时视听',
    date: '2021-01-27',
    url: ''
  } as Live,

  '2021-01-31-古守-好人-30-Apex': {
    desc: '古守 好人 30 Apex',
    date: '2021-01-31',
    url: 'https://www.bilibili.com/video/BV1oT4y1P7DR'
  } as Live,

  '2021-02-04-LPL观战': {
    desc: 'LPL 观战',
    date: '2021-02-04',
    url: ''
  } as Live,
}

export type LiveIndex = keyof typeof lives
