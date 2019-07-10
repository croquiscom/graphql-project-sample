import { GraphQLResolveInfo } from 'graphql';
import { Arg, Mutation, Resolver } from 'type-graphql';

import { User } from '../../models';
import { createUser, CreateUserInput } from './createUser';

@Resolver()
export class UserMutationResolver {
  @Mutation(() => User, { description: 'Create a user' })
  async createUser(@Arg('input') input: CreateUserInput) {
    return await createUser(input);
  }
}
