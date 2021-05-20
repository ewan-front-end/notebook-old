## NPM内网源搭建
http://127.0.0.1:7001/ 源
http://127.0.0.1:7002/ web

1CNPMJS
下载：git clone git://github.com/cnpm/cnpmjs.org.git 或 https://github.com/cnpm/cnpmjs.org/ 下载zip
安装：cd cnpmjs.org && npm install 或 npm install --registry=http://registry.npm.taobao.org
配置：cnpmjs.org/config/index.js 参考#CNPMCONFIG

2MySQL
创建数据库:cnpmjs_test
创建表:将cnpmjs.org/doc/db.sql中的内容复制出来在mysql中执行一遍即可
3$ cd /Users/wanyuaning/Project/cnpmjs.org
$ node dispatch.js // 启动成功后，即可看到内网源的web页面了，后台自动开始同步官方模块

4内网源的使用
1 安装cnpm客户端: npm i cnpm -g
2 设置cnpm源为内网源: cnpm config set registry="http://127.0.0.1:7001"
3 cnpm install 模块名称 // 支持所有npm命令

模块发布
1 创建用户:cnpm adduser
2 登录:cnpm login
3 cd 模块目录 // 注意模块名称必须带前缀，如@xxx/name，与config中的scopes配置对应
4 cnpm publish




