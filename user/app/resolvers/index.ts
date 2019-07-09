import 'reflect-metadata';

import { UserMutationResolver } from './User.mutation';
import { UserListResolver, UserQueryResolver } from './User.query';

export const resolvers = [
  UserMutationResolver,
  UserListResolver,
  UserQueryResolver,
];
