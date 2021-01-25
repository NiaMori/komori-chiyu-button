import { LiveIndex } from './lives.data'

export interface FromLive {
  live: LiveIndex,
  interval: [string, string]
}

export interface FromWebPage {
  desc: string,
  url: string
}

export type Origin = FromLive | FromWebPage

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const isFromLive = (it: any) : it is FromLive => {
  return typeof it.live === 'string'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const isFromWebPage = (it: any) : it is FromWebPage => {
  return typeof it.desc === 'string' && typeof it.url === 'string'
}

export interface Voice {
  desc: string,
  path: string,
  date: string,
  origin: Origin,
  tags: string[],
  gachiRanges?: [number, number][]
}

export const isNewVoice = ({ date }: Voice) : boolean => {
  return (Date.now() - Date.parse(date)) < 86400000
}

export const sexyTags = ['涩涩古守']

export const voices: Voice[] = [{
  desc: '吼吼吼吼~',
  path: '@voices/2020/12/24/古守平安夜/吼吼吼吼~.mp3',
  date: '2021-01-18T10:22:32.962+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['1:25.799', '1:29.205']
  },
  tags: ['嚣张古守']
}, {
  desc: '我可爱吗~',
  path: '@voices/2020/12/24/古守平安夜/我可爱吗~.mp3',
  date: '2021-01-18T10:33:31.863+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['2:21.619', '2:22.837']
  },
  tags: ['可爱古守']
}, {
  desc: 'debu？诶？',
  path: '@voices/2020/12/24/古守平安夜/debu？诶？.mp3',
  date: '2021-01-18T11:05:04.040+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['2:58.541', '3:01.576']
  },
  tags: ['可爱古守']
}, {
  desc: '骗人的吧！',
  path: '@voices/2020/12/24/古守平安夜/骗人的吧！.mp3',
  date: '2021-01-18T11:27:36.949+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['15:27.504', '15:33.620']
  },
  tags: ['可爱古守']
}, {
  desc: '必杀技！Perfect-Defense！！',
  path: '@voices/2020/12/24/古守平安夜/必杀技！Perfect-Defense！！.mp3',
  date: '2021-01-18T11:48:17.968+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['28:21.471', '28:25.671']
  },
  tags: ['AA 古守', '中二古守']
}, {
  desc: '好热啊~',
  path: '@voices/2020/12/24/古守平安夜/好热啊~.mp3',
  date: '2021-01-18T11:57:21.402+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['43:56.302', '44:00.000']
  },
  tags: ['涩涩古守']
}, {
  desc: 'Komori Fan Club',
  path: '@voices/2020/12/24/古守平安夜/Komori-Fan-Club.mp3',
  date: '2021-01-18T12:02:26.129+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['44:26.126', '44:28.145']
  },
  tags: ['古守语音包']
}, {
  desc: '雅蠛蝶呦~',
  path: '@voices/2020/12/24/古守平安夜/雅蠛蝶呦~.mp3',
  date: '2021-01-18T12:09:31.308+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['52:15.144', '52:16.869']
  },
  tags: ['涩涩古守']
}, {
  desc: '初音未来的消失（？',
  path: '@voices/2020/12/24/古守平安夜/初音未来的消失（？.mp3',
  date: '2021-01-18T12:14:42.784+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['1:00:53.128', '1:00:56.398']
  },
  tags: ['口胡古守']
}, {
  desc: '帅不帅！',
  path: '@voices/2020/12/24/古守平安夜/帅不帅！.mp3',
  date: '2021-01-18T12:24:12.757+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['1:15:31.080', '1:15:32.821']
  },
  tags: ['嚣张古守', '可爱古守']
}, {
  desc: 'K-O-M-O-R-I',
  path: '@voices/2020/12/24/古守平安夜/K-O-M-O-R-I.mp3',
  date: '2021-01-18T12:29:43.322+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['1:22:14.265', '1:22:18.536']
  },
  tags: ['搞怪古守']
}, {
  desc: '恋口上 - 绝壁版',
  path: '@voices/2020/12/24/古守平安夜/恋口上-绝壁版.mp3',
  date: '2021-01-18T12:35:23.726+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['1:50:47.288', '1:50:54.593']
  },
  tags: ['搞怪古守', 'AA 古守']
}, {
  desc: '太奇怪了吧！',
  path: '@voices/2020/12/24/古守平安夜/太奇怪了吧！.mp3',
  date: '2021-01-18T12:38:55.394+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['1:50:56.300', '1:50:57.398']
  },
  tags: ['生气古守']
}, {
  desc: 'Komori 为什么一直这么小呢？',
  path: '@voices/2020/12/24/古守平安夜/Komori-为什么一直这么小呢？.mp3',
  date: '2021-01-18T12:42:45.404+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['1:52:12.847', '1:52:18.367']
  },
  tags: ['AA 古守'],
  gachiRanges: [[0, 49]]
}, {
  desc: 'encore',
  path: '@voices/2020/12/24/古守平安夜/encore.mp3',
  date: '2021-01-18T12:48:21.160+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['2:11:20.820', '2:11:43.234']
  },
  tags: ['安可古守']
}, {
  desc: '麻将 - 立直喵~',
  path: '@voices/2021/01/02/新年麻将古守视点/麻将-立直喵~.mp3',
  date: '2021-01-18T13:01:12.074+08:00',
  origin: {
    live: '2021-01-02-新年麻将古守视点',
    interval: ['17:42.649', '17:43.745']
  },
  tags: ['古守语音包']
}, {
  desc: '抽筋怪叫一分钟',
  path: '@voices/2020/12/06/高速ringfit/抽筋怪叫一分钟.mp3',
  date: '2021-01-18T15:50:31.116+08:00',
  origin: {
    live: '2020-12-06-高速ringfit',
    interval: ['1:03:43.197', '1:04:51.065']
  },
  tags: ['涩涩古守'],
  gachiRanges: [[0, 40]]
}, {
  desc: '神之雷',
  path: '@voices/2020/12/16/古守唄~认真唱了哦/神之雷.mp3',
  date: '2021-01-18T18:06:30.995+08:00',
  origin: {
    live: '2020-12-16-古守唄~认真唱了哦',
    interval: ['14:55.478', '15:05.000']
  },
  tags: ['中二古守']
}, {
  desc: '打喷嚏',
  path: '@voices/2021/01/17/P家AmongUs联动/打喷嚏.mp3',
  date: '2021-01-18T19:29:22.276+08:00',
  origin: {
    live: '2021-01-17-P家AmongUs联动',
    interval: ['15:27.614', '15:31.456']
  },
  tags: ['可爱古守'],
  gachiRanges: [[51, 100]]
}, {
  desc: '为什么啊啊——',
  path: '@voices/2020/12/24/古守平安夜/为什么啊啊——.mp3',
  date: '2021-01-19T14:28:32.300+08:00',
  origin: {
    live: '2020-12-24-古守平安夜',
    interval: ['1:53:29.217', '1:53:31.896']
  },
  tags: ['生气古守']
}, {
  desc: 'ENCORE - 无路赛',
  path: '@voices/2021/01/14/YTB一万人纪念歌回/ENCORE-无路赛.mp3',
  date: '2021-01-19T16:33:59.248+08:00',
  origin: {
    live: '2021-01-14-YTB一万人纪念歌回',
    interval: ['1:00:00.000', '1:00:30.630']
  },
  tags: ['安可古守']
}, {
  desc: '领域展开，「古守空港」！',
  path: '@voices/2021/01/17/突击杂谈/领域展开-古守空港！.mp3',
  date: '2021-01-19T20:19:03.337+08:00',
  origin: {
    live: '2021-01-17-突击杂谈',
    interval: ['44:49.077', '44:52.392']
  },
  tags: ['AA 古守', '中二古守']
}, {
  desc: '恋口上之歌',
  path: '@voices/2019/05/26/YTB收益化纪念-生放送歌回-2nd-live/恋口上之歌.mp3',
  date: '2021-01-20T18:33:14.819+08:00',
  origin: {
    live: '2019-05-26-YTB收益化纪念-生放送歌回-2nd-live',
    interval: ['34:45.292', '35:35.154']
  },
  tags: ['搞怪古守']
}, {
  desc: '古守：傲娇探病篇',
  path: '@voices/fanbox/ツンデレヤンデレボイス集/ツンデレお見舞い編.mp3',
  date: '2021-01-20T22:23:56.515+08:00',
  origin: {
    url: 'https://tqo7iwsc.fanbox.cc/posts/829732',
    desc: 'Fanbox 古守病娇傲娇音声合集'
  },
  tags: ['古守音声', '傲娇古守']
}, {
  desc: '古守：傲娇帮助篇',
  path: '@voices/fanbox/ツンデレヤンデレボイス集/ツンデレお手伝い編.mp3',
  date: '2021-01-20T22:23:56.514+08:00',
  origin: {
    url: 'https://tqo7iwsc.fanbox.cc/posts/829732',
    desc: 'Fanbox 古守病娇傲娇音声合集'
  },
  tags: ['古守音声', '傲娇古守']
}, {
  desc: '古守：傲娇青梅',
  path: '@voices/fanbox/ツンデレヤンデレボイス集/ツンデレ幼馴染編.mp3',
  date: '2021-01-20T22:23:56.513+08:00',
  origin: {
    url: 'https://tqo7iwsc.fanbox.cc/posts/829732',
    desc: 'Fanbox 古守病娇傲娇音声合集'
  },
  tags: ['古守音声', '傲娇古守']
}, {
  desc: '古守：病娇妹妹',
  path: '@voices/fanbox/ツンデレヤンデレボイス集/ヤンデレ兄弟編.mp3',
  date: '2021-01-20T22:23:56.512+08:00',
  origin: {
    url: 'https://tqo7iwsc.fanbox.cc/posts/829732',
    desc: 'Fanbox 古守病娇傲娇音声合集'
  },
  tags: ['古守音声', '病娇古守']
}, {
  desc: '古守：病娇邻家姐姐',
  path: '@voices/fanbox/ツンデレヤンデレボイス集/ヤンデレ隣のお姉さん編.mp3',
  date: '2021-01-20T22:23:56.511+08:00',
  origin: {
    url: 'https://tqo7iwsc.fanbox.cc/posts/829732',
    desc: 'Fanbox 古守病娇傲娇音声合集'
  },
  tags: ['古守音声', '病娇古守']
}, {
  desc: '古守：病娇女友',
  path: '@voices/fanbox/ツンデレヤンデレボイス集/ヤンデレ彼女編.mp3',
  date: '2021-01-20T22:23:56.510+08:00',
  origin: {
    url: 'https://tqo7iwsc.fanbox.cc/posts/829732',
    desc: 'Fanbox 古守病娇傲娇音声合集'
  },
  tags: ['古守音声', '病娇古守']
}, {
  desc: '给肉肉的生日快乐歌~',
  path: '@voices/2021/01/21/TFT新赛季/给肉肉的生日快乐歌~.mp3',
  date: '2021-01-22T09:58:43.282+08:00',
  origin: {
    live: '2021-01-21-TFT新赛季',
    interval: ['', '']
  },
  tags: ['古守与肉肉']
}, {
  desc: '魔镜啊，谁是世界上最可爱的女孩？',
  path: '@voices/2021/01/21/TFT新赛季/魔镜啊，谁是世界上最可爱的女孩？.mp3',
  date: '2021-01-22T10:25:32.730+08:00',
  origin: {
    live: '2021-01-21-TFT新赛季',
    interval: ['', '']
  },
  tags: ['可爱古守']
}, {
  desc: '哼歌 - 二人三脚',
  path: '@voices/2021/01/21/TFT新赛季/哼歌-二人三脚.mp3',
  date: '2021-01-22T11:28:45.983+08:00',
  origin: {
    live: '2021-01-21-TFT新赛季',
    interval: ['', '']
  },
  tags: ['哼歌古守']
}, {
  desc: 'oto酱...啊...搞不清了...已经什么也不知道了',
  path: '@voices/2021/01/21/TFT新赛季/oto酱...啊...搞不清了...已经什么也不知道了.mp3',
  date: '2021-01-22T11:28:45.983+08:00',
  origin: {
    live: '2021-01-21-TFT新赛季',
    interval: ['', '']
  },
  tags: ['涩涩古守', '古守 x 音']
}, {
  desc: '伸懒腰',
  path: '@voices/2021/01/22/Apex联动古守视角/伸懒腰.mp3',
  date: '2021-01-23T23:46:38.618+08:00',
  origin: {
    live: '2021-01-22-Apex联动古守视角',
    interval: ['30:33.000', '30:37.000']
  },
  tags: ['可爱古守']
}, {
  desc: '古守娇呼',
  path: '@voices/2021/01/22/Apex联动古守视角/古守娇呼.mp3',
  date: '2021-01-23T23:54:09.217+08:00',
  origin: {
    live: '2021-01-22-Apex联动古守视角',
    interval: ['59:34.098', '59:34.484']
  },
  tags: ['涩涩古守']
}, {
  desc: '哇哦~',
  path: '@voices/2021/01/22/Apex联动古守视角/哇哦~.mp3',
  date: '2021-01-24T00:08:56.405+08:00',
  origin: {
    live: '2021-01-22-Apex联动古守视角',
    interval: ['2:36:34.196', '2:36:35.561']
  },
  tags: ['可爱古守']
}, {
  desc: 'nano 结婚',
  path: '@voices/2021/01/22/Apex联动古守视角/nano-结婚.mp3',
  date: '2021-01-24T00:24:01.727+08:00',
  origin: {
    live: '2021-01-22-Apex联动古守视角',
    interval: ['42:56.642', '42:57.873']
  },
  tags: ['古守 x nano']
}, {
  desc: '不是我，你搞错人了！',
  path: '@voices/2021/01/25/歌回/不是我-你搞错人了！.mp3',
  date: '2021-01-25T06:32:50.116-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
 tags: ['可爱古守']
}, {
  desc: 'Can you marry me?',
  path: '@voices/2021/01/25/歌回/can-you-marry-me.mp3',
  date: '2021-01-25T07:00:50.811-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
  tags: ['可爱古守']
}]
