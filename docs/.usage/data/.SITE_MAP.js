/**
 * == 结构属性 ===========================================================================
 * children       目录节点子类 
 * src            文件节点 资源引用 
 * 
 * == 内容属性 ===========================================================================
 * links          相关链接 1.'tools/qiankun' 2.{name:'乾坤', href:'tools/qiankun'} 3.'http...'   绝对路径:/tools/ 相对路径：./tools/ 或 tools/
 * contentFile    内容文件 统一扁平存放于file-lib 编译命名：platform-windows-bat.md 
 * --------------------------------------------------------------------------------------被链接
 * linkName: '乾坤微服务'    外链时 links item为纯href时 name可作为标题显示
 * --------------------------------------------------------------------------------------被卡片引用+
 * title          标题
 * desc           简要说明
 * detail         详情
 * --------------------------------------------------------------------------------------Create.js处理生成：name/path
 * name:''        Create会处理成 name: key
 * outPath:''     覆盖Create生成的path
 * --------------------------------------------------------------------------------------摘要生成
 * usage:{} || [] 
 *     title:'windows'       可选 子类标题 
 *     href:'/tools/vscode'  链接地址
 *     id:'自定义用户片段'    锚链接ID
 *     desc:'' || {} || []   必选  字符时为[文本描述] 对象时为[标题：描术]结构  数组时为分类嵌套[文本描述]或[标题：描术] 步骤描述或分点描述
 *         '简单内容'
 *         {title:'', text:'', links:[['title','path']]}          此描述的必要说明点
 *     links:[['title','path']]    
 * --------------------------------------------------------------------------------------场景生成
 * scene:{} || []  
 *     title:'简化特定通用代码', 
 *     href:'/tools/vscode'  链接地址 
 *     id:'自定义用户片段'    锚链接ID     
 */
 
