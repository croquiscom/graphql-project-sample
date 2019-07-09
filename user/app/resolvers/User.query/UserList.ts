import { GraphQLResolveInfo } from 'graphql';
import { FieldResolver, Info, Int, Resolver, Root } from 'type-graphql';
import { User, UserList } from '../../models';
import { UserListQueryArgs } from './types';

function buildListCommonQuery(args: UserListQueryArgs) {
  const query = User.query();
  if (args.full_name_istartswith) {
    query.where({ full_name: { $startswith: args.full_name_istartswith } });
  }
  return query;
}

@Resolver(() => UserList)
export class UserListResolver {
  @FieldResolver((type) => Int, { description: 'count of records that match given conditions' })
  async total_count(@Root('__args') args: UserListQueryArgs) {
    const query = buildListCommonQuery(args);
    return await query.count();
  }

  @FieldResolver()
  async item_list(@Root('__args') args: UserListQueryArgs, @Info() info: GraphQLResolveInfo) {
    const columns = User.buildSelectColumns(info);
    const query = buildListCommonQuery(args);
    query.limit(Math.min(args.limit_count || 10, 50));
    if (args.skip_count) {
      query.skip(args.skip_count);
    }
    return await query.select(columns);
  }
}
