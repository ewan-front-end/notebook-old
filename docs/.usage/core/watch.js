const exec = require('child_process').exec
const chokidar = require('chokidar')
const log = console.log
const { config, dataPath } = require('../config')
const SRC_PATH = require(dataPath["src:path"])
const SRC_UPDATETIME = require(dataPath["src:updateTime"])
const {writeFileSync} = require('../utils/fs')

chokidar.watch('./docs/.usage/resources/md')
    .on('error', error => log(`监听错误: ${error}`)) 
    .on('change', path => {
        const resPath = path.split(/resources[\\\/]md[\\\/]/)[1].replace('.md', '').replace(/\\/g, '/')
         
        console.log('SRC:', resPath);
        if (resPath === 'index') {
            
        } else if (resPath === 'scene') {
            exec('node docs/.usage/updateScene.js ', function(error, stdout, stderr) {})
        } else if (resPath === 'solution') {
            console.log('updateSolution')
            exec('node docs/.usage/updateSolution.js ', function(error, stdout, stderr) {})
        } else if (SRC_PATH) {
            const path = SRC_PATH[resPath] 
              
            if (path) {   
                console.log('PATH:', path)    
                
                // 更新 SRC:UPDATETIME 文件
                const date = new Date()
                SRC_UPDATETIME[resPath] = date.toJSON().slice(0, 10).replace(/-/g, '.') + ' ' + date.toString().match(/(\d{2}\:\d{2})\:\d{2}/)[1]
                writeFileSync(dataPath["src:updateTime"], SRC_UPDATETIME, () => {console.log('updated:', dataPath["src:updateTime"])})

                // 更新此资源对应的文档
                console.log('CREATE:', path)
                exec('node docs/.usage/core/create.js ' + path, function(error, stdout, stderr) {})
            } else {
               console.log('当前资源未与 SRC:PATH 数据关联')
            }
        }
    })   
    
    
    


    