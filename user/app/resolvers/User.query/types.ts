import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class UserQueryArgs {
  @Field(() => ID, { nullable: true, description: 'A user that has the given primary key' })
  id?: string;
}
