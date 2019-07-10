import { connection_user } from '../app/models';

beforeEach(async () => {
  await connection_user.manipulate([
    'deleteAll',
  ]);
});

after(async () => {
  await connection_user.dropAllModels();
});
