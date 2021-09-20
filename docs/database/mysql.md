---
pageClass: theme-item
---
<div class="extend-header">
    <div class="info">
        <div class="record">
            <a class="back" href="./">上一级</a>
            <a class="back" href="./">返回</a>
        </div>        
        <div class="mini">
            <span>N 2021.09.20 12:29</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>MySQL</h1><strong>MySQL</strong>
</div>
<div class="static-content">



```sql
CREATE SCHEMA `node-blog`;

CREATE TABLE `node-blog`.`admin_users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `name` VARCHAR(30),
  `mobile` VARCHAR(20),
  `remark` VARCHAR(300),
  `avatar` VARCHAR(100),
  `createtime` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `node-blog`.`admin_roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  `slug` VARCHAR(100),
  `description` VARCHAR(100),
  `createtime` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`));
```



```
开发接口
----------------------------------------------------------------------------------
描述             接口              方法    url参数          备注
----------------------------------------------------------------------------------
获取博客列表      /api/blog/list    get    author/keyword  参数为空的话，则不进行查询过滤
获取一篇博客的内容 /api/blog/detail  get    id
新增一篇博客      /api/blog/new     post                    post中有新增的信息
更新一篇博客      /api/blog/update  post   id               postData中有更新的内容
删除一篇博客      /api/blog/del     post   id
登录             /api/user/login   post                    postData中有用户名和密码
----------------------------------------------------------------------------------


MySQL
下载 安装 记住密码  安装完成后在系统偏好设置中即可看到mysql应用
https://dev.mysql.com/downloads/mysql/  
工具 
https://dev.mysql.com/downloads/workbench/  当使用workbench连接数据库时报错 参考：坑1
nodemon   监测开发文件变化，自动重启node
cross-env  设置环境变量，兼容mac/linux/windows
```

### 创建数据库

```CREATE SCHEMA `node-blog`;``` 执行 ```show databases;``` 查询是否建成功

### 建表
```sql
CREATE TABLE `node-blog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `realname` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `node-blog`.`blogs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createtime` BIGINT(20) NOT NULL,
  `author` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));
```

### 增删改查
```
use `node-blog`;
insert into blogs(title, content, createtime, author) values('标题', '内容', '1546610491112', 'ewan');
select * from blogs where author='ewan' order by createtime desc
insert into users(username, `password`, realname) values('ewan', '123456', '张三');
select * from users;
select id, username from users;
select * from users where username='ewan' and `password`='123456' order by id desc;
select * from users where username like '%zhang%';
update users set realname='张三' where username='zhangsan'  如果报错可：SET SQL_SAFE_UPDATES=0;
delete from users where username='zhangsan'
update users set state='0'  软删除



NODEJS连接MySQL
$ npm i mysql



API连接MySQL


登录
核心：登录校验&登录信息存储
cookie 缺点：会暴露username,很危险
    C:POST username password
    S:登录res.setHeader('Set-Cookie', `username=${req.body.username}; path=/; httpOnly; expires=${getCoolieExpires()}`) 
    // httpOnly限制前端不能通过document.cookie = 'username=其它'来修改cookie
    S:验证req.cookie={} req.headers.cookie字符串处理 if(req.cookie.username) 已经登录

session 缺点：js变量，放在nodejs进程内存中
1，进程内存有限，访问量过大，内存暴增怎么办
2，正式线上运行是多线程，进程之间内存无法共享
session写入redis
Stack/Heap
    $ brew install redis
    $ redis-server
    $ redis-cli
开发登录功能，和前端同域联调（用到nginx反向代理）
nginx
    高性能的web服务器
    一般用于做静态服务，负载均衡
    还有反向代理

    $ brew install nginx
    配置：W: C:\nginx\conf\nginx.conf   M:/usr/local/etc/nginx/nginx.conf
    worker_processes 2;
    location / {
        proxy_pass http://localhost:8001;
    }
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
    }

    测试配置文件格式是否正确：nginx -t
    启动：nginx      重启：nginx -s reload  停止：nginx -s stop

nodejs文件操作，nodejs stream
    读／写／叛断存在
    文件IO操作的性能瓶颈
日志

拆分和分析


安全
sql注入：预防 sql.escape(输入的字符)，对输入特殊字符进行转义
    select username, realname from users where username='zhangsan' and password='123'
    zhangsan 输入为zhangsan' -- 时，password条件会被注释
    zhangsan 输入为zhangsan';delete from users; -- 时，password条件会被注释,还多出了一条删除语句
xss攻击：预防 对< > & " ' /进行转义
    输入 <script>alert(document.cookie)</script>
密码加密
        const crypto = require('crypto)
        // 密钥
        const SECRET_KEY = 'eeeaEF98#'
        // MD5加密
        function md5(content){
            let md5 = crypto.createHash('md5)
            return md5.update(content).digest('hex')
        }
        // 加密函数
        function genPassword(password){
            const str = `password=${password}&key=${SECRET_KEY}`
            return md5(str)
        }


坑1：当使用workbench连接数据库时报错
/usr/local/mysql-8.0.21-macos10.15-x86_64/bin/mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;   #修改加密规则 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';   #更新一下用户的密码
FLUSH PRIVILEGES;   #刷新权限 

const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    port: '3306',
    database: 'node-blog'
})

// 开始连接
con.connect()

// 执行sql语句
const sql = 'select * from users;'
con.query(sql, (err, result) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(result)
})

// 关闭连接
con.end()

```

</div>