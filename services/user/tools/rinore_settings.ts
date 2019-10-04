import repl from 'repl';
import util from 'util';
import { connection_user } from '../app/models';

repl.writer.options.depth = 5;
repl.writer.options.breakLength = 120;
util.inspect.defaultOptions.depth = 5;
util.inspect.defaultOptions.breakLength = 120;
connection_user.setLogger('color-console');
