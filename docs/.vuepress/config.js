module.exports = {
    "title": "标题文本",
    "description": "说明文本",
    "themeConfig": {
        "logo": "/logo.png",
        "nav": [
            {
                "text": "指南",
                "link": "/"
            },
            {
                "text": "聚合",
                "link": "/aggregation"
            }
        ],
        "sidebarDepth": 2,
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