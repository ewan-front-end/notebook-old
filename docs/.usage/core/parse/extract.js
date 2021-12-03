// const { fetch } = require('../../config.js')
// const RES_DATA = fetch('DATA|res:data')

module.exports = (code, filename) => {
    // const resData = RES_DATA[filename]
    // 方案
    // ✿ Identity:方案名称
    //  内容
    // ❀
    code = code.replace(/✿/g, `1111111111`)
    filename = 'vue'
    while (/(✿\s([\w]+):(.+)\s*[\n\r](\x20*)[^❀]+❀)/gm.test(code) !== null) {
        console.log(RegExp.$1);
        const FORMAT = RegExp.$1, ID = RegExp.$2, TITLE = RegExp.$3, INDENT = RegExp.$4, CONTENT = RegExp.$5
        code = code.replace(FORMAT, `<a href="solution#${filename}_${ID}"></a>`)
    }

    return code
}