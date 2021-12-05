// const { fetch } = require('../../config.js')
// const RES_DATA = fetch('DATA|res:data')

module.exports = {
    pick: (block, filename) => {
        // 方案
        while (/(✿\s([\w]+):(.+)\s*[\n\r](\x20*)[^❀]+❀)/gm.exec(block) !== null) {
            const FORMAT = RegExp.$1, ID = RegExp.$2, TITLE = RegExp.$3, INDENT = RegExp.$4, CONTENT = RegExp.$5
            block = block.replace(FORMAT, `<a href="/aggregation/solution#filename_${ID}">${TITLE}</a>`)
        }
    }
}