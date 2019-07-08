import { createApp } from '@croquiscom/crary-express';
import http from 'http';
import { Config } from '../config';
import { apollo_server } from './graphql';

const app = createApp({
  project_root: Config.project_root,
  routers: {},
  log4js_config: Config.log4js_config,
});

apollo_server.applyMiddleware({ app });

const server = http.createServer(app);

server.listen(Config.port, () => {
  const worker_num = process.env.NODE_APP_INSTANCE || 0;
  console.log(`[${new Date().toISOString()}] [${Config.project}.services #${worker_num}] Started at http://localhost:${Config.port}/graphql`);
});
