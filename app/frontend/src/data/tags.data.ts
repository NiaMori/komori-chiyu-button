import { Language } from '../misc/i18n'

export const sexyTags = ['涩涩古守']

export const tags = [
  '可爱古守',
  '搞怪古守',
  '古守古守',
  '古守语音包',
  '安可古守',
  '口胡古守',
  '困困古守',
  '古守与肉肉',
  '中二古守',
  '生气古守',
  '病娇古守',
  '古守 x nano',
  '软软古守',
  'AA 古守',
  '涩涩古守',
  '古守音声',
  '古守 x 音',
  '傲娇古守',
  '嚣张古守',
  '哼歌古守',
  '撒娇古守',
  '古守美食',
  '怪叫古守'
] as const

export const tagTranslation: Partial<Record<Language, Partial<Record<Tag, string>>>> = {
  ja: {
    '可爱古守': '可愛い古守',
    '搞怪古守': '変な古守',
    '古守古守': '古守古守',
    '古守语音包': '古守音声パッケージ',
    '安可古守': 'アンコール',
    '口胡古守': '古守 !@#$%^&*',
    '困困古守': '眠い古守',
    '古守与肉肉': '古守とお肉たち',
    '中二古守': '中二病古守',
    '生气古守': 'プンプン古守',
    '病娇古守': 'ヤンデレ古守',
    '古守 x nano': '古守 x 椎名菜羽',
    '软软古守': 'ふわふわ古守',
    'AA 古守': '古守 AA',
    '涩涩古守': '古守えちち',
    '古守音声': '古守音声',
    '古守 x 音': '古守 x 乙女おと',
    '傲娇古守': 'ツンデレ古守',
    '嚣张古守': '生意気な古守',
    '哼歌古守': '鼻歌古守',
    '撒娇古守': 'デレデレ古守'
  }
}

export type Tag = typeof tags[number]