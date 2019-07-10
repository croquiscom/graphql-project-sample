import { GraphQLResolveInfo } from 'graphql';
import { Args, Info, Query, Resolver } from 'type-graphql';
import { User, UserList } from '../../models';
import { UserListQueryArgs, UserQueryArgs } from './types';

export * from './UserList';

@Resolver(() => User)
export class UserQueryResolver {
  @Query(() => User, {
    description: `Gets a user that matches all given conditions.
If there is no such user, returns null.
If there is no condition, returns null.`,
    nullable: true,
  })
  async user(@Args() args: UserQueryArgs, @Info() info: GraphQLResolveInfo) {
    if (!args.id) {
      return null;
    }
    const columns = User.buildSelectColumns(info);
    const query = User.query().one();
    if (args.id) {
      query.where({ id: args.id });
    }
    return await query.select(columns);
  }

  @Query(() => UserList, {
    description: `Gets user list that match all given conditions.
If there is no condition, returns all.`,
  })
  async user_list(@Args() args: UserListQueryArgs) {
    return { __args: args };
  }
}
