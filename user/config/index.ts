import path from 'path';

export const Config = {
  project: 'user',
  project_root: path.resolve(__dirname, '..'),
  port: 6400,

  log4js_config: {
    appenders: {
      console: { type: 'console' },
      basic_console: { type: 'console', layout: { type: 'basic' } },
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
  },
};
