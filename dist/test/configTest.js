"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
// import conf from '../src/conf'
const conf = __importStar(require("../src/conf"));
const CONFIG_FILE = path_1.default.resolve(__dirname, 'test.json5');
// 获取配置文件的绝对路径
exports.default = conf.default(CONFIG_FILE, {
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
    },
    objTest: {}
});
//# sourceMappingURL=configTest.js.map