module.exports = {
    vue:{title:'Vue', src:'vue'},
    docs:{title:'文档', src:'docs', links:[{name:'vuepress',href:'/framework/vuepress'}, {name:'docsify',href:'/framework/docsify'}]},
    timeline:{title:'时间线', src:'timeline'},
    database:{title:'数据库', children:{
        mysql:{title:'MySQL', src:'data-mysql'},
        mongodb:{title:'MongoDB', src:'data-mongodb'}
    }},
    tools: {title:'工具&资源', src: 'tools', links:[{name:'文档', href:'/docs/'},{name:'Webpack', href:'/webpack'}], children: {            
        git: {linkName: 'Git', src:'git'},
        npm: {linkName: 'NPM', src:'npm', scene:[{title:'NPM内网源搭建', href:'/tools/npm', id:'NPM内网源搭建'},{title:'NPM版本管理',href:'/node',id:'版本管理'}], usage:[{title:'rvm',href:'/node',id:'版本管理',desc:'源于node版本改变的匹配'}]},
        markdown: {linkName: 'Markdown', src:'markdown'},        
        qiankun: {linkName: '乾坤微服务', src:'qiankun'},
        charts: {linkName: '需求图表', src:'0002'},
        vscode:{linkName:'VSCode', scene:[{title:'简化特定通用代码', href:'/tools/vscode', id:'自定义用户片段'}], src:'vscode'},
        chromeTools:{src:'chrome-tools'},
        uml:{src:'uml', links:[{name:'PlantUML语言', href:'/programmingLanguage/plantuml'}]},
        regularExpression:{linkName:'正则表达式', src:'regular-expression'},
        eslint: {linkName: 'ESLint', src:'eslint'},
        htmlBundler: {title:'html-bundler', src:'html-bundler'}
    }},     
    css:{title:'CSS', src:'css', desc:'层叠样式表(Cascading Style Sheets)', children:{
        preset:{title:'预处理', src:'css-preset'},
        variable:{title:'CSS变量', src:'css-variable'}
    }},   
    system:{title:'操作系统', src:'system', children:{
        mac:{title:'MacBook',linkName:'MacBook', src:'system-mac'},
        linux:{title:'Linux',linkName:'Linux', src:'system-linux'},
        windows:{title:'Windows',linkName:'Windows', src:'system-windows'},
        ios:{title:'IOS',linkName:'IOS', src:'ios'},
        android:{title:'Android',linkName:'Android', src:'android'}
    }},
    server:{title:'服务器',src:'server', links:[{name:'koa',href:'/node/koa'}, {name:'express',href:'/node/express'}]},  
    typescript:{linkName:'Typescript', src:'typescript'},
    //react:{linkName:'React', src:'react'},    
    designPattern:{title:'设计模式', src:'design-pattern'},
    webpack:{linkName:'Webpack', src:'webpack'},
    nginx:{linkName:'Nginx', usage:[
        {title:'windows', desc:[
            {title:'安装', text:'http://nginx.org/en/download.html'},
            {title:'配置', text:'c:\\nginx\\conf\\nginx.conf'},
            {title:'启动', text:'c:\\server\\nginx-1.0.2 > start nginx 或 c:\\server\\nginx-1.0.2 > nginx.exe'},
            {title:'重启', text:'c:\\server\\nginx-1.0.2 > nginx.exe -s reload  '},
            {title:'停止', text:'c:\\server\\nginx-1.0.2 > nginx.exe -s stop 或 c:\\server\\nginx-1.0.2 > nginx.exe -s quit'}
        ]},
        {title:'mac', desc:[
            {title:'依赖ruby', text:'ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"'},
            {title:'安装', text:'brew install nginx'},
            {title:'配置', text:'/usr/local/etc/nginx/nginx.conf'},
            {title:'启动', text:'nginx  重启: nginx -s reload  停止: nginx -s stop'}
        ]}        
    ], src:'nginx'},
    algorithm:{linkName:'算法', src:'algorithm'},
    ecma: {linkName: 'ECMAScript规范', links:[{name:'ES6', href:'/programmingLanguage/javascript/es6'}]},
    socket: {linkName:'Socket', src:'socket'},
    node: {linkName: 'Node', scene:[{title:'Node版本管理',href:'/node',id:'版本管理'}], usage:[{title:'rvm',href:'/node',id:'版本管理',desc:['nvm list 显示已安装的列表','nvm list available 显示可安装的所有版本','nvm install 12.18.2 安装特定版本','nvm use 12.18.2 使用指定版本']}], src:'node/index', children:{
        plugin:{title:'插件', src:'node-plugin'},
        framework:{title:'框架', src:'node-framework'},
        package:{title:'描述文件package.json', src:'node/package'}
    }},
    html5: {title:'HTML5', src:'html5'},
    javascript:{title: 'Javascript', src:'javascript', children:{
        es6:{src:'js-es6'},
        ecmascript:{title:'ECMAScript', src:'ecmascript'}
    }},
    programmingLanguage:{linkName:'编程语言', links:[{name:'javascript', href:'/javascript'}], children:{       
        matlab:{desc:'算法开发、数据可视化、数据分析、数值计算、信号处理和仿真建模的科学计算语言和编程环境', keyword:'软件/数据/图像/研发/控制/量化/测试/嵌入式/机器学习/仿真/通信'},
        ruby:{src:'ruby'},
        wechat:{linkName:'微信小程序', src:'wechat'},
        electron: {linkName:'Electron', src:'electron'},
        java:{title:'Java', src:'java'},
        plantuml:{title:'PlantUML',src:'plantuml'},
        python:{title:'Python', src:'python'}   
    }},
    framework: {title:'技术框架', children:{
        vuepress:{linkName:'Vuepress', scene:[{title:'部署到一个非根路径',href:'/framework/vuepress', id:'部署到一个非根路径'},{title:'插入图片', href:'/framework/vuepress', id:'公共资源库'}], usage:{title:'Vuepress', href:'/framework/vuepress', id:'使用指南', desc:['创建 docs 目录','复制 .usage 到 docs/','基础部署 node docs/.usage/deploy.js','地图创建 node docs/.usage/create.js','npm run docs:dev']}, src:'vuepress'},
        docsify:{linkName:'Docsify', usage:{desc:['$ sudo npm i docsify-cli -g', 'demo> docsify init ./docs', 'demo> docsify serve docs']}}
    }},
    frontend: {title:'前端体系', desc:'前后端的分离是系统级的分离，前端要有一整套完整的技术体系以更好地支持产品在终端形态上的快速演进，同时实现技术资源的横向复用。技术体系的线下层重点关注开发效率，基础设施层重点关注稳定性，保障层重点关注质量与可用性，业务层重点关注服务的全面性和可复用性。', children: {
        layerBusiness: { title: '业务层', desc: '重点关注服务的全面性和可复用性', children: {
            systemAuthentication: {title: '鉴权系统', desc: '集中处理登陆、支付等需要风险控制较高的公共业务', links:[{name:'账号体系', href:'/solution'},{name:'登陆', href:'./systemBusiness/libraryPublic/function/login'},{name:'支付', href:'../systemBusiness/libraryPublic/function/payment'}], src:'0001'},
            systemConfiguration: {title: '配置系统', desc: '集中管理各种配置项，比如功能开关，链接地址，AB测试控制等等。使用配置系统的好处是不用改代码并发布即可实现实时控制。集中配置项也更便于展示他们之间的关系。', linkName: ''},
            systemMessage: {title: '消息系统', desc: '通知发布 信息推送 客服等即时通讯场景', linkName: '消息系统'},
            systemBusiness: {title: '业务系统', desc: '核心系统，其它系统是对它的支持或者控制', children: {
                componentBusiness: {title:'业务组件', children: {
                    ui: {title:'样式组件', linkName: '样式组件'},
                    moduleFunction: {title:'功能模块', linkName: '功能模块'}
                }},
                libraryPublic: {title:'公共库', children: {
                    style: {title: '样式库', desc: '利于各业务线之间保持用户体验的一致性', linkName: '样式库'},
                    function: {title:'功能库', children: {
                        login: {title: '登陆', links:[{name:'账号体系', href:'/solution'}]},
                        payment: {title: '支付', links:[{name:'鉴权', href:'../../../../systemAuthentication'}, {name:'支付场景', href:'/scene/payment'}]},
                        statistics: {title: '数据统计'}
                    }}
                }},
                libraryThird: {title:'第三方库', children: {
                    frameworkStyle: {title:'样式框架', links:[{name:'Bootstrap'}, {name:'Material'}, {name:'design'}], linkName: '公共样式框架'},
                    frameworkUI: {title:'UI框架', links:[{name:'React'}, {name:'Vue'}], linkName: '公共UI框架'},
                    function: {title:'功能库', links:[{name:'Fetch'}, {name:'Modernizr'}, {name:'Sentry'}, {name: 'Google Analytics'}], linkName: '公共功能库'},
                    basic: {title:'基础库', links:[{nmae:'jQuery'}, {nmae:'Zetpo'}, {nmae:'Underscore'}, {nmae:'Lodash'}], linkName: '公共基础库'}
                }}
            }}
        }},
        layerSecurity: {title: '保障层', desc: '重点关注质量与可用性', children: {
            systemMonitor: {title:'监控系统', desc:'从用户的角度判断系统的可用性，关注的是实时数据，提高团队的故障响应能力', src:'system-monitor'},
            systemStatistical: {title:'统计系统', desc:'关注的是全量数据，为产品与业务分析提供基础', children: {
                performance: {title:'性能统计'},
                pv: {title:'访问量统计'},
                behavior: {title:'用户行为统计'}
            }},
            systemTest: {title:'测试系统', desc:'自动化测试是是一个锥形体系', children: {
                static:{title: '静态检查', links:[{name:'Eslint', href:'tools/eslint'},{name:'JSCS'}]},
                unit:{title: '单元测试', src:'unit', links:[{name:'Karma'},{name:'Jasmine'},{name:'Mocha'}]},
                e2e:{title: '端到端测试', desc:'从头到尾验证整个软件及其与外部接口的集成,以模拟完整的生产场景', links:[{name:'Protractor'},{name:'Nightwatch'},{name:'Selenium'}]},
                ci:{title: '持续集成', desc:'一种软件开发实践,基于将代码频繁集成到共享代码仓中,然后通过自动构建验证每个签入'},
            }}
        }},
        layerInfrastructure: {title: '基础设施层', desc: '重点关注系统稳定性', children: {
            systemResourceManagement : {title:'资源管理系统',children: {
                cdn: {title: 'CDN'},
                image: {title: '图片管理'},
                publishing: {title: '发布工具'},
                offlinePackageManagement: {title: '离线包管理'}                   
            }},
            systemDataPersistence: {title:'数据持久化系统', desc:'存储上层系统的非核心业务数据，比如错误数据或者用户行为数据'},
            systemOperationMaintenance: {title:'运维系统', desc:'版本控制 发布脚本'}
        }},
        layerOffline: {title: '线下层', desc: '重点关注项目开发效率', children: {
            tools: {title:'工具集',children: {
                codeManagement: {title: '代码管理', links:[{name:'Git Stash'}]},
                packageManagement: {title: '包管理', links:[{name:'NPM Bower Yarn'}]},
                buildTools: {title: '构建工具', links:[{name:'Webpack'}]},
                taskManagement: {title: '任务管理工具', links:[{name:'Gulp Grunt'}]},
                scaffolding: {title: '脚手架', links:[{name:'Yeoman'}]}
            }},
            systemComponent: {title:'组件系统',desc:'作用在于集中管理可复用的开发资源,各业务线优先从系统中选取可复用的部分，同时向系统中沉淀组件'}
        }}
    }, links:[{name:'qiankun',href:'/tools/qiankun'}]},
    projects:{title:'项目', src:'projects'},
    other: {linkName:'其它', src:'other'}
}
