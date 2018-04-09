"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const conf_1 = __importDefault(require("../conf"));
// 获取配置文件的绝对路径
const configFile = {
    upgrade: {
        localGithubRepos: '/Users/zhufeng/frame3Git/github_frame3_packages',
        src: 'github',
        server: {
            host: 'abc',
            port: 3000,
            user: {
                name: 'zf',
                pwd: '123456'
            }
        }
    },
    server: {
        port: 3000,
    },
    test: {
        testKey: '778782386'
    }
};
exports.default = conf_1.default(path_1.default.resolve('./test.json5'), configFile);
//# sourceMappingURL=configTest.js.map