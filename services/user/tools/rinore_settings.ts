import repl from 'repl';
import util from 'util';
import { checkSchemas } from '../app/models';

repl.writer.options.depth = 5;
repl.writer.options.breakLength = 120;
util.inspect.defaultOptions.depth = 5;
util.inspect.defaultOptions.breakLength = 120;

(async () => {
  try {
    await checkSchemas();
  } catch (error) {
    console.log('\n' + error.message);
    process.exit(1);
  }
})();
