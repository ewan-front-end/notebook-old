var treeObj = {
    TITLE: '浏览器对象模型',
    DESC: '根节点及基类均为Window对象，Window对象的创建依赖于<body>或<frameset>标签的出现',
    ATTRIBUTE: {
        window: {
            TITLE: '窗口对象',
            DESC: '表示一个浏览器窗口或一个框架，window为Winddow对象引用，同时window指向Window对象', 
            TYPE: '', // 默认standard[non-standard(非标准) abandonment(弃用)]       
            ATTRIBUTE: {
                event: {
                    TITLE: '事件对象',
                    LINKS: [{title:'Event对象', href:''}, {title:'键盘按钮keyCode表', href:''}],
                    SCENE: [{title:'监听键盘事件', href:'', id:''}] 
                },
                document: {
                    TITLE: '文档对象',
                    DESC: '窗口里的页面', 
                    ATTRIBUTE: {
                        title: "EWAN博客-CSDN博客",
                        cookie: "data1=1; data2=2; data3=3;",
                        charset: "UTF-8",
                        referrer: "http://www.baidu.com/link?url=73Jk",
                        element: {
                            METHODS: {
                                querySelector: {
                                    LINKS: [{title:'深度优先和先序遍历', href:''}]
                                }
                            },
                            LINKS: [{title:'Element对象', href:''}]
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
                            LINKS: [{title:'window.location与document.location的区别', href:''}]
                        }
                    },
                    METHODS: {},
                    LINKS: [{title:'Document对象', href:''}, {title:'DOM规', href:''}],
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
                        replace: {}
                    },
                    LINKS: [{title:'window.location与document.location的区别', href:''}],
                    LINKS_IN: ['url','encode'],
                    SCENE: []
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
            LINKS: [{title:'BOM规范', href:''}],
            SCENE: [{title:'浏览器静默与激活', href:'', id:''}]
        }
    }
}
