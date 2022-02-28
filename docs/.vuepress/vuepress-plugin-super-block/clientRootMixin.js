
// 可以控制根组件的生命周期
export default {
    created () {
        console.log('created');
    },
    mounted () {
        console.log('mounted')
        
    },
    updated() {
        console.log('updated')
        document.querySelectorAll('pre').forEach(el => {
            //el.innerHTML = el.innerHTML.replace(/\{TEMPLATE\{/g, '{{').replace(/\}TEMPLATE\}/g, '}}')
            //console.log(document.querySelector('body').innerHTML.match(/\{TEMPLATE\{/));
            const arr = el.innerHTML.match(/\{TEMPLATE\{/g)
            if (arr) {
                console.log(arr);
                el.innerHTML = el.innerHTML.replace(/\{TEMPLATE\{/g, '{{')
            }
        })
    },
    // 生产环境的构建结束后被调用
    async generated (pagePaths) {
        console.log('generated')
    }
}