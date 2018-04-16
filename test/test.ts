import configTest from './configTest';
import path from 'path';

console.log(configTest._toJson());
configTest.server.port++;
configTest.objTest = { ppp: configTest.server.port };
console.log(configTest._toJson());
setTimeout(() => {
    // configTest._reload()
    console.log('--- END,', configTest._toJson());
}, 60000);

