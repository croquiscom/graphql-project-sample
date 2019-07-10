import http from 'http';
import { Config } from '../config';
import { app } from './app';

const server = http.createServer(app);

server.listen(Config.port, () => {
  const worker_num = process.env.NODE_APP_INSTANCE || 0;
  console.log(`[${new Date().toISOString()}] [${Config.project}.services #${worker_num}] Started at http://localhost:${Config.port}/graphql`);
});
