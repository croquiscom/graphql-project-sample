import http from 'http';
import { Config } from '../config';
import { app } from './app';
import { checkSchemas } from './models';

const { project } = Config;

async function startServer() {
  const server = http.createServer(app);

  const port = Config.port;
  server.listen(port, () => {
    const worker_num = process.env.NODE_APP_INSTANCE || 0;
    console.log(`[${new Date().toISOString()}] [${project}.services #${worker_num}] Started at http://localhost:${port}/graphql`);
  });
}

(async () => {
  try {
    await checkSchemas();
    await startServer();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})();
