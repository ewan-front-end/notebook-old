module.exports.config = {
    title: '标题文本',
    description: '说明文本',
    themeConfig: {
        nav: [
            { text: '指南', link: '/' },
        ],
        sidebarDepth: 3,
        sidebar: [
            {
                title: "工具",
                collapsable: false,
                children:[
                    ['/tools/doc/', '文档'],
                    ['/tools/webpack/', 'Webpack'],
                    ['/tools/markdown/', 'Markdown']
                ]
            }
        ]
    },
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