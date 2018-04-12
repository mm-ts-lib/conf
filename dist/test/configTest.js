"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const conf_1 = __importDefault(require("../src/conf"));
const CONFIG_FILE = path_1.default.resolve(__dirname, 'test.json5');
// 获取配置文件的绝对路径
exports.default = conf_1.default(CONFIG_FILE, {
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
});
//# sourceMappingURL=configTest.js.map