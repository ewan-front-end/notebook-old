module.exports = (options, ctx) => {
    return {
        async ready() {
            console.log('ready**************************',ctx);
        },
        updated() {
            console.log('updated**************************', ctx);
        },
        async generated (pagePaths) {
            console.log('generated**************************', pagePaths);
        }
    }
 }