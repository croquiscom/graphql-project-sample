import 'reflect-metadata';

import { UserMutationResolver } from './User.mutation';
import { UserQueryResolver } from './User.query';

export const resolvers = [
  UserMutationResolver,
  UserQueryResolver,
];
