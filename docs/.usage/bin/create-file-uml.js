const fs = require('fs')
const plantuml = require('node-plantuml')
module.exports = code => {
    let name = '未命名'
    let content = code.match(/@startuml:([\w\u4e00-\u9fa5\-]+)[\n\r]([\w\W]+)?@enduml/)
    if (content) {
        name = content[1]
        // 参考：/node#fs模块读取流/写入流/管道流
        const rs = plantuml.generate(content[2], {charset: 'UTF-8'}).out
        const ws = fs.createWriteStream('./docs/.vuepress/public/uml/' + name + '.png')
        rs.pipe(ws)
        rs.on('end', () => { console.log(name + '.png 文件创建完成'); ws.end() })
    }
    return {name}
}