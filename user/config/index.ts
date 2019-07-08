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
};
