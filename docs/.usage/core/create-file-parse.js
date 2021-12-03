
const {fetch} = require('../config')
const parseFlex = fetch('PARSE|flex')
const parseUML = fetch('PARSE|uml')
const parseExtract = fetch('PARSE|extract')
const parseCustomBlock = fetch('PARSE|custom-block')
const Anchor = fetch('PARSE|anchor')
const Search = fetch('PARSE|search')
const {debounce} = fetch('UTILS|ewan')


module.exports = (code, path) => {
    // 通用链接
    code = Anchor.parseAnchor(code, path) // 锚点
    code = Anchor.parseTitle(code, path)  // 标题
    code = Anchor.parseLink(code)

    //code = parseExtract(code, path)
    code = parseCustomBlock.start(code, path)
    
    code = parseFlex(code) // 弹性盒子        
    code = parseUML(code)  // 图例 

    code = parseCustomBlock.end(code)

    Anchor.save() // 保存链接数据
    
    return code        
}


//<h2 id="node插件开发"> node插件开发</h2>
//<a href="#node插件开发" class="header-anchor">#</a>