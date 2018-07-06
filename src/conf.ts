/**
 * 读取配置单个文件
 */
import fs from 'fs';
import debug from 'debug';
import json5 from 'json5';
import mkdirp from 'mkdirp';
import path from 'path';
import _ from 'lodash';
const _d = debug('@tslib/argv:' + path.basename(__filename));

export interface IConfig {
  _load(): void;
  _save(): void;
}

/**
 * 加载配置文件
 * @param fileName 配置文件名
 * @param configDefine 配置定义对象
 */
function loadConfigFile(fileName: string, configDefine: any): any {
  let configObject: any = {};

  function _saveConfig() {
    // 首先确认目标目录存在
    const dirName = path.dirname(fileName);
    if (!fs.existsSync(dirName)) {
      mkdirp.sync(dirName);
    }
    // 保存配置文件
    fs.writeFile(fileName, JSON.stringify(configObject), err => {
      if (err) {
        _d('write config File Error:', fileName, err.message);
      } else {
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
        const json = json5.parse(fs.readFileSync(fileName, 'utf8'));
        if (json) {
          // 合并缺省配置到配置文件
          _.defaultsDeep(json, configDefine);
          // 注入配置到配置对象
          _.assign(configObject, json);
        }
      } catch (e) {
        _d('config file open fail:', fileName, e.message);
        // 加载异常，自动合并缺省配置
        _.defaultsDeep(configObject, configDefine);
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
export function conf<T>(fileName: string, configDefine: T): T & IConfig {
  // 从配置文件中加载配置
  return loadConfigFile(fileName, configDefine);
}
