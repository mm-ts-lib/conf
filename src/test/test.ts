import configTest from './configTest';
import debug from 'debug';
import path from 'path';
const d = debug(path.basename(__filename));

d(configTest.server.port);

