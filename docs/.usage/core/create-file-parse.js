
const {fetch} = require('../config')
const parseFlex = fetch('PARSE|flex')
const parseUML = fetch('PARSE|uml')
const parseCustomBlock = fetch('PARSE|custom-block')
const Anchor = fetch('PARSE|anchor')
const Search = fetch('PARSE|search')
const {debounce} = fetch('UTILS|ewan')


module.exports = (code, path) => {
    // 模板符{{}} 如果有 向<pre>标签输出hasTemplate属性 用于在插件环节还原模板符
    code = code.replace(/\{\{/g, `{TEMPLATE{`)  
    code = code.replace(/\}\}/g, `}TEMPLATE}`)

    // 超级代码块
    let SUPER_BLOCK = {}, super_block_count = 0
    const SUPER_BLOCK_MATCH = code.match(/✪[\s\S]+✪/m) || [];
    SUPER_BLOCK_MATCH.forEach(e => {        
        const SUPER_BLOCK_NAME = 'SUPER_BLOCK_' + super_block_count + 'A'
        code = code.replace(e, SUPER_BLOCK_NAME)
        e = e.replace(/✪/g, '')
        .replace(/↧/g, '&#8615;').replace(/↥/g, '&#8613;')
        .replace(/\{/g, '&#123;').replace(/\}/g, '&#125;')
        .replace(/\</g, '&#60;').replace(/\>/g, '&#62;')
        .replace(/\./g, '&#46;')
        .replace(/\+/g, '&#43;')
        .replace(/\?/g, '&#63;')
        .replace(/:/g, '&#58;')
        .replace(/\//g, '&#47;').replace(/\\/g, '&#92;')
        //console.log(e);
        SUPER_BLOCK[SUPER_BLOCK_NAME] = e        
        super_block_count++
    })
    // 通用链接
    code = Anchor.parseAnchor(code, path) // 锚点
    code = Anchor.parseTitle(code, path)  // 标题
    code = Anchor.parseLink(code)

    code = parseCustomBlock.start(code, path)
    
    code = parseFlex(code) // 弹性盒子        
    code = parseUML(code)  // 图例 

    code = parseCustomBlock.end(code)

    Anchor.save() // 保存链接数据

    for (let key in SUPER_BLOCK) {
        code = code.replace(key, SUPER_BLOCK[key])
    }
    
    return code        
}


//<h2 id="node插件开发"> node插件开发</h2>
//<a href="#node插件开发" class="header-anchor">#</a>