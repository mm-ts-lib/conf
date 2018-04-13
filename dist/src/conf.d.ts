export declare type _ToJson_T = {
    toJson: () => string;
};
/**
 * 导出配置文件加载函数
 */
export default function <T>(fileName: string, configDefine: T): T & _ToJson_T;
