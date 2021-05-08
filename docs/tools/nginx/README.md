nginx
下载：https://nginx.org/en/download.html
解压后无需安装
cd c:\nginx-1.15.2
检查配置文件是否正确：nginx -t -c /nginx-1.15.2/conf/nginx.conf
启动：start nginx
重启：nginx -s reload

location / {
            root   html; # 可以指定任意目录，如：d:/web/ios
            index  index.html index.htm;
        }