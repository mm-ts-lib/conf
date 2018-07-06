"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 读取配置单个文件
 */
const fs_1 = __importDefault(require("fs"));
const debug_1 = __importDefault(require("debug"));
const json5_1 = __importDefault(require("json5"));
const mkdirp_1 = __importDefault(require("mkdirp"));
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const _d = debug_1.default('@tslib/argv:' + path_1.default.basename(__filename));
/**
 * 加载配置文件
 * @param fileName 配置文件名
 * @param configDefine 配置定义对象
 */
function loadConfigFile(fileName, configDefine) {
    let configObject = {};
    function _saveConfig() {
        // 首先确认目标目录存在
        const dirName = path_1.default.dirname(fileName);
        if (!fs_1.default.existsSync(dirName)) {
            mkdirp_1.default.sync(dirName);
        }
        // 保存配置文件
        fs_1.default.writeFile(fileName, JSON.stringify(configObject), err => {
            if (err) {
                _d('write config File Error:', fileName, err.message);
            }
            else {
                _d('writeconfig File successed:', fileName);
            }
        });
    }
    // 定义保存函数
    // 定义保存函数
    Object.defineProperty(configObject, '_save', {
        enumerable: false,
        writable: false,
        configurable: false,
        value: _saveConfig,
    });
    Object.defineProperty(configObject, '_load', {
        enumerable: false,
        writable: false,
        configurable: false,
        value: () => {
            try {
                _d('load config file :', fileName);
                const json = json5_1.default.parse(fs_1.default.readFileSync(fileName, 'utf8'));
                if (json) {
                    // 合并缺省配置到配置文件
                    lodash_1.default.defaultsDeep(json, configDefine);
                    // 注入配置到配置对象
                    lodash_1.default.assign(configObject, json);
                }
            }
            catch (e) {
                _d('config file open fail:', fileName, e.message);
                // 加载异常，自动合并缺省配置
                lodash_1.default.defaultsDeep(configObject, configDefine);
            }
            // 加载完成后保存配置文件
            _saveConfig();
        },
    });
    // 加载配置
    configObject._load();
    return configObject;
}
/**
 * 导出配置文件加载函数
 */
function conf(fileName, configDefine) {
    // 从配置文件中加载配置
    return loadConfigFile(fileName, configDefine);
}
exports.conf = conf;
//# sourceMappingURL=conf.js.map