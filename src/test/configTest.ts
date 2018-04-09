import path from 'path';
import conf from '../conf'

// 获取配置文件的绝对路径
export default conf(path.resolve('./test.json5'), {
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

