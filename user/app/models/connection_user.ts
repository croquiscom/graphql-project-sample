import * as cormo from 'cormo';
import { Config } from '../../config';

export const connection_user = new cormo.MySQLConnection(Config.database_user);
