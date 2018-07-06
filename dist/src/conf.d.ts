export interface IConfig {
    _load(): void;
    _save(): void;
}
/**
 * 导出配置文件加载函数
 */
export declare function conf<T>(fileName: string, configDefine: T): T & IConfig;
