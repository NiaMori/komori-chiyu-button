export interface Origin {
  desc: string,
  date: string,
  url: string
}

export const origins = {
  '2020-12-06-高速ringfit': {
    desc: '高速ringfit',
    date: '2020-12-06',
    url: 'https://www.bilibili.com/video/BV12t4y1Y7Z4'
  } as Origin,

  '2020-12-16-古守唄~认真唱了哦': {
    desc: '古守唄~认真唱了哦',
    date: '2020-12-16',
    url: 'https://www.bilibili.com/video/BV1SK411u7Bu'
  } as Origin,

  '2020-12-24-古守平安夜': {
    desc: '古守平安夜',
    date: '2020-12-24',
    url: 'https://www.bilibili.com/video/BV18A411p7Ka'
  } as Origin,

  '2021-01-02-新年麻将古守视点': {
    desc: '新年麻将古守视点',
    date: '2021-01-02',
    url: 'https://www.bilibili.com/video/BV1Eh411274v'
  } as Origin,

  '2021-01-17-P家AmongUs联动': {
    desc: 'P 家 Among Us 联动',
    date: '2021-01-17',
    url: 'https://www.bilibili.com/video/BV1Wh411y7M8'
  } as Origin
}

export interface Voice {
  desc: string,
  path: string,
  date: string,
  origin?: keyof typeof origins,
  interval: [string, string],
  tags: string[],
  gachiRanges?: [number, number][]
}

export const sexyTags = ['涩涩古守']

