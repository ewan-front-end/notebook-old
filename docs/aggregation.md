## Vuepress攻略
> 创建 docs 目录<br>
> 复制 .usage 到 docs/<br>
> 基础部署 node docs/.usage/deploy.js<br>
> 地图创建 node docs/.usage/create.js<br>
> npm run docs:dev<br>

## Docsify攻略
> $ sudo npm i docsify-cli -g<br>
> demo> docsify init ./docs<br>
> demo> docsify serve docs<br>

## NPM攻略
- rvm
> 源于node版本改变的匹配
## Nginx攻略
- windows
> 安装: http://nginx.org/en/download.html<br>
> 配置: c:\nginx\conf\nginx.conf<br>
> 启动: c:\server\nginx-1.0.2 > start nginx 或 c:\server\nginx-1.0.2 > nginx.exe<br>
> 重启: c:\server\nginx-1.0.2 > nginx.exe -s reload  <br>
> 停止: c:\server\nginx-1.0.2 > nginx.exe -s stop 或 c:\server\nginx-1.0.2 > nginx.exe -s quit<br>
- mac
> 依赖ruby: ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 【卡住】<br>
> 安装: brew install nginx<br>
> 配置: /usr/local/etc/nginx/nginx.conf<br>
> 启动: nginx  重启: nginx -s reload  停止: nginx -s stop<br>

## Node攻略
- rvm
> nvm list 显示已安装的列表<br>
> nvm list available 显示可安装的所有版本<br>
> nvm install 12.18.2 安装特定版本<br>
> nvm use 12.18.2 使用指定版本<br>

