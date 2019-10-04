import 'reflect-metadata';

import * as cormo from 'cormo';

const is_in_console = process.env.IN_CONSOLE === 'true';

cormo.BaseModel.lean_query = true;

import { connection_user } from './connection_user';
export { connection_user };

export * from './User';

export async function checkSchemas() {
  if (await connection_user.isApplyingSchemasNecessary()) {
    throw new Error(`need to migrate: run 'npm run migrate'`);
  }
}

export async function applySchemas(verbose = false) {
  await connection_user.applySchemas({ verbose: is_in_console || verbose });
}

if (is_in_console) {
  (async () => {
    try {
      await checkSchemas();
    } catch (error) {
      console.log('\n' + error.message);
      process.exit(1);
    }
  })();
}
