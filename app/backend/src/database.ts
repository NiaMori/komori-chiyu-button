import { Pool } from 'pg'

export interface VoicePlaybackRecord {
  voiceID: string,
  clientID: string,
  playTime: Date
}

export type VoicePlaybackStatistics = Record<string, number>

export interface Provider {
  retire: () => Promise<VoicePlaybackStatistics>,
  record: (data: VoicePlaybackRecord) => Promise<void>
}

export const getDatabaseProvider = async () : Promise<Provider> => {
  const pool = new Pool()

  const sql = <R>(strings: TemplateStringsArray) => {
    if (strings.length !== 1) {
      throw new Error('interpolation in sql is not allowed.')
    }

    return (values: unknown[] = []) => pool.query<R>({
      text: strings[0],
      values
    })
  }

  await sql`
    create table if not exists voice_playback_records (
      voice_id varchar(1024),
      client_id varchar(1024),
      play_time timestamp
    );`()

  return {
    retire: async () => {
      const statistics: VoicePlaybackStatistics = {}

      const result = await sql<{ path: string, count: string }>`
        select voice_id as path, count(*)
        from voice_playback_records
        group by voice_id
      `()

      for (const { path, count } of result.rows) {
        statistics[path] = Number(count)
      }

      return statistics
    },

    record: async ({ voiceID, clientID, playTime }) => {
      await sql`
        insert into voice_playback_records (
          voice_id, client_id, play_time
        ) values (
          $1, $2, $3
        )
      `([voiceID, clientID, playTime])
    }
  }
}
