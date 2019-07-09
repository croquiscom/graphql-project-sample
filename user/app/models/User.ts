import * as cormo from 'cormo';
import { connection_user } from './connection_user';

@cormo.Model({ connection: connection_user })
export class User extends cormo.BaseModel {
  id: number;

  @cormo.Column({ type: String, required: true })
  full_name: string;
}
