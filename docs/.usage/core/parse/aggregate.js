// const { fetch } = require('../../config.js')
// const RES_DATA = fetch('DATA|res:data')

module.exports = {
    pick: (block, filename) => {
        
        // 场景Scene
        // while (/(✿\s([\w]+):(.+)\s*[\n\r](\x20*)[^❀]+❀)/gm.exec(block) !== null) {
        //     const FORMAT = RegExp.$1, ID = RegExp.$2, TITLE = RegExp.$3, INDENT = RegExp.$4, CONTENT = RegExp.$5
        //     block = block.replace(FORMAT, `<a href="/aggregation/solution#filename_${ID}">${TITLE}</a>`)
        // }
        /**
         * 攻略Usage
         * ★ Identity:攻略名称
           1 第一点
           2 第二点
           3 第三点
           ☆
         */
        while (/(★\s([\w]+):(.+)\s*[\n\r](\x20*)[^☆]+☆)/gm.exec(block) !== null) {
            const FORMAT = RegExp.$1, ID = RegExp.$2, TITLE = RegExp.$3, INDENT = RegExp.$4, CONTENT = RegExp.$5
            block = block.replace(FORMAT, `<a class="usage" href="/aggregation/usage#filename_${ID}">${TITLE}</a>`)
        }
        // 方案Solution
        while (/(✿\s([\w]+):(.+)\s*[\n\r](\x20*)[^❀]+❀)/gm.exec(block) !== null) {
            const FORMAT = RegExp.$1, ID = RegExp.$2, TITLE = RegExp.$3, INDENT = RegExp.$4, CONTENT = RegExp.$5
            block = block.replace(FORMAT, `<a class="solution" href="/aggregation/solution#filename_${ID}">${TITLE}</a>`)
        }
        // 标准Standard
        // while (/(✿\s([\w]+):(.+)\s*[\n\r](\x20*)[^❀]+❀)/gm.exec(block) !== null) {
        //     const FORMAT = RegExp.$1, ID = RegExp.$2, TITLE = RegExp.$3, INDENT = RegExp.$4, CONTENT = RegExp.$5
        //     block = block.replace(FORMAT, `<a href="/aggregation/solution#filename_${ID}">${TITLE}</a>`)
        // }
        return block
    }
}