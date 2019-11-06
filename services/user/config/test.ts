import { BaseConfigType } from './default';

const Config: BaseConfigType = {
  log4js_config: {
    categories: {
      default: {
        appenders: ['file'],
      },
    },
  },

  database_user: {
    database: 'test_user',
    pool_size: 3,
    logger: 'empty',
  },
};

export default Config;
