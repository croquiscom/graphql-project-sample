import _ from 'lodash';
import BaseConfig from './default';

const Config = _.cloneDeep(BaseConfig);

if (process.env.NODE_ENV) {
  try {
    const EnvConfig = require(`./${process.env.NODE_ENV}`).default;
    if (Array.isArray(EnvConfig)) {
      _.merge(Config, ...EnvConfig);
    } else {
      _.merge(Config, EnvConfig);
    }
  } catch (e) {
    console.log(`Cannot find configs for env=${process.env.NODE_ENV}`);
  }
}

export { Config };
