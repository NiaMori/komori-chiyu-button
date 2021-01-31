import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { voices } from '../data'

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
        '循环播放': 'ja(循环播放)'
      }
    },

    'zh-CN': {
      translation: {
        //
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
