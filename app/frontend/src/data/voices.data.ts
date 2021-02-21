import { LiveIndex } from './lives.data'
import { Tag } from './tags.data'
import { Language } from '../misc/i18n'

export interface FromLive {
  live: LiveIndex,
  interval: [string, string]
}

export interface FromWebPage {
  desc: string,
  url: string
}

export interface FromVideo {
  desc: string,
  url: string,
  interval: [string, string]
}

export type Origin = FromLive | FromWebPage | FromVideo

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const isFromLive = (it: any) : it is FromLive => {
  return typeof it.live === 'string'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const isFromWebPage = (it: any) : it is FromWebPage => {
  return typeof it.desc === 'string' && typeof it.url === 'string'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const isFromVideo = (it: any) : it is FromWebPage => {
  return typeof it.desc === 'string' && typeof it.url === 'string' && typeof it.interval === 'object'
}

export interface Voice {
  desc: string,
  path: string,
  date: string,
  origin: Origin,
  tags: Tag[],
  translation?: Partial<Record<Language, Record<string, string>>>,
  gachiRanges?: [number, number][]
}

export const isNewVoice = ({ date }: Voice) : boolean => {
  return (Date.now() - Date.parse(date)) < 86400000
}

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
  tags: ['古守与肉肉']
}, {
  desc: '古宝？古宝！',
  path: '@voices/2021/01/25/歌回/古宝？古宝！.mp3',
  date: '2021-01-25T07:37:57.506-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
  tags: ['古守古守']
}, {
  desc: '古守姐姐~',
  path: '@voices/2021/01/25/歌回/古守姐姐~.mp3',
  date: '2021-01-25T07:37:57.506-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
  tags: ['古守古守']
}, {
  desc: '啾啾~',
  path: '@voices/2021/01/25/歌回/啾啾~.mp3',
  date: '2021-01-25T07:37:57.506-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
  tags: ['可爱古守']
}, {
  desc: '守子哥？守子哥？啊——',
  path: '@voices/2021/01/25/歌回/守子哥？守子哥？啊——.mp3',
  date: '2021-01-25T07:37:57.506-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
  tags: ['古守古守']
}, {
  desc: '守子哥',
  path: '@voices/2021/01/25/歌回/守子哥.mp3',
  date: '2021-01-25T07:37:57.506-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
  tags: ['古守古守']
}, {
  desc: '打喷嚏-2',
  path: '@voices/2021/01/25/歌回/打喷嚏-2.mp3',
  date: '2021-01-25T07:37:57.506-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
  tags: ['可爱古守']
}, {
  desc: '古宝守子哥',
  path: '@voices/2021/01/25/歌回/古宝守子哥.mp3',
  date: '2021-01-25T07:37:57.506-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
  tags: ['古守古守']
}, {
  desc: '古守了不起',
  path: '@voices/2021/01/25/歌回/古守了不起.mp3',
  date: '2021-01-25T07:37:57.506-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
  tags: ['可爱古守']
}, {
  desc: '啾啾古宝',
  path: '@voices/2021/01/25/歌回/啾啾古宝.mp3',
  date: '2021-01-25T07:37:57.506-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
  tags: ['可爱古守']
}, {
  desc: '咻咻古宝',
  path: '@voices/2021/01/25/歌回/咻咻古宝.mp3',
  date: '2021-01-25T07:37:57.506-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
  tags: ['可爱古守']
}, {
  desc: 'nano-punch！',
  path: '@voices/2021/01/25/歌回/nano-punch！.mp3',
  date: '2021-01-25T07:37:57.506-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
  tags: ['古守 x nano']
}, {
  desc: '肉肉最喜欢了（？',
  path: '@voices/2021/01/25/歌回/肉肉最喜欢了（？.mp3',
  date: '2021-01-25T07:37:57.506-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
  tags: ['古守与肉肉']
}, {
  desc: '最喜欢肉肉们了！',
  path: '@voices/2021/01/25/歌回/最喜欢肉肉们了！.mp3',
  date: '2021-01-25T07:37:57.506-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
  tags: ['古守与肉肉']
}, {
  desc: '古守也最喜欢了~',
  path: '@voices/2021/01/25/歌回/古守也最喜欢了~.mp3',
  date: '2021-01-25T07:37:57.506-08:00',
  origin: {
    live: '2021-01-25-歌回',
    interval: ['', '']
  },
  tags: ['古守与肉肉']
}, {
  desc: '软软打招呼',
  path: '@voices/2021/01/27/LPL同时视听/软软打招呼.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['1:02.732', '1:20.000']
  },
  tags: ['软软古守']
}, {
  desc: '软软你好',
  path: '@voices/2021/01/27/LPL同时视听/软软你好.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['1:34.383', '1:37.487']
  },
  tags: ['软软古守']
}, {
  desc: '啊',
  path: '@voices/2021/01/27/LPL同时视听/啊.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['2:01.348', '2:01.860']
  },
  tags: ['涩涩古守']
}, {
  desc: '十分困（可爱）',
  path: '@voices/2021/01/27/LPL同时视听/十分困（可爱）.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['2:18.782', '2:20.419']
  },
  tags: ['困困古守', '可爱古守']
}, {
  desc: '了不起吧（轻笑）',
  path: '@voices/2021/01/27/LPL同时视听/了不起吧（轻笑）.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['2:48.907', '2:52.206']
  },
  tags: ['可爱古守']
}, {
  desc: '谁？是古守啊！',
  path: '@voices/2021/01/27/LPL同时视听/谁？是古守啊！.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['2:57.146', '3:01.845']
  },
  tags: ['生气古守']
}, {
  desc: '嗯...这次是',
  path: '@voices/2021/01/27/LPL同时视听/嗯...这次是.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['11:41.303', '11:44.777']
  },
  tags: ['可爱古守']
}, {
  desc: '真是的不要啊',
  path: '@voices/2021/01/27/LPL同时视听/真是的不要啊.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['13:24.079', '13:24.079']
  },
  tags: ['生气古守', '涩涩古守']
}, {
  desc: '古守可是知道的哦',
  path: '@voices/2021/01/27/LPL同时视听/古守可是知道的哦.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['14:26.728', '14:26.728']
  },
  tags: ['可爱古守']
}, {
  desc: '哈欠-0',
  path: '@voices/2021/01/27/LPL同时视听/啊呜.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['2:33:06.488', '2:33:07.778']
  },
  tags: ['困困古守']
}, {
  desc: '哈欠-1',
  path: '@voices/2021/01/27/LPL同时视听/哈欠-1.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['2:33:18.053', '2:33:27.537']
  },
  tags: ['困困古守']
}, {
  desc: '古守，动起来啊！',
  path: '@voices/2021/01/27/LPL同时视听/古守，动起来啊！.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:01:57.973', '3:02:03.861']
  },
  tags: ['搞怪古守']
}, {
  desc: '救救我',
  path: '@voices/2021/01/27/LPL同时视听/救救我.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:02:21.229', '3:02:23.203']
  },
  tags: ['可爱古守']
}, {
  desc: '哈欠-2',
  path: '@voices/2021/01/27/LPL同时视听/哈欠-2.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:03:24.988', '3:03:28.134']
  },
  tags: ['困困古守']
}, {
  desc: '哈欠-3',
  path: '@voices/2021/01/27/LPL同时视听/哈欠-3.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:04:32.872', '3:04:38.421']
  },
  tags: ['困困古守']
}, {
  desc: '哈欠-4',
  path: '@voices/2021/01/27/LPL同时视听/哈欠-4.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:07:42.599', '3:07:45.588']
  },
  tags: ['困困古守']
}, {
  desc: '哈欠-5',
  path: '@voices/2021/01/27/LPL同时视听/哈欠-5.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:09:45.430', '3:09:53.091']
  },
  tags: ['困困古守']
}, {
  desc: '哈欠-6',
  path: '@voices/2021/01/27/LPL同时视听/哈欠-6.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:11:31.399', '3:11:34.032']
  },
  tags: ['困困古守']
}, {
  desc: '哦？哦！哦——',
  path: '@voices/2021/01/27/LPL同时视听/哦？哦！哦——.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:11:46.236', '3:11:49.451']
  },
  tags: ['搞怪古守']
}, {
  desc: '啊（吸气）太可怜了吧！',
  path: '@voices/2021/01/27/LPL同时视听/啊（吸气）太可怜了吧！.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:13:38.796', '3:13:42.130']
  },
  tags: ['可爱古守']
}, {
  desc: '哈欠-7-不好又要打哈欠了',
  path: '@voices/2021/01/27/LPL同时视听/哈欠-7-不好又要打哈欠了.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:18:04.761', '3:18:16.791']
  },
  tags: ['困困古守']
}, {
  desc: '哈欠-8',
  path: '@voices/2021/01/27/LPL同时视听/哈欠-8.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:20:30.000', '3:20:34.525']
  },
  tags: ['困困古守']
}, {
  desc: '哈欠-9',
  path: '@voices/2021/01/27/LPL同时视听/哈欠-9.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:44:03.538', '3:44:10.000']
  },
  tags: ['困困古守']
}, {
  desc: '欧尼酱？',
  path: '@voices/2021/01/27/LPL同时视听/欧尼酱？.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:44:17.204', '3:44:21.812']
  },
  tags: ['可爱古守']
}, {
  desc: '爸爸？',
  path: '@voices/2021/01/27/LPL同时视听/爸爸？.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:45:11.278', '3:45:12.474']
  },
  tags: ['可爱古守']
}, {
  desc: '呦西呦西-prpr',
  path: '@voices/2021/01/27/LPL同时视听/呦西呦西-prpr.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:45:14.543', '3:45:22.191']
  },
  tags: ['搞怪古守']
}, {
  desc: '哈欠-10-哈欠停不下来',
  path: '@voices/2021/01/27/LPL同时视听/哈欠-10-哈欠停不下来.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:45:52.742', '3:46:03.788']
  },
  tags: ['困困古守']
}, {
  desc: '哈欠-11',
  path: '@voices/2021/01/27/LPL同时视听/哈欠-11.mp3',
  date: '2021-01-27T07:33:35.121-08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:51:52.369', '3:51:59.483']
  },
  tags: ['困困古守']
}, {
  desc: '你说什么？',
  path: '@voices/bilibili/BV1Jz4y1S7mT/你说什么？.mp3',
  date: '2021-01-29T08:35:54.199-08:00',
  origin: {
    desc: '【暗妃鲁咪蕾】圣 Cup 战争（Komori 篇）',
    url: 'https://www.bilibili.com/video/BV1Jz4y1S7mT',
    interval: ['00:07.678', '00:08.864']
  },
  tags: ['嚣张古守']
}, {
  desc: '欧拉欧拉欧拉',
  path: '@voices/2021/01/27/LPL同时视听/欧拉欧拉欧拉.mp3',
  date: '2021-02-02T10:53:07.000+08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:31:12.189', '3:31:14.251']
  },
  tags: ['嚣张古守']
}, {
  desc: 'ZA WARUDO！',
  path: '@voices/2021/01/27/LPL同时视听/ZA-WARUDO！.mp3',
  date: '2021-02-02T10:53:07.000+08:00',
  origin: {
    live: '2021-01-27-LPL同时视听',
    interval: ['3:15:40.266', '3:15:41.200']
  },
  tags: ['中二古守']
}, {
  desc: '哈哈↑哈哈哈哈哈',
  path: '@voices/2021/01/31/古守-好人-30-Apex/哈哈↑哈哈哈哈哈.mp3',
  date: '2021-02-02T10:53:07.000+08:00',
  origin: {
    live: '2021-01-31-古守-好人-30-Apex',
    interval: ['1:46:29', '']
  },
  tags: ['搞怪古守']
}, {
  desc: '铁咩！Komori Kick！',
  path: '@voices/2021/01/31/古守-好人-30-Apex/铁咩！Komori-Kick！.mp3',
  date: '2021-02-02T10:53:07.000+08:00',
  origin: {
    live: '2021-01-31-古守-好人-30-Apex',
    interval: ['3:43:49', '']
  },
  tags: ['嚣张古守']
}, {
  desc: '乓！饶不了你哦！',
  path: '@voices/2021/01/31/古守-好人-30-Apex/乓！饶不了你哦！.mp3',
  date: '2021-02-02T10:53:07.000+08:00',
  origin: {
    live: '2021-01-31-古守-好人-30-Apex',
    interval: ['3:33:43', '']
  },
  tags: ['生气古守']
}, {
  desc: '呜啊！',
  path: '@voices/2021/01/31/古守-好人-30-Apex/呜啊！.mp3',
  date: '2021-02-02T10:53:07.000+08:00',
  origin: {
    live: '2021-01-31-古守-好人-30-Apex',
    interval: ['3:00:01', '']
  },
  tags: ['涩涩古守']
}, {
  desc: '快夸我~',
  path: '@voices/2020/10/27/打工人集合！/快夸我~.mp3',
  date: '2021-02-02T10:53:07.000+08:00',
  origin: {
    live: '2020-10-27-打工人集合！',
    interval: ['7:08.939', '7:11.275']
  },
  tags: ['撒娇古守']
}, {
  desc: 'BAKA！',
  path: '@voices/2020/08/19/LOL-古守-雛月/baka！.mp3',
  date: '2021-02-02T10:53:07.000+08:00',
  origin: {
    live: '2020-08-19-LOL-古守-雛月',
    interval: ['38:04.315', '38:05.124']
  },
  tags: ['嚣张古守']
}, {
  desc: 'pien~pien~pien~',
  path: '@voices/2020/08/19/LOL-古守-雛月/pien-pien-pien.mp3',
  date: '2021-02-02T10:53:07.000+08:00',
  origin: {
    live: '2020-08-19-LOL-古守-雛月',
    interval: ['38:08.548', '38:10.072']
  },
  tags: ['可爱古守']
}, {
  desc: '古守 RAP（？',
  path: '@voices/2019/05/26/YTB收益化纪念-生放送歌回-2nd-live/古守RAP（？.mp3',
  date: '2021-02-02T10:53:07.000+08:00',
  origin: {
    live: '2019-05-26-YTB收益化纪念-生放送歌回-2nd-live',
    interval: ['34:30.000', '34:41.815']
  },
  tags: ['搞怪古守']
}, {
  desc: '我~爱~你~',
  path: '@voices/2021/02/04/LPL观战/我~爱~你~.mp3',
  date: '2021-02-04T23:55:48.259+08:00',
  origin: {
    live: '2021-02-04-LPL观战',
    interval: ['13:28.355', '13:30.221']
  },
  tags: ['古守与肉肉']
}, {
  desc: '我爱你 baby~',
  path: '@voices/2021/02/04/LPL观战/我爱你-baby~.mp3',
  date: '2021-02-04T23:55:48.259+08:00',
  origin: {
    live: '2021-02-04-LPL观战',
    interval: ['9:46.465', '9:47.783']
  },
  tags: ['古守与肉肉']
}, {
  desc: '我爱你',
  path: '@voices/2021/02/04/LPL观战/我爱你.mp3',
  date: '2021-02-04T23:55:48.259+08:00',
  origin: {
    live: '2021-02-04-LPL观战',
    interval: ['15:27.730', '15:29.029']
  },
  tags: ['古守与肉肉']
}, {
  desc: '哈欠 - 12',
  path: '@voices/2021/02/04/LPL观战/哈欠-12.mp3',
  date: '2021-02-04T23:55:48.259+08:00',
  origin: {
    live: '2021-02-04-LPL观战',
    interval: ['1:12:38.267', '1:12:40.313']
  },
  tags: ['困困古守']
}, {
  desc: '哈欠 - 13',
  path: '@voices/2021/02/04/LPL观战/哈欠-13.mp3',
  date: '2021-02-04T23:55:48.259+08:00',
  origin: {
    live: '2021-02-04-LPL观战',
    interval: ['1:13:38.518', '1:13:40.701']
  },
  tags: ['困困古守']
}, {
  desc: 'nice！+ 拍肚皮',
  path: '@voices/2021/02/04/LPL观战/nice!+拍肚皮.mp3',
  date: '2021-02-04T23:55:48.259+08:00',
  origin: {
    live: '2021-02-04-LPL观战',
    interval: ['1:15:31.662', '1:15:38.079']
  },
  tags: ['可爱古守']
}, {
  desc: '哈欠 - 14',
  path: '@voices/2021/02/04/LPL观战/哈欠-14.mp3',
  date: '2021-02-04T23:55:48.259+08:00',
  origin: {
    live: '2021-02-04-LPL观战',
    interval: ['1:20:20.000', '1:20:22.384']
  },
  tags: ['困困古守']
}, {
  desc: '哈欠 - 15',
  path: '@voices/2021/02/04/LPL观战/哈欠-15.mp3',
  date: '2021-02-04T23:55:48.259+08:00',
  origin: {
    live: '2021-02-04-LPL观战',
    interval: ['1:22:45.100', '1:22:49.018']
  },
  tags: ['困困古守']
}, {
  desc: '哈欠 - 16',
  path: '@voices/2021/02/04/LPL观战/哈欠-16.mp3',
  date: '2021-02-04T23:55:48.259+08:00',
  origin: {
    live: '2021-02-04-LPL观战',
    interval: ['1:31:45.580', '1:31:48.353']
  },
  tags: ['困困古守']
}, {
  desc: '原来喜欢古守啊',
  path: '@voices/2021/02/04/LPL观战/原来喜欢古守啊.mp3',
  date: '2021-02-04T23:55:48.259+08:00',
  origin: {
    live: '2021-02-04-LPL观战',
    interval: ['1:31:45.580', '1:31:48.353']
  },
  tags: ['可爱古守']
}, {
  desc: 'mua~',
  path: '@voices/2021/02/04/LPL观战/mua~.mp3',
  date: '2021-02-04T23:55:48.259+08:00',
  origin: {
    live: '2021-02-04-LPL观战',
    interval: ['1:55:23.801', '1:55:27.030']
  },
  tags: ['古守与肉肉']
}, {
  desc: '大家好我是猴哥（',
  path: '@voices/2021/02/10/古守歌/大家好我是猴哥（.mp3',
  date: '2021-02-13T15:04:35.902+08:00',
  origin: {
    live: '2021-02-10-古守歌',
    interval: ['4:46.291', '4:53.268']
  },
  tags: ['搞怪古守']
}, {
  desc: '啊！头好痛！怎么，过去的记忆！！啊——',
  path: '@voices/2021/02/10/古守歌/啊！头好痛！怎么，过去的记忆！！啊——.mp3',
  date: '2021-02-13T15:04:35.902+08:00',
  origin: {
    live: '2021-02-10-古守歌',
    interval: ['9:17.113', '9:40.000']
  },
  tags: ['中二古守', '搞怪古守']
}, {
  desc: '肉肉生日快乐歌',
  path: '@voices/2021/02/10/古守歌/肉肉生日快乐歌.mp3',
  date: '2021-02-13T15:04:35.902+08:00',
  origin: {
    live: '2021-02-10-古守歌',
    interval: ['25:19.238', '25:38.771']
  },
  tags: ['古守与肉肉']
}, {
  desc: '是古守喵哦~',
  path: '@voices/2021/02/10/古守歌/是古守喵哦~.mp3',
  date: '2021-02-13T15:04:35.902+08:00',
  origin: {
    live: '2021-02-10-古守歌',
    interval: ['45:25.158', '45:28.725']
  },
  tags: ['可爱古守']
}, {
  desc: '请听题，古守是什么Cup呢？AAAAA！',
  path: '@voices/2021/02/06/LPL观战+钢琴练习/请听题，古守是什么Cup呢？AAAAA！.mp3',
  date: '2021-02-13T15:04:35.902+08:00',
  origin: {
    live: '2021-02-06-LPL观战+钢琴练习',
    interval: ['39:30.363', '39:44.085']
  },
  tags: ['AA 古守']
}, {
  desc: '恋口上 - 钢琴版',
  path: '@voices/2021/02/06/LPL观战+钢琴练习/恋口上-钢琴版.mp3',
  date: '2021-02-13T15:04:35.902+08:00',
  origin: {
    live: '2021-02-06-LPL观战+钢琴练习',
    interval: ['2:03:50.595', '2:04:17.309']
  },
  tags: ['可爱古守']
}, {
  desc: '谢谢，塞巴斯酱',
  path: '@voices/2021/02/06/LPL观战+钢琴练习/谢谢，塞巴斯酱.mp3',
  date: '2021-02-13T15:04:35.902+08:00',
  origin: {
    live: '2021-02-06-LPL观战+钢琴练习',
    interval: ['2:16:06.581', '2:16:09.531']
  },
  tags: ['中二古守']
}, {
  desc: '傻笑',
  path: '@voices/2021/02/06/LPL观战+钢琴练习/傻笑.mp3',
  date: '2021-02-13T15:04:35.902+08:00',
  origin: {
    live: '2021-02-06-LPL观战+钢琴练习',
    interval: ['2:14:21.229', '2:14:36.294']
  },
  tags: ['可爱古守']
}, {
  desc: '仙贝 ASMR（',
  path: '@voices/2021/02/06/LPL观战+钢琴练习/仙贝ASMR（.mp3',
  date: '2021-02-13T15:04:35.902+08:00',
  origin: {
    live: '2021-02-06-LPL观战+钢琴练习',
    interval: ['16:27.415', '16:55.483']
  },
  tags: ['可爱古守']
}, {
  desc: 'yadaze~',
  path: '@voices/2021/02/14/情人节古守厨房/yadaze~.mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['1:34.249', '1:35.774']
  },
  tags: ['可爱古守']
}, {
  desc: '古守只是在吃寿司',
  path: '@voices/2021/02/14/情人节古守厨房/古守只是在吃寿司.mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['1:13:44.697', '1:14:40.000']
  },
  tags: ['古守美食', '怪叫古守']
}, {
  desc: '喂肉肉吃寿司',
  path: '@voices/2021/02/14/情人节古守厨房/喂肉肉吃寿司.mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['1:15:02.745', '1:16:10.000']
  },
  tags: ['古守美食', '怪叫古守']
}, {
  desc: '健全吃寿司',
  path: '@voices/2021/02/14/情人节古守厨房/健全吃寿司.mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['1:19:50.436', '1:21:14.000']
  },
  tags: ['古守美食', '怪叫古守', '涩涩古守']
}, {
  desc: '无名之印，通灵术！',
  path: '@voices/2021/02/14/情人节古守厨房/无名之印，通灵术！.mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['1:32:58.555', '1:33:10.919']
  },
  tags: ['中二古守']
}, {
  desc: '要先吃巧克力派呢？要先洗澡呢？还是说要先吃……',
  path: '@voices/2021/02/14/情人节古守厨房/是先吃巧克力派呢？要先洗澡呢？还是说要先吃…….mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['53:51.136', '54:15.327']
  },
  tags: ['可爱古守']
}, {
  desc: '啾啾啾啾啾',
  path: '@voices/2021/02/14/情人节古守厨房/啾啾啾啾啾.mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['1:38:12.150', '1:38:18.243']
  },
  tags: ['可爱古守', '怪叫古守']
}, {
  desc: '欸？你在说什么——',
  path: '@voices/2021/02/14/情人节古守厨房/欸？你在说什么——.mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['1:30:04.269', '1:31:01.239']
  },
  tags: ['可爱古守', '撒娇古守']
}, {
  desc: 'prprprpr',
  path: '@voices/2021/02/14/情人节古守厨房/prprprpr.mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['7:53.812', '7:58.000']
  },
  tags: ['搞怪古守']
}, {
  desc: '砧板按摩（',
  path: '@voices/2021/02/14/情人节古守厨房/砧板按摩（.mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['8:30.000', '8:51.372']
  },
  tags: ['怪叫古守']
}, {
  desc: '呜啊',
  path: '@voices/2021/02/14/情人节古守厨房/呜啊.mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['19:19.747', '19:20.324']
  },
  tags: ['怪叫古守']
}, {
  desc: '砧板之术！',
  path: '@voices/2021/02/14/情人节古守厨房/砧板之术！.mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['42:39.582', '42:46.000']
  },
  tags: ['中二古守', 'AA 古守']
}, {
  desc: '可恶！',
  path: '@voices/2021/02/14/情人节古守厨房/可恶！.mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['47:55.500', '47:57.171']
  },
  tags: ['生气古守']
}, {
  desc: '噔噔~',
  path: '@voices/2021/02/14/情人节古守厨房/噔噔~.mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['50:55.693', '50:58.313']
  },
  tags: ['古守语音包']
}, {
  desc: 'Happy Valentain~',
  path: '@voices/2021/02/14/情人节古守厨房/HappyValentine~.mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['52:43.482', '52:46.000']
  },
  tags: ['古守与肉肉']
}, {
  desc: '古守喂食',
  path: '@voices/2021/02/14/情人节古守厨房/古守喂食.mp3',
  date: '2021-02-14T22:07:01.384+08:00',
  origin: {
    live: '2021-02-14-情人节古守厨房',
    interval: ['55:33.073', '55:44.723']
  },
  tags: ['古守与肉肉']
}]
