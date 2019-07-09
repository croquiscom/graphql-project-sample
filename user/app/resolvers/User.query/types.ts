import { ArgsType, Field, ID, Int } from 'type-graphql';

@ArgsType()
export class UserQueryArgs {
  @Field(() => ID, { nullable: true, description: 'A user that has the given primary key' })
  id?: string;
}

@ArgsType()
export class UserListQueryArgs {
  @Field(() => Int, { nullable: true, description: 'limit list count (default: 10, max: 50)' })
  limit_count?: number;

  @Field(() => Int, { nullable: true, description: 'skip records' })
  skip_count?: number;
}
