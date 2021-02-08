import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

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
        '设置': '設定',
        'gachi 浓度': 'ガチ度',
        '显示所有声音': 'すべての声を表示する',
        '循环播放': 'ループ再生',
        '允许重叠': '同時再生',
        '允许涩古守': '古守えちち',
        '来源': 'From',
        '标签': 'タグ',
        '关于': 'About',
        '归档': 'Archive',
        '首页': 'ホームページ',
        '友情链接': 'リンク',
        '关于「古守血遊按钮站」': '「古守ちゆのボタンサイト」について',
        '日文': '日本語'
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

  i18n.on('languageChanged', (lng) => {
    document.documentElement.setAttribute('lang', lng)
  })

  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources,
      fallbackLng: 'zh-CN',
      debug: !import.meta.env.PROD,

      interpolation: {
        escapeValue: false
      }
    })
}
