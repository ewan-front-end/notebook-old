const rules = {
    mobile: v => { },
    email: v => { 
        v.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
    },
    required: v => {
        if (!v.trim()) { return { type: 'required', message: '必填' } }
    },
    compare: (a, b) => {
        if (a !== b) return { type: 'compare', message: '重复项错误' }
    }
}

/**
 * 通用表单验证                              
 * @param {element} form DOM表单                 
 * @return {array} 检测异常列表 [{dom:Element, name:'email', message:'必填', type:'required', errorArr:[{ type: 'required', message: '必填' }]}]                  
 */
export default (form) => {
    if (!(form && form.elements)) return
    const elements = form.elements
    const NAME_ELEMENT = {} // 字段对比时用于查询重复目标
    const checkResult = []  // 最终返回的异常结果集
     
    Array.from(elements).filter(item => item.getAttribute('valid')).map(item => {
        const valids = item.getAttribute('valid').split(',')
        const value = item.value
        const index = item.name || item.id
        const errorArr = []

        index && (NAME_ELEMENT[index] = value)
        valids.forEach(valid => {
            let result
            if (valid.match(/^compare=(\w+)/)) {
                const targetValue = NAME_ELEMENT[RegExp.$1]
                targetValue && (result = rules['compare'](value, targetValue))
              }
            rules[valid] && (result = rules[valid](value))
            result && errorArr.push(result)
        })
        if (errorArr.length) {
            checkResult.push({
                dom: item,
                errorArr,
                name: index,
                message: errorArr[0].message,
                type: errorArr[0].type
            })
        }
    })
    return checkResult
}
/*
<form id="formid" onsubmit="return false">
    <label>
        <input type="text" name="email" "valid="required,email">
    </label>
    <input id="submitid" value="Login" type="submit" >
</form>

const formValidation = require(../utils/form-validation.common.js) 
document.getElementById('submitid').onclick = () => {
    // 表单验证
    const $form = document.getElementById('formid')
    const checkResult = formValidation($form)
    if (checkResult.length > 0) {
        console.log(checkResult[0].message)
        return
    }
    // 表单提交
}
 */
