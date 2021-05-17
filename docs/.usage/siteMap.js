/**
 * == 结构属性 ===========================================================================
 * CHILDREN       目录节点子类 
 * SRC            文件节点 资源引用 
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
 */
 
 
 
 
module.exports = {
    platform: {
        CHILDREN: {            
            windows: {CHILDREN:{
                bat:{title: '批处理文件', linkName: '批处理'}
            }}
        }
    },
    tools: {
        CHILDREN: {
            doc: {linkName: '文档'},
            git: {linkName: 'Git'},
            markdown: {linkName: 'Markdown'},
            webpack: {linkName: 'Webpack'},
            qiankun: {linkName: '乾坤微服务'},
            charts: {linkName: '需求图表', SRC:'0002'},
            vscode:{linkName:'VSCode', SRC:'vscode'}
        }
    },
    yunwei: {CHILDREN: {
        nginx: {linkName: 'Nginx'}
    }},
    scene: {title:'场景', CHILDREN:{
        payment:{title:'支付'}
    }},
    ecma: {linkName: 'ECMAScript', links:[{name:'ES6', href:'/programmingLanguage/javascript/es6'}]},
    node: {linkName: 'Node', CHILDREN:{
        fs:{linkName: 'fs模块', SRC:'node-fs'}
    }},
    programmingLanguage:{linkName:'编程语言', CHILDREN:{
        javascript:{CHILDREN:{
            es6:{SRC:'es6'}
        }},
        matlab:{desc:'算法开发、数据可视化、数据分析、数值计算、信号处理和仿真建模的科学计算语言和编程环境', keyword:'软件/数据/图像/研发/控制/量化/测试/嵌入式/机器学习/仿真/通信'}
    }},
    frontend: {title:'前端体系', desc:'前后端的分离是系统级的分离，前端要有一整套完整的技术体系以更好地支持产品在终端形态上的快速演进，同时实现技术资源的横向复用。技术体系的线下层重点关注开发效率，基础设施层重点关注稳定性，保障层重点关注质量与可用性，业务层重点关注服务的全面性和可复用性。', CHILDREN: {
        layerBusiness: { title: '业务层', desc: '重点关注服务的全面性和可复用性', CHILDREN: {
            systemAuthentication: {title: '鉴权系统', desc: '集中处理登陆、支付等需要风险控制较高的公共业务', links:[{name:'SDK', href:''},{name:'登陆', href:'./systemBusiness/libraryPublic/function/login'},{name:'支付', href:'../systemBusiness/libraryPublic/function/payment'}], SRC:'0001'},
            systemConfiguration: {title: '配置系统', desc: '集中管理各种配置项，比如功能开关，链接地址，AB测试控制等等。使用配置系统的好处是不用改代码并发布即可实现实时控制。集中配置项也更便于展示他们之间的关系。', linkName: ''},
            systemMessage: {title: '消息系统', desc: '通知发布 信息推送 客服等即时通讯场景', linkName: '消息系统'},
            systemBusiness: {title: '业务系统', desc: '核心系统，其它系统是对它的支持或者控制', CHILDREN: {
                componentBusiness: {title:'业务组件', CHILDREN: {
                    ui: {title:'样式组件', linkName: '样式组件'},
                    moduleFunction: {title:'功能模块', linkName: '功能模块'}
                }},
                libraryPublic: {title:'公共库', CHILDREN: {
                    style: {title: '样式库', desc: '利于各业务线之间保持用户体验的一致性', linkName: '样式库'},
                    function: {title:'功能库', CHILDREN: {
                        login: {title: '登陆', },
                        payment: {title: '支付', links:[{name:'鉴权', href:'../../../../systemAuthentication'}, {name:'支付场景', href:'/scene/payment'}]},
                        statistics: {title: '数据统计'}
                    }}
                }},
                libraryThird: {title:'第三方库', CHILDREN: {
                    frameworkStyle: {title:'样式框架', links:[{name:'Bootstrap'}, {name:'Material'}, {name:'design'}], linkName: '公共样式框架'},
                    frameworkUI: {title:'UI框架', links:[{name:'React'}, {name:'Vue'}], linkName: '公共UI框架'},
                    function: {title:'功能库', links:[{name:'Fetch'}, {name:'Modernizr'}, {name:'Sentry'}, {name: 'Google Analytics'}], linkName: '公共功能库'},
                    basic: {title:'基础库', links:[{nmae:'jQuery'}, {nmae:'Zetpo'}, {nmae:'Underscore'}, {nmae:'Lodash'}], linkName: '公共基础库'}
                }}
            }}
        }},
        layerSecurity: {title: '保障层', desc: '重点关注质量与可用性', CHILDREN: {
            systemMonitor: {title:'监控系统', desc:'从用户的角度判断系统的可用性，关注的是实时数据，提高团队的故障响应能力'},
            systemStatistical: {title:'统计系统', desc:'关注的是全量数据，为产品与业务分析提供基础', CHILDREN: {
                performance: {title:'性能统计'},
                pv: {title:'访问量统计'},
                behavior: {title:'用户行为统计'}
            }},
            systemTest: {title:'测试系统', desc:'自动化测试是是一个锥形体系', CHILDREN: {
                static:{title: '静态检查', links:[{name:'Eslint'},{name:'JSCS'}]},
                unit:{title: '单元测试', links:[{name:'Karma'},{name:'Jasmine'},{name:'Mocha'}]},
                e2e:{title: '端到端测试', desc:'从头到尾验证整个软件及其与外部接口的集成,以模拟完整的生产场景', links:[{name:'Protractor'},{name:'Nightwatch'},{name:'Selenium'}]},
                ci:{title: '持续集成', desc:'一种软件开发实践,基于将代码频繁集成到共享代码仓中,然后通过自动构建验证每个签入'},
            }}
        }},
        layerInfrastructure: {title: '基础设施层', desc: '重点关注系统稳定性', CHILDREN: {
            systemResourceManagement : {title:'资源管理系统',CHILDREN: {
                cdn: {title: 'CDN'},
                image: {title: '图片管理'},
                publishing: {title: '发布工具'},
                offlinePackageManagement: {title: '离线包管理'}                   
            }},
            systemDataPersistence: {title:'数据持久化系统', desc:'存储上层系统的非核心业务数据，比如错误数据或者用户行为数据'},
            systemOperationMaintenance: {title:'运维系统', desc:'版本控制 发布脚本'}
        }},
        layerOffline: {title: '线下层', desc: '重点关注项目开发效率', CHILDREN: {
            tools: {title:'工具集',CHILDREN: {
                codeManagement: {title: '代码管理', links:[{name:'Git Stash'}]},
                packageManagement: {title: '包管理', links:[{name:'NPM Bower Yarn'}]},
                buildTools: {title: '构建工具', links:[{name:'Webpack'}]},
                taskManagement: {title: '任务管理工具', links:[{name:'Gulp Grunt'}]},
                scaffolding: {title: '脚手架', links:[{name:'Yeoman'}]}
            }},
            systemComponent: {title:'组件系统',desc:'作用在于集中管理可复用的开发资源,各业务线优先从系统中选取可复用的部分，同时向系统中沉淀组件'}
        }}
    }, links:['/tools/qiankun']}
}
