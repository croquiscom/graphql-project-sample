import { GraphQLResolveInfo } from 'graphql';
import { FieldResolver, Info, Resolver, Root } from 'type-graphql';
import { User, UserList } from '../../models';
import { UserListQueryArgs } from './types';

@Resolver(() => UserList)
export class UserListResolver {
  @FieldResolver()
  async item_list(@Root('__args') args: UserListQueryArgs, @Info() info: GraphQLResolveInfo) {
    const columns = User.buildSelectColumns(info);
    const query = User.query();
    query.limit(Math.min(args.limit_count || 10, 50));
    if (args.skip_count) {
      query.skip(args.skip_count);
    }
    return await query.select(columns);
  }
}
