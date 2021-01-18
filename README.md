# komori-chiyu-button / 古守血遊按钮

> Komori......Komori...... 寂しい......

试运行地址：[https://komori-chiyu-button.niamori.workers.dev](https://komori-chiyu-button.niamori.workers.dev/)

## 如何参与完善本项目？

### 直接联系我，提供有趣的古守声音片段

一句话给出出处即可，能提供音频文件更好，示例：

> BVXXXXXXXXX 11:29 处我好了，求剪

> 11 月 29 日直播 1:23 到 1: 32 中二台词，附件 ooxx.mp3

### 发起 Issue，贡献内容或提出建议

在 [Issues](https://github.com/NiaMori/komori-chiyu-button/issues) 中提供声音片段、更正翻译错误、提出改进建议、给出整活方案等

### 参与项目开发并提交 `Pull Request`

项目基于 `vite + typescript + react`

`clone` 并安装依赖，然后使用 `dev` 命令启动开发模式，使用 `build` 命令构建

欢迎完善代码，添加功能

## 数据格式

音频文件保存在 `/assets/voices` 目录下，按日期与来源分类保存：

```
assets
└─ voices
   └─ 2020
      └─ 12
         ├─ 06
         │  └─ 高速ringfit
         │     └─ 抽筋怪叫一分钟.mp3
         └─ 24
            └─ 古守平安夜
               └─ 必杀技！Perfect-Defense！！.mp3
```

数据保存在 `/src/data/voices.data.ts` 中

声音片段信息示例如下：

```typescript
{
  desc: '必杀技！Perfect-Defense！！', // 声音描述
  path: '@voices/2020/12/24/古守平安夜/必杀技！Perfect-Defense！！.mp3', // 素材路径，使用 @voices 指代音频目录
  date: '2021-01-18T11:48:17.968+08:00', // 添加时间，使用 ISO-8601 时间格式
  origin: '2020-12-24-古守平安夜', // 声音片段来源，参见下文直播信息
  interval: ['28:21.471', '28:25.671'], // 声音片段所在区间
  tags: ['AA 古守', '中二古守'] // 标签
}
```

直播信息示例如下：

```typescript
// 每个直播以 [年-月-日-描述] 的格式标识
'2020-12-24-古守平安夜': {
  desc: '古守平安夜', // 直播描述
  date: '2020-12-24', // 直播时间
  url: 'https://www.bilibili.com/video/BV18A411p7Ka' // 录播地址
}
```

## 计划中

- [ ] 补充更多声音片段 ~~(怪叫)~~
- [ ] 多语言界面
- [ ] 统计功能
- [ ] 增强播放控制（暂停、播放、终止、循环、轮播、重叠）
- [ ] 声音预加载
- [ ] 声音文本与翻译
- [ ] 完善界面 ~~(指添加更多 anti 要素)~~
