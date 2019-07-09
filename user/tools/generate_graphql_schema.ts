import fs from 'fs';
import { getSchemaString } from '../app/graphql';
import { Config } from '../config';

const project = Config.project;
fs.writeFileSync(`../interfaces/${project}.graphql`, getSchemaString());
process.exit(0);