export const voices: Voice[] = [{
  desc: '吼吼吼吼~',
  path: '@voices/2020/12/24/古守平安夜/吼吼吼吼~.mp3',
  date: '2021-01-18T10:22:32.962+08:00',
  origin: '2020-12-24-古守平安夜',
  interval: ['1:25.799', '1:29.205'],
  tags: ['嚣张古守']
}, {
  desc: '我可爱吗~',
  path: '@voices/2020/12/24/古守平安夜/我可爱吗~.mp3',
  date: '2021-01-18T10:33:31.863+08:00',
  origin: '2020-12-24-古守平安夜',
  interval: ['2:21.619', '2:22.837'],
  tags: ['可爱古守']
}, {
  desc: 'debu？诶？',
  path: '@voices/2020/12/24/古守平安夜/debu？诶？.mp3',
  date: '2021-01-18T11:05:04.040+08:00',
  origin: '2020-12-24-古守平安夜',
  interval: ['2:58.541', '3:01.576'],
  tags: ['可爱古守']
}, {
  desc: '骗人的吧！',
  path: '@voices/2020/12/24/古守平安夜/骗人的吧！.mp3',
  date: '2021-01-18T11:27:36.949+08:00',
  origin: '2020-12-24-古守平安夜',
  interval: ['15:27.504', '15:33.620'],
  tags: ['可爱古守']
}, {
  desc: '必杀技！Perfect-Defense！！',
  path: '@voices/2020/12/24/古守平安夜/必杀技！Perfect-Defense！！.mp3',
  date: '2021-01-18T11:48:17.968+08:00',
  origin: '2020-12-24-古守平安夜',
  interval: ['28:21.471', '28:25.671'],
  tags: ['AA 古守', '中二古守']
}, {
  desc: '好热啊~',
  path: '@voices/2020/12/24/古守平安夜/好热啊~.mp3',
  date: '2021-01-18T11:57:21.402+08:00',
  origin: '2020-12-24-古守平安夜',
  interval: ['43:56.302', '44:00.000'],
  tags: ['涩涩古守']
}, {
  desc: 'Komori Fan Club',
  path: '@voices/2020/12/24/古守平安夜/Komori-Fan-Club.mp3',
  date: '2021-01-18T12:02:26.129+08:00',
  origin: '2020-12-24-古守平安夜',
  interval: ['44:26.126', '44:28.145'],
  tags: ['古守语音包']
}, {
  desc: '雅蠛蝶呦~',
  path: '@voices/2020/12/24/古守平安夜/雅蠛蝶呦~.mp3',
  date: '2021-01-18T12:09:31.308+08:00',
  origin: '2020-12-24-古守平安夜',
  interval: ['52:15.144', '52:16.869'],
  tags: ['涩涩古守']
}, {
  desc: '初音未来的消失（？',
  path: '@voices/2020/12/24/古守平安夜/初音未来的消失（？.mp3',
  date: '2021-01-18T12:14:42.784+08:00',
  origin: '2020-12-24-古守平安夜',
  interval: ['1:00:53.128', '1:00:56.398'],
  tags: ['口胡古守']
}, {
  desc: '帅不帅！',
  path: '@voices/2020/12/24/古守平安夜/帅不帅！.mp3',
  date: '2021-01-18T12:24:12.757+08:00',
  origin: '2020-12-24-古守平安夜',
  interval: ['1:15:31.080', '1:15:32.821'],
  tags: ['嚣张古守', '可爱古守']
}, {
  desc: 'K-O-M-O-R-I',
  path: '@voices/2020/12/24/古守平安夜/K-O-M-O-R-I.mp3',
  date: '2021-01-18T12:29:43.322+08:00',
  origin: '2020-12-24-古守平安夜',
  interval: ['1:22:14.265', '1:22:18.536'],
  tags: ['搞怪古守']
}, {
  desc: '恋口上 - 绝壁版',
  path: '@voices/2020/12/24/古守平安夜/恋口上-绝壁版.mp3',
  date: '2021-01-18T12:35:23.726+08:00',
  origin: '2020-12-24-古守平安夜',
  interval: ['1:50:47.288', '1:50:54.593'],
  tags: ['搞怪古守', 'AA 古守']
}, {
  desc: '太奇怪了吧！',
  path: '@voices/2020/12/24/古守平安夜/太奇怪了吧！.mp3',
  date: '2021-01-18T12:38:55.394+08:00',
  origin: '2020-12-24-古守平安夜',
  interval: ['1:50:56.300', '1:50:57.398'],
  tags: ['生气古守']
}, {
  desc: 'Komori 为什么一直这么小呢？',
  path: '@voices/2020/12/24/古守平安夜/Komori-为什么一直这么小呢？.mp3',
  date: '2021-01-18T12:42:45.404+08:00',
  origin: '2020-12-24-古守平安夜',
  interval: ['1:52:12.847', '1:52:18.367'],
  tags: ['AA 古守']
}, {
  desc: 'encore',
  path: '@voices/2020/12/24/古守平安夜/encore.mp3',
  date: '2021-01-18T12:48:21.160+08:00',
  origin: '2020-12-24-古守平安夜',
  interval: ['2:11:20.820', '2:11:43.234'],
  tags: ['安可古守']
}, {
  desc: '麻将 - 立直喵~',
  path: '@voices/2021/01/02/新年麻将古守视点/麻将-立直喵~.mp3',
  date: '2021-01-18T13:01:12.074+08:00',
  origin: '2021-01-02-新年麻将古守视点',
  interval: ['17:42.649', '17:43.745'],
  tags: ['古守语音包']
}, {
  desc: '抽筋怪叫一分钟',
  path: '@voices/2020/12/06/高速ringfit/抽筋怪叫一分钟.mp3',
  date: '2021-01-18T15:50:31.116+08:00',
  origin: '2020-12-06-高速ringfit',
  interval: ['1:03:43.197', '1:04:51.065'],
  tags: ['涩涩古守'],
  gachiRanges: [[0, 49]]
}, {
  desc: '神之雷',
  path: '@voices/2020/12/16/古守唄~认真唱了哦/神之雷.mp3',
  date: '2021-01-18T18:06:30.995+08:00',
  origin: '2020-12-16-古守唄~认真唱了哦',
  interval: ['14:55.478', '15:05.000'],
  tags: ['中二古守']
}, {
  desc: '打喷嚏',
  path: '@voices/2021/01/17/P家AmongUs联动/打喷嚏.mp3',
  date: '2021-01-18T19:29:22.276+08:00',
  origin: '2021-01-17-P家AmongUs联动',
  interval: ['15:27.614', '15:31.456'],
  tags: ['可爱古守'],
  gachiRanges: [[51, 100]]
}]
