/** 
 * 读取配置单个文件
 */
import fs from 'fs';
import json5 from 'json5';
import debug from 'debug';
import path from 'path';
const d = debug(path.basename(__filename));

/**
 * 加载配置文件
 * @param fileName 配置文件名 
 * @param configDefine 配置定义对象
 */
function loadConfigFile(fileName: string, configDefine: any): any {
  const srcObject = json5.parse(fs.readFileSync(fileName, 'utf8'));
  // 配置对象
  const configObject: any = {};
  configObject.toJson = () => {
    return json5.stringify(configDefine, undefined, 2);
  }
  // 配置延迟保存方法，防止多次保存
  Object.defineProperty(configDefine, '__delaySaveFunc', {
    enumerable: false,
    writable: true,
    value: null
  });
  // 定义保存函数
  Object.defineProperty(configDefine, '__save', {
    enumerable: false,
    value: () => {
      if (configDefine.__delaySaveFunc === null) {
        configDefine.__delaySaveFunc = () => {
          configDefine.__delaySaveFunc = null;
          fs.writeFile(fileName, json5.stringify(configDefine, undefined, 2), (err) => {
            if (err) {
              d(`save config file failed:${fileName}`, err.message);
            } else {
              d(`save config file sucessed:${fileName}`);
            }
          });
        };
        setImmediate(configDefine.__delaySaveFunc);
      }
    }
  });

  /**
   * 递归深度合并配置对象
   * @param valueObj 保存值的对象
   * @param srcObj 读取的源对象
   * @param outObj 输出对象
   * @param rootObj 跟对象
   */
  function _applyDeepObject(valueObj: any, srcObj: any, outObj: any, rootObj: any): void {
    Object.keys(valueObj).forEach((key) => {
      // console.log('---', key, typeof valueObj, typeof srcObj);
      // 定义Obj
      if (typeof valueObj[key] === 'object') {
        // 递归遍历对象
        outObj[key] = {};
        if (typeof srcObj === 'object' && srcObj !== null) {
          _applyDeepObject(valueObj[key], srcObj[key], outObj[key], rootObj);
        } else {
          _applyDeepObject(valueObj[key], undefined, outObj[key], rootObj);
        }
      } else {
        // 定义值对象
        // console.log('-value-', key, valueObj[key]);
        Object.defineProperty(outObj, key, {
          get: () => {
            return valueObj[key];
          },
          set: (newValue) => {
            valueObj[key] = newValue;
            // 延迟保存
            rootObj.__save();
          }
        })

        // 设置为配置文件值
        if (typeof srcObj === 'object' && srcObj !== null
          && typeof srcObj[key] === typeof valueObj[key]) {
          valueObj[key] = srcObj[key];
        }
      }
    });
  }

  _applyDeepObject(configDefine, srcObject, configObject, configDefine);

  // 加载完成保存缺省实际值
  configDefine.__save();
  return configObject;
}

type _ToJson_T = {
  toJson: () => string;
}

/**
 * 导出配置文件加载函数
 */
export default function <T>(fileName: string, configDefine: T): T & _ToJson_T {
  // 从配置文件中加载配置
  return loadConfigFile(fileName, configDefine);
}; 
