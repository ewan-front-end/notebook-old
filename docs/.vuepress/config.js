module.exports = {
    "title": "标题文本",
    "description": "说明文本",
    "themeConfig": {
        "logo": "/logo.png",
        "nav": [
            {
                "text": "首页",
                "link": "/"
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