
https://www.jb51.net/article/153745.htm

demo> npm init -y
package.json
{
    "bin": {
        "demo": "./index.js"
    }
}





npm config get registry                             查看npm源地址
npm config set registry https://registry.npmjs.org  设置为官方源地址

npm adduser  第一次登录
npm login    非第一次登录

npm publish                   普通包
npm publish --access=public   组织包

npm unpublish @lauwen/kiss-ui@1.0.0 --force  撤销发布