import { createApp } from '@croquiscom/crary-express';
import { Config } from '../config';
import { apollo_server } from './graphql';

export const app = createApp({
  project_name: Config.project,
  project_root: Config.project_root,
  routers: {},
  log4js_config: Config.log4js_config,
});

app.get('/', (req, res) => {
  req.skip_logging = true;
  res.send('In service');
});

apollo_server.applyMiddleware({ app });
