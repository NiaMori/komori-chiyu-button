import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { voices, tagTranslation } from '../data'

export const languages = ['zh-CN', 'ja'] as const
export type Language = typeof languages[number]

export const configureI18N = (): void => {
  const resources: Record<Language, {
    translation: {
      [key: string]: string
    }
  }> = {
    'ja': {
      translation: {
        '设置': 'ja(设置)',
        'gachi 浓度': 'ja(gachi 浓度)',
        '显示所有声音': 'ja(显示所有声音)',
        '循环播放': 'ja(循环播放)',
        '允许重叠': 'ja(允许重叠)',
        '允许涩古守': 'ja(允许涩古守)',
        '来源': 'ja(来源)',
        '标签': 'ja(标签)',
        '关于': 'ja(关于)',
        '首页': 'ja(首页)',
        '友情链接': 'ja(友情链接)',
        '关于「古守血遊按钮站」': 'ja(关于「古守血遊按钮站」)'
      }
    },

    'zh-CN': {
      translation: {
        //
      }
    }
  }

  for (const language of languages) {
    for (const [key, value] of Object.entries(tagTranslation[language] ?? {})) {
      if (value) {
        resources[language].translation[key] = value
      }
    }
  }

  for (const { translation } of voices) {
    if (!translation) {
      continue
    }

    for (const language of languages) {
      for (const [key, value] of Object.entries(translation[language] ?? {})) {
        resources[language].translation[key] = value
      }
    }
  }

  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'zh-CN',
      debug: !import.meta.env.PROD,

      interpolation: {
        escapeValue: false
      }
    })
}
