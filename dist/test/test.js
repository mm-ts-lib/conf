"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configTest_1 = __importDefault(require("./configTest"));
console.log(configTest_1.default._toJson());
configTest_1.default.server.port++;
configTest_1.default.objTest = { ppp: configTest_1.default.server.port };
console.log(configTest_1.default._toJson());
setTimeout(() => {
    // configTest._reload()
    console.log('--- END,', configTest_1.default._toJson());
}, 60000);
//# sourceMappingURL=test.js.map