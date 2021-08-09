const rules = {
    mobile: v => { },
    email: v => { 
        v.match(/^[\w-]+@[\w-]+(\.[a-zA-Z0-9_-]+)+$/)
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
 * @return {array} 检测异常列表                  
 */
export default (form) => {
    if (!(form && form.elements)) return
    const elements = form.elements
    const NAME_ELEMENT = {} // 字段对比时用于查询重复目标
    const checkResult = []  // 最终返回的异常结果集

    Array.from(elements).filter(item => item.getAttribute('valid')).map(item => {
        const valids = item.getAttribute('valid').split(',')
        const value = item.value
        const errorArr = []
        const itemIndex = item.name || item.id

        itemIndex && (NAME_ELEMENT[itemIndex] = item)
        valids.forEach(valid => {
            let result
            if (valid.match(/^compare=(\w+)/)) {
                const compareTarget = NAME_ELEMENT[RegExp.$1]
                compareTarget && (result = rules['compare'](value, compareTarget.value))
            }
            rules[valid] && (result = rules[valid](value))
            result && errorArr.push(result)
        })
        if (errorArr.length) {
            checkResult.push({
                dom: item,
                errorArr,
                name: item.name,
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
        <input type="text" valid="required,email">
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
