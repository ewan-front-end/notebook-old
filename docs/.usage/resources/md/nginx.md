

# nginx.conf

<pre class="hljs nginx"><code><span class="hljs-attribute">location</span> / {  
    <span class="hljs-attribute">add_header</span> Access-Control-Allow-Origin *;
    <span class="hljs-attribute">add_header</span> Access-Control-Allow-Methods <span class="hljs-string">'GET, POST, OPTIONS'</span>;
    <span class="hljs-attribute">add_header</span> Access-Control-Allow-Headers <span class="hljs-string">'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization'</span>;

    <span class="hljs-attribute">if</span> (<span class="hljs-variable">$request_method</span> = <span class="hljs-string">'OPTIONS'</span>) {
        <span class="hljs-attribute">return</span> <span class="hljs-number">204</span>;
    }
} </code></pre>

```O
http {
    server {
        listen 8080;
        server_name localhost;
        # 允许跨域
        [ck|add_header Access-Control-Allow-Origin *;]
        [ck|add_header Access-Control-Allow-Headers DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization;]
        [ck|add_header Access-Control-Allow-Methods GET,POST,OPTIONS;]
        # 负载均衡(反向代理) 把默认location注释掉 
        location [blue b|/] {
            proxy_pass [blue alpha5|http://localhost:8001];
        }
        location [blue b|/api/] {
            proxy_pass [blue alpha5|http://localhost:8000];
            proxy_set_header Host $host;
        }
        # 静态服务
        # 动态服务
        # 负载均衡（反向代理）
        # 缓存服务
        # 对IP限速
        # 限制连接数
        
    }
}

http {
  # 缓存 /temp/proxy_
  # levels参数负责设置缓存目录级别[DETAIL/levels01]
  proxy_cache_path /proxy_cache levels=1:2 keys_zone=cache_dir1:20m use_temp_path=off inactive=30d;
  server {
    listen 9999;
    server_name localhost;
    location / {
        proxy_pass http://bb.n-b-e-t.com;
        index index.html index.htm;
    }
  }
}



▉levels01▉
/proxy_cache    #本地路径，用来设置Nginx缓存资源的存放地址
levels          
key_zone        #在共享内存中设置一块存储区域来存放缓存的key和metadata（类似使用次数），这样nginx可以快速判断一个request是否命中或者未命中缓存，1m可以存储8000个key，10m可以存储80000个key
max_size        #最大cache空间，如果不指定，会使用掉所有disk space，当达到配额后，会删除最少使用的cache文件
inactive        #未被访问文件在缓存中保留时间，本配置中如果60分钟未被访问则不论状态是否为expired，缓存控制程序会删掉文件。inactive默认是10分钟。需要注意的是，inactive和expired配置项的含义是不同的，expired只是缓存过期，但不会被删除，inactive是删除指定时间内未被访问的缓存文件
use_temp_path   #如果为off，则nginx会将缓存文件直接写入指定的cache文件中，而不是使用temp_path存储，official建议为off，避免文件在不同文件系统中不必要的拷贝
proxy_cache     #启用proxy cache，并指定key_zone。另外，如果proxy_cache off表示关闭掉缓存。



levels参数负责设置缓存目录级别。默认所有缓存文件都放在同一个/path/to/cache下，但是会影响缓存的性能，因此通常会在/path/to/cache下面建立子目录用来分别存放不同的文件。
假设levels=1:2，Nginx为将要缓存的资源生成的key为f4cd0fbc769e94925ec5540b6a4136d0，那么key的最后一位0，以及倒数第2-3位6d作为两级的子目录，也就是该资源最终会被缓存到/path/to/cache/0/6d目录中
假设cache主目录为/data/nginx/cache。

#如果没有特殊指明此参数值，则默认是放在cache主目录下：

/data/nginx/cache/d7b6e5978e3f042f52e875005925e51b
 

#当levels=1:2时，表示是两级目录，1和2表示用1位和2位16进制来命名目录名称。在此例中，第一级目录用1位16进制命名，如b；第二级目录用2位16进制命名，如2b。所以此例中一级目录有16个，二级目录有16*16=256个：

/data/nginx/cache/b/2b/d7b6e5978e3f042f52e875005925e51b

总目录数为16*256=4096个。

 

#当levels=1:1:1时，表示是三级目录，且每级目录数均为16个：

/data/nginx/cache/b/c/d/d7b6e5978e3f042f52e87500592

总目录数为16*16*16=4096个。

 

#当levels=2:2:2时，表示是三级目录，且每级目录数均为16*16个：

/data/nginx/cache/2b/3c/4d/d7b6e5978e3f042f52e875005925e51b

总目录数为256*256*256个。

 

#当levels=2时，表示是一级目录，且目录数为16*16=256：

/data/nginx/cache/2b/d7b6e5978e3f042f52e875005925e51b
▉

```