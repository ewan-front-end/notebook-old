
const parseFlex = require('./parse/flex')
const parseUML = require('./parse/uml')
const parseCustomBlock = require('./parse/custom-block')
const Anchor = require('./parse/anchor')
const {debounce} = require('../utils/ewan')

module.exports = (code, path) => {
    // 通用链接
    code = Anchor.parseAnchor(code, path) // 锚点
    code = Anchor.parseTitle(code, path)  // 标题
    code = Anchor.parseLink(code)

    code = parseCustomBlock.start(code)
    
    code = parseFlex(code) // 弹性盒子        
    code = parseUML(code)  // 图例 

    code = parseCustomBlock.end(code)
    //Anchor.save()
    debounce(Anchor.save, 500) // 防抖
    
    return code        
}


//<h2 id="node插件开发"> node插件开发</h2>
//<a href="#node插件开发" class="header-anchor">#</a>