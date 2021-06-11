module.exports = {
    "port": "9000",
    "title": "标题文本",
    "description": "说明文本",
    "themeConfig": {
        "logo": "/logo.png",
        "nav": [
            {
                "text": "首页",
                "link": "/"
            },
            { "text": "工具", "link": "/tools/" },
            { "text": "项目", "link": "/projects/" },
            {
                "text": "场景",
                "link": "/scene"
            },
            {
                "text": "聚合",
                "link": "/aggregation"
            }
        ],
        "sidebarDepth": 1,
        "sidebar": "auto"
    },
    "configureWebpack": {
        "resolve": {
            "alias": {
                "@res": "resources",
                "@res_md": "resources/md"
            }
        }
    }
}