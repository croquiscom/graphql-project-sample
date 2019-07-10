import { createApp } from '@croquiscom/crary-express';
import { Config } from '../config';
import { apollo_server } from './graphql';

export const app = createApp({
  project_root: Config.project_root,
  routers: {},
  log4js_config: Config.log4js_config,
});

apollo_server.applyMiddleware({ app });
