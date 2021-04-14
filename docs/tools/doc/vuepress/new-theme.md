## 一个组件的简单主题
docs/.vuepress/theme
docs/.vuepress/theme/Layout.vue
```
<template>
  <div class="theme-container">
    <Content/>
  </div>
</template>
```

```
theme
├── global-components
│   └── xxx.vue
├── components
│   └── xxx.vue
├── layouts
│   ├── GlobalLayout.vue
│   ├── Layout.vue (必要的)
│   └── 404.vue
├── styles
│   ├── index.styl
│   └── palette.styl
├── templates
│   ├── dev.html
│   └── ssr.html
├── index.js
├── enhanceApp.js
└── package.json
```




docs/.vuepress/theme/index.js
```js
module.exports = (themeConfig, ctx) => {
   return {
      // ...
   }
}
```