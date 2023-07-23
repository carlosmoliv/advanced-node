import { type ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'silly.db.elephantsql.com',
  port: 5432,
  username: 'qoerpwqk',
  password: 'macgYi3u2RnWRTVLr4RpD7soNfcD_XWT',
  database: 'qoerpwqk',
  entities: ['dist/infra/postgres/entities/index.js']
}
