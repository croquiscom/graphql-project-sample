import { Field, ID, InputType, ObjectType } from 'type-graphql';

import { User } from '../../models';

@InputType({ description: 'Input for createUser' })
export class CreateUserInput {
  @Field({ description: `user's full name` })
  full_name: string;
}

export async function createUser(input: CreateUserInput) {
  const user = await User.create(input);
  return user;
}
