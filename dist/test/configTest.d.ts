import * as conf from '../src/conf';
declare const _default: {
    upgrade: {
        localGithubRepos: string;
        src: string;
        server: {
            host: string;
            port: number;
            user: {
                name: string;
                pwd: string;
            };
        };
    };
    server: {
        port: number;
    };
    test: {
        testKey: string;
    };
    objTest: {};
} & conf.IConfigExtend;
export default _default;
