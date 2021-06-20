module.exports.config = {
    title: '标题文本',
    description: '说明文本',
    
    // 默认主题配置
    themeConfig: {
        port: '9000',
        logo: '/logo.png', // 公共资源库：docs/.vuepress/public/
        nav: [
            { text: '首页', link: '/' },
            { text: '工具', link: '/tools/' },
            { text: '项目', link: '/projects/' },
        ],
        sidebarDepth: 2,
        sidebar: 'auto'
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@res': 'resources',
                '@res_md': 'resources/md'
            }
        }
    },
    debug: true
}

// 依赖列表 vuepress会自动安装无需罗列
module.exports.dependencies = [
    //{name: 'vuepress', version: '', type: 'save-dev'}
]

// 命令别名
module.exports.aliasCommand = {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
}