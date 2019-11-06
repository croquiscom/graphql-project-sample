import path from 'path';

const Config = {
  project: 'user',
  project_root: path.resolve(__dirname, '..'),
  port: 6400,

  log4js_config: {
    appenders: {
      console: { type: 'console' },
      basic_console: { type: 'console', layout: { type: 'basic' } },
      file: { type: 'file', filename: path.resolve(__dirname, '../_server_test_logs.txt') },
    },
    categories: {
      default: {
        appenders: ['console'], level: 'info',
      },
    },
    disableClustering: true,
  },

  database_user: {
    host: 'localhost',
    port: 6300,
    database: 'user',
    user: 'dbuser',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    pool_size: 3,
    is_default: false,
    query_timeout: 10000,
    logger: 'color-console' as 'color-console' | 'empty',
  },
};

// from https://github.com/krzkaczor/ts-essentials
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
  ? Array<DeepPartial<U>>
  // tslint:disable-next-line:no-shadowed-variable
  : T[P] extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : DeepPartial<T[P]>
};

export type BaseConfigType = DeepPartial<typeof Config>;

export default Config;
