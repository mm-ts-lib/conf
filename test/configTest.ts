import path from 'path';
// import conf from '../src/conf'
import { conf, IConfig } from '../src/conf';
const CONFIG_FILE = path.resolve(__dirname, 'test.json5');

// 获取配置文件的绝对路径
export default conf(CONFIG_FILE, {
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

