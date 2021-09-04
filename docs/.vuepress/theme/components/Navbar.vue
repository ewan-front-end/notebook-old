<template>
    <header class="navbar">
        <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

        <RouterLink :to="$localePath" class="home-link">
            <img
                v-if="$site.themeConfig.logo"
                class="logo"
                :src="$withBase($site.themeConfig.logo)"
                :alt="$siteTitle"
            />
            <span
                v-if="$siteTitle"
                ref="siteName"
                class="site-name"
                :class="{ 'can-hide': $site.themeConfig.logo }"
                >{{ $siteTitle }}</span
            >
        </RouterLink>

        <div
            class="links"
            :style="
                linksWrapMaxWidth
                    ? {
                          'max-width': linksWrapMaxWidth + 'px',
                      }
                    : {}
            "
        >
            <div class="custom-search" v-if="searchTactic === 'custom'">
                <div>
                    <input v-model="customSearch" /><button @click="handleSearch"></button>
                </div>
                <ul>
                    <li v-for="(item, index) in customSearchRes" :key="index">
                        【{{ item.key }}】<a :href="item.path">{{ item.text }}</a>
                    </li>
                </ul>
            </div>
            <AlgoliaSearchBox v-else-if="searchTactic === 'algolia'" :options="algolia" />
            <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
            <NavLinks class="can-hide" />
        </div>
    </header>
</template>

<script>
import AlgoliaSearchBox from "@AlgoliaSearchBox";
import SearchBox from "@SearchBox";
import SidebarButton from "@theme/components/SidebarButton.vue";
import NavLinks from "@theme/components/NavLinks.vue";
const PATH_KEYWORDS = require("../../../.usage/data/.SEARCH.json");

export default {
    name: "Navbar",

    components: {
        SidebarButton,
        NavLinks,
        SearchBox,
        AlgoliaSearchBox,
    },

    data() {
        return {
            linksWrapMaxWidth: null,
            customSearch: "",
            customSearchRes: [],
        };
    },

    computed: {
        algolia() {
            return (
                this.$themeLocaleConfig.algolia ||
                this.$site.themeConfig.algolia ||
                {}
            );
        },

        searchTactic() {
            let tactic = 'custom'
            if (this.algolia && this.algolia.apiKey && this.algolia.indexName) tactic = 'algolia'
            return tactic
        },
    },
    watch: {
        customSearch(val) {
            if (!val) this.customSearchRes = []
        }
    },
    mounted() {
        const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
        const NAVBAR_VERTICAL_PADDING =
            parseInt(css(this.$el, "paddingLeft")) +
            parseInt(css(this.$el, "paddingRight"));
        const handleLinksWrapWidth = () => {
            if (
                document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT
            ) {
                this.linksWrapMaxWidth = null;
            } else {
                this.linksWrapMaxWidth =
                    this.$el.offsetWidth -
                    NAVBAR_VERTICAL_PADDING -
                    ((this.$refs.siteName && this.$refs.siteName.offsetWidth) ||
                        0);
            }
        };
        handleLinksWrapWidth();
        window.addEventListener("resize", handleLinksWrapWidth, false);

        document.onkeydown = e => {   
            let key = window.event.keyCode; 
            if (key == 13) {
                this.customSearch && this.handleSearch()
            }
        };
    },
    methods: {
        handleSearch() {
            this.customSearchRes = [];
            if (!this.customSearch) return;            
            for (let path in PATH_KEYWORDS) {
                const { key, keywords } = PATH_KEYWORDS[path];  
                let res = keywords.match(RegExp(`[^■]*${this.customSearch.toLowerCase()}[^■]*`, "g")) || [];
                res.forEach((item) => {
                    this.customSearchRes.push({ path, key, text: item });
                });
            }
        },
    },
};

function css(el, property) {
    // NOTE: Known bug, will return 'auto' if style value is 'auto'
    const win = el.ownerDocument.defaultView;
    // null means not to return pseudo styles
    return win.getComputedStyle(el, null)[property];
}
</script>

<style>
.custom-search {
    display: inline-block;
    margin-right: 30px;
    position: relative;
}
.custom-search input, .custom-search button{    
    line-height: 24px;
    display: inline-block;
    border: 1px solid #cfd4db;
    outline: none;
    vertical-align: middle;    
    margin: 0;
}
.custom-search input{
    cursor: text;
    width: 180px;    
    height: 24px;
    color: #4e6e8e;
    border-radius: 24px 0 0 24px;
    font-size: 0.9rem;
    padding: 0 0 0 12px;  
}
.custom-search button{
    cursor: pointer;
    width: 24px;
    height: 26px;
    background: #fff url(/assets/img/search.83621669.svg) 0.4rem 0.5rem no-repeat;
    background-size: 1rem;
    border-radius: 0 2rem 2rem 0;   
    border-left: 0;
    padding: 5px; 
}
.custom-search ul{
    background-color: #fff;
    list-style: none;
    min-width: 360px;
    display: block;
    position: absolute;
    right: -150px;
    top: 32px;
    color: #ccc;
}
</style>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem;
$navbar-horizontal-padding = 1.5rem;

.navbar {
    padding: $navbar-vertical-padding $navbar-horizontal-padding;
    line-height: $navbarHeight - 1.4rem;

    a, span, img {
        display: inline-block;
    }

    .logo {
        height: $navbarHeight - 1.4rem;
        min-width: $navbarHeight - 1.4rem;
        margin-right: 0.8rem;
        vertical-align: top;
    }

    .site-name {
        font-size: 1.3rem;
        font-weight: 600;
        color: $textColor;
        position: relative;
    }

    .links {
        padding-left: 1.5rem;
        box-sizing: border-box;
        background-color: white;
        white-space: nowrap;
        font-size: 0.9rem;
        position: absolute;
        right: $navbar-horizontal-padding;
        top: $navbar-vertical-padding;
        display: flex;

        .search-box {
            flex: 0 0 auto;
            vertical-align: top;
        }
    }
}

@media (max-width: $MQMobile) {
    .navbar {
        padding-left: 4rem;

        .can-hide {
            display: none;
        }

        .links {
            padding-left: 1.5rem;
        }

        .site-name {
            width: calc(100vw - 9.4rem);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>
