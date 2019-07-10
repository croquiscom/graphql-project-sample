import 'reflect-metadata';

import * as cormo from 'cormo';
import deasync from 'deasync';

cormo.BaseModel.lean_query = true;

import { connection_user } from './connection_user';
export { connection_user };

export * from './User';

try {
  deasync(async (callback: (error?: Error) => void) => {
    try {
      await connection_user.applySchemas({});
      callback();
    } catch (error) {
      callback(error);
    }
  })();
} catch (error) {
  console.log(error);
  while (error.cause) {
    error = error.cause;
  }
  throw error;
}
