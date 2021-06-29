const exec = require('child_process').exec
const chokidar = require('chokidar')
const log = console.log

chokidar.watch('./docs/.usage/resources/md')
    .on('error', error => log(`监听错误: ${error}`)) 
    .on('change', path => {
        const resPath = path.split(/resources[\\\/]md[\\\/]/)[1].replace('.md', '').replace(/\\/g, '/')
        const {RES_MAP_PATH, RES_MAP_PATH_SET} = require('./data/resMapPath.js') 
        
        if (resPath === 'index') {

        } else if (resPath === 'scene') {
            exec('node docs/.usage/updateScene.js ', function(error, stdout, stderr) {})
        } else if (resPath === 'solution') {
            exec('node docs/.usage/updateSolution.js ', function(error, stdout, stderr) {})
        } else if (RES_MAP_PATH) {
            const target = RES_MAP_PATH[resPath]            
            if (target) {         
                const date = new Date()
                target.updateTime = date.toJSON().slice(0, 10).replace(/-/g, '.') + ' ' + date.toString().match(/(\d{2}\:\d{2})\:\d{2}/)[1]
                RES_MAP_PATH_SET(RES_MAP_PATH)
                exec('node docs/.usage/create.js ' + target.path, function(error, stdout, stderr) {})
            } else {
               console.log('当前编辑资源未与siteMap数据关联')
            }
        }
    })   
    
    
    


    