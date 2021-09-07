var treeObj = {
    TITLE: 'BOM(浏览器对象模型)',
    DESC: '根节点及基类均为Window对象，Window对象的创建依赖于<body>或<frameset>标签的出现',
    ATTRIBUTE: {
        window: {
            TITLE: '窗口对象',
            DESC: '表示一个浏览器窗口或一个框架，window为Winddow对象引用，同时window指向Window对象', 
            TYPE: '', // 默认standard[non-standard(非标准) abandonment(弃用)]       
            ATTRIBUTE: {
                event: {
                    TITLE: '事件对象',
                    LINK: [{title:'Event对象', href:''}, {title:'键盘按钮keyCode表', href:''}],
                    SCENE: [{title:'监听键盘事件', href:'', id:''}] 
                },
                document: {
                    TITLE: 'DOM(文档对象模型)',
                    DESC: '窗口里的页面', 
                    ATTRIBUTE: {
                        title: "EWAN博客-CSDN博客",
                        cookie: "data1=1; data2=2; data3=3;",
                        charset: "UTF-8",
                        referrer: "http://www.baidu.com/link?url=73Jk",
                        element: {
                            METHODS: {
                                querySelector: {
                                    PARAMETERS: 'CSSSelectors',
                                    RETURNS: 'Element',
                                    LINK: [{title:'深度优先和先序遍历', href:''}]
                                }
                            },
                            LINK: [{title:'Element对象', href:''}],
                            WARN: []
                        },
                        location: {
                            ATTRIBUTE: {
                                host:     "localhost:9527",
                                origin:   "http://localhost:9527",
                                href:     "http://localhost:9527/main#/minioninfo/minion?v=1",
                                protocol: "http:",
                                hostname: "localhost", 
                                port:     9527,
                                pathname: "/main",
                                hash:     "#/minioninfo/minion",
                                search:   "?v=1▸parseSearch◂"
                            },
                            LINK: [{title:'window.location与document.location的区别', href:''}],
                            HARD: [{title: 'window.location', href: ''}]
                        }
                    },
                    METHODS: {},
                    LINK: [{title:'Document对象', href:''}, {title:'DOM规', href:''}],
                    SCENE: [{title:'浏览器静默与激活', href:'', id:''}]
                },
                location: {
                    TITLE: '当前网页文档的URL信息',
                    DESC: '描述文档位置息息', 
                    ATTRIBUTE: {
                        host:     "localhost:9527",
                        origin:   "http://localhost:9527",
                        href:     "http://localhost:9527/main#/minioninfo/minion?v=1",
                        protocol: "http:",
                        hostname: "localhost", 
                        port:     "9527",
                        pathname: "/main",
                        hash:     "#/minioninfo/minion",
                        search:   "?v=1▸parseSearch◂"
                    },
                    METHODS: {
                        reload: {},
                        replace: {PARAMETERS: 'url', DESC:'替换当前url 不产生历史记录'}
                    },
                    LINK: [{title:'window.location与document.location的区别', href:''}],
                    LINK_IN: ['url','encode'],
                    WARN: [{title: 'document.location', href: ''}],
                    SCENE: [],
                    PINCH_CHILDREN: false
                },
                history: {
                    TITLE: '浏览器窗口访问过的URL信息',
                    DESC: '描述访问者信息'
                },
                screen: {
                    TITLE: '客户端屏幕信息',
                    DESC: '描述访问者信息'
                },
                navigator: {
                    TITLE: '客户端浏览器信息',
                    DESC: '描述访问者信息'
                }
            },
            METHODS: {
                
            },
            LINK: [{title:'BOM规范', href:''}],
            SCENE: [{title:'浏览器静默与激活', href:'', id:''}]
        }
    },
    PINCH_ALL: false
}

const  InternalLinks = {
    url: {
        title: '完整URL构成',
        content: `URL-统一资源定位符(Uniform Resource Locator) 
        完整的URL由这几个部分构成： 
        scheme://host:port/path?query#fragment 
        scheme:通信协议 
        常用的http,ftp,maito等 
        host:主机 
        服务器(计算机)域名系统 (DNS) 主机名或 IP 地址。 
        port:端口号 
        整数，可选，省略时使用方案的默认端口，如http的默认端口为80。 
        path:路径 
        由零或多个"/"符号隔开的字符串，一般用来表示主机上的一个目录或文件地址。 
        query:查询 
        可选，用于给动态网页（如使用CGI、ISAPI、PHP/JSP/ASP/ASP.NET等技术制作的网页）传递参数，可有多个参数，用"&"符号隔开，每个参数的名和值用"="符号隔开。 
        fragment:信息片断 
        字符串，用于指定网络资源中的片断。例如一个网页中有多个名词解释，可使用fragment直接定位到某一名词解释。(也称为锚点.) `
    },    
    encode: {
        title: '编码&解码',
        content: `
        var uri="http://w3cschool.cc/my test.php?name=ståle&car=saab"
        document.write(encodeURIComponent(uri))  // http%3A%2F%2Fw3cschool.cc%2Fmy%20test.php%3Fname%3Dst%C3%A5le%26car%3Dsaab        
        encodeURI/decodeURI 不能编码和解码URI特殊字符（如#，/，￥等）
        <table>
            <tr style="background:#eee"><td>编码</td><td>目标字符</td><td>结果字符</td> <td rowspan="3">></td> <td>解码</td><td>目标字符</td><td>结果字符</td></tr>
            <tr><td><strong>encodeURIComponent</strong>('#')</td><td>'#'</td><td>"%23"</td> <td><strong>decodeURIComponent</strong>('%23')</td><td>'%23'</td><td>"#"</td></tr>
            <tr><td><strong>encodeURI('#')</strong></td><td>'#'</td><td>"#"</td> <td><strong>decodeURI</strong>('%23')</td><td>'%23'</td><td>"%23"</td></tr>
        </table>`
    },
    parseSearch: {
        title: '解析URL参数'
    }
}
