import util from 'util';
import { connection_user } from '../app/models';

util.inspect.defaultOptions.depth = 5;
util.inspect.defaultOptions.breakLength = 120;
connection_user.setLogger('color-console');
