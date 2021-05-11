/**
 * children 子类 
 * links          相关链接 1.'tools/qiankun' 2.{name:'乾坤', href:'tools/qiankun'} 3.'http...'
 * contentFile    内容文件 统一扁平存放于file-lib 编译命名：platform-windows-bat.md 
 * --------------------------------------------------------------------------------------被链接
 * linkName: '乾坤微服务'    外链时 links item为纯href时 name可作为标题显示
 * --------------------------------------------------------------------------------------被卡片引用+
 * title          标题
 * desc           简要说明
 * detail         详情
 */
module.exports = {
    ecma: {children: {}},
    jiagou: {children: {
        yewucheng: { title: '业务层', desc: '重点关注服务的全面性和可复用性', children: {
            jianquanxitong: {title: '业务辅助-鉴权系统', desc: '集中处理登陆、支付等需要风险控制较高的公共业务', links:[{name:'SDK', href:''},{name:'登陆', href:'jiagou-yewucheng-yewuxitong-gonggongku-gongnengku-denglu'},{name:'支付', href:'jiagou-yewucheng-yewuxitong-gonggongku-gongnengku-zhifu'}], children: {}},
            peizhixitong: {title: '业务辅助-配置系统', desc: '集中管理各种配置项，比如功能开关，链接地址，AB测试控制等等。使用配置系统的好处是不用改代码并发布即可实现实时控制。集中配置项也更便于展示他们之间的关系。', children: {}},
            xiaoxixitong: {title: '业务辅助-消息系统', desc: '通知发布 信息推送 客服等即时通讯场景', children: {}},
            yewuxitong: {title: '业务系统', desc: '核心系统，其它系统是对它的支持或者控制', children: {
                yuwuzhujian: {children: {
                    uizhujian: {children: {}},
                    gongnengmokuai: {children: {}}
                }},
                gonggongku: {children: {
                    yangshiku: {title: '公共样式库', desc: '利于各业务线之间保持用户体验的一致性', children: {}},
                    gongnengku: {children: {
                        denglu: {title: '登陆', children: {}},
                        zhifu: {title: '支付', links:[{name:'鉴权', href:'jiagou-yewucheng-jianquanxitong'}], children: {}},
                        tongji: {title: '数据统计', children: {}}
                    }}
                }},
                disanfangku: {children: {
                    yangshikuangjia: {links:[{name:'Bootstrap'}, {name:'Material'}, {name:'design'}], children: {}},
                    uikuangjia: {links:[{name:'React'}, {name:'Vue'}], children: {}},
                    gongnengku: {links:[{name:'Fetch'}, {name:'Modernizr'}, {name:'Sentry'}, {name: 'Google Analytics'}], children: {}},
                    jichuku: {links:[{linkNmae:'jQuery'}, {linkNmae:'Zetpo'}, {linkNmae:'Underscore'}, {linkNmae:'Lodash'}], children: {}}
                }}
            }}
        }},
        baozhangcheng: {title: '保障层', desc: '重点关注质量与可用性', children: {
            jiankongxitong: {title:'监控系统', desc:'从用户的角度判断系统的可用性，关注的是实时数据，提高团队的故障响应能力', children: {}},
            tongjixitong: {title:'统计系统', desc:'关注的是全量数据，为产品与业务分析提供基础', children: {
                xingneng: {title:'性能统计', children: {}},
                fangwenliang: {title:'访问量统计', children: {}},
                yonghuxingwei: {title:'用户行为统计', children: {}}
            }},
            cheshixitong: {title:'测试系统', desc:'自动化测试是是一个锥形体系', children: {
                static:{title: '静态检查', links:[{name:'Eslint'},{name:'JSCS'}], children: {}},
                unittest:{title: '单元测试', links:[{name:'Karma'},{name:'Jasmine'},{name:'Mocha'}], children: {}},
                e2e:{title: '端到端测试', desc:'从头到尾验证整个软件及其与外部接口的集成,以模拟完整的生产场景', links:[{name:'Protractor'},{name:'Nightwatch'},{name:'Selenium'}], children: {}},
                ci:{title: '持续集成', desc:'一种软件开发实践,基于将代码频繁集成到共享代码仓中,然后通过自动构建验证每个签入', children: {}},
            }}
        }},
        jichusheshicheng: {title: '基础设施层', desc: '重点关注系统稳定性', children: {
            zhiyuanguanlixitong: {title:'资源管理系统',children: {
                cdn: {title: 'CDN', children: {}},
                cdn: {title: '图片管理', children: {}},
                cdn: {title: '发布工具', children: {}},
                cdn: {title: '离线包管理', children: {}}                   
            }},
            shujuchijiuhuaxitong: {title:'数据持久化系统', desc:'存储上层系统的非核心业务数据，比如错误数据或者用户行为数据',children: {}},
            yunweixitong: {title:'运维系统', desc:'版本控制 发布脚本',children: {}}
        }},
        xianxiacheng: {title: '线下层', desc: '重点关注项目开发效率', children: {
            gongjuji: {title:'工具集',children: {
                cdn: {title: '代码管理', links:[{name:'Git Stash'}], children: {}},
                cdn: {title: '包管理', links:[{name:'NPM Bower Yarn'}], children: {}},
                cdn: {title: '构建工具', links:[{name:'Webpack'}], children: {}},
                cdn: {title: '任务管理工具', links:[{name:'Gulp Grunt'}], children: {}},
                cdn: {title: '脚手架', links:[{name:'Yeoman'}], children: {}}
            }},
            zhujianxitong: {children: {}}
        }}
    }, links:['tools-qiankun']},
    platform: {
        children: {
            node: {children: {}},
            windows: {children:{
                bat:{children:{}}
            }}
        }
    },
    tools: {
        children: {
            doc: {children: {}},
            git: {children: {}},
            markdown: {children: {}},
            webpack: {children: {}},
            qiankun: {fileName: 'qiankun.md', linkName: '乾坤微服务'}
        }
    },
    yunwei: {children: {
        nginx: {children: {}}
    }},
}
