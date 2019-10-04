import fs from 'fs';
import { getSchemaString } from '../app/graphql';
import { Config } from '../config';

const { project } = Config;
fs.writeFileSync(`../../interfaces/${project}.graphql`, getSchemaString());
process.exit(0);
