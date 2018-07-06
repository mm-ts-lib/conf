import configTest from './configTest';
import path from 'path';

console.log(configTest);
configTest.server.port++;
configTest.objTest = { ppp: configTest.server.port };
console.log(configTest);
setTimeout(() => {
    // configTest._reload()
    configTest.server.port++;
    console.log('--- END,', configTest);
    configTest._save();
}, 5000);

