const exec = require('child_process').exec
const chokidar = require('chokidar')
const log = console.log
const { config } = require('./config')
const debug = config.debug

chokidar.watch('./docs/.usage/resources/md')
    .on('error', error => log(`监听错误: ${error}`)) 
    .on('change', path => {
        console.log('调试', debug)
        const resPath = path.split(/resources[\\\/]md[\\\/]/)[1].replace('.md', '').replace(/\\/g, '/')
        const {RES_MAP_PATH, RES_MAP_PATH_SET} = require('./data/resMapPath.js') 
        debug && console.log('编辑的资源：', resPath);
        if (resPath === 'index') {
            
        } else if (resPath === 'scene') {
            exec('node docs/.usage/updateScene.js ', function(error, stdout, stderr) {})
        } else if (resPath === 'solution') {
            console.log('updateSolution')
            exec('node docs/.usage/updateSolution.js ', function(error, stdout, stderr) {})
        } else if (RES_MAP_PATH) {
            const target = RES_MAP_PATH[resPath]            
            if (target) {   
                debug && console.log('资源映射：', target)    
                const date = new Date()
                target.updateTime = date.toJSON().slice(0, 10).replace(/-/g, '.') + ' ' + date.toString().match(/(\d{2}\:\d{2})\:\d{2}/)[1]
                debug && console.log('重写资源文件：', RES_MAP_PATH[resPath])
                //RES_MAP_PATH_SET(RES_MAP_PATH)
                debug && console.log('重建文档：', target.path)
                exec('node docs/.usage/create.js ' + target.path, function(error, stdout, stderr) {})
            } else {
               console.log('当前编辑资源未与siteMap数据关联')
            }
        }
    })   
    
    
    


    