#CNPMCONFIG
```js
'use strict';
var mkdirp = require('mkdirp');
var copy = require('copy-to');
var path = require('path');
var fs = require('fs');
var os = require('os');
var utility = require('utility');
var version = require('../package.json').version;
var root = path.dirname(__dirname);
var dataDir = path.join(process.env.HOME || root, '.cnpmjs.org');
var config = {
  version: version,
  dataDir: dataDir,
  /**
   * 集群模式
   */
  enableCluster: false, // 开关
  numCPUs: os.cpus().length,
  /**
   * 服务配置
   */
  registryPort: 7001, // 注册端口
  webPort: 7002, // 网页端口
  bindingHost: '127.0.0.1', // #1设置指定外网IP,默认是127.0.0.1
  // default system admins
  // #2注意，添加用户时，请添加该处配置的用户，不然不能发布模块的,
  // 可在命令行添加：$ cnpm adduser
  // name: email
  admins: {     
    fengmk2: 'fengmk2@gmail.com',
    admin: 'wanyuaning@163.com', // #3
    dead_horse: 'dead_horse@qq.com',
  },
  /**
   * 数据库配置
   */
  database: {
    db: 'cnpmjs_test', // 数据库名
    username: 'root', // 用户名
    password: 'wanyuaning', // 密码    
    dialect: 'mysql', // #4数据库类型,目前支持: 'mysql', 'sqlite', 'postgres', 'mariadb'
    host: '127.0.0.1', // 自定义主机和端口，默认: 127.0.0.1:3306
    port: 3306,
    // 使用池，以减少数据库连接过载和提高速度,目前仅适用于mysql和postgresql(从1.5.0版本开始)
    pool: {
      maxConnections: 10,
      minConnections: 0,
      maxIdleTime: 30000 // 最大闲置时长
    },
    // 数据库选项
    dialectOptions: {
      trace: true, // 跟踪,如果服务器在cpu全负载下运行，请将trace设置为false
    },
    storage: path.join(dataDir, 'data.sqlite'), // 存储引擎,默认存储到~/.cnpmjs.org/data.sqlite
    logging: !!process.env.SQL_DEBUG,
  },
  /**
   * 注册模式配置
   * 私有模式:只有管理员可以发布，其他用户只能从npm源同步
   * 公共模式:所有用户都可以发布
   */
  enablePrivate: true, // #5私库开关
  scopes: ['@cnpm', '@cnpmtest', '@cnpm-test'], // #6指定私有包的前缀，避免与官方模块冲突
  // 一些注册中心已经在全局范围内拥有一些私有包,但是我们想把它们当作有作用域的私有包，可以用这个白名单
  privatePackages: [],
  // 如果在调试模式下，像limit这样的中间件将不会加载,日志模块将打印到stdout
  debug: process.env.NODE_ENV === 'development',
  pagemock: process.env.NODE_ENV === 'development', // 开发环境开启页面模式
  sessionSecret: 'cnpmjs.org test session secret', // session secret
  jsonLimit: '10mb', // 请求json最大体积
  logdir: path.join(dataDir, 'logs'), // 日志目录名
  uploadDir: path.join(dataDir, 'downloads'), // 上传目录名
  viewCache: false, // 网页缓存
  viewDir: path.join(root, 'view', 'web'), // 网页文件目录名
  // koa-limit 中间件配置，限制下载速度
  limit: {
    enable: false,
    token: 'koa-limit:download',
    limit: 1000,
    interval: 1000 * 60 * 60 * 24,
    whiteList: [],
    blackList: [],
    message: 'request frequency limited, any question, please contact fengmk2@gmail.com',
  },
  enableCompress: false, // 开启gzip
  // 错误通知电子邮件配置
  // 更多信息请查看 https://github.com/andris9/Nodemailer 
  mail: {
    enable: false,
    appname: 'cnpmjs.org',
    from: 'cnpmjs.org mail sender <adderss@gmail.com>',
    service: 'gmail',
    auth: {
      user: 'address@gmail.com',
      pass: 'your password'
    }
  },
  logoURL: 'https://os.alipayobjects.com/rmsportal/oygxuIUkkrRccUz.jpg', // cnpm logo
  adBanner: '',
  customReadmeFile: '', // 自定义readme文件
  customFooter: '', // you can add copyright and site total script html here
  npmClientName: 'cnpm', // use `${name} install package`
  packagePageContributorSearch: true, // package page contributor link to search, default is true
  maxDependencies: 200, // package.json `dependencies`最大处理数
  backupFilePrefix: '/cnpm/backup/', // 备份
  // package tarball store in local filesystem by default本地文件系统
  nfs: require('fs-cnpm')({
    dir: path.join(dataDir, 'nfs')
  }),
  // if set true, will 302 redirect to `nfs.url(dist.key)`
  downloadRedirectToNFS: false,
  // registry url name
  registryHost: 'r.cnpmjs.org',
  /**
   * 同步配置
   */
  // sync mode select
  // none: do not sync any module, proxy all public modules from sourceNpmRegistry
  // exist: 只同步已有模块
  // all: 全量同步，但资源增长太快需慎重
  syncModel: 'exist', // #7
  // the official npm registry
  // cnpm wont directly sync from this one
  // but sometimes will request it for some package infomations
  // please don't change it if not necessary
  officialNpmRegistry: 'https://registry.npmjs.com',
  officialNpmReplicate: 'https://replicate.npmjs.com',
  // sync source, upstream registry
  // If you want to directly sync from official npm's registry
  // please drop them an email first
  sourceNpmRegistry: 'https://registry.npm.taobao.org',
  sourceNpmWeb: 'https://npm.taobao.org',
  // upstream registry is base on cnpm/cnpmjs.org or not
  // if your upstream is official npm registry, please turn it off
  sourceNpmRegistryIsCNpm: true,
  // if install return 404, try to sync from source registry
  syncByInstall: true,
  syncConcurrency: 1,
  // sync interval, default is 10 minutes
  syncInterval: '10m',
  // sync polular modules, default to false
  // because cnpm can't auto sync tag change for now
  // so we want to sync popular modules to ensure their tags
  syncPopular: false,
  syncPopularInterval: '1h',
  // top 100
  topPopular: 100,
  // sync devDependencies or not, default is false
  syncDevDependencies: false,
  // try to remove all deleted versions from original registry
  syncDeletedVersions: true,
  // changes streaming sync
  syncChangesStream: false,
  syncDownloadOptions: {
    // formatRedirectUrl: function (url, location)
  },
  handleSyncRegistry: 'http://127.0.0.1:7001',
  // default badge subject
  badgeSubject: 'cnpm',
  // defautl use https://badgen.net/
  badgeService: {
    url: function(subject, status, options) {
      options = options || {};
      let url = `https://badgen.net/badge/${utility.encodeURIComponent(subject)}/${utility.encodeURIComponent(status)}`;
      if (options.color) {
        url += `/${utility.encodeURIComponent(options.color)}`;
      }
      if (options.icon) {
        url += `?icon=${utility.encodeURIComponent(options.icon)}`;
      }
      return url;
    },
  },
  packagephobiaURL: 'https://packagephobia.now.sh',
  packagephobiaSupportPrivatePackage: false,
  // 自定义用户服务, @see https://github.com/cnpm/cnpmjs.org/wiki/Use-Your-Own-User-Authorization
  //如果您不打算与公司的用户系统整合，则使用null
  //默认使用cnpm用户系统
  userService: null,
  // 总是身份验证 https://docs.npmjs.com/misc/config#always-auth
  // 强制npm在访问注册表时始终需要身份验证，即使是GET请求。
  alwaysAuth: false,
  // 如果有防火墙，需要通过代理请求
  // e.g.: `httpProxy: 'http://proxy.mycompany.com:8080'`
  httpProxy: null,
  // snyk.io root url
  snykUrl: 'https://snyk.io',
  // https://github.com/cnpm/cnpmjs.org/issues/1149
  // 开启缩写元数据，如开启则必须在数据库中创建module_abbreviated和package_readme表
  enableAbbreviatedMetadata: false,
  // 全局钩子函数: function* (envelope) {}
  // 格式 https://github.com/npm/registry/blob/master/docs/hooks/hooks-payload.md#payload
  globalHook: null,
  opensearch: {
    host: '',
  },
};
if (process.env.NODE_ENV === 'test') {
  config.enableAbbreviatedMetadata = true;
}
if (process.env.NODE_ENV !== 'test') {
  var customConfig;
  if (process.env.NODE_ENV === 'development') {
    customConfig = path.join(root, 'config', 'config.js');
  } else {
    // 1. 首先尝试加载 `$dataDir/config.json` , 否则执行第二点
    // 2. 加载 config/config.js, 会覆盖index.js中的相同键
    customConfig = path.join(dataDir, 'config.json');
    if (!fs.existsSync(customConfig)) {
      customConfig = path.join(root, 'config', 'config.js');
    }
  }
  if (fs.existsSync(customConfig)) {
    copy(require(customConfig)).override(config);
  }
}
mkdirp.sync(config.logdir);
mkdirp.sync(config.uploadDir);
module.exports = config;
config.loadConfig = function(customConfig) {
  if (!customConfig) {
    return;
  }
  copy(customConfig).override(config);
};
```


## NPM包
```js
账户 
u:wanyuaning  p:wanyuan...ew.. e:wanyuaning@163.com
组织：seahan、angg
规范
bin  可执行二进制文件
lib  javascript代码
doc  文档
test  单元测试用例
package.json  包描述
{
    "name": "@angg/express"
    "repository": { "type": "git", "url": "https://github.com/wmgcuan/express.git" },
    "homepage": "https://github.com/wmgcuan/express",
    "bugs": { "url": "https://github.com/wmgcuan/express/issues" }
}

开发

发布 https://segmentfault.com/a/1190000009315989
1 $ npm adduser // 命令向导分别要求填入username/password/email,可通过 npm whoami 查看当前用户
2 $ npm publish --access public // npm publish 默认发布私有，所以会导致失败，如果是二次发布，则需先迭代version

多人发布
npm owner add <user> [<@scope>/]<pkg> # 将用户添加到包的所有者列表,如 npm owner add wanyuaning @angg/express>
npm owner rm <user> [<@scope>/]<pkg> # 从包的所有这列表中删除用户
npm owner ls [<@scope>/]<pkg> # 列出包的所有者
```