export interface IConfigExtend {
    _toJson(): string;
    _reload(): void;
}
/**
 * 导出配置文件加载函数
 */
export default function <T>(fileName: string, configDefine: T): T & IConfigExtend;
