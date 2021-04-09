module.exports = {
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