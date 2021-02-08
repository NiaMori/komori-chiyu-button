/** @jsx jsx */
/* eslint-disable react/jsx-key */
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled'

import { url } from '../misc/assets'

import { Fragment } from 'react'

import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  useMediaQuery,
  useTheme
} from '@material-ui/core'

import { OriginLink, getOriginInfo, VoiceButton } from '../components'

import { Alert, Download } from 'mdi-material-ui'

import {
  useTable,
  HeaderGroup,
  CellProps,
  Row,
  Column,
  useSortBy,
  UseSortByColumnOptions,
  ColumnInstance,
  UseSortByColumnProps
} from 'react-table'

import {
  isFromLive,
  voices,
} from '../data'

const roundTime = (time: string) => {
  if (time.includes('.')) {
    return time.split(/\./)[0]
  }

  return time
}

const data = voices.map((voice, index) => {
  const { path, origin, tags } = voice
  const interval = isFromLive(origin) ? origin.interval : ['', '']

  return {
    id: index,
    voice,
    origin,
    interval,
    download: url(path),
    tags
  }
})

type Data = typeof data[number]
type EnhancedColumn = Column<Data> & UseSortByColumnOptions<Data>
type EnhancedHeaderGroup = HeaderGroup<Data> & UseSortByColumnProps<Data>
type EnhancedColumnInstance = ColumnInstance<Data> & UseSortByColumnProps<Data>

const Centered = styled.div`
  text-align: center;
`

const columns: EnhancedColumn[] = [{
  accessor: 'id',
  Header: 'ID',
  disableSortBy: true
}, {
  accessor: 'voice' as const,
  Header: '声音',
  disableSortBy: true,
  Cell: ({ cell: { value: voice } }: CellProps<Data, Data['voice']>) => {
    return <VoiceButton voice = {voice} tag = 'anonymous' />
  }
}, {
  accessor: 'origin' as const,
  Header: ({ column: it }) => {
    const column = it as EnhancedColumnInstance
    return (
      <Centered>
        来源
        <TableSortLabel
          active = {column.isSorted}
          direction = {column.isSortedDesc ? 'desc' : 'asc'}
        />
      </Centered>
    )
  },
  sortType: (rowA: Row<Data>, rowB: Row<Data>) => {
    const originA = rowA.original.origin
    const originB = rowB.original.origin
    return getOriginInfo(originA).desc.localeCompare(getOriginInfo(originB).desc)
  },
  Cell: ({ cell: { value: origin } }: CellProps<Data, Data['origin']>) => {
    return (
      <OriginLink
        origin = {origin}
        css = {css`
          width: 100%;
        `}
      />
    )
  }
}, {
  accessor: 'interval' as const,
  Header: <Centered>时间戳</Centered>,
  disableSortBy: true,
  Cell: ({ cell: { value: interval } }: CellProps<Data, Data['interval']>) => {
    const [l, r] = interval

    if (!l.length && !r.length) {
      return <Centered>N/A</Centered>
    }

    return (
      <Fragment>
        <Centered>{roundTime(l)}</Centered>
        <Centered>{roundTime(r)}</Centered>
      </Fragment>
    )
  }
}, {
  accessor: 'tags' as const,
  Header: '标签',
  disableSortBy: true,
  Cell: ({ cell: { value: tags } }: CellProps<Data, Data['tags']>) => {
    return tags.join('，')
  }
}, {
  accessor: 'download' as const,
  Header: <Centered>下载</Centered>,
  disableSortBy: true,
  Cell: ({ cell: { value: url } }: CellProps<Data, Data['download']>) => {
    return (
      <IconButton
        component = 'a' href = {url} target = '_blank' rel = 'noopener'
        color = 'secondary'
      >
        <Download />
      </IconButton>
    )
  }
}]

const TheTable = () : JSX.Element => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  }, useSortBy)

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(it => {
              const column = it as EnhancedHeaderGroup
              return (
                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} >
                  {column.render('Header')}
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableHead>

      <TableBody>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export const ArchivePage = () : JSX.Element => {
  const theme = useTheme()

  const small = useMediaQuery(theme.breakpoints.down('xs'))
  if (small) {
    return (
      <Paper
        css = {css`
          padding: ${theme.spacing(3)}px;
          display: flex;
          align-items: center;
        `}
      >
        <Alert css = {css`
          color: ${theme.palette.warning.main};
          margin-right: ${theme.spacing(2)}px;
        `}/>

        <span>本页含有大量数据，请您于横屏模式或宽屏设备下访问.</span>
      </Paper>
    )
  }

  return (
    <Paper>
      <TheTable />
    </Paper>
  )
}
