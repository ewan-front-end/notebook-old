```js
■ /demo.html
<form id="formid" onsubmit="return false">
    <div id="loginNoAutocomplete"><input type="text"><input type="password"></div>
    <label>
        <input id="emai" name="email" type="text" autocomplete="true" valid="present,email">
    </label>
    <input id="submitid" value="Login" type="submit" >
</form>

■ /form-check.js
const rules = {
    mobile: v => {},
    email: v => {},
    present: v => {
        if (!v.trim()){return {type: 'present', message: '必填'}}
    }
}
export default (form) => {
    if (!(form && form.elements)) return
    const elements = form.elements
    let checkResult = []

    Array.from(elements).filter(item => item.getAttribute('valid')).map(item => {
        const valids = item.getAttribute('valid').split(',')
        const value = item.value
        let errorArr = []
        valids.forEach(valid => {
            if (rules[valid]) {
                let result = rules[valid](value)
                result && errorArr.push(result)
            }
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

■ /event.js
import FormCheck from './form-check'
document.getElementById('submitid').onclick = () => {
    const checkResult = formCheck(document.getElementById('formid'))
    console.log('checkResult', checkResult)
}
```