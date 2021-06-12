const path = require('path')

// Theme API.
module.exports = (options, ctx) => {
  const { themeConfig, siteConfig } = ctx

  // resolve algolia
  const isAlgoliaSearch = (
    themeConfig.algolia
    || Object
        .keys(siteConfig.locales && themeConfig.locales || {})
        .some(base => themeConfig.locales[base].algolia)
  )

  const enableSmoothScroll = themeConfig.smoothScroll === true

  return {
    alias () {
      return {
        '@AlgoliaSearchBox': isAlgoliaSearch
          ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
          : path.resolve(__dirname, 'noopModule.js')
      }
    },

    plugins: [
      ['@vuepress/active-header-links', options.activeHeaderLinks],
      '@vuepress/search',
      '@vuepress/plugin-nprogress',
      ['container', {
        type: 'tip',
        defaultTitle: {
          '/': 'TIP',
          '/zh/': '提示'
        }
      }],
      ['container', {
        type: 'warning',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '注意'
        }
      }],
      ['container', {
        type: 'danger',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '警告'
        }
      }],
      ['container', {
        type: 'details',
        before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
        after: () => '</details>\n'
      }],
      ['container', {type: 'col-1', before: info => `<div class="custom-block col-1">${info ? `<summary>${info}</summary>` : ''}\n`, after: () => '</div>\n'}],
      ['container', {type: 'col-2', before: info => `<div class="custom-block col-2">${info ? `<summary>${info}</summary>` : ''}\n`, after: () => '</div>\n'}],
      ['container', {type: 'col-3', before: info => `<div class="custom-block col-3">${info ? `<summary>${info}</summary>` : ''}\n`, after: () => '</div>\n'}],
      ['container', {type: 'col-4', before: info => `<div class="custom-block col-4">${info ? `<summary>${info}</summary>` : ''}\n`, after: () => '</div>\n'}],
      ['container', {type: 'col-5', before: info => `<div class="custom-block col-5">${info ? `<summary>${info}</summary>` : ''}\n`, after: () => '</div>\n'}],
      ['container', {type: 'col-6', before: info => `<div class="custom-block col-6">${info ? `<summary>${info}</summary>` : ''}\n`, after: () => '</div>\n'}],
      ['container', {type: 'col-7', before: info => `<div class="custom-block col-7">${info ? `<summary>${info}</summary>` : ''}\n`, after: () => '</div>\n'}],
      ['container', {type: 'col-8', before: info => `<div class="custom-block col-8">${info ? `<summary>${info}</summary>` : ''}\n`, after: () => '</div>\n'}],
      ['container', {type: 'col-9', before: info => `<div class="custom-block col-9">${info ? `<summary>${info}</summary>` : ''}\n`, after: () => '</div>\n'}],
      ['container', {type: 'col-10', before: info => `<div class="custom-block col-10">${info ? `<summary>${info}</summary>` : ''}\n`, after: () => '</div>\n'}],
      ['container', {type: 'col-11', before: info => `<div class="custom-block col-11">${info ? `<summary>${info}</summary>` : ''}\n`, after: () => '</div>\n'}],
      ['container', {type: 'col-12', before: info => `<div class="custom-block col-12">${info ? `<summary>${info}</summary>` : ''}\n`, after: () => '</div>\n'}],
      ['smooth-scroll', enableSmoothScroll]
    ]
  }
}
