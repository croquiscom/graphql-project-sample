import { getFieldList } from '@croquiscom/crary-graphql';
import * as cormo from 'cormo';
import { GraphQLResolveInfo } from 'graphql';
import { Field, ID, ObjectType } from 'type-graphql';
import { connection_user } from './connection_user';

@cormo.Model({ connection: connection_user })
@ObjectType({ description: 'User' })
export class User extends cormo.BaseModel {
  @Field((type) => ID, { description: 'Primary key' })
  id: number;

  @cormo.Column({ type: String, required: true })
  @Field({ description: `user's full name` })
  full_name: string;

  static buildSelectColumns(info: GraphQLResolveInfo, fieldName?: string) {
    const fields = getFieldList(info, fieldName);
    fields.push('id');
    return fields as UserColumn[];
  }
}

type UserColumn = keyof cormo.ModelValueObjectWithId<User>;
