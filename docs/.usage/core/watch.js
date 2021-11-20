const exec = require('child_process').exec
const chokidar = require('chokidar')
const log = console.log
const { fetch, fetchPath } = require('../config')
const SRC_PATH = fetch("DATA|src:path")
const SRC_UPDATETIME = fetch("DATA|src:updateTime")
const {writeFileSync} = fetch('UTILS|fs')

chokidar.watch(fetchPath('DIR|.usage/resources/md'))
    .on('error', error => log(`监听错误: ${error}`)) 
    .on('change', path => {        
        const resPath = path.split(/resources[\\\/]md[\\\/]/)[1].replace('.md', '').replace(/\\/g, '/')
        if (resPath === 'index') {
            console.log('综合首页更新...')
            exec(`node ${fetchPath('CORE|create')} /`, function(error, stdout, stderr) {
                error && console.log(error)
                stdout && console.log(stdout)
                stderr && console.log(stderr)
            })
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
                writeFileSync(fetchPath("DATA|src:updateTime"), SRC_UPDATETIME, () => {console.log('updated:', fetchPath("DATA|src:updateTime"))})

                // 更新此资源对应的文档
                console.log('CREATE:', path)
                exec(`node ${fetchPath('CORE|create')} ${path}`, function(error, stdout, stderr) {
                    error && console.log(error)
                    stdout && console.log(stdout)
                    stderr && console.log(stderr)
                })
            } else {
               console.log('当前资源未与 SRC:PATH 数据关联')
            }
        }
    })       