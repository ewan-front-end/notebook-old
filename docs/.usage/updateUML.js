const fs = require('fs')
const {saveFile} = require('./src/tools-fs')
const plantuml = require('node-plantuml')
const DATA_UML = require('./data/.PLANTUML')
// 参考：/node#fs模块读取流/写入流/管道流
for (let key in DATA_UML) {//{charset:'UTF-8'}
    const rs = plantuml.generate(DATA_UML[key], {charset: 'UTF-8'})
    const ws = fs.createWriteStream('./docs/.vuepress/public/uml/' + key + '.png')
    rs.out.pipe(ws)
    rs.on('end', () => {
        console.log(key + '.png 文件创建完成')
        ws.end()
    })
}
    
    
       


