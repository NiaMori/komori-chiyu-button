import { Language } from '../i18n'

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
  '哼歌古守'
] as const

export const tagTranslation: Partial<Record<Language, Partial<Record<Tag, string>>>> = {
  ja: {
    '可爱古守': 'ja(可爱古守)',
    '搞怪古守': 'ja(搞怪古守)',
    '古守古守': 'ja(古守古守)',
    '古守语音包': 'ja(古守语音包)',
    '安可古守': 'ja(安可古守)',
    '口胡古守': 'ja(口胡古守)',
    '困困古守': 'ja(困困古守)',
    '古守与肉肉': 'ja(古守与肉肉)',
    '中二古守': 'ja(中二古守)',
    '生气古守': 'ja(生气古守)',
    '病娇古守': 'ja(病娇古守)',
    '古守 x nano': 'ja(古守 x nano)',
    '软软古守': 'ja(软软古守)',
    'AA 古守': 'ja(AA 古守)',
    '涩涩古守': 'ja(涩涩古守)',
    '古守音声': 'ja(古守音声)',
    '古守 x 音': 'ja(古守 x 音)',
    '傲娇古守': 'ja(傲娇古守)',
    '嚣张古守': 'ja(嚣张古守)',
    '哼歌古守': 'ja(哼歌古守)'
  }
}

export type Tag = typeof tags[number]
