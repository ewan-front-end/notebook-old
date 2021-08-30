const path = require('path')

module.exports = {
    data_main: "../data2/.MAIN.js",                                      // 主数据
    "src:path": path.resolve(__dirname, "../data2/.SRC_PATH.json"),                                 // 用于：编辑资源文件时查找主数据路径
    "src:updateTime": path.resolve(__dirname, "../data2/.SRC_UPDATETIME.json"),                     // 用于：编辑资源文件时记录更新时间
    "path:data": path.resolve(__dirname, "../data2/.PATH_DATA.json"),                     // 用于：编辑资源文件时记录更新时间     
    "creator": path.resolve(__dirname, "../data2/.CREATOR.json"),                         // 用于：创建目录与文件的依据
    "stamp:link": path.resolve(__dirname, "../data2/.STAMP_LINK.json")                    // 解析内容时收集的链接表
}