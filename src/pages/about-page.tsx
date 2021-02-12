/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import { url } from '../misc/assets'

import { Fragment, useMemo } from 'react'

import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  Divider,
  GridList,
  GridListTile,
  Paper,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core'

import { Forum, ForumOutline, PlaylistMusicOutline } from 'mdi-material-ui'

import { useTranslation } from 'react-i18next'

const useFriendLinks = () => {
  const theme = useTheme()

  return useMemo(() => {
    return [{
      name: '古守血遊 official',
      desc: (<Fragment>Chucolala 所属<span lang = 'ja'>古守ちゆ</span></Fragment>),
      url: 'https://space.bilibili.com/2299184',
      avatar: {
        src: url('@images/friend-links/komori-bilibili.webp')
      }
    }, {
      name: 'Komori Fan Club',
      desc: (<Fragment><span lang = 'ja'>ちゅこらら</span>所属 Vtuber 古守血遊民间二创群体</Fragment>),
      url: 'https://space.bilibili.com/1616870119',
      avatar: {
        src: url('@images/friend-links/komori-fan-club.webp')
      }
    }, {
      name: '古守血遊网易云电台',
      desc: '古守唱过的歌都在这里~',
      url: 'https://music.163.com/#/djradio?id=793073480',
      avatar: {
        style: { backgroundColor: theme.palette.secondary.main },
        children: <PlaylistMusicOutline/>
      }
    }, {
      name: 'NGA 古守血遊专楼',
      desc: <span><del>发情</del> 肉肉们的聚集地 (桃园)</span>,
      url: 'https://bbs.nga.cn/read.php?tid=25009036',
      avatar: {
        src: url('@images/friend-links/NGA.svg'),
        style: {
          borderRadius: '0',
          height: 'unset'
        }
      }
    }]
  }, [theme])
}

const useResponsiveColumnCount = () => {
  const theme = useTheme()

  const large = useMediaQuery(theme.breakpoints.up('md'))
  const middle = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const small = useMediaQuery(theme.breakpoints.down('sm'))

  return [3, 2, 1][[large, middle, small].indexOf(true)]
}

const FriendLinks = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const friendLinks = useFriendLinks()
  const column = useResponsiveColumnCount()

  return (
    <Paper
      elevation = {2}
      css = {css`
        padding: ${theme.spacing(2)}px;
        margin-top: ${theme.spacing(3)}px;
      `}
    >
      <Typography variant = 'h5'>
        {t('友情链接')}
      </Typography>

      <Divider
        css = {css`
          margin-top: ${theme.spacing(2)}px;
          margin-bottom: ${theme.spacing(2)}px;
        `}
      />

      <GridList cellHeight = {'auto'} cols = {column}>
        {friendLinks.map(({ name, desc, url, avatar }) => (
          <GridListTile key = {name} cols = {1}
            css = {css`
              > .MuiGridListTile-tile {
                padding: ${theme.spacing(1)}px;
              }
            `}
          >
            <Card elevation = {2}
              css = {css`
                height: 100%;
              `}
              lang = 'zh-CN'
            >
              <CardActionArea
                onClick = {() => window.open(url, '_blank', 'noopener')}
                css = {css`
                  height: 100%;
                `}
              >
                <CardHeader
                  avatar = {<Avatar {...avatar} />}
                  title = {name}
                  subheader = {desc}
                />
              </CardActionArea>
            </Card>
          </GridListTile>
        ))}
      </GridList>
    </Paper>
  )
}

const ExternalLink = ({ text, url }: { text: string, url: string }) : JSX.Element => {
  return (
    <Button
      color = 'secondary'
      component = 'a'
      href = {url}
      target = '_blank'
      rel = 'noopener'
      css = {css`
        text-transform: none;
      `}
    >
      {text}
    </Button>
  )
}

export const AboutPage = () : JSX.Element => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (<Fragment>
    <Paper
      elevation = {2}
      css = {css`
        padding: ${theme.spacing(2)}px;
      `}
    >
      <Typography variant = 'h5'>
        {t('关于「古守血遊按钮站」')}
      </Typography>

      <Divider
        css = {css`
          margin-top: ${theme.spacing(2)}px;
          margin-bottom: ${theme.spacing(2)}px;
        `}
      />

      <Typography lang = 'zh-CN'>
        「古守血遊按钮站」由粉丝自发创立，意在收集有趣的声音片段，让更多人喜欢上古守
      </Typography>

      <br />

      <Typography lang = 'zh-CN'>
        <span>您可以在</span>
        <ExternalLink text = 'GitHub' url = 'https://github.com/NiaMori/komori-chiyu-button' />
        <span>参与完善本项目，或者直接联系本站的主要维护人</span>
        <ExternalLink text = '@NiaMori' url = 'https://space.bilibili.com/85958794' />
      </Typography>

      <br />

      <Typography lang = 'zh-CN'>
        <span>欢迎提供声音片段、更正翻译错误、提出改进建议和给出整活方案！</span>
      </Typography>

      <br />

      <blockquote
        css = {css`
          padding: 0 1em;
          border-left: 0.25em solid;
          margin-left: 0;
          color: #6A737D;
        `}
      >
        <Typography variant = 'h6' lang = 'ja'>
          Komori......Komori...... 寂しい......
        </Typography>
      </blockquote>
    </Paper>

    <FriendLinks />
  </Fragment>)
}
