 

===+
【2】个人中心模块基本布局
    src/views/Profile/index.vue ▾
        ↧<template>
            <div class="my-container">
                <el-row>
                    <el-col :span="6">
                        <project-card class="user-card"></project-card>
                    </el-col>
                    <el-col :span="18">
                        <el-card>
                            <el-tabs v-model="activeName">
                                <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
                                    <feature />
                                </el-tab-pane>
                                <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
                                    <chapter />
                                </el-tab-pane>
                                <el-tab-pane :label="$t('msg.profile.author')" name="author">
                                    <author />
                                </el-tab-pane>
                            </el-tabs>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </template>

        <script setup>
        import ProjectCard from './components/ProjectCard.vue'
        import Chapter from './components/Chapter.vue'
        import Feature from './components/Feature.vue'
        import Author from './components/Author.vue'
        import { ref } from 'vue'
        const activeName = ref('feature')
        </script>

        <style lang="scss" scoped>
        .my-container {
            .user-card {
                margin-right: 20px;
            }
        }
        </style>↥
    src/views/profile/components/ProjectCard.vue
    src/views/profile/components/Feature.vue
    src/views/profile/components/Chapter.vue
    src/views/profile/components/Author.vue
    src/views/profile/components/ProjectCard.vue ▾
        ↧<template>
            <el-card class="user-container">
                <template #header>
                    <div class="header">
                        <span>{{ $t('msg.profile.introduce') }}</span>
                    </div>
                </template>

                <div class="user-profile">
                    <!-- 头像 -->
                    <div class="box-center">
                        ►<pan-thumb :image="$store.getters.userInfo.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
                            <div>Hello</div>
                            {{ $store.getters.userInfo.title }}
                        </pan-thumb>◄
                    </div>

                    <!-- 姓名 && 角色 -->
                    <div class="box-center">
                        <div class="user-name text-center">
                            {{ $store.getters.userInfo.username }}
                        </div>
                        <div class="user-role text-center text-muted">
                            {{ $store.getters.userInfo.title }}
                        </div>
                    </div>
                </div>

                <!-- 简介 -->
                1►<div class="project-bio">
                    <div class="project-bio-section">
                        <div class="project-bio-section-header">
                            <svg-icon icon="introduce" />
                            <span>{{ $t('msg.profile.projectIntroduction') }}</span>
                        </div>
                        <div class="project-bio-section-body">
                            <div class="text-muted">
                                {{ $t('msg.profile.muted') }}
                            </div>
                        </div>
                    </div>

                    <!-- 功能区域 -->
                    <div class="project-bio-section">
                        <div class="project-bio-section-header">
                            <svg-icon icon="reward" /><span>{{ $t('msg.profile.projectFunction') }}</span>
                        </div>
                        <div class="project-bio-section-body">
                            <div class="progress-item" v-for="item in features" :key="item.id">
                                <div>{{ item.title }}</div>
                                <el-progress :percentage="item.percentage" status="success" />
                            </div>
                        </div>
                    </div>
                </div>◄

                
            </el-card>
        </template>

        <script setup>
        ►import PanThumb from '@/components/PanThumb/index.vue'◄
        1►import { defineProps } from 'vue'
        defineProps({
            features: {
                type: Array,
                required: true
            }
        })◄
        </script>

        <style lang="scss" scoped>
        .user-container {
            .text-muted {
                font-size: 14px;
                color: #777;
            }
            .user-profile {
                text-align: center;
                .user-name {
                    font-weight: bold;
                }
                .box-center {
                    padding-top: 10px;
                }
                .user-role {
                    padding-top: 10px;
                    font-weight: 400;
                }
            }
            1►.project-bio {
                margin-top: 20px;
                color: #606266;
                span {
                    padding-left: 4px;
                }

                .project-bio-section {
                    margin-bottom: 36px;
                    .project-bio-section-header {
                        border-bottom: 1px solid #dfe6ec;
                        padding-bottom: 10px;
                        margin-bottom: 10px;
                        font-weight: bold;
                    }
                    .project-bio-section-body {
                        .progress-item {
                            margin-top: 10px;
                            div {
                                font-size: 14px;
                                margin-bottom: 2px;
                            }
                        }
                    }
                }
            }◄
        }
        </style>↥
    src/components/PanThumb/index.vue ▾ 头像组件
        ↧<template>
            <div :style="{ zIndex: zIndex, height: height, width: width }" class="pan-item">
                <div class="pan-info">
                    <div class="pan-info-roles-container">
                        <slot />
                    </div>
                </div>
                <div :style="{ backgroundImage: `url(${image})` }" class="pan-thumb"></div>
            </div>
        </template>

        <script setup>
        import { defineProps } from 'vue'
        defineProps({
            image: {
                type: String
            },
            zIndex: {
                type: Number,
                default: 1
            },
            width: {
                type: String,
                default: '150px'
            },
            height: {
                type: String,
                default: '150px'
            }
        })
        </script>

        <style scoped>
        .pan-item {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            cursor: default;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }
        .pan-info-roles-container {
            padding: 20px;
            text-align: center;
        }
        .pan-thumb {
            width: 100%;
            height: 100%;
            background-position: center center;
            background-size: cover;
            border-radius: 50%;
            overflow: hidden;
            position: absolute;
            transform-origin: 95% 40%;
            transition: all 0.3s ease-in-out;
        }
        .pan-info {
            position: absolute;
            width: inherit;
            height: inherit;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
        }
        .pan-info h3 {
            color: #fff;
            text-transform: uppercase;
            position: relative;
            letter-spacing: 2px;
            font-size: 14px;
            margin: 0 60px;
            padding: 22px 0 0 0;
            height: 85px;
            font-family: 'Open Sans', Arial, sans-serif;
            text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        .pan-info p {
            color: #fff;
            padding: 10px 5px;
            font-style: italic;
            margin: 0 30px;
            font-size: 12px;
            border-top: 1px solid rgba(255, 255, 255, 0.5);
        }
        .pan-info p a {
            display: block;
            color: #333;
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            color: #fff;
            font-style: normal;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 9px;
            letter-spacing: 1px;
            padding-top: 24px;
            margin: 7px auto 0;
            font-family: 'Open Sans', Arial, sans-serif;
            opacity: 0;
            transition: transform 0.3s ease-in-out 0.2s, opacity 0.3s ease-in-out 0.2s, background 0.2s linear 0s;
            transform: translateX(60px) rotate(90deg);
        }
        .pan-info p a:hover {
            background: rgba(255, 255, 255, 0.5);
        }
        .pan-item:hover .pan-thumb {
            transform: rotate(-110deg);
        }
        .pan-item:hover .pan-info p a {
            opacity: 1;
            transform: translateX(0px) rotate(0deg);
        }
        </style>↥
    src/api/user.js ▾
        ↧import request from '@/utils/request'

        export const feature = () => {
            return request({
                url: '/user/feature'
            })
        }↥
    src/views/profile/index.vue ▾
        ↧<project-card class="user-card" :features="1►featureData◄"></project-card>
        
        import { feature as ►getFeature◄ } from '@/api/user'

        const 1►featureData◄ = ref([])
        const getFeatureData = async () => {
            1►featureData◄.value = await ►getFeature◄()
        }
        getFeatureData()↥
    【3】接口国际化
        src/utils/request.js ▾
            ↧// 请求拦截器
            service.interceptors.request.use(
                config => {                    
                    // 配置接口国际化
                    ►config.headers['Accept-Language'] = store.getters.language◄
                    return config // 必须返回配置
                }
            )↥
        src/views/profile/index.vue ▾ 功能数据重新获取
            ↧import { watchSwitchLang } from '@/utils/i18n'
            // 监听语言切换
            watchSwitchLang(getFeatureData)↥
        src/store/modules/app.js ▾ 用户信息重新获取
            ↧import { watchSwitchLang } from '@/utils/i18n'
            
            /**
             * 监听 语言变化，重新获取个人信息
             */
            watchSwitchLang(() => {
                if (store.getters.token) {
                    store.dispatch('user/getUserInfo')
                }
            })↥
    【3】功能模块开发
        src/views/profile/index.vue ▾
            ↧<feature ►:features="featureData"◄ />↥
        src/views/profile/components/Feature.vue ▾
            ↧<template>
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item v-for="item in features" :key="item.id" :title="item.title" :name="item.id">
                        <div v-html="item.content"></div>
                    </el-collapse-item>
                </el-collapse>
            </template>

            <script setup>
            import { ref, defineProps } from 'vue'
            const activeName = ref(0)
            defineProps({
                features: {
                    type: Array,
                    required: true
                }
            })
            </script>

            <style lang="scss" scoped>
            ::v-deep .el-collapse-item__header {
                font-weight: bold;
            }

            .el-collapse-item {
                ::v-deep a {
                    color: #2d62f7;
                    margin: 0 4px;
                }
            }
            </style>↥
    【3】章节模块开发
        src/api/user.js ▾
            ↧export const ►chapter◄ = () => {
                return request({
                    url: '/user/chapter'
                })
            }↥
        src/views/profile/components/Chapter.vue ▾ 调用接口处理接口国际化
            ↧<template>
                <el-timeline>
                    <el-timeline-item
                        v-for="item in 2►chapterData◄"
                        :key="item.id"
                        :timestamp="item.timestamp"
                        placement="top"
                        >
                        <el-card>
                            <h4>{{ item.content }}</h4>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </template>

            <script setup>
            import { watchSwitchLang } from '@/utils/i18n'
            import { ►chapter◄ } from '@/api/user'
            import { ref } from 'vue'
            const 2►chapterData◄ = ref([])

            const getChapterData = async () => {
                2►chapterData◄.value = await ►chapter◄()
            }
            getChapterData()

            // 监听语言切换
            watchSwitchLang(getChapterData)
            </script>↥
    【3】作者模块开发
        src/views/profile/components/Author.vue ▾
            ↧<template>
                <div class="author-container">
                    <div class="header">
                        <pan-thumb image="https://img4.sycdn.imooc.com/61110c2b0001152907400741-140-140.jpg" height="60px" width="60px" :hoverable="false">
                            {{ $t('msg.profile.name') }}
                        </pan-thumb>
                        <div class="header-desc">
                            <h3>{{ $t('msg.profile.name') }}</h3>
                            <span>{{ $t('msg.profile.job') }}</span>
                        </div>
                    </div>
                    <div class="info">
                        {{ $t('msg.profile.Introduction') }}
                    </div>
                </div>
            </template>

            <script setup>
            import PanThumb from '@/components/PanThumb/index.vue'
            import {} from 'vue'
            </script>

            <style lang="scss" scoped>
            .author-container {
                .header {
                    display: flex;
                    .header-desc {
                        margin-left: 12px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;

                        span {
                            font-size: 14px;
                        }
                    }
                }
                .info {
                    margin-top: 16px;
                    line-height: 22px;
                    font-size: 14px;
                    text-indent: 26px;
                }
            }
            </style>↥
【2】权限架构处理之用户权限处理
    【3】员工管理
        【4】用户列表分页展示
            src/api/user-manage.js ▾ 定义接口
                ↧import request from '@/utils/request'

                /**
                 * 获取用户列表数据
                 */
                export const ►getUserManageList◄ = data => {
                    return request({
                        url: '/user-manage/list',
                        params: data
                    })
                }↥
            src/views/user-manage/index.vue ▾
                ↧<template>
                    <div class="user-manage-container">
                        <el-card class="header">
                            <div>
                                <el-button type="primary"> {{ $t('msg.excel.importExcel') }}</el-button>
                                <el-button type="success">
                                    {{ $t('msg.excel.exportExcel') }}
                                </el-button>
                            </div>
                        </el-card>
                        <el-card>
                            <el-table :data="2►tableData◄" border style="width: 100%">
                                <el-table-column label="#" type="index" />
                                <el-table-column prop="username" :label="$t('msg.excel.name')"> </el-table-column>
                                <el-table-column prop="mobile" :label="$t('msg.excel.mobile')"> </el-table-column>
                                <el-table-column :label="$t('msg.excel.avatar')" align="center">
                                    <template v-slot="{ row }">
                                        <el-image class="avatar" :src="row.avatar" :preview-src-list="[row.avatar]"></el-image>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('msg.excel.role')">
                                    <template #default="{ row }">
                                        <div v-if="row.role && row.role.length > 0">
                                            <el-tag v-for="item in row.role" :key="item.id" size="mini">{{ item.title }}</el-tag>
                                        </div>
                                        <div v-else>
                                            <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="openTime" :label="$t('msg.excel.openTime')"> </el-table-column>
                                <el-table-column :label="$t('msg.excel.action')" fixed="right" width="260">
                                    <template #default>
                                        <el-button type="primary" size="mini">{{ $t('msg.excel.show') }}</el-button>
                                        <el-button type="info" size="mini">{{ $t('msg.excel.showRole') }}</el-button>
                                        <el-button type="danger" size="mini">{{ $t('msg.excel.remove') }}</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                            <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[2, 5, 10, 20]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
                        </el-card>
                    </div>
                </template>

                <script setup>
                import { ref } from 'vue'
                import { ►getUserManageList◄ } from '@/api/user-manage'
                import { watchSwitchLang } from '@/utils/i18n'

                // 数据相关
                const 2►tableData◄ = ref([])
                const total = ref(0)
                const page = ref(1)
                const size = ref(5)

                // 获取数据的方法
                const getListData = async () => {
                    const result = await ►getUserManageList◄({
                        page: page.value,
                        size: size.value
                    })
                    2►tableData◄.value = result.list
                    total.value = result.total
                }
                getListData()

                // 监听语言切换
                watchSwitchLang(getListData)

                // size 改变触发
                const handleSizeChange = currentSize => {
                    size.value = currentSize
                    getListData()
                }
                // 页码改变触发
                const handleCurrentChange = currentPage => {
                    page.value = currentPage
                    getListData()
                }
                </script>

                <style lang="scss" scoped>
                .user-manage-container {
                    .header {
                        margin-bottom: 22px;
                        text-align: right;
                    }
                    ::v-deep .avatar {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                    }
                    ::v-deep .el-tag {
                        margin-right: 6px;
                    }
                    .pagination {
                        margin-top: 20px;
                        text-align: center;
                    }
                }
                </style>↥
            【5】全局属性处理时间展示
                npm i dayjs@1.10.6 --save
                src/filters/index.js ▾
                    ↧import dayjs from 'dayjs'

                    const dateFilter = (val, format = 'YYYY-MM-DD') => {
                        if (!isNaN(val)) {
                            val = parseInt(val)
                        }

                        return dayjs(val).format(format)
                    }

                    export default app => {
                        app.config.globalProperties.$filters = {
                            dateFilter
                        }
                    }↥
                src/main.js ▾
                    ↧// 全局属性
                    import installFilter from '@/filters'

                    installFilter(app)↥
                src/views/user-manage/index.vue ▾
                    ↧<el-table-column :label="$t('msg.excel.openTime')">
                        <template #default="{ row }">
                            {{ $filters.dateFilter(row.openTime) }}
                        </template>
                    </el-table-column>↥
            【5】excel导入用户
                src/views/user-manage/index.vue ▾
                    ↧<el-button type="primary" ►@click="onImportExcelClick"◄>{{ $t('msg.excel.importExcel') }}</el-button>

                    import { useRouter } from 'vue-router'
                    const router = useRouter()
                    /**
                    * excel 导入点击事件
                    */
                    const ►onImportExcelClick◄ = () => {
                        router.push('/user/import')
                    }↥
                src/views/import/index.vue ▾ 上传页面
                    ↧<template>
                        ►<upload-excel :onSuccess="1►onSuccess◄"></upload-excel>◄
                    </template>

                    <script setup>
                    import ►UploadExcel◄ from '@/components/UploadExcel'
                    import { userBatchImport } from '@/api/user-manage'
                    import { USER_RELATIONS, formatDate } from './utils'
                    import { ElMessage } from 'element-plus'
                    import { useI18n } from 'vue-i18n'
                    import { useRouter } from 'vue-router'

                    const i18n = useI18n()
                    const router = useRouter()

                    /**
                     * 数据解析成功之后的回调
                     */
                    const 1►onSuccess◄ = async ({ header, results }) => {
                        const updateData = 2►generateData◄(results)
                        await userBatchImport(updateData)
                        ElMessage.success({
                            message: results.length + i18n.t('msg.excel.importSuccess'),
                            type: 'success'
                        })
                        router.push('/user/manage')
                    }

                    /**
                     * 筛选数据
                     */
                    const 2►generateData◄ = results => {
                        const arr = []
                        results.forEach(item => {
                            const userInfo = {}
                            Object.keys(item).forEach(key => {
                                if (USER_RELATIONS[key] === 'openTime') {
                                    userInfo[USER_RELATIONS[key]] = formatDate(item[key])
                                    return
                                }
                                userInfo[USER_RELATIONS[key]] = item[key]
                            })
                            arr.push(userInfo)
                        })
                        return arr
                    }
                    </script>↥
                npm i xlsx@0.17.0 --save // 解析excel工具
                src/components/UploadExcel/utils.js ▾
                    ↧import XLSX from 'xlsx'
                    /**
                    * 获取表头（通用方式）
                    */
                    export const getHeaderRow = sheet => {
                        const headers = []
                        const range = XLSX.utils.decode_range(sheet['!ref'])
                        let C
                        const R = range.s.r
                        /* start in the first row */
                        for (C = range.s.c; C <= range.e.c; ++C) {
                            /* walk every column in the range */
                            const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
                            /* find the cell in the first row */
                            let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
                            if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
                            headers.push(hdr)
                        }
                        return headers
                    }

                    export const isExcel = file => {
                        return /\.(xlsx|xls|csv)$/.test(file.name)
                    }↥
                src/components/UploadExcel/index.vue ▾
                    ↧<template>
                        <div class="upload-excel">
                            <div class="btn-upload">
                                <el-button :loading="loading" type="primary" @click="handleUpload">
                                    {{ $t('msg.uploadExcel.upload') }}
                                </el-button>
                            </div>

                            <input ref="excelUploadInput" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleChange" />
                            <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
                            <div class="drop" @drop.stop.prevent="handleDrop" @dragover.stop.prevent="handleDragover" @dragenter.stop.prevent="handleDragover">
                                <i class="el-icon-upload" />
                                <span>{{ $t('msg.uploadExcel.drop') }}</span>
                            </div>
                        </div>
                    </template>

                    <script setup>
                    import XLSX from 'xlsx'
                    import { defineProps, ref } from 'vue'
                    import { getHeaderRow3►, isExcel◄ } from './utils'
                    3►import { ElMessage } from 'element-plus'◄

                    /**
                     * 拖拽文本释放时触发
                     */
                    3►const handleDrop = e => {
                        if (loading.value) return // 上传中跳过
                        const files = e.dataTransfer.files
                        if (files.length !== 1) {
                            ElMessage.error('必须要有一个文件')
                            return
                        }
                        const rawFile = files[0]
                        if (!isExcel(rawFile)) {
                            ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
                            return false
                        }
                        upload(rawFile) // 触发上传事件
                    }◄

                    /**
                     * 拖拽悬停时触发
                     */
                    3►const handleDragover = e => {
                        e.dataTransfer.dropEffect = 'copy' // 在新位置生成源项的副本 https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
                    }◄

                    const props = defineProps({
                        // 上传前回调
                        beforeUpload: Function,
                        // 成功回调
                        onSuccess: Function
                    })

                    /**
                    * 点击上传触发
                    */
                    const loading = ref(false)
                    const excelUploadInput = ref(null)
                    const handleUpload = () => {
                        excelUploadInput.value.click()
                    }
                    const handleChange = e => {
                        const files = e.target.files
                        const rawFile = files[0] // only use files[0]
                        if (!rawFile) return
                        upload(rawFile)
                    }

                    /**
                    * 触发上传事件
                    */
                    const upload = rawFile => {
                        excelUploadInput.value.value = null
                        // 如果没有指定上传前回调的话
                        if (!props.beforeUpload) {
                            readerData(rawFile)
                            return
                        }
                        // 如果指定了上传前回调，那么只有返回 true 才会执行后续操作
                        const before = props.beforeUpload(rawFile)
                        if (before) {
                            readerData(rawFile)
                        }
                    }

                    /**
                    * 读取数据（异步）
                    */
                    const readerData = rawFile => {
                        loading.value = true
                        return new Promise((resolve, reject) => {
                            // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
                            const reader = new FileReader()
                            // 该事件在读取操作完成时触发
                            // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
                            reader.onload = e => {
                                // 1. 获取解析到的数据
                                const data = e.target.result
                                // 2. 利用 XLSX 对数据进行解析
                                const workbook = XLSX.read(data, { type: 'array' })
                                // 3. 获取第一张表格(工作簿)名称
                                const firstSheetName = workbook.SheetNames[0]
                                // 4. 只读取 Sheet1（第一张表格）的数据
                                const worksheet = workbook.Sheets[firstSheetName]
                                // 5. 解析数据表头
                                const header = getHeaderRow(worksheet)
                                // 6. 解析数据体
                                const results = XLSX.utils.sheet_to_json(worksheet)
                                // 7. 传入解析之后的数据
                                generateData({ header, results })
                                // 8. loading 处理
                                loading.value = false
                                // 9. 异步完成
                                resolve()
                            }
                            // 启动读取指定的 Blob 或 File 内容
                            reader.readAsArrayBuffer(rawFile)
                        })
                    }

                    /**
                    * 根据导入内容，生成数据
                    */
                    const generateData = excelData => {
                        props.onSuccess && props.onSuccess(excelData)
                    }
                    </script>

                    <style lang="scss" scoped>
                    .upload-excel {
                        display: flex;
                        justify-content: center;
                        margin-top: 100px;
                        .excel-upload-input {
                            display: none;
                            z-index: -9999;
                        }
                        .btn-upload,
                        .drop {
                            border: 1px dashed #bbb;
                            width: 350px;
                            height: 160px;
                            text-align: center;
                            line-height: 160px;
                        }
                        .drop {
                            line-height: 60px;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            color: #bbb;
                            i {
                                font-size: 60px;
                                display: block;
                            }
                        }
                    }
                    </style>↥
                src/api/user-manage.js ▾
                    ↧/**
                     * 批量导入
                     */
                    export const userBatchImport = data => {
                        return request({
                            url: '/user-manage/batch/import',
                            method: 'POST',
                            data
                        })
                    }↥
                src/views/import/utils.js ▾
                    ↧/**
                     * 导入数据对应表
                     */
                    export const USER_RELATIONS = {
                        姓名: 'username',
                        联系方式: 'mobile',
                        角色: 'role',
                        开通时间: 'openTime'
                    }
                    
                    /**
                     * 解析 excel 导入的时间格式
                     */
                    export const formatDate = numb => {
                        const time = new Date((numb - 1) * 24 * 3600000 + 1)
                        time.setYear(time.getFullYear() - 70)
                        const year = time.getFullYear() + ''
                        const month = time.getMonth() + 1 + ''
                        const date = time.getDate() - 1 + ''
                        return year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date)
                    }↥
            【5】用户列表导出为excel
                src/views/user-manage/index.vue ▾
                    ↧<template>
                        <div class="user-manage-container">
                            <el-card class="header">
                                <div>
                                    <el-button type="success" ►@click="onToExcelClick"◄>{{ $t('msg.excel.exportExcel') }}</el-button>
                                </div>
                            </el-card>
                            <export-to-excel v-model="1►exportToExcelVisible◄"></export-to-excel>
                        </div>
                    <template>
                    
                    <script setup>
                    import ExportToExcel from './components/Export2Excel.vue'

                    /**
                     * excel 导出点击事件
                     */
                    const 1►exportToExcelVisible◄ = ref(false)
                    const ►onToExcelClick◄ = () => {
                        1►exportToExcelVisible◄.value = true
                    }
                    </script>↥
                src/api/user-manage.js ▾
                    ↧/**
                     * 获取所有用户列表数据
                     */
                    export const ►getUserManageAllList◄ = () => {
                        return request({
                            url: '/user-manage/all-list'
                        })
                    }↥
                src/views/user-manage/components/Export2Excel.vue ▾
                    ↧<template>
                        <el-dialog :title="$t('msg.excel.title')" :model-value="modelValue" @close="closed" width="30%">
                            <el-input :placeholder="$t('msg.excel.placeholder')" 1►v-model="excelName"◄></el-input>
                            <template #footer>
                                <span class="dialog-footer">
                                    <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
                                    <el-button type="primary" @click="onConfirm" 2►:loading="loading"◄>{{ $t('msg.excel.confirm') }}</el-button>
                                </span>
                            </template>
                        </el-dialog>
                    </template>

                    <script setup>
                    import { defineProps, defineEmits1►, ref◄ } from 'vue'
                    1►import { useI18n } from 'vue-i18n'
                    import { watchSwitchLang } from '@/utils/i18n'◄
                    2►import { getUserManageAllList } from '@/api/user-manage'◄
                    3►import { USER_RELATIONS } from './Export2ExcelConstants'
                    import { dateFormat } from '@/utils/date'◄

                    defineProps({
                        modelValue: {
                            type: Boolean,
                            required: true
                        }
                    })
                    const emits = defineEmits(['update:modelValue'])

                    /**
                    * 导出按钮点击事件
                    */
                    2►const loading = ref(false)◄
                    const onConfirm = async () => {
                        2►loading.value = true
                        const allUser = (await getUserManageAllList()).list◄
                        // 导入工具包
                        3►const excel = await import('@/utils/Export2Excel')
                        const data = formatJson(USER_RELATIONS, allUser)
                        excel.export_json_to_excel({                            
                            header: Object.keys(USER_RELATIONS), // excel 表头                            
                            data, // excel 数据（二维数组结构）                            
                            filename: excelName.value || exportDefaultName, // 文件名称                            
                            autoWidth: true, // 是否自动列宽                            
                            bookType: 'xlsx' // 文件类型
                        })◄
                        closed()
                    }
                    // 该方法负责将数组转化成二维数组
                    3►const formatJson = (headers, rows) => {
                        // 首先遍历数组[{ username: '张三'},{},{}]  => [[’张三'],[],[]]
                        return rows.map(item => {
                            return Object.keys(headers).map(key => {                                
                                if (headers[key] === 'openTime') {return dateFormat(item[headers[key]])} // 时间特殊处理
                                // 角色特殊处理
                                if (headers[key] === 'role') {
                                    const roles = item[headers[key]]
                                    return JSON.stringify(roles.map(role => role.title))
                                }
                                return item[headers[key]]
                            })
                        })
                    }◄

                    /**
                    * 关闭
                    */
                    const closed = () => {
                        2►loading.value = false◄
                        emits('update:modelValue', false)
                    }

                    1►const i18n = useI18n()
                    let exportDefaultName = i18n.t('msg.excel.defaultName')
                    const excelName = ref('')
                    excelName.value = exportDefaultName
                    watchSwitchLang(() => {
                        exportDefaultName = i18n.t('msg.excel.defaultName')
                        excelName.value = exportDefaultName
                    })◄
                    </script>↥
                src/uitils/Export2Excel.js ▾
                    ↧/* eslint-disable */
                    import { saveAs } from 'file-saver'
                    import XLSX from 'xlsx'

                    function datenum(v, date1904) {
                        if (date1904) v += 1462
                        var epoch = Date.parse(v)
                        return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
                    }

                    function sheet_from_array_of_arrays(data, opts) {
                        var ws = {}
                        var range = {
                            s: { c: 10000000, r: 10000000 },
                            e: { c: 0, r: 0 }
                        }
                        for (var R = 0; R != data.length; ++R) {
                            for (var C = 0; C != data[R].length; ++C) {
                                if (range.s.r > R) range.s.r = R
                                if (range.s.c > C) range.s.c = C
                                if (range.e.r < R) range.e.r = R
                                if (range.e.c < C) range.e.c = C
                                var cell = {
                                    v: data[R][C]
                                }
                                if (cell.v == null) continue
                                var cell_ref = XLSX.utils.encode_cell({ c: C, r: R })

                                if (typeof cell.v === 'number') cell.t = 'n'
                                else if (typeof cell.v === 'boolean') cell.t = 'b'
                                else if (cell.v instanceof Date) {
                                    cell.t = 'n'
                                    cell.z = XLSX.SSF._table[14]
                                    cell.v = datenum(cell.v)
                                } else cell.t = 's'

                                ws[cell_ref] = cell
                            }
                        }
                        if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
                        return ws
                    }

                    function Workbook() {
                        if (!(this instanceof Workbook)) return new Workbook()
                        this.SheetNames = []
                        this.Sheets = {}
                    }

                    function s2ab(s) {
                        var buf = new ArrayBuffer(s.length)
                        var view = new Uint8Array(buf)
                        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
                        return buf
                    }

                    export const export_json_to_excel = ({ multiHeader = [], header, data, filename, merges = [], autoWidth = true, bookType = 'xlsx' } = {}) => {    
                        filename = filename || 'excel-list' // 1. 设置文件名称    
                        data = [...data] // 2. 把数据解析为数组，并把表头添加到数组的头部
                        data.unshift(header)    
                        for (let i = multiHeader.length - 1; i > -1; i--) {data.unshift(multiHeader[i])} // 3. 解析多表头，把多表头的数据添加到数组头部（二维数组）    
                        var ws_name = 'SheetJS' // 4. 设置 Excel 表工作簿（第一张表格）名称    
                        var wb = new Workbook() // 5. 生成工作簿对象    
                        var ws = sheet_from_array_of_arrays(data) // 6. 将 data 数组（json格式）转化为 Excel 数据格式
                        // 7. 合并单元格相关（['A1:A2', 'B1:D1', 'E1:E2']）
                        if (merges.length > 0) {
                            if (!ws['!merges']) ws['!merges'] = []
                            merges.forEach(item => {ws['!merges'].push(XLSX.utils.decode_range(item))})
                        }
                        // 8. 单元格宽度相关
                        if (autoWidth) {
                            /*设置 worksheet 每列的最大宽度*/
                            const colWidth = data.map(row =>
                                row.map(val => {
                                    /*先判断是否为null/undefined*/
                                    if (val == null) { return {wch: 10}
                                    } else if (val.toString().charCodeAt(0) > 255) {
                                        /*再判断是否为中文*/
                                        return {wch: val.toString().length * 2}
                                    } else {
                                        return {wch: val.toString().length}
                                    }
                                })
                            )
                            /*以第一行为初始值*/
                            let result = colWidth[0]
                            for (let i = 1; i < colWidth.length; i++) {
                                for (let j = 0; j < colWidth[i].length; j++) {
                                    if (result[j]['wch'] < colWidth[i][j]['wch']) {result[j]['wch'] = colWidth[i][j]['wch']}
                                }
                            }
                            ws['!cols'] = result
                        }

                        // 9. 添加工作表（解析后的 excel 数据）到工作簿
                        wb.SheetNames.push(ws_name)
                        wb.Sheets[ws_name] = ws
                        // 10. 写入数据
                        var wbout = XLSX.write(wb, {bookType: bookType, bookSST: false, type: 'binary'})
                        // 11. 下载数据
                        saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), `${filename}.${bookType}`)
                    }↥
                npm i file-saver@2.0.5 --save // 文件下载工具
                src/views/user-manage/components/Export2ExcelConstants.js ▾
                    ↧/**
                     * 导入数据对应表
                     */
                    export const USER_RELATIONS = {
                        姓名: 'username',
                        联系方式: 'mobile',
                        角色: 'role',
                        开通时间: 'openTime'
                    }↥
                src/utils/date.js ▾
                    ↧import dayjs from 'dayjs'
                    export const dateFormat = (val, format = 'YYYY-MM-DD') => {
                        if (isNaN(val)) return val
                        val = parseInt(val)
                        return dayjs(val).format(format)
                    }↥                
        【4】用户详情的表格展示
            src/api/user-manage.js ▾ 获取用户详情接口
                ↧/**
                 * 获取用户详情
                 */
                export const userDetail = (id) => {
                    return request({
                        url: `/user-manage/detail/${id}`
                    })
                }↥
            src/views/user-manage/index.vue ▾
                ↧<el-button type="primary" size="mini" ►@click="onShowClick(row._id)"◄>{{ $t('msg.excel.show') }}</el-button>
                
                /**
                 * 查看按钮点击事件
                 */
                const ►onShowClick◄ = id => {
                    router.push(`/user/info/${id}`)
                }↥
            src/views/user-info/index.vue ▾
                ↧<template>
                    <div class="user-info-container">
                        <el-card class="print-box">
                            <el-button type="primary">{{ $t('msg.userInfo.print') }}</el-button>
                        </el-card>
                        <el-card>
                            <div class="user-info-box">
                                <!-- 标题 -->
                                <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>

                                <div class="header">
                                    <!-- 头部渲染表格 -->
                                    <el-descriptions :column="2" border>
                                        <el-descriptions-item :label="$t('msg.userInfo.name')">{{ 3►detailData◄.username }}</el-descriptions-item>
                                        <el-descriptions-item :label="$t('msg.userInfo.sex')">{{ 3►detailData◄.gender }}</el-descriptions-item>
                                        <el-descriptions-item :label="$t('msg.userInfo.nation')">{{ 3►detailData◄.nationality }}</el-descriptions-item>
                                        <el-descriptions-item :label="$t('msg.userInfo.mobile')">{{ 3►detailData◄.mobile }}</el-descriptions-item>
                                        <el-descriptions-item :label="$t('msg.userInfo.province')">{{ 3►detailData◄.province }}</el-descriptions-item>
                                        <el-descriptions-item :label="$t('msg.userInfo.date')">{{ $filters.dateFilter(3►detailData◄.openTime) }}</el-descriptions-item>
                                        <el-descriptions-item :label="$t('msg.userInfo.remark')" :span="2">
                                            <el-tag class="remark" size="small" v-for="(item, index) in 3►detailData◄.remark" :key="index">{{ item }}</el-tag>
                                        </el-descriptions-item>
                                        <el-descriptions-item :label="$t('msg.userInfo.address')" :span="2">{{ 3►detailData◄.address }}</el-descriptions-item>
                                    </el-descriptions>
                                    <!-- 头像渲染 -->
                                    <el-image class="avatar" :src="3►detailData◄.avatar" :preview-src-list="[3►detailData◄.avatar]"></el-image>
                                </div>
                                <div class="body">
                                    <!-- 内容渲染表格 -->
                                    <el-descriptions direction="vertical" :column="1" border>
                                        <el-descriptions-item :label="$t('msg.userInfo.experience')">
                                            <ul>
                                                <li v-for="(item, index) in 3►detailData◄.experience" :key="index">
                                                    <span>
                                                        {{ $filters.dateFilter(item.startTime, 'YYYY/MM') }}
                                                        ----
                                                        {{ $filters.dateFilter(item.endTime, 'YYYY/MM') }}</span
                                                    >
                                                    <span>{{ item.title }}</span>
                                                    <span>{{ item.desc }}</span>
                                                </li>
                                            </ul>
                                        </el-descriptions-item>
                                        <el-descriptions-item :label="$t('msg.userInfo.major')">
                                            {{ 3►detailData◄.major }}
                                        </el-descriptions-item>
                                        <el-descriptions-item :label="$t('msg.userInfo.glory')">
                                            {{ 3►detailData◄.glory }}
                                        </el-descriptions-item>
                                    </el-descriptions>
                                </div>
                                <!-- 尾部签名 -->
                                <div class="foot">{{ $t('msg.userInfo.foot') }}</div>
                            </div>
                        </el-card>
                    </div>
                </template>

                <script setup>
                import { userDetail } from '@/api/user-manage'
                import { watchSwitchLang } from '@/utils/i18n'
                import { ❶►defineProps◄, ref } from 'vue'

                ❶►const props = defineProps({
                    id: {
                        type: String,
                        required: true
                    }
                })◄

                // 数据相关
                const ❸►detailData◄ = ref({})
                const getUserDetail = async () => {
                    ❸►detailData◄.value = await userDetail(props.id)
                }
                ❷►getUserDetail()◄
                // 语言切换
                watchSwitchLang(getUserDetail)
                </script>

                <style lang="scss" scoped>
                .print-box {
                    margin-bottom: 20px;
                    text-align: right;
                }
                .user-info-box {
                    width: 1024px;
                    margin: 0 auto;
                    .title {
                        text-align: center;
                        margin-bottom: 18px;
                    }
                    .header {
                        display: flex;
                        ::v-deep .el-descriptions {
                            flex-grow: 1;
                        }
                        .avatar {
                            width: 187px;
                            box-sizing: border-box;
                            padding: 30px 20px;
                            border: 1px solid #ebeef5;
                            border-left: none;
                        }
                        .remark {
                            margin-right: 12px;
                        }
                    }
                    .body {
                        ul {
                            list-style: none;
                            li {
                                span {
                                    margin-right: 62px;
                                }
                            }
                        }
                    }
                    .foot {
                        margin-top: 42px;
                        text-align: right;
                    }
                }
                </style>↥
            src/router/index.js ▾ 传参支持
                ↧{
                    path: '/user/info/:id',
                    name: 'userInfo',
                    component: () => import('@/views/user-info/index'),
                    ►props: true◄,
                    meta: {
                        title: 'userInfo'
                    }
                }↥
            【5】局部打印
                npm i vue3-print-nb@0.1.4 --save
                src/views/user-info/index.vue ▾
                    ↧<el-button type="primary" ►v-print="printObj"◄ ►:loading="printLoading"◄>{{ $t('msg.userInfo.print') }}</el-button>

                    <div ►id="userInfoBox"◄ class="user-info-box">
                    
                    // 打印相关
                    const printLoading = ref(false)
                    const printObj = {
                        id: 'userInfoBox', // 打印区域
                        popTitle: 'imooc-vue-element-admin', // 打印标题                        
                        beforeOpenCallback(vue) {printLoading.value = true}, // 打印前                        
                        openCallback(vue) {printLoading.value = false} // 执行打印
                    }↥
                src/directives/index.js ▾
                    ↧import print from 'vue3-print-nb'

                    export default app => {
                        app.use(print)
                    }↥
                src/main.js ▾
                    ↧import installDirective from '@/directives'
                    
                    installDirective(app)↥
        【4】用户详情表格打印
        【4】用户删除
        【4】用户角色分配（需要在完成角色列表之后处理）
    【3】角色列表
    【3】权限列表
【2】权限受控解决方案之分级分控权限管理
    【3】角色列表展示        
        src/views/role-list/index.vue ▾
            ↧<template>
                <div class="">
                    <el-card>
                        <el-table :data="allRoles" border style="width: 100%">
                            <el-table-column :label="$t('msg.role.index')" type="index" width="120"> </el-table-column>
                            <el-table-column :label="$t('msg.role.name')" prop="title"> </el-table-column>
                            <el-table-column :label="$t('msg.role.desc')" prop="describe"> </el-table-column>
                            <el-table-column :label="$t('msg.role.action')" prop="action" width="260">
                                <el-button type="primary" size="mini">
                                    {{ $t('msg.role.assignPermissions') }}
                                </el-button>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </div>
            </template>

            <script setup>
            import { roleList } from '@/api/role'
            import { watchSwitchLang } from '@/utils/i18n'
            import { ref } from 'vue'

            const allRoles = ref([])
            const getRoleList = async () => {
                allRoles.value = await roleList()
            }
            getRoleList()
            watchSwitchLang(getRoleList)
            </script>↥
        src/api/role.js ▾
            ↧import request from '@/utils/request'

            /**
             * 获取所有角色
             */
            export const roleList = () => {
                return request({
                    url: '/role/list'
                })
            }↥
        【4】为用户分配角色
            src/views/user-manage/index.vue ▾
                ↧<el-button type="info" size="mini" 1►@click="onShowRoleClick(row)"◄>{{ $t('msg.excel.showRole') }}</el-button>
                
                <div class="user-manage-container">
                    ►<roles-dialog v-model="2►roleDialogVisible◄" 3►:userId="selectUserId"◄></roles-dialog>◄
                </div>

                import ►RolesDialog◄ from './components/roles.vue'
                import { watch } from 'vue'

                /**
                * 查看角色的点击事件
                */
                const 2►roleDialogVisible◄ = ref(false)
                const 3►selectUserId◄ = ref('')
                const 1►onShowRoleClick◄ = row => {
                    2►roleDialogVisible◄.value = true
                    3►selectUserId◄.value = row._id
                }
                // 保证每次打开重新获取用户角色数据
                watch(roleDialogVisible, val => {
                    if (!val) 3►selectUserId◄.value = ''
                })↥
            src/views/user-manage/components/roles.vue ▾
                ↧<template>
                    <el-dialog :title="$t('msg.excel.roleDialogTitle')" :model-value="modelValue" @close="closed">
                        <el-checkbox-group v-model="3►userRoleTitleList◄">
                            <el-checkbox v-for="item in 2►allRoleList◄" :key="item.id" :label="item.title"></el-checkbox>
                        </el-checkbox-group>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
                                <el-button type="primary" @click="4►onConfirm◄">{{ $t('msg.universal.confirm') }}</el-button>
                            </span>
                        </template>
                    </el-dialog>
                </template>

                <script setup>
                import { defineProps, defineEmits, ref, watch } from 'vue'
                import { roleList } from '@/api/role'
                import { watchSwitchLang } from '@/utils/i18n'
                import { userRoles, updateRole } from '@/api/user-manage'

                const props = defineProps({
                    modelValue: {
                        type: Boolean,
                        required: true
                    },
                    3►userId◄: {
                        type: String,
                        required: true
                    }
                })
                const emits = defineEmits(['update:modelValue', 5►'updateRole'◄])

                /**
                 * 确定按钮点击事件
                 */
                4►const i18n = useI18n()
                const onConfirm = async () => {
                    const roles = userRoleTitleList.value.map(title => {
                        return allRoleList.value.find(role => role.title === title) // 处理数据结构
                    })
                    await updateRole(props.userId, roles) // 更新用户角色
                    ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
                    closed()
                    
                    5►emits('updateRole')◄ // 更新成功通知父类
                }◄
                /**
                 * 关闭
                 */
                const closed = () => {
                    emits('update:modelValue', false)
                }

                // 所有角色
                const 2►allRoleList◄ = ref([])
                // 获取所有角色数据的方法
                const ❶►getListData◄ = async () => {
                    2►allRoleList◄.value = await roleList()
                }
                ❶►getListData◄()
                watchSwitchLang(getListData)

                // 当前用户角色
                3►const userRoleTitleList = ref([])                
                const getUserRoles = async () => {
                    const res = await userRoles(props.userId)
                    userRoleTitleList.value = res.role.map(item => item.title)
                }
                watch(() => props.userId, val => {
                    if (val) getUserRoles() // 此值依赖用户点击事件
                })◄
                </script>

                <style lang="scss" scoped></style>↥
            src/api/user-manage.js ▾
                ↧/*
                 * 获取指定用户角色
                 */
                export const userRoles = (id) => {
                    return request({
                        url: `/user-manage/role/${id}`
                    })
                }
                
                /**
                 * 分用户分配角色
                 */
                export const updateRole = (id, roles) => {
                    return request({
                        url: `/user-manage/update-role/${id}`,
                        method: 'POST',
                        data: {
                            roles
                        }
                    })
                }↥

























【1】项目架构之搭建登录架构解决方案与实现
hello> vue create admin ▾ 创建项目
    ↧(*) Choose Vue version
    (*) Babel
    (*) Router
    (*) Vuex
    (*) CSS Pre-processors
    (*) Linter / Formatter

      Sass/SCSS (with dart-sass)
    ►> Sass/SCSS (with node-sass)◄
      Less
      Stylus↥
.vscode/settings.json ▾ 规范
↧{
    "editor.formatOnSave": true,
    "vetur.format.defaultFormatter.html": "prettier",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[scss]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}↥
.prettierrc.js ▾ 规范工具
    ↧module.exports = {
        semi: false,                         // 不尾随分号
        trailingComma: 'none',               // 不尾随逗号
        singleQuote: true,                   // 使用单引号
        tabWidth: 4,                         // 代码缩进
        
        useTabs: false,                      // 使用tab还是空格
        jsxSingleQuote: false,               // JSX双引号        
        bracketSpacing: true,                // 在对象文字中打印括号之间的空格
        jsxBracketSameLine: true,            // > 标签放在最后一行的末尾，而不是单独放在下一行
        arrowParens: 'avoid',                // 箭头圆括号        
        insertPragma: false,                 // 在文件顶部插入一个特殊的 @format 标记
        endOfLine: 'auto',                   // 行尾换行格式
        HTMLWhitespaceSensitivity: 'ignore',
        printWidth: 2000,                    // 最大长度200个字符
    }↥
.eslintrc.js ▾ 规范标准
    ↧module.exports = {
        rules: {
            indent: 'off',
            "space-before-function-paren": "off"
        }
    }↥
.editorconfig ▾ 如果项目中有该文件用来定义项目的编码规范 优先级比编辑器自身的设置要高 需与Prettier和ESLint相符
    ↧[*.{js,jsx,ts,tsx,vue}]
    indent_style = space
    indent_size = 2
    trim_trailing_whitespace = true
    insert_final_newline = true↥
清空 src/views/ 和 src/components/[{color:#f66}]
src/main.js ▾
    ↧import { ►createApp◄ } from 'vue'
    import router from './router'
    import store from './store'
    import App from './App.vue'

    const app = ►createApp◄(App)
    app.use(store)
    app.use(router)
    app.mount('#app')↥
src/App.vue ▾
    ↧<template>
        <router-view />
    </template>

    <style lang="scss"></style>↥
src/router/index.js ▾
    ↧import { ►createRouter◄, createWebHashHistory } from 'vue-router'

    const routes = []

    const router = ►createRouter◄({
        history: createWebHashHistory(),
        routes
    })

    export default router↥
http://localhost:8080/

【2】预设部署
    src/constant/index.js ▾ 抽取常量
        ↧// token
        export const TOKEN = 'token'
        // token 时间戳
        export const TIME_STAMP = 'timeStamp'
        // 超时时长(毫秒) 两小时
        export const TOKEN_TIMEOUT_VALUE = 2 * 3600 * 1000
        // 国际化
        export const LANG = 'language'
        // 主题色保存的 key
        export const MAIN_COLOR = 'mainColor'
        // 默认色值
        export const DEFAULT_COLOR = '#409eff'
        // tags
        export const TAGS_VIEW = 'tagsView'↥

【2】构建登录页面 UI 结构
    src/router/index.js ▾
        ↧/**
         * 公开路由表
         */
        const ►publicRoutes◄ = [
            {
                path: '/login',
                component: () => import('@/views/login/index')
            }
        ]

        const router = createRouter({
            routes: ►publicRoutes◄
        })↥
    src/views/login
    src/views/login/index.vue ▾
        ↧<template>
            <div class="login-container">
                <el-form class="login-form">
                    <div class="title-container">
                        <h3 class="title">用户登录</h3>
                    </div>

                    <el-form-item prop="username">
                        <span class="svg-container">
                            <svg-icon icon="user" />
                        </span>
                        <el-input placeholder="username" name="username" type="text" />
                    </el-form-item>

                    <el-form-item prop="password">
                        <span class="svg-container">
                            <svg-icon icon="password" />
                        </span>
                        <el-input placeholder="password" name="password" />
                        <span class="show-pwd">
                            <svg-icon icon="eye" />
                        </span>
                    </el-form-item>

                    <el-button type="primary" style="width: 100%; margin-bottom: 30px">登录</el-button>
                </el-form>
            </div>
        </template>

        <script setup>
        // 导入组件之后无需注册可直接使用
        import {} from '@element-plus/icons'
        import {} from 'vue'
        </script>
        
        <style lang="scss" scoped>
        $bg: #2d3a4b;
        $dark_gray: #889aa4;
        $light_gray: #eee;
        $cursor: #fff;

        .login-container {
            min-height: 100%;
            width: 100%;
            background-color: $bg;
            overflow: hidden;

            .login-form {
                position: relative;
                width: 520px;
                max-width: 100%;
                padding: 160px 35px 0;
                margin: 0 auto;
                overflow: hidden;

                ::v-deep .el-form-item {
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 5px;
                    color: #454545;
                }

                ::v-deep .el-input {
                    display: inline-block;
                    height: 47px;
                    width: 85%;

                    input {
                        background: transparent;
                        border: 0px;
                        -webkit-appearance: none;
                        border-radius: 0px;
                        padding: 12px 5px 12px 15px;
                        color: $light_gray;
                        height: 47px;
                        caret-color: $cursor;
                    }
                }
            }

            .svg-container {
                padding: 6px 5px 6px 15px;
                color: $dark_gray;
                vertical-align: middle;
                display: inline-block;
            }

            .title-container {
                position: relative;

                .title {
                    font-size: 26px;
                    color: $light_gray;
                    margin: 0px auto 40px auto;
                    text-align: center;
                    font-weight: bold;
                }
            }

            .show-pwd {
                position: absolute;
                right: 10px;
                top: 7px;
                font-size: 16px;
                color: $dark_gray;
                cursor: pointer;
                user-select: none;
            }
        }
        </style>↥    
    src/styles/index.scss ▾
        ↧html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
            font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
        }

        #app {
            height: 100%;
        }

        *,
        *:before,
        *:after {
            box-sizing: inherit;
            margin: 0;
            padding: 0;
        }

        a:focus,
        a:active {
            outline: none;
        }

        a,
        a:focus,
        a:hover {
            cursor: pointer;
            color: inherit;
            text-decoration: none;
        }

        div:focus {
            outline: none;
        }

        .clearfix {
            &:after {
                visibility: hidden;
                display: block;
                font-size: 0;
                content: ' ';
                clear: both;
                height: 0;
            }
        }↥
    src/main.js ▾
        ↧// 导入全局样式
        import './styles/index.scss'↥
    导入[Element Plus](https://element-plus.gitee.io/zh-CN/)
        快捷方式 ▾
            ↧
            admin> vue add element-plus
                ? How do you want to import Element Plus?  // 如何导入Element Plus
                    > Fully import     // 全局导入
                    Import on demand // 按需导入
                ? Do you want to overwrite the SCSS variables of Element Plus? (y/N)     // 生成覆盖变量的scss文件
                ? Choose the locale you want to load, the default locale is English (en) // 选择想要加载的语言环境，默认语言环境是英语
                    en 
                    > zh-cn 
                    af-za 
                ✔  Successfully installed plugin: vue-cli-plugin-element-plus
            src/App.vue
                <template>
                    <router-view />
                </template>

                <script>
                export default {
                    name: 'App'
                }
                </script>

                <style></style>
            src/main.js
                import installElementPlus from './plugins/element'
                installElementPlus(app)↥
        方式二 ▾
            ↧
            admin> npm i element-plus --save // 1.0.2-beta.28
            src/main.js
                import ElementPlus from 'element-plus'
                import 'element-plus/dist/index.css'
                app.use(ElementPlus)
            使用: <el-button>默认按钮</el-button>↥
    SVG图标通用解决方案
        src/components/SvgIcon/index.vue ▾
            ↧<template>
                <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" :class="className" />
                <svg v-else class="svg-icon" :class="className" aria-hidden="true">
                    <use :xlink:href="iconName" />
                </svg>
            </template>

            <script setup>
            import { isExternal as external } from '@/utils/validate'
            import { defineProps, computed } from 'vue'
            const props = defineProps({
                // icon 图标
                icon: {
                    type: String,
                    required: true
                },
                // 图标类名
                className: {
                    type: String,
                    default: ''
                }
            })

            /**
            * 判断是否为外部图标
            */
            const isExternal = computed(() => external(props.icon))
            /**
            * 外部图标样式
            */
            const styleExternalIcon = computed(() => ({
                mask: `url(${props.icon}) no-repeat 50% 50%`,
                '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
            }))
            /**
            * 项目内图标
            */
            const iconName = computed(() => `#icon-${props.icon}`)
            </script>

            <style scoped>
            .svg-icon {
                width: 1em;
                height: 1em;
                vertical-align: -0.15em;
                fill: currentColor;
                overflow: hidden;
            }

            .svg-external-icon {
                background-color: currentColor;
                mask-size: cover !important;
                display: inline-block;
            }
            </style>↥
        src/utils/validate.js ▾
            ↧/**
             * 判断是否为外部资源
             */
            export function isExternal(path) {
                return /^(https?:|mailto:|tel:)/.test(path)
            }↥
        使用：外部图标
            import SvgIcon from '@/components/SvgIcon'
            <svg-icon icon="https://res.lgdsunday.club/user.svg"></svg-icon>

        使用：内部图标
            src/icons/
            src/icons/svg/ // SVG资源
            src/icons/index.js ▾
                ↧import SvgIcon from '@/components/SvgIcon'
                // 1. 导入所有的SVG图标
                // https://webpack.docschina.org/guides/dependency-management/#requirecontext
                // 通过 require.context() 函数来创建自己的 context
                const svgRequire = require.context('./svg', false, /\.svg$/)
                // 此时返回一个 require 的函数，可以接受一个 request 的参数，用于 require 的导入。
                // 该函数提供了三个属性，可以通过 require.keys() 获取到所有的 svg 图标
                // 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入
                svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

                // 2. 完成SvgIcon全局注册
                export default app => {
                    app.component('svg-icon', SvgIcon)
                }↥
            src/main.js ▾
                ↧// 导入 svgIcon
                import installIcons from '@/icons'
                installIcons(app)↥
            admin> npm i --save-dev svg-sprite-loader@6.0.9
            vue.config.js ▾
                ↧const path = require('path')
                function resolve(dir) {
                    return path.join(__dirname, dir)
                }
                // https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
                module.exports = {
                    chainWebpack(config) {
                        // 设置 svg-sprite-loader
                        config.module.rule('svg').exclude.add(resolve('src/icons')).end()
                        config.module
                            .rule('icons')
                            .test(/\.svg$/)
                            .include.add(resolve('src/icons'))
                            .end()
                            .use('svg-sprite-loader')
                            .loader('svg-sprite-loader')
                            .options({
                                symbolId: 'icon-[name]'
                            })
                            .end()
                    }
                }↥
            重新启动项目
    http://localhost:8080/#/Login

【2】登陆逻辑
    表单验证
        src/views/login/index.vue ▾
            ↧▧<el-form :model="1►loginForm◄" :rules="2►loginRules◄">
                <el-form-item prop="username">
                    <el-input v-model="1►loginForm◄.username" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="1►loginForm◄.password" />
                </el-form-item>
            </el-form>
                
            <script setup>
            import { ref } from 'vue'
            import { 3►validatePassword◄ } from './rules'
            // 数据源
            const 1►loginForm◄ = ref({
                username: 'super-admin',
                password: '123456'
            })
            // 验证规则
            const 2►loginRules◄ = ref({
                username: [{required: true, trigger: 'blur', message: '用户名为必填项'}],
                password: [{required: true, trigger: 'blur', validator: 3►validatePassword◄()}]
            })
            </script>▨↥
        src/views/login/rules.js ▾
            ↧▧export const 3►validatePassword◄ = () => {
                return (rule, value, callback) => {
                    if (value.length < 6) {
                        callback(new Error('密码不能少于6位'))
                    } else {
                        callback()
                    }
                }
            }▨↥
    密码框状态通用处理
        src/views/login/index.vue ▾
        ↧▧<el-input placeholder="password" name="password" 2►:type="passwordType"◄ v-model="loginForm.password" /> 
        <svg-icon 2►:icon="passwordType === 'password' ? 'eye' : 'eye-open'"◄ 3►@click="onChangePwdType"◄ />
        
        // 处理密码框文本显示状态
        const 2►passwordType◄ = ref('password')
        const 3►onChangePwdType◄ = () => {
            if (passwordType.value === 'password') {
                passwordType.value = 'text'
            } else {
                passwordType.value = 'password'
            }
        }▨↥
    通用后台登录方案        
        1.封装 axios 模块
            admin> npm i axios --save // 0.24.0
            .env.development ▾ 开发模式 baseurl
                ↧▧# 标志
                ENV = 'development'

                # base api
                1►VUE_APP_BASE_API◄ = '/api'▨↥
            .env.production ▾  生产模式 baseurl
                ↧▧# 标志
                ENV = 'production'

                # base api
                1►VUE_APP_BASE_API◄ = '/prod-api'▨↥
            src/utils/request.js ▾{color:#fff;background-color:#00c381} 引入使用 baseurl
                ↧▧import axios from 'axios'

                const service = axios.create({
                    baseURL: process.env.1►VUE_APP_BASE_API◄,
                    timeout: 5000
                })

                export default service▨↥
        2.封装 接口请求 模块
            src/api/sys.js ▾{color:#fff;background-color:#00c381}
                ↧▧import request from '@/utils/request'

                /**
                * 登录
                */
                export const 2►login◄ = data => {
                    return request({
                        url: '/sys/login',
                        method: 'POST',
                        data
                    })
                }▨↥
        3.封装登录请求动作
            admin> npm i md5 --save
            src/store/modules/user.js ▾{color:#fff;background-color:#00c381} 封装请求
                ↧▧import { 2►login◄ } from '@/api/sys'
                import md5 from 'md5'
                3►export default◄ {
                    namespaced: true,
                    state: () => ({}),
                    mutations: {},
                    actions: {
                        3►login◄(context, userInfo) {
                            const { username, password } = userInfo
                            return new Promise((resolve, reject) => {
                                2►login◄({
                                    username,
                                    password: md5(password)
                                })
                                    .then(data => {
                                        resolve()
                                    })
                                    .catch(err => {
                                        reject(err)
                                    })
                            })
                        }
                    }
                }▨↥
            src/store/index.js ▾
                ↧▧import { createStore } from 'vuex'
                import 3►user◄ from './modules/user.js'
                export default createStore({
                    modules: {
                        3►user◄
                    }
                })▨↥
            src/views/login/index.vue ▾{color:#fff;background-color:#00c381} 请求
                ↧▧<el-form 0►ref="loginFromRef"◄ :model="loginForm" :rules="loginRules">
                    <el-button 0►:loading="loading"◄ 0►@click="handleLogin"◄>登录</el-button>
                </el-form>
                
                <script setup>
                import { ref } from 'vue'
                import { validatePassword } from './rules'
                import { useStore } from 'vuex'
                import { useRouter } from 'vue-router'

                // 登录动作处理
                const 0►loading◄ = ref(false)
                const 0►loginFromRef◄ = ref(null)
                const store = useStore()
                const router = useRouter()
                const 0►handleLogin◄ = () => {
                    0►loginFromRef◄.value.validate(valid => {
                        if (!valid) return

                        0►loading◄.value = true
                        store
                        .dispatch('3►user/login◄', loginForm.value)
                        .then(() => {
                            0►loading◄.value = false
                            // TODO: 登录后操作
                            router.push('/')
                        })
                        .catch(err => {
                            console.log(err)
                            0►loading◄.value = false
                        })
                    })
                }
                </script>▨↥
            vue.config.js ▾
                ↧▧module.exports = {
                    devServer: {
                        // 配置反向代理
                        proxy: {
                            // 当地址中有/api的时候会触发代理机制
                            '/api': {
                                // 要代理的服务器地址  这里不用写 api
                                target: 'https://api.imooc-admin.lgdsunday.club/',
                                changeOrigin: true // 是否跨域
                            }
                        }
                    }
                }▨↥
        4.保存服务端返回的 token
            src/utils/storage.js ▾ 封装localStorage操作方法
                ↧▧/**
                 * 存储数据
                 */
                export const setItem = (key, value) => {
                    // 将数组、对象类型的数据转化为 JSON 字符串进行存储
                    if (typeof value === 'object') {
                        value = JSON.stringify(value)
                    }
                    window.localStorage.setItem(key, value)
                }

                /**
                 * 获取数据
                 */
                export const getItem = key => {
                    const data = window.localStorage.getItem(key)
                    try {
                        return JSON.parse(data)
                    } catch (err) {
                        return data
                    }
                }

                /**
                 * 删除数据
                 */
                export const removeItem = key => {
                    window.localStorage.removeItem(key)
                }

                /**
                 * 删除所有数据
                 */
                export const removeAllItem = key => {
                    window.localStorage.clear()
                }▨↥
            src/constant/index.js ▾ 抽取TOKEN键值为常量
                ↧export const TOKEN = 'token'↥
            src/store/modules/user.js ▾{color:#fff;background-color:#00c381}
                ↧▧import { login } from '@/api/sys'
                import md5 from 'md5'
                ❹import { setItem, getItem } from '@/utils/storage'
                import { TOKEN } from '@/constant'❹

                export default {
                    namespaced: true,
                    state: () => ({
                        ❸token: getItem(TOKEN) || ''❸
                    }),
                    mutations: {
                        ❷setToken(state, token) {
                            state.token = token
                            setItem(TOKEN, token)
                        }❷
                    },
                    actions: {
                        login(context, userInfo) {
                            const { username, password } = userInfo
                            return new Promise((resolve, reject) => {
                                login({
                                    username,
                                    password: md5(password)
                                })
                                    .then(data => {
                                        ❶this.commit('user/setToken', data.data.data.token)❶
                                        resolve()
                                    })
                                    .catch(err => {
                                        reject(err)
                                    })
                            })
                        }
                    }
                }▨↥            
            src/utils/request.js ▾ 响应数据的统一处理 data.data.data.token > data.token 
                ↧▧import { ElMessage } from 'element-plus'

                // 响应拦截器

                service.interceptors.response.use(
                    response => {
                        const { success, message, data } = response.data
                        //   要根据success的成功与否决定下面的操作
                        if (success) {
                            return data
                        } else {
                            // 业务错误
                            ElMessage.error(message) // 提示错误消息
                            return Promise.reject(new Error(message))
                        }
                    },
                    error => {
                        // TODO: 将来处理 token 超时问题
                        ElMessage.error(error.message) // 提示错误信息
                        return Promise.reject(error)
                    }
                )▨↥
            src/store/modules/user.js ▾
                ↧▧❶this.commit('user/setToken', data.token)❶▨↥
        5.登录鉴权
            src/layout/index.vue
            src/router/index.js ▾
                ↧{
                    path: '/',
                    component: () => import('@/layout/index')
                }↥
            src/permission.js ▾{color:#fff;background-color:#00c381} 鉴权模块
                ↧▧import router from './router'
                import store from './store'

                // 白名单
                const whiteList = ['/login']

                // 路由前置守卫
                router.beforeEach(async (to, from, next) => {
                    // 存在 token 进入主页
                    if (store.getters.token) {
                        if (to.path === '/login') {
                            next('/')
                        } else {
                            next()
                        }
                    } else {                        
                        if (whiteList.indexOf(to.path) > -1) {
                            next()
                        } else {
                            next('/login')
                        }
                    }
                })▨↥
            src/store/getters.js ▾ 快捷访问 store.state.user.token > store.getters.token
                ↧const getters = {
                    token: state => state.user.token
                }
                export default getters↥
            src/store/index.js ▾
                ↧import getters from './getters'
                export default createStore({
                    getters
                })↥
            src/main.js ▾{color:#fff;background-color:#00c381} 导入鉴权模块
                ↧import './permission'↥

【2】搭建Layout架构
    src/layout/
        index.vue ▾ 基础架构
            ↧<template>
                <div class="app-wrapper">
                    <!-- 左侧 menu -->
                    <sidebar class="sidebar-container" :style="{ backgroundColor: variables.menuBg }" />
                    <div class="main-container">
                        <div class="fixed-header">
                            <!-- 顶部的 navbar -->
                            <navbar />
                        </div>
                        <!-- 内容区 -->
                        <app-main />
                    </div>
                </div>
            </template>

            <script setup>
            import Navbar from './components/Navbar'
            import Sidebar from './components/Sidebar/'
            import AppMain from './components/AppMain'

            import variables from '@/styles/variables.scss'
            </script>

            <style lang="scss" scoped>
            @import '~@/styles/mixin.scss';
            @import '~@/styles/variables.scss';

            .app-wrapper {
                @include clearfix;
                position: relative;
                height: 100%;
                width: 100%;
            }

            .fixed-header {
                position: fixed;
                top: 0;
                right: 0;
                z-index: 9;
                width: calc(100% - #{$sideBarWidth});
            }
            </style>↥
        components/
            Sidebar/
                index.vue ▾
                    ↧<template>
                        <div class="">sidebar</div>
                    </template>

                    <script setup>
                    import {} from 'vue'
                    </script>

                    <style lang="scss" scoped></style>↥
            Navbar.vue ▾
                ↧<template>
                    <div class="">navbar</div>
                </template>

                <script setup>
                import {} from 'vue'
                </script>

                <style lang="scss" scoped></style>↥
            AppMain.vue ▾
                ↧<template>
                    <div class="app-main">AppMain</div>
                </template>

                <script setup>
                import {} from 'vue'
                </script>

                <style lang="scss" scoped>
                .app-main {
                    min-height: calc(100vh - 50px);
                    width: 100%;
                    position: relative;
                    overflow: hidden;
                    padding: 61px 20px 20px 20px;
                    box-sizing: border-box;
                }
                </style>↥
    src/styles/
        index.scss ▾
            ↧@import './variables.scss';
            @import './mixin.scss';
            @import './sidebar.scss';
            ...↥
        variables.scss ▾ 定义常量
            ↧// sidebar
            $menuText: #bfcbd9;
            $menuActiveText: #ffffff;
            $subMenuActiveText: #f4f4f5;

            $menuBg: #304156;
            $menuHover: #263445;

            $subMenuBg: #1f2d3d;
            $subMenuHover: #001528;

            $sideBarWidth: 210px;    // 侧栏展开时宽度
            $hideSideBarWidth: 54px; // 侧栏收缩后宽度
            $sideBarDuration: 0.28s; // 侧栏开闭动画时长

            // https://www.bluematador.com/blog/how-to-share-variables-between-js-and-sass
            // JS 与 scss 共享变量，在 scss 中通过 :export 进行导出，在 js 中可通过 ESM 进行导入
            :export {
                menuText: $menuText;
                menuActiveText: $menuActiveText;
                subMenuActiveText: $subMenuActiveText;
                menuBg: $menuBg;
                menuHover: $menuHover;
                subMenuBg: $subMenuBg;
                subMenuHover: $subMenuHover;
                sideBarWidth: $sideBarWidth;
            }↥
        mixin.scss ▾ 定义通用的 css
            ↧@mixin clearfix {
                &:after {
                    content: '';
                    display: table;
                    clear: both;
                }
            }

            @mixin scrollBar {
                &::-webkit-scrollbar-track-piece {
                    background: #d3dce6;
                }

                &::-webkit-scrollbar {
                    width: 6px;
                }

                &::-webkit-scrollbar-thumb {
                    background: #99a9bf;
                    border-radius: 20px;
                }
            }

            @mixin relative {
                position: relative;
                width: 100%;
                height: 100%;
            }↥
        sidebar.scss ▾ 处理 menu 菜单的样式
            ↧#app {
                .main-container {
                    min-height: 100%;
                    margin-left: $sideBarWidth;
                    position: relative;
                    transition: margin-left #{$sideBarDuration};
                }

                .sidebar-container {
                    width: $sideBarWidth !important;
                    height: 100%;
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 1001;
                    overflow: hidden;
                    
                    transition: width #{$sideBarDuration};

                    // 重置 element-plus 的css
                    .horizontal-collapse-transition {
                        transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
                    }

                    .scrollbar-wrapper {
                        overflow-x: hidden !important;
                    }

                    .el-scrollbar__bar.is-vertical {
                        right: 0px;
                    }

                    .el-scrollbar {
                        height: 100%;
                    }

                    &.has-logo {
                        .el-scrollbar {
                            height: calc(100% - 50px);
                        }
                    }

                    .is-horizontal {
                        display: none;
                    }

                    a {
                        display: inline-block;
                        width: 100%;
                        overflow: hidden;
                    }

                    .svg-icon {
                        margin-right: 16px;
                    }

                    .sub-el-icon {
                        margin-right: 12px;
                        margin-left: -2px;
                    }

                    .el-menu {
                        border: none;
                        height: 100%;
                        width: 100% !important;
                    }

                    .is-active > .el-submenu__title {
                        color: $subMenuActiveText !important;
                    }

                    & .nest-menu .el-submenu > .el-submenu__title,
                    & .el-submenu .el-menu-item {
                        min-width: $sideBarWidth !important;
                    }
                }

                .hideSidebar {
                    .sidebar-container {
                        width: 54px !important;
                    }

                    .main-container {
                        margin-left: 54px;
                    }

                    .submenu-title-noDropdown {
                        padding: 0 !important;
                        position: relative;

                        .el-tooltip {
                            padding: 0 !important;

                            .svg-icon {
                                margin-left: 20px;
                            }

                            .sub-el-icon {
                                margin-left: 19px;
                            }
                        }
                    }

                    .el-submenu {
                        overflow: hidden;

                        & > .el-submenu__title {
                            padding: 0 !important;

                            .svg-icon {
                                margin-left: 20px;
                            }

                            .sub-el-icon {
                                margin-left: 19px;
                            }

                            .el-submenu__icon-arrow {
                                display: none;
                            }
                        }
                    }

                    .el-menu--collapse {
                        .el-submenu {
                            & > .el-submenu__title {
                                & > span {
                                    height: 0;
                                    width: 0;
                                    overflow: hidden;
                                    visibility: hidden;
                                    display: inline-block;
                                }
                            }
                        }
                    }
                }

                .el-menu--collapse .el-menu .el-submenu {
                    min-width: $sideBarWidth !important;
                }

                .withoutAnimation {
                    .main-container,
                    .sidebar-container {
                        transition: none;
                    }
                }
            }

            .el-menu--vertical {
                & > .el-menu {
                    .svg-icon {
                        margin-right: 16px;
                    }
                    .sub-el-icon {
                        margin-right: 12px;
                        margin-left: -2px;
                    }
                }

                // 菜单项过长时
                > .el-menu--popup {
                    max-height: 100vh;
                    overflow-y: auto;

                    &::-webkit-scrollbar-track-piece {
                        background: #d3dce6;
                    }

                    &::-webkit-scrollbar {
                        width: 6px;
                    }

                    &::-webkit-scrollbar-thumb {
                        background: #99a9bf;
                        border-radius: 20px;
                    }
                }
            }↥
    头像菜单
        获取并展示用户信息                
            src/api/sys.js ▾ 定义接口请求方法
                ↧/**
                    * 获取用户信息
                    */
                export const getUserInfo = () => {
                    return request({
                        url: '/sys/profile'
                    })
                }↥
            src/store/modules/user ▾ 定义调用接口的动作 
                ↧▧import { 0►getUserInfo◄ } from '@/api/sys'

                export default {
                    state: () => ({
                        0►userInfo: {}◄
                    }),
                    mutations: {
                        0►setUserInfo(state, userInfo) {
                            state.userInfo = userInfo
                        }◄
                    },
                    actions: {
                        0►async getUserInfo(context) {
                            const res = await getUserInfo()
                            this.commit('user/setUserInfo', res)
                            return res
                        }◄
                    }
                }▨↥
            src/utils/request.js ▾ 通用token注入
                ↧import store from '@/store'

                // 请求拦截器
                service.interceptors.request.use(
                    config => {
                        // 在这个位置需要统一的去注入token
                        if (store.getters.token) {
                            // 如果token存在 注入token
                            config.headers.Authorization = `Bearer ${store.getters.token}`
                        }
                        return config // 必须返回配置
                    },
                    error => {
                        return Promise.reject(error)
                    }
                )↥
            src/permission.js ▾ 在权限拦截时触发动作
                ↧▧router.beforeEach(async (to, from, next) => {
                    if (store.getters.token) {
                        if (to.path === '/login') {
                            ...
                        } else {
                            // 判断用户资料是否获取
                            // 若不存在用户信息，则需要获取用户信息
                            if (!store.getters.hasUserInfo) {
                                // 触发获取用户信息的 action
                                2►await store.dispatch('user/getUserInfo')◄
                            }
                            next()
                        }
                    } else {
                        ...
                    }
                })▨↥
            src/store/getters.js ▾
                ↧const getters = {
                    userInfo: state => state.user.userInfo,
                    /**
                        * @returns true 表示已存在用户信息
                        */
                    hasUserInfo: state => {
                        return JSON.stringify(state.user.userInfo) !== '{}'
                    }
                }↥
        渲染用户头像菜单 element-plus中的dropdown组件使用
            src/layout/components/Navbar.vue ▾
                ↧▧<template>
                    <div class="navbar">
                        <div class="right-menu">
                            <!-- 头像 -->
                            0►<el-dropdown class="avatar-container" trigger="click">◄
                                0►<div class="avatar-wrapper">◄
                                    1►<el-avatar shape="square" :size="40" :src="$store.getters.userInfo.avatar"></el-avatar>◄
                                    <i class="el-icon-s-tools"></i>
                                0►</div>◄
                                0►<template #dropdown>◄
                                    2►<el-dropdown-menu class="user-dropdown">◄
                                        <router-link to="/">
                                            <el-dropdown-item> 首页 </el-dropdown-item>
                                        </router-link>
                                        <a target="_blank" href="">
                                            <el-dropdown-item>课程主页</el-dropdown-item>
                                        </a>
                                        <el-dropdown-item divided> 退出登录 </el-dropdown-item>
                                    2►</el-dropdown-menu>◄
                                0►</template>◄
                            0►</el-dropdown>◄
                        </div>
                    </div>
                </template>

                <script setup>
                import {} from 'vue'
                </script>

                <style lang="scss" scoped>
                .navbar {
                    height: 50px;
                    overflow: hidden;
                    position: relative;
                    background: #fff;
                    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

                    .right-menu {
                        display: flex;
                        align-items: center;
                        float: right;
                        padding-right: 16px;

                        ::v-deep .avatar-container {
                            cursor: pointer;
                            .avatar-wrapper {
                                margin-top: 5px;
                                position: relative;
                                .el-avatar {
                                    --el-avatar-background-color: none;
                                    margin-right: 12px;
                                }
                            }
                        }
                    }
                }
                </style>▨↥
        退出登录方案
            1.清理掉当前用户缓存数据
            2.清理掉权限相关配置
            3.返回到登录页
            用户主动退出：用户点击登录按钮之后退出
                src/store/modules/user.js ▾
                    ↧import { removeAllItem } from '@/utils/storage'
                    import router from '@/router'

                    export default {                            
                        actions: {
                            logout() {
                                this.commit('user/setToken', '')
                                this.commit('user/setUserInfo', {})
                                removeAllItem()
                                router.push('/login')
                            }
                        }
                    }↥
                src/layout/components/Navbar.vue ▾ 为退出登录按钮添加点击事件
                    ↧<el-dropdown-item divided @click="logout"> 退出登录 </el-dropdown-item>

                    import { useStore } from 'vuex'
                    const store = useStore()
                    const logout = () => {
                        store.dispatch('user/logout')
                    }↥
            用户被动退出：token过期或被其他人“顶下来”时退出
                主动计算token的失效时间(时效token)
                    src/utils/auth.js ▾
                        ↧import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
                        import { setItem, getItem } from '@/utils/storage'
                        /**
                        * 获取时间戳
                        */
                        export function getTimeStamp() {
                            return getItem(TIME_STAMP)
                        }
                        /**
                        * 设置时间戳
                        */
                        export function setTimeStamp() {
                            setItem(TIME_STAMP, Date.now())
                        }
                        /**
                        * 是否超时
                        */
                        export function isCheckTimeout() {
                            // 当前时间戳
                            var currentTime = Date.now()
                            // 缓存时间戳
                            var timeStamp = getTimeStamp()
                            return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
                        }↥
                    src/constant/index.js ▾ 抽取常量
                        ↧// token 时间戳
                        export const TIME_STAMP = 'timeStamp'
                        // 超时时长(毫秒) 两小时
                        export const TOKEN_TIMEOUT_VALUE = 2 * 3600 * 1000↥
                    src/store/modules/user.js ▾ 保存登录时间
                        ↧▧0►import { setTimeStamp } from '@/utils/auth'◄
                        export default {                                
                            actions: {
                                login(context, userInfo) {
                                    const { username, password } = userInfo
                                    return new Promise((resolve, reject) => {login().then(data => {                                            
                                        0►setTimeStamp()◄
                                    })})
                                }
                            }
                        }▨↥
                    src/utils/request.js ▾ 检测token是否过期
                        ↧▧3►import { isCheckTimeout } from '@/utils/auth'◄
                        // 请求拦截器
                        service.interceptors.request.use(
                            config => {
                                if (store.getters.token) {
                                    3►if (isCheckTimeout()) {                                            
                                        store.dispatch('user/logout')
                                        return Promise.reject(new Error('token 失效'))
                                    }◄
                                }
                            }
                        )▨↥
                被动 token过期 和 单点登录
                    src/utils/request.js ▾ 检测token是否过期
                        ↧▧3►import { isCheckTimeout } from '@/utils/auth'◄
                        // 响应拦截器
                        service.interceptors.response.use(
                            response => {},
                            error => {
                                // 处理 token 超时问题
                                3►if (error.response && error.response.data && error.response.data.code === 401) {
                                    store.dispatch('user/logout')
                                }◄
                                // 单点登录也一样协议返回码

                                ElMessage.error(error.message) // 提示错误信息
                                return Promise.reject(error)
                            }
                        )▨↥
    临时menu菜单
        src/layout/components/Sidebar/SidebarMenu.vue ▾
            ↧▧<template>
                <!-- 一级 menu 菜单 -->
                <1►el-menu◄ :uniqueOpened="true" default-active="2" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <!-- 子集 menu 菜单 -->
                    <2►el-submenu◄ index="1">
                        <template #title>
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <3►el-menu-item◄ index="1-1">选项1</3►el-menu-item◄>
                        <3►el-menu-item◄ index="1-2">选项2</3►el-menu-item◄>
                    </2►el-submenu◄>
                    <!-- 具体菜单项 -->
                    <3►el-menu-item◄ index="4">
                        <i class="el-icon-setting"></i>
                        <template #title>导航四</template>
                    </3►el-menu-item◄>
                </1►el-menu◄>
            </template>▨↥
        src/layout/components/Sidebar/index.vue ▾ 导入SidebarMenu
            ↧▧<template>
                <div class="">
                    <h1>占位</h1>
                    <el-scrollbar>
                        0►<sidebar-menu></sidebar-menu>◄
                    </el-scrollbar>
                </div>
            </template>

            <script setup>
            0►import SidebarMenu from './SidebarMenu'◄
            import {} from 'vue'
            </script>▨↥
    动态menu菜单
        路由表 对应menu菜单规则: 
            如果meta && meta.title && meta.icon
            如果存在children以el-sub-menu(子菜单)展示 否则 则以el-menu-item(菜单项)展示

        1.创建页面组件
            src/views/article-create/index.vue ▾ 创建文章
                ↧<template>
                    <div>
                        <h1>用户管理</h1>
                    </div>
                </template>

                <script setup></script>

                <style lang="scss" scoped></style>↥
            src/views/article-detail/index.vue // 文章详情
            src/views/article-ranking/index.vue // 文章排名
            src/views/error-page/404.vue // 错误页面
            src/views/error-page/401.vue // 错误页面
            src/views/import // 导入
            src/views/permission-list // 权限列表
            src/views/profile // 个人中心
            src/views/role-list // 角色列表
            src/views/user-info // 用户信息
            src/views/user-manage // 用户管理
        2.生成路由表
            src/router/index.js ▾
                ↧import { createRouter, createWebHashHistory } from 'vue-router'
                import layout from '@/layout'

                /**
                * 私有路由表
                */
                const privateRoutes = [
                    {
                        path: '/user',
                        component: layout,
                        redirect: '/user/manage',
                        meta: {
                            title: 'user',
                            icon: 'personnel'
                        },
                        children: [
                            {
                                path: '/user/manage',
                                component: () => import('@/views/user-manage/index'),
                                meta: {
                                    title: 'userManage',
                                    icon: 'personnel-manage'
                                }
                            },
                            {
                                path: '/user/role',
                                component: () => import('@/views/role-list/index'),
                                meta: {
                                    title: 'roleList',
                                    icon: 'role'
                                }
                            },
                            {
                                path: '/user/permission',
                                component: () => import('@/views/permission-list/index'),
                                meta: {
                                    title: 'permissionList',
                                    icon: 'permission'
                                }
                            },
                            {
                                path: '/user/info/:id',
                                name: 'userInfo',
                                component: () => import('@/views/user-info/index'),
                                meta: {
                                    title: 'userInfo'
                                }
                            },
                            {
                                path: '/user/import',
                                name: 'import',
                                component: () => import('@/views/import/index'),
                                meta: {
                                    title: 'excelImport'
                                }
                            }
                        ]
                    },
                    {
                        path: '/article',
                        component: layout,
                        redirect: '/article/ranking',
                        meta: {
                            title: 'article',
                            icon: 'article'
                        },
                        children: [
                            {
                                path: '/article/ranking',
                                component: () => import('@/views/article-ranking/index'),
                                meta: {
                                    title: 'articleRanking',
                                    icon: 'article-ranking'
                                }
                            },
                            {
                                path: '/article/:id',
                                component: () => import('@/views/article-detail/index'),
                                meta: {
                                    title: 'articleDetail'
                                }
                            },
                            {
                                path: '/article/create',
                                component: () => import('@/views/article-create/index'),
                                meta: {
                                    title: 'articleCreate',
                                    icon: 'article-create'
                                }
                            },
                            {
                                path: '/article/editor/:id',
                                component: () => import('@/views/article-create/index'),
                                meta: {
                                    title: 'articleEditor'
                                }
                            }
                        ]
                    }
                ]

                /**
                * 公开路由表
                */
                const publicRoutes = [
                    {
                        path: '/login',
                        component: () => import('@/views/login/index')
                    },
                    {
                        path: '/',
                        // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
                        component: layout,
                        redirect: '/profile',
                        children: [
                            {
                                path: '/profile',
                                name: 'profile',
                                component: () => import('@/views/profile/index'),
                                meta: {
                                    title: 'profile',
                                    icon: 'el-icon-user'
                                }
                            },
                            {
                                path: '/404',
                                name: '404',
                                component: () => import('@/views/error-page/404')
                            },
                            {
                                path: '/401',
                                name: '401',
                                component: () => import('@/views/error-page/401')
                            }
                        ]
                    }
                ]

                const router = createRouter({
                    history: createWebHashHistory(),
                    routes: [...publicRoutes, ...privateRoutes]
                })

                export default router↥
            src/layout/AppMain.vue ▾
                ↧<template>
                    <div class="app-main">
                        <router-view></router-view>
                    </div>
                </template>↥
        3.解析路由表
            src/utils/route.js ▾
                ↧import path from 'path'

                /**
                * 返回所有子路由
                */
                const getChildrenRoutes = routes => {
                    const result = []
                    routes.forEach(route => {
                        if (route.children && route.children.length > 0) {
                            result.push(...route.children)
                        }
                    })
                    return result
                }
                /**
                * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
                * @param {*} routes router.getRoutes()
                */
                export const filterRouters = routes => {
                    const childrenRoutes = getChildrenRoutes(routes)
                    return routes.filter(route => {
                        return !childrenRoutes.find(childrenRoute => {
                            return childrenRoute.path === route.path
                        })
                    })
                }

                /**
                * 判断数据是否为空值
                */
                function isNull(data) {
                    if (!data) return true
                    if (JSON.stringify(data) === '{}') return true
                    if (JSON.stringify(data) === '[]') return true
                    return false
                }
                /**
                * 根据 routes 数据，返回对应 menu 规则数组
                */
                export function generateMenus(routes, basePath = '') {
                    const result = []
                    // 遍历路由表
                    routes.forEach(item => {
                        // 不存在 children && 不存在 meta 直接 return
                        if (isNull(item.meta) && isNull(item.children)) return
                        // 存在 children 不存在 meta，进入迭代
                        if (isNull(item.meta) && !isNull(item.children)) {
                            result.push(...generateMenus(item.children))
                            return
                        }
                        // 合并 path 作为跳转路径
                        const routePath = path.resolve(basePath, item.path)
                        // 路由分离之后，存在同名父路由的情况，需要单独处理
                        let route = result.find(item => item.path === routePath)
                        if (!route) {
                            route = {
                                ...item,
                                path: routePath,
                                children: []
                            }

                            // icon 与 title 必须全部存在
                            if (route.meta.icon && route.meta.title) {
                                // meta 存在生成 route 对象，放入 arr
                                result.push(route)
                            }
                        }

                        // 存在 children 进入迭代到children
                        if (item.children) {
                            route.children.push(...generateMenus(item.children, route.path))
                        }
                    })
                    return result
                }↥
        4.生成menu菜单
            src/layout/components/Sidebar/SidebarMenu.vue ▾ 处理数据，作为最顶层 menu 载体
                ↧<template>
                    <!-- 一级 menu 菜单 -->
                    <el-menu :uniqueOpened="true" default-active="2" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                        <sidebar-item v-for="item in routes" :key="item.path" :route="item"></sidebar-item>
                    </el-menu>
                </template>                    

                <script setup>
                import { computed } from 'vue'
                import { useRouter } from 'vue-router'
                import { filterRouters, generateMenus } from '@/utils/route'
                import SidebarItem from './SidebarItem'

                const router = useRouter()
                const routes = computed(() => {
                    const filterRoutes = filterRouters(router.getRoutes())
                    return generateMenus(filterRoutes)
                })
                console.log(JSON.stringify(routes.value))
                </script>↥
            src/layout/components/Sidebar/SidebarItem.vue ▾ 根据数据处理 当前项为 el-submenu || el-menu-item
                ↧<template>
                    <!-- 支持渲染多级 menu 菜单 -->
                    <el-submenu v-if="route.children.length > 0" :index="route.path">
                        <template #title>
                            <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
                        </template>
                        <!-- 循环渲染 -->
                        <sidebar-item v-for="item in route.children" :key="item.path" :route="item"></sidebar-item>
                    </el-submenu>
                    <!-- 渲染 item 项 -->
                    <el-menu-item v-else :index="route.path">
                        <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
                    </el-menu-item>
                </template>

                <script setup>
                import MenuItem from './MenuItem'
                import { defineProps } from 'vue'
                // 定义 props
                defineProps({
                    route: {
                        type: Object,
                        required: true
                    }
                })
                </script>↥
            src/layout/components/Sidebar/MenuItem.vue ▾ 处理 el-menu-item 样式
                ↧<template>
                    <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
                    <svg-icon v-else :icon="icon"></svg-icon>
                    <span>{{ title }}</span>
                </template>

                <script setup>
                import { defineProps } from 'vue'
                defineProps({
                    title: {
                        type: String,
                        required: true
                    },
                    icon: {
                        type: String,
                        required: true
                    }
                })
                </script>

                <style lang="scss" scoped></style>↥

            残余：样式问题
                src/store/getters.js ▾
                    ↧import variables from '@/styles/variables.scss'
                    const getters = {
                        cssVar: state => variables
                    }
                    export default getters↥
                src/layout/components/Sidebar/SidebarMenu.vue ▾
                    ↧<!-- <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :uniqueOpened="true" default-active="2"  > -->
                    <el-menu 
                        :background-color="$store.getters.cssVar.menuBg" 
                        :text-color="$store.getters.cssVar.menuText" 
                        :active-text-color="$store.getters.cssVar.menuActiveText" 
                        :unique-opened="true">↥
            残余：路由跳转问题
                src/layout/components/Sidebar/SidebarMenu.vue ▾
                    ↧<el-menu router>↥
            残余：默认激活项
                src/layout/components/Sidebar/SidebarMenu.vue ▾
                    ↧import { useRoute } from 'vue-router'
                    <el-menu :default-active="activeMenu">
                    <script setup>
                    // 计算高亮 menu 的方法
                    const route = useRoute()
                    const activeMenu = computed(() => {
                        const { path } = route
                        return path
                    })
                    </script>↥
    左侧菜单伸缩功能实现
        src/store/modules/app.js ▾ 创建模块
            ↧export default {
                namespaced: true,
                state: () => ({
                    sidebarOpened: true
                }),
                mutations: {
                    triggerSidebarOpened(state) {
                        state.sidebarOpened = !state.sidebarOpened
                    }
                },
                actions: {}
            }↥
        src/store/index.js ▾ 引入模块
            ↧import app from './modules/app'
            export default createStore({
                modules: {
                    app
                }
            })↥
        src/store/getters.js ▾ 设置快捷访问
            ↧sidebarOpened: state => state.app.sidebarOpened↥
        src/components/Hamburger/index.vue ▾
            ↧<template>
                <div class="hamburger-container" @click="toggleClick">
                    <svg-icon class="hamburger" :icon="icon"></svg-icon>
                </div>
            </template>

            <script setup>
            import { computed } from 'vue'
            import { useStore } from 'vuex'

            const store = useStore()
            const toggleClick = () => {
                store.commit('app/triggerSidebarOpened')
            }

            const icon = computed(() => (store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'))
            </script>

            <style lang="scss" scoped>
            .hamburger-container {
                padding: 0 16px;
                .hamburger {
                    display: inline-block;
                    vertical-align: middle;
                    width: 20px;
                    height: 20px;
                }
            }
            </style>↥
        src/layout/components/Navbar.vue ▾
            ↧▧<template>
                <div class="navbar">
                    1►<hamburger class="hamburger-container" />◄
                </div>
            </template>

            <script setup>
            1►import Hamburger from '@/components/Hamburger'◄
            </script>

            <style lang="scss" scoped>
            .navbar {                
                1►.hamburger-container {
                    line-height: 46px;
                    height: 100%;
                    float: left;
                    cursor: pointer;                        
                    transition: background 0.5s; // hover 动画
                    &:hover {
                        background: rgba(0, 0, 0, 0.1);
                    }
                }◄
            }
            </style>▨↥
        src/layout/components/Sidebar/SidebarMenu.vue ▾
            ↧<el-menu :collapse="!$store.getters.sidebarOpened">↥
        src/layout/index.vue ▾
            ↧▧<div class="app-wrapper" 1►:class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"◄>

            <style lang="scss" scoped>
            .fixed-header {
                position: fixed;
                top: 0;
                right: 0;
                z-index: 9;
                width: calc(100% - #{$sideBarWidth});
                1►transition: width #{$sideBarDuration};◄
            }

            1►.hideSidebar .fixed-header {
                width: calc(100% - #{$hideSideBarWidth});
            }◄
            </style>▨↥
        src/layout/components/Sidebar/index.vue ▾ 完善占位
            ↧▧<template>
                <div class="">
                    1►<div class="logo-container">
                        <el-avatar size="44" shape="square" src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png" />
                        <h1 class="logo-title" v-if="$store.getters.sidebarOpened">imooc-admin</h1>
                    </div>◄
                    <el-scrollbar>
                        <sidebar-menu></sidebar-menu>
                    </el-scrollbar>
                </div>
            </template>

            <script setup>
            import SidebarMenu from './SidebarMenu'
            import {} from 'vue'
            </script>

            <style lang="scss" scoped>
            1►.logo-container {
                height: 44px;
                padding: 10px 0 22px 0;
                display: flex;
                align-items: center;
                justify-content: center;
                .logo-title {
                    margin-left: 10px;
                    color: #fff;
                    font-weight: 600;
                    line-height: 50px;
                    font-size: 16px;
                    white-space: nowrap;
                }
            }◄
            </style>▨↥
        src/styles/element.scss ▾
            ↧.el-avatar {
                --el-avatar-background-color: none !important;
            }↥
        src/styles/index.scss ▾
            ↧@import './element.scss';↥
    面包屑方案分析
        1.创建、渲染基本的面包屑组件
            src/components/Breadcrumb/index.vue ▾
                ↧<template>
                    <el-breadcrumb class="breadcrumb" separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                        <!-- 面包屑的最后一项 -->
                        <el-breadcrumb-item>
                            <span class="no-redirect">活动详情</span>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </template>

                <script setup>
                import {} from 'vue'
                </script>

                <style lang="scss" scoped>
                .breadcrumb {
                    display: inline-block;
                    font-size: 14px;
                    line-height: 50px;
                    margin-left: 8px;

                    ::v-deep .no-redirect {
                        color: #97a8be;
                        cursor: text;
                    }
                }
                </style>↥
            src/layout/components/Navbar.vue ▾ 导入面包屑
                ↧<template>
                    <div class="navbar">
                        <breadcrumb class="breadcrumb-container" />
                    </div>
                </template>
                <script setup>
                import Breadcrumb from '@/components/Breadcrumb'
                </script>
                <style lang="scss" scoped>
                .navbar {
                    .breadcrumb-container {
                        float: left;
                    }
                }
                </style>↥
        2.计算面包屑结构数据
            src/components/Breadcrumb/index.vue ▾
                ↧<script setup>
                import { ref, watch } from 'vue'
                import { useRoute } from 'vue-router'

                const route = useRoute()
                // 生成数组数据
                const breadcrumbData = ref([])
                const getBreadcrumbData = () => {
                    breadcrumbData.value = route.matched.filter(item => item.meta && item.meta.title)
                    console.log(breadcrumbData.value)
                }
                // 监听路由变化时触发
                watch(
                    route,
                    () => {
                        getBreadcrumbData()
                    },
                    {
                        immediate: true
                    }
                )
                </script>↥
        3.根据数据渲染动态面包屑内容
            src/components/Breadcrumb/index.vue ▾
                ↧<template>
                    <el-breadcrumb class="breadcrumb" separator="/">
                        <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">
                            <!-- 不可点击项 -->
                            <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{ item.meta.title }}</span>
                            <!-- 可点击项 -->
                            <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{ item.meta.title }}</a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </template>
                <script setup>
                import { useRouter } from 'vue-router'
                import { useStore } from 'vuex'

                // 处理点击事件
                const router = useRouter()
                const onLinkClick = item => {
                    console.log(item)
                    router.push(item.path)
                }

                // 将来需要进行主题替换，所以这里获取下动态样式
                const store = useStore()
                // eslint-disable-next-line
                const linkHoverColor = ref(store.getters.cssVar.menuBg)
                </script>

                <style lang="scss" scoped>
                .breadcrumb {
                    .redirect {
                        color: #666;
                        font-weight: 600;
                    }

                    .redirect:hover {
                        // 将来需要进行主题替换，所以这里不去写死样式
                        color: v-bind(linkHoverColor);
                    }
                }
                </style>↥  
            动画处理
                src/components/Breadcrumb/index.vue ▾
                    ↧▧<template>
                        <el-breadcrumb class="breadcrumb" separator="/">
                            0►<transition-group name="breadcrumb">◄
                            ...
                            0►</transition-group>◄
                        </el-breadcrumb>
                    </template>▨↥
                src/styles/transition.scss ▾
                    ↧.breadcrumb-enter-active,
                    .breadcrumb-leave-active {
                        transition: all 0.5s;
                    }

                    .breadcrumb-enter-from,
                    .breadcrumb-leave-active {
                        opacity: 0;
                        transform: translateX(20px);
                    }

                    .breadcrumb-leave-active {
                        position: absolute;
                    }↥
                src/styles/index.scss ▾
                    ↧@import './transition.scss';↥

【2】国际化
    实现原理 ▾
        ↧▧
        1. 定义 msg 值的数据源               2. 定义切换变量            3. 定义赋值函数                          4. 为 msg 赋值
        const messages = {                  let locale = 'en'         function t(key) {                       let msg = t('msg')
            en: {msg: 'hello world'},                                     return messages[locale][key]        console.log(msg)
            zh: {msg: '你好世界'}                                      }
        }▨↥
    基于 vue-i18n V9 的国际化实现方案
        admin> npm install vue-i18n@next // 安装 vue-i18n
        基础部署
            src/i18n/index.js ▾
                ↧const messages = {
                    en: {
                        msg: {
                            test: 'hello world'
                        }
                    },
                    zh: {
                        msg: {
                            test: '你好世界'
                        }
                    }
                }

                const locale = 'en'

                import { createI18n } from 'vue-i18n'
                const i18n = createI18n({
                    // 使用 Composition API 模式，则需要将其设置为false
                    legacy: false,
                    // 全局注入 $t 函数
                    globalInjection: true,
                    locale,
                    messages
                })

                export default i18n↥
            src/main.js ▾
                ↧▧0►import i18n from '@/i18n'◄ // 在APP.vue之前导入 因为会在app.vue中使用国际化内容
                import App from './App.vue'

                const app = createApp(App)
                0►app.use(i18n)◄▨↥
            src/layout/components/Sidebar/index.vue ▾
                ↧<h1 class="logo-title" v-if="$store.getters.sidebarOpened">{{ $t('msg.test') }}</h1>↥
        封装 langSelect 组件用于修改 locale
            src/store/modules/app.js ▾
                ↧▧0►import { LANG } from '@/constant'◄
                0►import { getItem, setItem } from '@/utils/storage'◄
                export default {
                    state: () => ({
                        0►language: getItem(LANG) || 'zh'◄
                    }),
                    mutations: {
                        /**
                        * 设置国际化
                        */
                        0►setLanguage(state, lang) {
                            setItem(LANG, lang)
                            state.language = lang
                        }◄
                    },
                    actions: {}
                }▨↥
            src/constant/index.js ▾ 抽取TOKEN键值为常量
                ↧// 国际化
                export const LANG = 'language'↥
            src/components/LangSelect/index.vue ▾
                ↧<template>
                    <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
                        <div>
                            <el-tooltip content="国际化" :effect="effect">
                                <svg-icon icon="language"/>
                            </el-tooltip>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item :disabled="language === 'zh'" command="zh"> 中文 </el-dropdown-item>
                                <el-dropdown-item :disabled="language === 'en'" command="en"> English </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>

                <script setup>
                import { useI18n } from 'vue-i18n'
                import { defineProps, computed } from 'vue'
                import { useStore } from 'vuex'
                import { ElMessage } from 'element-plus'

                defineProps({
                    effect: {
                        type: String,
                        default: 'dark',
                        validator: function (value) {
                            // 这个值必须匹配下列字符串中的一个
                            return ['dark', 'light'].indexOf(value) !== -1
                        }
                    }
                })

                const store = useStore()
                const language = computed(() => store.getters.language)

                // 切换语言的方法
                const i18n = useI18n()
                const handleSetLanguage = lang => {
                    i18n.locale.value = lang
                    store.commit('app/setLanguage', lang)
                    ElMessage.success('更新成功')
                }
                </script>↥
            src/layout/components/Navbar.vue ▾
                ↧▧<template>
                    <div class="navbar">
                        <div class="right-menu">
                            1►<lang-select class="right-menu-item hover-effect" />◄
                        </div>
                    </div>
                </template>

                <script setup>
                1►import LangSelect from '@/components/LangSelect'◄
                </script>

                <style lang="scss" scoped>
                .navbar {     
                    .right-menu {
                        1►::v-deep .right-menu-item {
                            display: inline-block;
                            padding: 0 18px 0 0;
                            font-size: 24px;
                            color: #5a5e66;
                            vertical-align: text-bottom;

                            &.hover-effect {
                                cursor: pointer;
                            }
                        }◄
                    }
                }
                </style>▨↥
        语言包
            src/i18n/lang/
            src/i18n/lang/en.js ▾
                ↧export default {
                    login: {
                        title: 'User Login',
                        loginBtn: 'Login',
                        usernameRule: 'Username is required',
                        passwordRule: 'Password cannot be less than 6 digits',
                        desc: `
                    Test authority account:<br />
                    Provide three kinds of authority accounts:<br />
                    1. Super administrator account: super-admin <br />
                    2. Administrator account: admin <br />
                    3. Test configurable account: test <br />
                    The uniform password is: 123456 <br />
                    <br />
                    Import user account:<br />
                    You can log in with the imported username <br />
                    The password is unified as: 123456 <br />
                    <b>Note: Import user-discriminatory Chinese and English libraries! ! ! ! </b>
                    `
                    },
                    route: {
                        profile: 'Profile',
                        user: 'user',
                        excelImport: 'ExcelImport',
                        userManage: 'EmployeeManage',
                        userInfo: 'UserInfo',
                        roleList: 'RoleList',
                        permissionList: 'PermissionList',
                        article: 'article',
                        articleRanking: 'ArticleRanking',
                        articleCreate: 'ArticleCreate',
                        articleDetail: 'ArticleDetail',
                        articleEditor: 'ArticleEditor'
                    },
                    toast: {
                        switchLangSuccess: 'Switch Language Success'
                    },
                    tagsView: {
                        refresh: 'Refresh',
                        close: 'Close',
                        closeRight: 'Close Rights',
                        closeOther: 'Close Others'
                    },
                    theme: {
                        themeColorChange: 'Theme Color Change',
                        themeChange: 'Theme Change'
                    },
                    universal: {
                        confirm: 'confirm',
                        cancel: 'cancel'
                    },
                    navBar: {
                        themeChange: 'Theme Modification',
                        headerSearch: 'Page Search',
                        screenfull: 'Full Screen Replacement',
                        lang: 'Globalization',
                        guide: 'Function Guide',
                        home: 'Home',
                        course: 'Course homepage',
                        logout: 'Log out'
                    },
                    guide: {
                        close: 'close',
                        next: 'next',
                        prev: 'previous',
                        done: 'Done',
                        guideTitle: 'guidance',
                        guideDesc: 'Turn on the boot function',
                        hamburgerTitle: 'Hamburger button',
                        hamburgerDesc: 'Open and close the left menu',
                        breadcrumbTitle: 'Bread crumbs',
                        breadcrumbDesc: 'Indicates the current page position',
                        searchTitle: 'search',
                        searchDesc: 'Page link search',
                        fullTitle: 'full screen',
                        fullDesc: 'Page display switching',
                        themeTitle: 'theme',
                        themeDesc: 'Change project theme',
                        langTitle: 'globalization',
                        langDesc: 'Language switch',
                        tagTitle: 'Label',
                        tagDesc: 'Opened page tab',
                        sidebarTitle: 'menu',
                        sidebarDesc: 'Project function menu'
                    },
                    profile: {
                        muted: '"Vue3 rewrite vue-element-admin, realize the back-end front-end integrated solution" project demonstration',
                        introduce: 'Introduce',
                        projectIntroduction: 'Project Introduction',
                        projectFunction: 'Project Function',
                        feature: 'Feature',
                        chapter: 'Chapter',
                        author: 'Author',
                        name: 'Sunday',
                        job: 'A front-end development program',
                        Introduction: 'A senior technical expert, once worked in a domestic first-line Internet company, and has coordinated multiple large-scale projects with more than tens of millions of users. Committed to researching big front-end technology, he has been invited to participate in domestic front-end technology sharing sessions many times, such as: Google China Technology Sharing Session in 2018.'
                    },
                    userInfo: {
                        print: 'Print',
                        title: 'Employee information',
                        name: 'name',
                        sex: 'gender',
                        nation: 'nationality',
                        mobile: 'phone number',
                        province: 'Place of residence',
                        date: 'Entry Time',
                        remark: 'Remark',
                        address: 'contact address',
                        experience: 'Experience',
                        major: 'Professional',
                        glory: 'Glory',
                        foot: 'Signature:___________Date:___________'
                    },
                    uploadExcel: {
                        upload: 'Click upload',
                        drop: 'Drag files here'
                    },
                    excel: {
                        importExcel: 'excel import',
                        exportExcel: 'excel export',
                        exportZip: 'zip export',
                        name: 'Name',
                        mobile: 'contact details',
                        avatar: 'Avatar',
                        role: 'Role',
                        openTime: 'Opening time',
                        action: 'Operate',
                        show: 'Check',
                        showRole: 'Role',
                        defaultRole: 'Staff',
                        remove: 'delete',
                        removeSuccess: 'Deleted successfully',
                        title: 'Export to excel',
                        placeholder: 'excel file name',
                        defaultName: 'Staff Management Form',
                        close: 'Cancel',
                        confirm: 'Export',
                        importSuccess: ' Employee data imported successfully',
                        dialogTitle1: 'Are you sure you want to delete the user ',
                        dialogTitle2: ' Is it?',
                        roleDialogTitle: 'Configure roles'
                    },
                    role: {
                        buttonTxt: 'New Role',
                        index: 'Serial number',
                        name: 'name',
                        desc: 'describe',
                        action: 'operate',
                        assignPermissions: 'assign permissions',
                        removeRole: 'Delete role',
                        dialogTitle: 'New role',
                        dialogRole: 'Role Name',
                        dialogDesc: 'Role description',
                        updateRoleSuccess: 'User role updated successfully'
                    },
                    permission: {
                        name: 'Authority name',
                        mark: 'Authority ID',
                        desc: 'Permission description'
                    },
                    article: {
                        ranking: 'Ranking',
                        title: 'Title',
                        author: 'Author',
                        publicDate: 'release time',
                        desc: 'brief introduction',
                        action: 'operate',
                        dynamicTitle: 'Dynamic display',
                        show: 'check',
                        remove: 'delete',
                        edit: 'editor',
                        dialogTitle1: 'Are you sure you want to delete the article ',
                        dialogTitle2: ' NS?',
                        removeSuccess: 'Article deleted successfully',
                        titlePlaceholder: 'Please enter the title of the article',
                        markdown: 'Markdown',
                        richText: 'Rich Text',
                        commit: 'commit',
                        createSuccess: 'The article was created successfully',
                        editorSuccess: 'Article modified successfully',
                        sortSuccess: 'Article ranking modified successfully'
                    }
                }↥
            src/i18n/lang/zh.js ▾
                ↧export default {
                    login: {
                        title: '用户登录',
                        loginBtn: '登录',
                        usernameRule: '用户名为必填项',
                        passwordRule: '密码不能少于6位',
                        desc: `
                    测试权限账号：<br />
                    提供三种权限账号：<br />
                    1. 超级管理员账号： super-admin <br />
                    2. 管理员账号：admin <br />
                    3. 测试可配置账号：test <br />
                    密码统一为：123456 <br />
                    <br />
                    导入用户账号：<br />
                    可使用导入的用户名登录 <br />
                    密码统一为：123456  <br />
                    <b>注意：导入用户区分中英文库！！！！</b>
                    `
                    },
                    route: {
                        profile: '个人中心',
                        user: '用户',
                        excelImport: 'Excel导入',
                        userManage: '员工管理',
                        userInfo: '员工信息',
                        roleList: '角色列表',
                        permissionList: '权限列表',
                        article: '文章',
                        articleRanking: '文章排名',
                        articleCreate: '创建文章',
                        articleDetail: '文章详情',
                        articleEditor: '文章编辑'
                    },
                    toast: {
                        switchLangSuccess: '切换语言成功'
                    },
                    tagsView: {
                        refresh: '刷新',
                        close: '关闭',
                        closeRight: '关闭右侧',
                        closeOther: '关闭其他'
                    },
                    theme: {
                        themeColorChange: '主题色更换',
                        themeChange: '主题更换'
                    },
                    universal: {
                        confirm: '确定',
                        cancel: '取消'
                    },
                    navBar: {
                        themeChange: '主题修改',
                        headerSearch: '页面搜索',
                        screenfull: '全屏替换',
                        lang: '国际化',
                        guide: '功能引导',
                        home: '首页',
                        course: '课程主页',
                        logout: '退出登录'
                    },
                    guide: {
                        close: '关闭',
                        next: '下一个',
                        prev: '上一个',
                        done: '完成',
                        guideTitle: '引导',
                        guideDesc: '打开引导功能',
                        hamburgerTitle: '汉堡按钮',
                        hamburgerDesc: '打开和关闭左侧菜单',
                        breadcrumbTitle: '面包屑',
                        breadcrumbDesc: '指示当前页面位置',
                        searchTitle: '搜索',
                        searchDesc: '页面链接搜索',
                        fullTitle: '全屏',
                        fullDesc: '页面显示切换',
                        themeTitle: '主题',
                        themeDesc: '更换项目主题',
                        langTitle: '国际化',
                        langDesc: '语言切换',
                        tagTitle: '标签',
                        tagDesc: '已打开页面标签',
                        sidebarTitle: '菜单',
                        sidebarDesc: '项目功能菜单'
                    },
                    profile: {
                        muted: '《vue3 改写 vue-element-admin，实现后台前端综合解决方案》项目演示',
                        introduce: '介绍',
                        projectIntroduction: '项目介绍',
                        projectFunction: '项目功能',
                        feature: '功能',
                        chapter: '章节',
                        author: '作者',
                        name: 'Sunday',
                        job: '一个前端开发程序猿',
                        Introduction: '高级技术专家，曾就职于国内一线互联网公司，统筹过的多个大型项目用户数已过千万级。致力于研究大前端技术，多次受邀参加国内前端技术分享会，如：2018 年 Google 中国技术分享会。'
                    },
                    userInfo: {
                        print: '打印',
                        title: '员工信息',
                        name: '姓名',
                        sex: '性别',
                        nation: '民族',
                        mobile: '手机号',
                        province: '居住地',
                        date: '入职时间',
                        remark: '备注',
                        address: '联系地址',
                        experience: '经历',
                        major: '专业',
                        glory: '荣耀',
                        foot: '签字：___________日期:___________'
                    },
                    uploadExcel: {
                        upload: '点击上传',
                        drop: '将文件拖到此处'
                    },
                    excel: {
                        importExcel: 'excel 导入',
                        exportExcel: 'excel 导出',
                        exportZip: 'zip 导出',
                        name: '姓名',
                        mobile: '联系方式',
                        avatar: '头像',
                        role: '角色',
                        openTime: '开通时间',
                        action: '操作',
                        show: '查看',
                        showRole: '角色',
                        defaultRole: '员工',
                        remove: '删除',
                        removeSuccess: '删除成功',
                        title: '导出为 excel',
                        placeholder: 'excel 文件名称',
                        defaultName: '员工管理表',
                        close: '取 消',
                        confirm: '导 出',
                        importSuccess: ' 条员工数据导入成功',
                        dialogTitle1: '确定要删除用户 ',
                        dialogTitle2: ' 吗？',
                        roleDialogTitle: '配置角色'
                    },
                    role: {
                        buttonTxt: '新增角色',
                        index: '序号',
                        name: '名称',
                        desc: '描述',
                        action: '操作',
                        assignPermissions: '分配权限',
                        removeRole: '删除角色',
                        dialogTitle: '新增角色',
                        dialogRole: '角色名称',
                        dialogDesc: '角色描述',
                        updateRoleSuccess: '用户角色更新成功'
                    },
                    permission: {
                        name: '权限名称',
                        mark: '权限标识',
                        desc: '权限描述'
                    },
                    article: {
                        ranking: '排名',
                        title: '标题',
                        author: '作者',
                        publicDate: '发布时间',
                        desc: '内容简介',
                        action: '操作',
                        dynamicTitle: '动态展示',
                        show: '查看',
                        remove: '删除',
                        edit: '编辑',
                        dialogTitle1: '确定要删除文章 ',
                        dialogTitle2: ' 吗？',
                        removeSuccess: '文章删除成功',
                        titlePlaceholder: '请输入文章标题',
                        markdown: 'markdown',
                        richText: '富文本',
                        commit: '提交',
                        createSuccess: '文章创建成功',
                        editorSuccess: '文章修改成功',
                        sortSuccess: '文章排名修改成功'
                    }
                }↥
            src/i18n/index.vue ▾
                ↧import mZhLocale from './lang/zh'
                import mEnLocale from './lang/en'

                const messages = {
                    en: {
                        msg: {...mEnLocale}
                    },
                    zh: {
                        msg: {...mZhLocale}
                    }
                }↥
        element组件的国际化
            升级element-plus到最新版本
                npm uninstall element-plus
                npm i element-plus --save  // 1.3.0-beta.5 此时如报了很多与element-plus无关的错则删除node_modules重新npm i
                src/plugins/elements.js ▾
                    ↧// import 'element-plus/lib/theme-chalk/index.css'
                    import 'element-plus/dist/index.css'
                    // import locale from 'element-plus/lib/locale/lang/zh-cn'
                    import zhCn from 'element-plus/es/locale/lang/zh-cn'
                    import en from 'element-plus/lib/locale/lang/en'
                    import store from '@/store'

                    export default app => {
                        app.use(ElementPlus, {
                            locale: store.getters.language === 'en' ? en : zhCn
                        })
                    }↥  
                src/utils/i18n.js ▾
                    ↧import i18n from '@/i18n'
                    export function generateTitle(title) {
                        return i18n.global.t('msg.route.' + title)
                    }↥                    
                src/layout/components/Sidebar/SidebarItem.vue ▾ // 处理侧栏国际化
                    ↧▧◄<template>
                        <el-sub-menu v-if="route.children.length > 0" :index="route.path">
                            <template #title>
                                <menu-item 0►:title="generateTitle(route.meta.title)"◄ :icon="route.meta.icon"></menu-item>
                            </template>
                            <sidebar-item v-for="item in route.children" :key="item.path" :route="item"></sidebar-item>
                        </el-sub-menu>
                        <el-menu-item v-else :index="route.path">
                            <menu-item 0►:title="generateTitle(route.meta.title)"◄ :icon="route.meta.icon"></menu-item>
                        </el-menu-item>
                    </template>
                    
                    <script setup>
                    0►import { generateTitle } from '@/utils/i18n'◄
                    </script>▨↥
                src/styles/element.scss ▾ 图标背景失效
                    ↧.el-avatar {
                        //--el-avatar-background-color: none !important;
                        --el-avatar-bg-color: none !important;
                    }↥
                src/layout/components/Sidebar/index.vue ▾ 属性size失效
                    ↧<el-avatar :size="size" />

                    <script setup>
                    const size = 44
                    </script>↥
                src/components/Breadcrumb/index.vue ▾
                    ↧<template>
                        <!-- 不可点击项 -->
                        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{ generateTitle(item.meta.title) }}</span>
                        <!-- 可点击项 -->
                        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{ generateTitle(item.meta.title) }}</a>
                    </template>

                    <script setup>
                    import { generateTitle } from '@/utils/i18n'
                    </script>↥                    
    国际化缓存处理
        src/i18n/index.js ▾
            ↧import store from '@/store'

            function getLanguage() {
                return store && store.getters && store.getters.language
            }
            // const locale = 'zh'
            const locale = getLanguage()↥            
        src/store/getters.js ▾ 设置快捷访问
            ↧language: state => state.app.language↥
【2】动态换肤
    src/components/ThemePicker/index ▾ 封装主题选择组件
        ↧<template>
            <!-- 主题图标 -->
            <el-dropdown v-bind="$attrs" trigger="click" class="theme" @command="handleSetTheme">
                <div>
                    <el-tooltip :content="$t('msg.navBar.themeChange')">
                        <svg-icon icon="change-theme"/>
                    </el-tooltip>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="color">
                            {{ $t('msg.theme.themeColorChange') }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <!-- 展示弹出层 -->
            <div></div>
        </template>

        <script setup>
        const handleSetTheme = command => {}
        </script>

        <style lang="scss" scoped></style>↥
    src/layout/components/Navbar ▾ 引用组件
        ↧//<div class="right-menu">
            <theme-picker class="right-menu-item hover-effect"></theme-picker>
      
        import ThemePicker from '@/components/ThemePicker/index'↥
    src/components/ThemePicker/components/SelectColor.vue ▾ 颜色选择组件
        ↧<template>
            <el-dialog title="提示" :model-value="modelValue" @close="closed" width="22%">
                <div class="center">
                    <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
                    <el-color-picker v-model="mColor" :predefine="predefineColors"></el-color-picker>
                </div>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
                        <el-button type="primary" @click="comfirm">{{ $t('msg.universal.confirm') }}</el-button>
                    </span>
                </template>
            </el-dialog>
        </template>

        <script setup>
        import { defineProps, defineEmits, ref } from 'vue'
        defineProps({
            modelValue: {
                type: Boolean,
                required: true
            }
        })
        const emits = defineEmits(['update:modelValue'])

        // 预定义色值
        const predefineColors = ['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', 'rgba(255, 69, 0, 0.68)', 'rgb(255, 120, 0)', 'hsv(51, 100, 98)', 'hsva(120, 40, 94, 0.5)', 'hsl(181, 100%, 37%)', 'hsla(209, 100%, 56%, 0.73)', '#c7158577']
        // 默认色值
        const mColor = ref('#00ff00')

        /**
        * 关闭
        */
        const closed = () => {
            emits('update:modelValue', false)
        }
        /**
        * 确定
        * 1. 修改主题色
        * 2. 保存最新的主题色
        * 3. 关闭 dialog
        */
        const comfirm = async () => {
            // 3. 关闭 dialog
            closed()
        }
        </script>

        <style lang="scss" scoped>
        .center {
            text-align: center;
            .title {
                margin-bottom: 12px;
            }
        }
        </style>↥
    src/components/ThemePicker/index ▾ 使用颜色组件
        ↧<!-- 展示弹出层 -->
        <div>
            <select-color v-model="selectColorVisible"></select-color>
        </div>
        

        <script setup>
        import SelectColor from './components/SelectColor.vue'
        import { ref } from 'vue'
        
        const selectColorVisible = ref(false)
        const handleSetTheme = command => {
            selectColorVisible.value = true
        }
        </script>↥
    【5】缓存选中的色值
        src/constants/index.js ▾
            ↧// 主题色保存的 key
            export const MAIN_COLOR = 'mainColor'
            // 默认色值
            export const DEFAULT_COLOR = '#409eff'↥
        src/store/modules/theme.js ▾
            ↧import { getItem, setItem } from '@/utils/storage'
            import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
            export default {
                namespaced: true,
                state: () => ({
                    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR
                }),
                mutations: {
                    /**
                    * 设置主题色
                    */
                    setMainColor(state, newColor) {
                        state.mainColor = newColor
                        setItem(MAIN_COLOR, newColor)
                    }
                }
            }↥
        src/store/getters.js ▾
            ↧mainColor: state => state.theme.mainColor↥
        src/store/index.js ▾
            ↧import theme from './modules/theme.js'

            export default createStore({
                modules: {
                    theme
                }
            })↥
        src/components/ThemePicker/components/SelectColor.vue ▾
            ↧<script setup>
            import { useStore } from 'vuex'
            
            const store = useStore()
            // 默认色值
            const mColor = ref(store.getters.mainColor)
            
            /**
            * 确定
            * 1. 修改主题色
            * 2. 保存最新的主题色
            * 3. 关闭 dialog
            */
            const comfirm = async () => {
                // 2. 保存最新的主题色
                store.commit('theme/setMainColor', mColor.value)
                // 3. 关闭 dialog
                closed()
            }
            </script>↥
    【5】处理ElementPlus主题变更
        【6】老方法
            src/constant/formula.json ▾
                ↧{
                    "shade-1": "color(primary shade(10%))",
                    "light-1": "color(primary tint(10%))",
                    "light-2": "color(primary tint(20%))",
                    "light-3": "color(primary tint(30%))",
                    "light-4": "color(primary tint(40%))",
                    "light-5": "color(primary tint(50%))",
                    "light-6": "color(primary tint(60%))",
                    "light-7": "color(primary tint(70%))",
                    "light-8": "color(primary tint(80%))",
                    "light-9": "color(primary tint(90%))",
                    "subMenuHover": "color(primary tint(70%))",
                    "subMenuBg": "color(primary tint(80%))",
                    "menuHover": "color(primary tint(90%))",
                    "menuBg": "color(primary)"
                }↥
            admin> npm i css-color-function@1.3.3 rgb-hex@4.0.0 --save
            src/utils/theme.js ▾
                ↧import color from 'css-color-function' // 在CSS中提出的颜色函数的解析器和转换器 
                import rgbHex from 'rgb-hex' // 转换RGB(A)颜色为十六进制
                import formula from '@/constant/formula.json'
                import axios from 'axios'

                /**
                * 写入新样式到 style
                * @param {*} elNewStyle  element-plus 的新样式
                * @param {*} isNewStyleTag 是否生成新的 style 标签
                */
                export const writeNewStyle = elNewStyle => {
                    const style = document.createElement('style')
                    style.innerText = elNewStyle
                    document.head.appendChild(style)
                }

                /**
                * 根据主色值，生成最新的样式表
                */
                export const generateNewStyle = async primaryColor => {
                    const colors = generateColors(primaryColor)
                    let cssText = await getOriginalStyle()

                    // 遍历生成的样式表，在 CSS 的原样式中进行全局替换
                    Object.keys(colors).forEach(key => {
                        cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + colors[key])
                    })

                    return cssText
                }

                /**
                * 根据主色生成色值表
                */
                export const generateColors = primary => {
                    if (!primary) return
                    const colors = {
                        primary
                    }
                    Object.keys(formula).forEach(key => {
                        const value = formula[key].replace(/primary/g, primary)
                        colors[key] = '#' + rgbHex(color.convert(value))
                    })
                    return colors
                }

                /**
                * 获取当前 element-plus 的默认样式表
                */
                const getOriginalStyle = async () => {
                    const version = require('element-plus/package.json').version
                    const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
                    const { data } = await axios(url)
                    // 把获取到的数据筛选为原样式模板
                    return getStyleTemplate(data)
                }

                /**
                * 返回 style 的 template
                */
                const getStyleTemplate = data => {
                    // element-plus 默认色值
                    const colorMap = {
                        '#3a8ee6': 'shade-1',
                        '#409eff': 'primary',
                        '#53a8ff': 'light-1',
                        '#66b1ff': 'light-2',
                        '#79bbff': 'light-3',
                        '#8cc5ff': 'light-4',
                        '#a0cfff': 'light-5',
                        '#b3d8ff': 'light-6',
                        '#c6e2ff': 'light-7',
                        '#d9ecff': 'light-8',
                        '#ecf5ff': 'light-9'
                    }
                    // 根据默认色值为要替换的色值打上标记
                    Object.keys(colorMap).forEach(key => {
                        const value = colorMap[key]
                        data = data.replace(new RegExp(key, 'ig'), value)
                    })
                    return data
                }↥
            src/components/ThemePicker/components/SelectColor.vue ▾
                ↧import { generateNewStyle, writeNewStyle } from '@/utils/theme'
                
                /**
                * 确定
                * 1. 修改主题色
                * 2. 保存最新的主题色
                * 3. 关闭 dialog
                */
                const comfirm = async () => {
                    // 1.1 获取主题色
                    const newStyleText = await generateNewStyle(mColor.value)
                    // 1.2 写入最新主题色
                    writeNewStyle(newStyleText)
                    // 2. 保存最新的主题色
                    store.commit('theme/setMainColor', mColor.value)
                    // 3. 关闭 dialog
                    closed()
                }↥
            更改目标：https://unpkg.com/element-plus@${version}/dist/index.css ▾ 更改完成后写入head
                ↧@charset "UTF-8";

                :root {
                    --el-color-primary: #409eff;
                    --el-color-primary-light-1: #53a8ff;
                    --el-color-primary-light-2: #66b1ff;
                    --el-color-primary-light-3: #79bbff;
                    --el-color-primary-light-4: #8cc5ff;
                    --el-color-primary-light-5: #a0cfff;
                    --el-color-primary-light-6: #b3d8ff;
                    --el-color-primary-light-7: #c6e2ff;
                    --el-color-primary-light-8: #d9ecff;
                    --el-color-primary-light-9: #ecf5ff;
                }↥
        【6】新方法
            src/styles/element-plus.scss ▾
                ↧/*
                 * for ^1.3.0-beta.5
                 */
                :root {
                    --el-color-white: #ffffff;
                    --el-color-black: #000000;
                    --el-color-primary: teal; // 主题颜色
                    --el-color-primary-light-1: #53a8ff;
                    --el-color-primary-light-2: #66b1ff;
                    --el-color-primary-light-3: #79bbff;
                    --el-color-primary-light-4: #8cc5ff;
                    --el-color-primary-light-5: #a0cfff;
                    --el-color-primary-light-6: #b3d8ff;
                    --el-color-primary-light-7: #c6e2ff;
                    --el-color-primary-light-8: #d9ecff;
                    --el-color-primary-light-9: #ecf5ff;
                    --el-color-success: #67c23a;
                    --el-color-success-light: #e1f3d8;
                    --el-color-success-lighter: #f0f9eb;
                    --el-color-warning: #e6a23c;
                    --el-color-warning-light: #faecd8;
                    --el-color-warning-lighter: #fdf6ec;
                    --el-color-danger: #f56c6c;
                    --el-color-danger-light: #fde2e2;
                    --el-color-danger-lighter: #fef0f0;
                    --el-color-error: #f56c6c;
                    --el-color-error-light: #fde2e2;
                    --el-color-error-lighter: #fef0f0;
                    --el-color-info: #909399;
                    --el-color-info-light: #e9e9eb;
                    --el-color-info-lighter: #f4f4f5;
                    --el-bg-color: #f5f7fa;
                    --el-border-width-base: 1px;
                    --el-border-style-base: solid;
                    --el-border-color-hover: var(--el-text-color-placeholder);
                    --el-border-base: var(--el-border-width-base) var(--el-border-style-base) var(--el-border-color-base);
                    --el-svg-monochrome-grey: #dcdde0;
                    --el-fill-base: var(--el-color-white);
                    --el-font-size-extra-large: 20px;
                    --el-font-size-large: 18px;
                    --el-font-size-medium: 16px;
                    --el-font-size-base: 14px;
                    --el-font-size-small: 13px;
                    --el-font-size-extra-small: 12px;
                    --el-font-weight-primary: 500;
                    --el-font-line-height-primary: 24px;
                    --el-text-color-disabled-base: #bbb;
                    --el-index-normal: 1;
                    --el-index-top: 1000;
                    --el-index-popper: 2000;
                    --el-text-color-primary: #303133;
                    --el-text-color-regular: #606266;
                    --el-text-color-secondary: #909399;
                    --el-text-color-placeholder: #c0c4cc;
                    --el-border-color-base: #dcdfe6;
                    --el-border-color-light: #e4e7ed;
                    --el-border-color-lighter: #ebeef5;
                    --el-border-color-extra-light: #f2f6fc;
                    --el-border-radius-base: 4px;
                    --el-border-radius-small: 2px;
                    --el-border-radius-round: 20px;
                    --el-border-radius-circle: 100%;
                    --el-box-shadow-base: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
                    --el-box-shadow-light: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                    --el-disabled-bg-color: var(--el-bg-color);
                    --el-disabled-text-color: var(--el-text-color-placeholder);
                    --el-disabled-border-color: var(--el-border-color-light);
                    --el-transition-duration: 0.3s;
                    --el-transition-duration-fast: 0.2s;
                    --el-transition-function-ease-in-out-bezier: cubic-bezier(0.645, 0.045, 0.355, 1);
                    --el-transition-function-fast-bezier: cubic-bezier(0.23, 1, 0.32, 1);
                    --el-transition-all: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
                    --el-transition-fade: opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);
                    --el-transition-md-fade: transform var(--el-transition-duration) var(--el-transition-function-fast-bezier), opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);
                    --el-transition-fade-linear: opacity var(--el-transition-duration-fast) linear;
                    --el-transition-border: border-color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);
                    --el-transition-color: color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);
                }↥
            src/main.js ▾
                ↧▧import installElementPlus from './plugins/element'
                3►import './styles/element-plus.scss'◄

                installElementPlus(app)▨↥

        【6】验证测试
            src/views/profile/index.vue ▾
                ↧<el-row>
                    <el-button>Default</el-button>
                    <el-button type="primary">Primary</el-button>
                    <el-button type="success">Success</el-button>
                    <el-button type="info">Info</el-button>
                    <el-button type="warning">Warning</el-button>
                    <el-button type="danger">Danger</el-button>
                </el-row>↥
    【5】处理自定义主题变更
        src/layout/components/sidebar/SidebarMenu.vue ▾
            ↧<el-menu
                :background-color="$store.getters.cssVar.menuBg"
                :text-color="$store.getters.cssVar.menuText"
                :active-text-color="$store.getters.cssVar.menuActiveText"
            >↥
        src/store/getters.js ▾ 快捷访问 store.state.user.token > store.getters.token
            ↧import variables from '@/styles/variables.scss'
            import { generateColors } from '@/utils/theme'
            import { getItem } from '@/utils/storage'
            import { MAIN_COLOR } from '@/constant'

            const getters = {
                // cssVar: state => variables
                cssVar: state => {
                    return {
                        ...variables,
                        ...generateColors(getItem(MAIN_COLOR))
                    }
                } 
            }↥
        src/store/index.js ▾
            ↧import getters from './getters'
            export default createStore({
                getters
            })↥
        src/layout/index.vue ▾
            ↧<sidebar :style="{ backgroundColor: $store.getters.cssVar.menuBg }"/>
            // import variables from '@/styles/variables.scss'
            ↥
        src/store/modules/theme.js ▾
            ↧import variables from '@/styles/variables.scss'

            export default {
                state: () => ({
                    variables
                }),
                mutations: {
                    /**
                    * 设置主题色
                    */
                    setMainColor(state, newColor) {
                        state.variables.menuBg = newColor
                    }
                }
            }↥            
        src/store/getters.js ▾
            ↧// import variables from '@/styles/variables.scss'

            const getters = {
                cssVar: state => {
                    return {
                        ...state.theme.variables,
                        ...generateColors(getItem(MAIN_COLOR))
                    }
                }
            }↥            
【2】Screenfull原理及方案分析
    封装Screenfull组件
        npm i screenfull@5.1.0 --save
        components/Screenfull/index.vue ▾
            ↧<template>
                <div>
                    <svg-icon :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="onToggle" />
                </div>
            </template>

            <script setup>
            import { ref, onMounted, onUnmounted } from 'vue'
            import screenfull from 'screenfull'

            // 是否全屏
            const isFullscreen = ref(false)

            // 监听变化
            const change = () => {
                isFullscreen.value = screenfull.isFullscreen
            }

            // 切换事件
            const onToggle = () => {
                screenfull.toggle()
            }

            // 设置侦听器
            onMounted(() => {
                screenfull.on('change', change)
            })

            // 删除侦听器
            onUnmounted(() => {
                screenfull.off('change', change)
            })
            </script>

            <style lang="scss" scoped></style>↥            
        src/layout/components/Navbar.vue ▾
            ↧<screenfull class="right-menu-item hover-effect" />
            import Screenfull from '@/components/Screenfull'↥            
【2】HeaderSearch原理及方案分析
    1.根据指定内容对所有页面进行检索
    2.以 select 形式展示检索出的页面
    3.通过检索页面可快速进入对应页面
    src/components/HeaderSearch/FuseData.js ▾ 重新计算数据源
        ↧import path from 'path'
        import i18n from '@/i18n'
        /**
        * 筛选出可供搜索的路由对象
        * @param routes 路由表
        * @param basePath 基础路径，默认为 /
        * @param prefixTitle
        */
        export const ►generateRoutes◄ = (routes, basePath = '/', prefixTitle = []) => {
            // 创建 result 数据
            let res = []
            // 循环 routes 路由
            for (const route of routes) {
                // 创建包含 path 和 title 的 item
                const data = {
                    path: path.resolve(basePath, route.path),
                    title: [...prefixTitle]
                }
                // 当前存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
                // 动态路由不允许被搜索
                // 匹配动态路由的正则
                const re = /.*\/:.*/
                if (route.meta && route.meta.title && !re.exec(route.path)) {
                    const i18ntitle = i18n.global.t(`msg.route.${route.meta.title}`)
                    data.title = [...data.title, i18ntitle]
                    res.push(data)
                }

                // 存在 children 时，迭代调用
                if (route.children) {
                    const tempRoutes = ►generateRoutes◄(route.children, data.path, data.title)
                    if (tempRoutes.length >= 1) {
                        res = [...res, ...tempRoutes]
                    }
                }
            }
            return res
        }↥
    npm install --save fuse.js@6.4.6 // 模糊搜索依赖
    src/components/HeaderSearch/index.vue ▾ 创建headerSearch组件
        ↧<template>
            <div :class="{ show: isShow }" class="header-search">
                <svg-icon class-name="search-icon" icon="search" @click.stop="1►onShowClick◄" />
                <el-select
                    class="header-search-select"
                    default-first-option 
                    placeholder="Search"
                    filterable
                    remote
                    :remote-method="2►querySearch◄"
                    ref="headerSearchSelectRef" 
                    v-model="8►search◄"
                    @change="9►onSelectChange◄">
                    <el-option 
                        v-for="option in ►searchOptions◄" 
                        :key="option.item.path" 
                        :label="option.item.title.join(' > ')" 
                        :value="option.item"></el-option>
                    </el-select>
            </div>
        </template>

        <script setup>
        import { ref, computed, watch } from 'vue'
        import { filterRouters } from '@/utils/route'
        import { useRouter } from 'vue-router'
        import { ►generateRoutes◄ } from './FuseData'
        import Fuse from 'fuse.js'

        // 检索数据源
        const router = useRouter()
        const searchPool = computed(() => {
            const filterRoutes = filterRouters(router.getRoutes())
            return ►generateRoutes◄(filterRoutes)
        })
        // 搜索库相关
        const fuse = new Fuse(searchPool.value, {
            keys: ['title', 'path']
        }) 

        // search 相关
        const 8►search◄ = ref('')
        const ►searchOptions◄ = ref([]) // 搜索结果
        // 搜索方法
        const 2►querySearch◄ = query => {
            if (query !== '') {
                ►searchOptions◄.value = fuse.search(query)
            } else {
                ►searchOptions◄.value = []
            }
        }
        
        const isShow = ref(false)               // 控制search显示
        const headerSearchSelectRef = ref(null) // el-select 实例
        const 1►onShowClick◄ = () => {
            isShow.value = !isShow.value
            headerSearchSelectRef.value.focus()
        }
        
        // 选中回调
        const 9►onSelectChange◄ = val => {
            router.push(val.path)
        }
        /**
        * 关闭 search 的处理事件
        */
        const onClose = () => {
            headerSearchSelectRef.value.blur()
            isShow.value = false
            searchOptions.value = []
        }
        /**
        * 监听 search 打开，处理 close 事件
        */
        watch(isShow, val => {
            if (val) {
                document.body.addEventListener('click', onClose)
            } else {
                document.body.removeEventListener('click', onClose)
            }
        })
        </script>

        <style lang="scss" scoped>
        .header-search {
            font-size: 0 !important;
            .search-icon {
                cursor: pointer;
                font-size: 18px;
                vertical-align: middle;
            }
            .header-search-select {
                font-size: 18px;
                transition: width 0.2s;
                width: 0;
                overflow: hidden;
                background: transparent;
                border-radius: 0;
                display: inline-block;
                vertical-align: middle;

                ::v-deep .el-input__inner {
                    border-radius: 0;
                    border: 0;
                    padding-left: 0;
                    padding-right: 0;
                    box-shadow: none !important;
                    border-bottom: 1px solid #d9d9d9;
                    vertical-align: middle;
                }
            }
            &.show {
                .header-search-select {
                    width: 210px;
                    margin-left: 10px;
                }
            }
        }
        </style>↥
    src/layout/components/Navbar.vue ▾ 使用headerSearch组件
        ↧►<header-search◄ class="right-menu-item hover-effect"►></header-search>◄
        import ►HeaderSearch◄ from '@/components/HeaderSearch'↥
    响应国际化
        src/utils/i18n.js ▾
            ↧import { watch } from 'vue'
            import store from '@/store'
            /**
            * @param  {...any} cbs 所有的回调
            */
            export function watchSwitchLang(...cbs) {
                watch(
                    () => store.getters.language,
                    () => {
                        cbs.forEach(cb => cb(store.getters.language))
                    }
                )
            }↥
        src/components/HeaderSearch/index.vue ▾
            ↧import { watchSwitchLang } from '@/utils/i18n'

            // 检索数据源
            const router = useRouter()
            let searchPool = computed(() => {
                const filterRoutes = filterRouters(router.getRoutes())
                return generateRoutes(filterRoutes)
            })
            /**
            * 搜索库相关
            */
            let fuse
            const initFuse = searchPool => {
                fuse = new Fuse(searchPool, {
                    keys: ['title', 'path']
                })
            }
            initFuse(searchPool.value)

            // 处理国际化
            watchSwitchLang(() => {
                searchPool = computed(() => {
                    const filterRoutes = filterRouters(router.getRoutes())
                    return generateRoutes(filterRoutes)
                })
                initFuse(searchPool.value)
            })↥
【2】tagsView原理及方案分析
    src/layout/index.vue ▾
        ↧<div class="fixed-header">
            <!-- 顶部的 navbar -->
            <navbar />
            <!-- tags -->
            ►<tags-view></tags-view>◄
        </div>

        ►import TagsView from '@/components/TagsView'◄↥
    src/components/TagsView/index.vue ▾
        ↧<template>
            <div class="tags-view-container">
                <router-link
                    class="tags-view-item"
                    :class="isActive(tag) ? 'active' : ''"
                    :style="{
                        backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
                        borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
                    }"
                    v-for="(tag, index) in 1►$store.getters.tagsViewList◄"
                    :key="tag.fullPath"
                    :to="{ path: tag.fullPath }"
                >
                    {{ tag.title }}
                    <i v-show="!isActive(tag)" class="el-icon-close" @click.prevent.stop="onCloseClick(index)" />
                </router-link>
            </div>
        </template>

        <script setup>
        import { useRoute } from 'vue-router'
        const route = useRoute()

        /**
        * 是否被选中
        */
        const isActive = tag => {
            return tag.path === route.path
        }

        /**
        * 关闭 tag 的点击事件
        */
        const onCloseClick = index => {}
        </script>

        <style lang="scss" scoped>
        .tags-view-container {
            height: 34px;
            width: 100%;
            background: #fff;
            border-bottom: 1px solid #d8dce5;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
            .tags-view-item {
                display: inline-block;
                position: relative;
                cursor: pointer;
                height: 26px;
                line-height: 26px;
                border: 1px solid #d8dce5;
                color: #495060;
                background: #fff;
                padding: 0 8px;
                font-size: 12px;
                margin-left: 5px;
                margin-top: 4px;
                &:first-of-type {
                    margin-left: 15px;
                }
                &:last-of-type {
                    margin-right: 15px;
                }
                &.active {
                    color: #fff;
                    &::before {
                        content: '';
                        background: #fff;
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        position: relative;
                        margin-right: 4px;
                    }
                }
                // close 按钮
                .el-icon-close {
                    width: 16px;
                    height: 16px;
                    line-height: 10px;
                    vertical-align: 2px;
                    border-radius: 50%;
                    text-align: center;
                    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                    transform-origin: 100% 50%;
                    &:before {
                        transform: scale(0.6);
                        display: inline-block;
                        vertical-align: -3px;
                    }
                    &:hover {
                        background-color: #b4bccc;
                        color: #fff;
                    }
                }
            }
        }
        </style>↥
    src/store/getters.js ▾
        ↧const getters = {
            1►tagsViewList◄: state => state.app.2►tagsViewList◄
        }↥
    src/store/modules/app.js ▾
        ↧import { TAGS_VIEW } from '@/constant'
        export default {
            state: () => ({
                2►tagsViewList◄: 3►getItem(TAGS_VIEW)◄ || []
            }),
            mutations: {
                /**
                * 添加 tags
                */
                4►addTagsViewList◄(state, tag) {
                    const isFind = state.tagsViewList.find(item => {
                        return item.path === tag.path
                    })
                    // 处理重复
                    if (!isFind) {
                        state.tagsViewList.push(tag)
                        3►setItem(TAGS_VIEW, state.tagsViewList)◄
                    }
                }
            }
        }↥
    src/layout/components/AppMain.vue ▾
        ↧<script setup>
        import { watch } from 'vue'
        import { isTags } from '@/utils/tags'
        import { generateTitle } from '@/utils/i18n'
        import { useRoute } from 'vue-router'
        import { useStore } from 'vuex'

        const route = useRoute()

        /**
        * 生成 title
        */
        const getTitle = route => {
            let title = ''
            if (!route.meta) {
                // 处理无 meta 的路由
                const pathArr = route.path.split('/')
                title = pathArr[pathArr.length - 1]
            } else {
                title = generateTitle(route.meta.title)
            }
            return title
        }

        /**
        * 监听路由变化
        */
        const store = useStore()
        watch(
            route,
            (to, from) => {
                if (!isTags(to.path)) return
                const { fullPath, meta, name, params, path, query } = to
                store.commit('4►app/addTagsViewList◄', {
                    fullPath,
                    meta,
                    name,
                    params,
                    path,
                    query,
                    title: getTitle(to)
                })
            },
            {
                immediate: true
            }
        )
        </script>↥
    src/utils/tags.js ▾
        ↧const whiteList = ['/login', '/import', '/404', '/401']

        /**
         * path 是否需要被缓存
         * @param {*} path
         * @returns
         */
        export function isTags(path) {
            return !whiteList.includes(path)
        }↥
    国际化处理
        src/store/modules/app.js ▾
            ↧mutations: {
                /**
                 * 为指定的 tag 修改 title
                 */
                changeTagsView(state, { index, tag }) {
                    state.tagsViewList[index] = tag
                    setItem(TAGS_VIEW, state.tagsViewList)
                }
            }↥
        src/layout/components/AppMain.vue ▾
            ↧import { watchSwitchLang } from '@/utils/i18n'

            /**
             * 国际化 tags
             */
            watchSwitchLang(() => {
                store.getters.tagsViewList.forEach((route, index) => {
                    store.commit('app/changeTagsView', {
                    index,
                    tag: {
                        ...route,
                        title: getTitle(route)
                    }
                    })
                })
            })↥
    contextMenu展示处理
        src/components/TagsView/ContextMenu.vue ▾
            ↧<template>
                <ul class="context-menu-container">
                    <li @click="onRefreshClick">{{ $t('msg.tagsView.refresh') }}</li>
                    <li @click="onCloseClick">{{ $t('msg.tagsView.close') }}</li>
                    <li @click="onCloseRightClick">{{ $t('msg.tagsView.closeRight') }}</li>
                    <li @click="onCloseOtherClick">{{ $t('msg.tagsView.closeOther') }}</li>
                </ul>
            </template>

            <script setup>
            import { defineProps } from 'vue'
            import { useRouter } from 'vue-router'
            import { useStore } from 'vuex'

            const props = defineProps({
                index: {
                    type: Number,
                    required: true
                }
            })

            // 刷新
            const router = useRouter()
            const onRefreshClick = () => {
                router.go(0)
            }

            // 关闭 tag 的点击事件
            const store = useStore()
            const onCloseClick = index => {
                store.commit('app/removeTagsView', {type: 'index', index: index})
            }

            // 关闭右侧
            const store = useStore()
            const onCloseRightClick = () => {
                store.commit('app/removeTagsView', {type: 'right', index: props.index})
            }

            // 关闭其他
            const onCloseOtherClick = () => {
                store.commit('app/removeTagsView', {type: 'other', index: props.index})
            }

            </script>

            <style lang="scss" scoped>
            .context-menu-container {
                position: fixed;
                background: #fff;
                z-index: 3000;
                list-style-type: none;
                padding: 5px 0;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 400;
                color: #333;
                box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
                li {
                    margin: 0;
                    padding: 7px 16px;
                    cursor: pointer;
                    &:hover {
                        background: #eee;
                    }
                }
            }
            </style>↥
        src/components/TagsView/index.vue ▾
            ↧<div class="tags-view-container">
                2►<el-scrollbar class="tags-view-wrapper">◄
                    <router-link 1►@contextmenu.prevent="openMenu($event, index)"◄></router-link>
                2►</el-scrollbar>◄
                2►<context-menu v-show="visible" :style="menuStyle" :index="selectIndex"></context-menu>◄
            </div>
            
            <script setup>
            import ContextMenu from './ContextMenu.vue'
            import { ref, reactive, watch } from 'vue'

            // contextMenu 相关
            const selectIndex = ref(0)
            const visible = ref(false)
            const menuStyle = reactive({
                left: 0,
                top: 0
            })

            /**
             * 展示 menu
             */
            const openMenu = (e, index) => {
                const { x, y } = e
                menuStyle.left = x + 'px'
                menuStyle.top = y + 'px'
                selectIndex.value = index
                visible.value = true
            }

            /**
             * 关闭 menu
             */
            const closeMenu = () => {
                visible.value = false
            }

            /**
             * 监听变化
             */
            watch(visible, val => {
                if (val) {
                    document.body.addEventListener('click', closeMenu)
                } else {
                    document.body.removeEventListener('click', closeMenu)
                }
            })
            </script>↥
        src/store/modules/app.js ▾
            ↧mutations: {
                /**
                 * 删除 tag
                 * @param {type: 'other'||'right'||'index', index: index} payload
                 */
                removeTagsView(state, payload) {
                    if (payload.type === 'index') {
                        state.tagsViewList.splice(payload.index, 1)
                        return
                    } else if (payload.type === 'other') {
                        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1)
                        state.tagsViewList.splice(0, payload.index)
                    } else if (payload.type === 'right') {
                        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1)
                    }
                    setItem(TAGS_VIEW, state.tagsViewList)
                }
            }↥
    处理基于路由的动态过渡
        src/layout/AppMain.vue ▾
            ↧<div class="app-main">
                <router-view 1►v-slot="{ Component, route }"◄>
                    2►<transition name="fade-transform" mode="out-in">
                        <keep-alive>
                            <component :is="Component" :key="route.path" />
                        </keep-alive>
                    </transition>◄
                </router-view>
            </div>
            
            <style lang="scss" scoped>
            .app-main {
                3►min-height: calc(100vh - 50px - 43px);◄
                width: 100%;
                position: relative;
                overflow: hidden;
                3►padding: 104px 20px 20px 20px;◄
                box-sizing: border-box;
            }
            </style>↥
        src/styles/transition.scss ▾
            ↧/* fade-transform */
            .fade-transform-leave-active,
            .fade-transform-enter-active {
                transition: all 0.5s;
            }

            .fade-transform-enter-from {
                opacity: 0;
                transform: translateX(-30px);
            }

            .fade-transform-leave-to {
                opacity: 0;
                transform: translateX(30px);
            }↥
【2】Guide引导页原理及方案分析
    admin> npm i driver.js@0.9.8 --save
    src/components/Guide/index.vue ▾
        ↧<template>
            <div>
                <el-tooltip :content="$t('msg.navBar.guide')">
                    <svg-icon icon="guide" @click="onClick" />
                </el-tooltip>
            </div>
        </template>

        <script setup>
        import Driver from 'driver.js'
        import 'driver.js/dist/driver.min.css'
        import { onMounted } from 'vue'
        import { useI18n } from 'vue-i18n'
        import steps from './steps'

        const i18n = useI18n()

        let driver = null
        onMounted(() => {
            driver = new Driver({
                allowClose: false,                       // 是否允许点击外部关闭
                closeBtnText: i18n.t('msg.guide.close'), // 关闭按钮标题
                nextBtnText: i18n.t('msg.guide.next'),   // 下一步按钮标题
                prevBtnText: i18n.t('msg.guide.prev'),   // 上一步按钮标题
                doneBtnText: i18n.t('msg.guide.done'),   // 完成按钮标题
                stageBackground: 'rgba(0, 0, 0, 0.2)'    // 引导对话的背景色
            })
        })

        const onClick = () => {
            driver.defineSteps(steps(i18n))
            driver.start()
        }
        </script>

        <style scoped></style>↥
    src/layout/components/Navbar.vue ▾
        ↧<div class="right-menu">
            ►<guide class="right-menu-item hover-effect" />◄
        </div>

        import ►Guide◄ from '@/components/Guide'↥
    src/components/Guide/steps.js ▾
        ↧// 此处不要导入 @/i18n 使用 i18n.global ，
        // 因为我们在 router 中 layout 不是按需加载，
        // 所以会在 Guide 会在 I18n 初始化完成之前被直接调用。
        // 导致 i18n 为 undefined
        const steps = i18n => {
            return [
                {
                    element: '►#guide-start◄',
                    popover: {
                        title: i18n.t('msg.guide.guideTitle'),
                        description: i18n.t('msg.guide.guideDesc'),
                        position: 'bottom-right'
                    }
                },
                {
                    element: '►#guide-hamburger◄',
                    popover: {
                        title: i18n.t('msg.guide.hamburgerTitle'),
                        description: i18n.t('msg.guide.hamburgerDesc')
                    }
                },
                {
                    element: '►#guide-breadcrumb◄',
                    popover: {
                        title: i18n.t('msg.guide.breadcrumbTitle'),
                        description: i18n.t('msg.guide.breadcrumbDesc')
                    }
                },
                {
                    element: '►#guide-search◄',
                    popover: {
                        title: i18n.t('msg.guide.searchTitle'),
                        description: i18n.t('msg.guide.searchDesc'),
                        position: 'bottom-right'
                    }
                },
                {
                    element: '►#guide-full◄',
                    popover: {
                        title: i18n.t('msg.guide.fullTitle'),
                        description: i18n.t('msg.guide.fullDesc'),
                        position: 'bottom-right'
                    }
                },
                {
                    element: '►#guide-theme◄',
                    popover: {
                        title: i18n.t('msg.guide.themeTitle'),
                        description: i18n.t('msg.guide.themeDesc'),
                        position: 'bottom-right'
                    }
                },
                {
                    element: '►#guide-lang◄',
                    popover: {
                        title: i18n.t('msg.guide.langTitle'),
                        description: i18n.t('msg.guide.langDesc'),
                        position: 'bottom-right'
                    }
                },
                {
                    element: '►#guide-tags◄',
                    popover: {
                        title: i18n.t('msg.guide.tagTitle'),
                        description: i18n.t('msg.guide.tagDesc')
                    }
                },
                {
                    element: '►#guide-sidebar◄',
                    popover: {
                        title: i18n.t('msg.guide.sidebarTitle'),
                        description: i18n.t('msg.guide.sidebarDesc'),
                        position: 'right-center'
                    }
                }
            ]
        }
        export default steps↥
    标识ID ▾
        ↧src/components/Guide/index.vue        <svg-icon ►id="guide-start"◄/>
        src/components/Hamburger/index.vue    <svg-icon ►id="guide-hamburger"◄></svg-icon>
        src/layout/components/Navbar.vue      <breadcrumb ►id="guide-breadcrumb"◄/>
        src/components/HeaderSearch/index.vue <svg-icon ►id="guide-search"◄/>
        src/components/Screenfull/index.vue   <svg-icon ►id="guide-full"◄/>
        src/components/ThemePicker/index      <svg-icon ►id="guide-theme"◄/>
        src/components/LangSelect/index.vue   <svg-icon ►id="guide-lang"◄/>
        src/layout/index.vue                  <tags-view ►id="guide-tags"◄></tags-view>
        src/layout/index.vue                  <sidebar ►id="guide-sidebar"◄/>↥
    
        



            
    
        
        



















            
              








    修改 css 变量 的值








    element-plus 主题
    非 element-plus 主题
               
                        



        
        

        
        





===-
▾↧↥

::: details 标准化大厂编程规范解决方案之ESLint + Git Hooks
===+
指望所有人都看一遍规范文档？ 自动处理规范化的内容！

hello> vue create coding-standard
    Default ([Vue 2] babel, eslint)      
    Default ([Vue 3] babel, eslint)
    > Manually select features  // 推荐
            (*) Choose Vue version  (*)Babel  (*)Linter/Formatter
                  2.x
                > 3.x  
                      ESLint with error prevention only // 仅包含错误的ESLint
                      ESLint + Airbnb config            // Airbnb的ESLint延伸规则
                    > ESLint + Standard config          // 标准的ESLint延伸规则
                      ESLint + Prettier                    
hello> cd coding-standard
coding-standard> npm run serve
coding-standard> npm run build

[##] 从动检测
ESLint目标：提供一个插件化的javascript代码检测工具
ESLint配置：coding-standard/.eslintrc.js [文档](https://eslint.bootcss.com/docs/user-guide/configuring)
    module.exports = {        
        root: true,                                              // 表示当前目录即为根目录 规则将被限制到该目录下        
        env: { node: true },                                     // 检测的环境        
        extends: ["plugin:vue/vue3-essential", "@vue/standard"], // ESLint 中基础配置需要继承的配置        
        parserOptions: { parser: "babel-eslint" },               // 解析器
        /**
        * 启用规则：错误级别
        * "off"/0   关闭规则
        * "warn"/1  开启规则，使用警告级别的错误：warn (不会导致程序退出)
        * "error"/2 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
        */
        rules: {
            "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
            "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
        }
    }

coding-standard/src/components/HelloWorld.vue
    name: 'HelloWorld' 改为 name: "HelloWorld"

      35:9  [error{color:#F66}]  Strings must use singlequote  [quotes{color:#09c;font-weight:bold}]
    【✖ 1 problem (1 error, 0 warnings)
      1 error and 0 warnings potentially fixable with the `--fix` option.】{color:#F66}

    解决：
        按照 ESLint 的要求修改代码
      > 修改 ESLint 的验证规则 .eslintrc.js
            module.exports = {
                rules: {
                    "[quotes{color:#09c;font-weight:bold}]": "warn" // off、warn、error 
                }
            }
            coding-standard> npm run serve

[##] 主动规范
团队中人员的水平不齐 大量的ESLint规则校验 会让开发者头疼 影响开发进度
[Prettier](https://www.prettier.cn/): 代码格式化工具
1. VSCode 中安装 prettier
2. coding-standard/.prettierrc
    {    
        "semi": false,           // 不尾随分号
        "trailingComma": "none", // 不尾随逗号
        "singleQuote": true,     // 使用单引号
        "tabWidth": 4            // 代码缩进
    }
3. VSCode > setting > 工作区    ▣ Format On Save

# Prettier和ESLint的唯一冲突
    export default {
        created() {}
    }

      8:10  [error{color:#F66}]  Missing space before function parentheses  [space-before-function-paren{color:#09c;font-weight:bold}]
    【✖ 1 problem (1 error, 0 warnings)
      1 error and 0 warnings potentially fixable with the `--fix` option.】{color:#F66}

    解决：修改 ESLint 的验证规则 .eslintrc.js
        module.exports = {
            rules: {
                "[space-before-function-paren{color:#09c;font-weight:bold}]": "off" // off、warn、error 
            }
        }
        coding-standard> npm run serve

[##] 多规范之默认规范
    coding-standard/.vscode/settings.json ▾
    ↧{
        "editor.formatOnSave": true,
        "vetur.format.defaultFormatter.html": "prettier",
        "[javascript]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[vue]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[html]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[scss]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        }
    }↥
===-
:::

::: details 约定式提交规范
===+
项目创建 参考标准化大厂编程规范解决方案

约定式提交规范要求：
    <type>[optional scope]: <description>   <类型>[可选 范围]: <描述>
    [optional body]                         [可选 正文]
    [optional footer]                       [可选 脚注]

按照规范提交太过繁琐[{color:#d96}]
xxxx> npm install -g [commitizen](https://github.com/commitizen/cz-cli)@4.2.4
coding-standard> npm i cz-customizable@6.3.0 --save-dev

coding-standard/package.json ▾
    ↧"config": {
        "commitizen": {
            "path": "node_modules/cz-customizable"
        }
    }↥
coding-standard/.cz-config.js ▾
    ↧module.exports = {
        // 可选类型
        types: [
            { value: 'feat', name: 'feat:     新功能' },
            { value: 'fix', name: 'fix:      修复' },
            { value: 'docs', name: 'docs:     文档变更' },
            { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
            {
                value: 'refactor',
                name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
            },
            { value: 'perf', name: 'perf:     性能优化' },
            { value: 'test', name: 'test:     增加测试' },
            { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
            { value: 'revert', name: 'revert:   回退' },
            { value: 'build', name: 'build:    打包' }
        ],
        // 消息步骤
        messages: {
            type: '请选择提交类型:',
            customScope: '请输入修改范围(可选):',
            subject: '请简要描述提交(必填):',
            body: '请输入详细描述(可选):',
            footer: '请输入要关闭的issue(可选):',
            confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
        },    
        skipQuestions: ['body', 'footer'], // 跳过问题    
        subjectLimit: 72                   // subject文字长度默认是72
    }↥

coding-standard> git cz  // 代替 git commit    

如果有人忘记了使用 git cz 指令，直接就提交了怎么办呢？[{color:#d96}]
目标：当《提交描述信息》不符合 约定式提交规范 的时候，阻止当前的提交，并抛出对应的错误提示

Git hooks：
    commit-msg 可以用来规范化标准格式，并且可以按需指定是否要拒绝本次提交
    pre-commit 会在提交前被调用，并且可以按需指定是否要拒绝本次提交
    ...
工具：
    1. commitlint 用于检查提交信息
    coding-standard> npm install --save-dev @commitlint/config-conventional@12.1.4 @commitlint/cli@12.1.4
    coding-standard/commitlint.config.js ▾
        ↧ //确保保存为 UTF-8 的编码格式
        module.exports = {
            extends: ['@commitlint/config-conventional'], // 继承的规则
            // 定义规则类型
            rules: {
                // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
                'type-enum': [
                    2,
                    'always',
                    [
                        'feat',     // 新功能 feature
                        'fix',      // 修复 bug
                        'docs',     // 文档注释
                        'style',    // 代码格式(不影响代码运行的变动)
                        'refactor', // 重构(既不增加新功能，也不是修复bug)
                        'perf',     // 性能优化
                        'test',     // 增加测试
                        'chore',    // 构建过程或辅助工具的变动
                        'revert',   // 回退
                        'build'     // 打包
                    ]
                ],        
                'subject-case': [0] // subject 大小写不做校验
            }
        }↥

    2. husky      是git hooks工具
    coding-standard> npm install husky@7.0.1 --save-dev
    coding-standard> npx husky install // 或/package.json "scripts": {"prepare": "husky install"} 运行 npm run prepare 会生成 .husky 文件夹
    执行成功提示：[husky - Git hooks installed{color:#69c}]

    添加 commitlint 的 hook 到 husky中 并在 commit-msg 的 hooks 下执行 npx --no-install commitlint --edit "$1" 指令
    coding-standard> npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
    coding-standard/.husky/commit-msg // 生成的文件

如果有人忘记配置保存自动格式代码直接就提交？[{color:#d96}]
    - 提交时自动检测
        coding-standard> npx husky add .husky/pre-commit "npx eslint --ext .js,.vue src" // 添加 commit 时的 hook （npx eslint --ext .js,.vue src 会在执行到该 hook 时运行）
        coding-standard/.husky/pre-commit // 生成的文件

        测试：
            1. 关闭 VSCode 的自动保存操作
            2. 修改一处代码，使其不符合 ESLint 校验规则
            3. 执行 提交操作 会发现，抛出一系列的错误，代码无法提交

    - 提交时自动修复
        [lint-staged](https://github.com/okonet/lint-staged) // vue-cli 已经安装过了 直接使用即可
        coding-standard/package.json ▾
            ↧"lint-staged": {
                "src/**/*.{js,vue}": [
                    "eslint --fix",
                    "git add"
                ]
            }↥
        coding-standard/.husky/pre-commit ▾
            ↧#!/bin/sh
            . "$(dirname "$0")/_/husky.sh"

            npx lint-staged↥
        再次执行提交代码 发现暂存区中不符合 ESlint 的内容，被自动修复
===-
:::

::: details Ewan

- 全局配置 config.js
- 资源统筹(应对架构变化资源调配) config.js

config.js
```js
const PATH = require('path')
const {readFile} = require('./scripts/utils/fs')

// 系统配置
module.exports.config = { title: '标题文本' }

// 资源中枢
const MAP_DIR =   { ".usage": "../.usage"}
const MAP_FILE =  { "package": "../../package.json" }
const MAP_RES =   { "logo": "resources/images/logo.png" }
const MAP_DATA =  { "main": "data/.MAIN.js" }
const MAP_UTILS = { "ewan": "scripts/utils/ewan.js" }
const MAP_CORE =  { "create": "core/create.js" }
const MAP_PARSE = { "search": "core/parse/search.js" }
const requireFile = relativePath => require(PATH.resolve(__dirname, relativePath))
const readFileFn = relativePath => readFile(PATH.resolve(__dirname, relativePath))
const fetchFileByType = {
    "DATA":  key => requireFile(MAP_DATA[key]),
    "UTILS": key => requireFile(MAP_UTILS[key]),
    "CORE":  key => requireFile(MAP_CORE[key]),
    "PARSE": key => requireFile(MAP_PARSE[key]),
    "FILE":  key => requireFile(MAP_FILE[key]),
    "RES":   key => requireFile(MAP_RES[key])
}
const fetchPathByType = {
    "DATA":  key => PATH.resolve(__dirname, MAP_DATA[key]),
    "UTILS": key => PATH.resolve(__dirname, MAP_UTILS[key]),
    "CORE":  key => PATH.resolve(__dirname, MAP_CORE[key]),
    "PARSE": key => PATH.resolve(__dirname, MAP_PARSE[key]),
    "DIR":   key => PATH.resolve(__dirname, MAP_DIR[key]),
    "FILE":  key => PATH.resolve(__dirname, MAP_FILE[key]),
    "RES":   key => PATH.resolve(__dirname, MAP_RES[key])
}
const readFileByType = {
    "DATA":  key => readFileFn(MAP_DATA[key]),
    "UTILS": key => readFileFn(MAP_UTILS[key]),
    "CORE":  key => readFileFn(MAP_CORE[key]),
    "PARSE": key => readFileFn(MAP_PARSE[key]),
    "FILE":  key => readFileFn(MAP_FILE[key]),
    "RES":   key => readFileFn(MAP_RES[key])
}
module.exports.fetch = identifier => {
    const [type, key] = identifier.split('|')
    return fetchFileByType[type](key)
}
module.exports.fetchPath = identifier => {
    const [type, key] = identifier.split('|')
    return fetchPathByType[type](key)
}
module.exports.read = identifier => {
    const [type, key] = identifier.split('|')
    return readFileByType[type](key)
}
```
===+
const { config, fetch, fetchPath } = require('../config')
const {writeFileSync} = fetch('UTILS|fs')
const src = fetchPath("DATA|src:updateTime")
read('RES|markdown.scene')
===-
:::

::: details vuepress
===+
[##]  自定义格式 

预设className：
    颜色 c0 c3 c6 c9 cc cf
    背景 bg0 bg3 bg6 bg9 bgc bgf
    标题 h1 h2 h3 h4 h5 h6
    注释 comment

普通区域
- Flex
    &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; 8             // 小于等于10 flex-grow: 8
    col 01
    &#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61; 100classname  // 大于10 flex-basis: n  可注入自定义classname
    col 02
    &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;

自定义代码块 
&#61;&#61;&#61;&#43; 
    ANCHOR&#91;1627821297227|node-inspect&#93;  > 
    ANCHOR&#91;npm_user_register|npm#NPM帐户|NPM帐户&#93;
    ANCHOR&#91;1123403874911|gulp&#93;                        <div class="anchor" name="1123403874911" id="1123403874911"></div>
    ANCHOR&#91;1123403874915|gulp&#93;
    ANCHOR&#91;1123403874919|gulp&#93;
    ANCHOR&#91;1627903874915|gulp&#93;
    ANCHOR&#91;1627903874915|gulp&#93;
    ANCHOR&#91;1627908583281|commander&#93;
    ANCHOR&#91;1627905586210|chokidar&#93;
    ANCHOR&#91;1627905787356|chalk&#93;
    ANCHOR&#91;1627966781710|node-plantuml&#93;
    ANCHOR&#91;1627970757090|uglify-js&#93;
    ANCHOR&#91;1627970949874|child_process&#93;
    ANCHOR&#91;1627971037955|nodemon&#93;
    ANCHOR&#91;1628080742911|pm2&#93; 
    ANCHOR&#91;1628080758946|concurrently&#93; 
    ANCHOR&#91;1628080852157|node-cache&#93; 

    TITLE2&#91;npm_user_register|npm#NPM帐户|NPM帐户&#93;
    TITLE2&#91;npm_user_register|npm#NPM帐户|NPM帐户&#93;
    
    LINK&#91;1627821297227|自命名&#93;  LINK&#91;1627821297227&#93;
    LINK&#91;npm_user_register|没有帐户&多人发布&#93;
    LINK&#91;npm_user_register|没有帐户&多人发布&#93;
    LINK&#91;1627821297227|node-inspect&#93;
        

    
    

    

    &#91;FORM_START&#93;

        [{color:#f33}e4fc5eb9-316a-48e5-a970-dc116e7ab897]
        {{[{color:#26f}API]}}
        {{[{color:#26f}RES]}}

        按钮： 
        [BTNbg6 cf|+ New Collection]
        [BTNbg6 cf|Save to collection-name]
        [BTNbg6 cf|Manage Environments]
        [BTNbg6 cf|Add]
        [BTNbg6 cf|Add] 
        [BTN|Send] 
        [BTN|Save]
        [BTNbg6 cf|Save]
        [BTNbg6 cf|Send]
        [BTN|Send] [BTN|Save]
        [BTNbg6 cf|Select File]
        [BTNbg6 cf|Save]
        [BTNbg6 cf|Send]

        INPUT: 
        ▭说明文本▭
        ▭{color:#ffaa22}collection-name▭
        ▭{color:#20b477}(bd)登录▭
        ▭{color:#8922ff}environment-name▭
        ▭{{[{color:#26f}API]}}/api/login/▭
        ▭{{[{color:#26f}RES]}}/api/cdn/UploadFile/▭

        选项卡：
        ▥⇤Params  Authorization  Headers  [Body]  Pre-request Script  Tests  Settings▥
        ▥⇤Params  Authorization  [Headers]  Body  Pre-request Script  Tests  Settings▥
        ▥⇤Params  Authorization  Headers  [Body]  Pre-request Script  Tests  Settings▥
        单选：
        ◉⇤none  form-data  [x-www-form-urlencoded]  raw  binary  GraphQL◉
        ◉⇤none  form-data  x-www-form-urlencoded  raw  [binary]  GraphQL◉

        列表菜单： 
        ▤collection-name[登录(active),上传]▤                       
        ▤(vtop)collection-name{color:#ffaa22}[登录(active),上传]▤
        ▤collection-name{color:#ffaa22}(bd)▤
        ▤Add Request▤
        ▤(vtop)collection-name{color:#ffaa22}[登录(active),上传]▤
        ▤(vtop)collection-name{color:#ffaa22}[登录,上传(active)]▤

        下拉选项：
        ▼POST▼ 
        ▼environment-name{color:#8922ff}▼ 
        ▼collection-name{color:#ffaa22}(bd)▼
        ▼environment-name{color:#8922ff}▼
        ▼environment-name{color:#8922ff}▼

        表格：
        ▦⇤VARIABLE(变量)        INITIAL VALUE(初始值)      CURRENT VALUE(当前值) 
        API{color:#26f}  https://api.com:4432  https://api.com:4432
        RES{color:#26f}  https://res.com:4433  https://res.com:4433
        ▦
        ▦⇤KEY        VALUE      DESCRIPTION  
            username   ewan
            password   123456
        ▦
        ▦⇤KEY        VALUE      DESCRIPTION  
            authenticate  e4fc5eb9-316a-48e5-a970-dc116e7ab897{color:#f33}
        ▦

        连接格式：
        ↴background-color:#eef7f4; vertical-align:top; padding:10px↤ ↦       

        
    &#91;FORM_END&#93;

    表单重构：
    ﹃
        ⊙Radio◉
        ☐Checkbox▣
        ⅠInput▏
        ▎Textarea▎
        ▭ Button▭ ▬ ▭
        ▼ Select
        ▤Table▥
        ☰List☷
        ▮Tab▯
        TreeSelect
        ↦ ↔ → ⇥ Step
        ⚠Alert⊗

    ﹄


&#61;&#61;&#61;&#45;


[##]  场景 
[##]  攻略 
[##]  方案 
[##]  规范 
[##]  PlantUML 
===-
:::

::: details Javascript注释
-------------------------------------- 1
===+
[#]  普通注释 
目的：帮助开发者和阅读者更好地理解程序+
规范：
    1. 总是在单行注释符后留一个空格
    2. 总是在多行注释的结束符前留一个空格(使星号对齐)
    3. 不要把注释写在多行注释的开始符、结束符所在行
    4. 不要编写无意义的注释
===-
====================================== 100
===+

&nbsp; 5// 正确的单行注释
&nbsp; 
&nbsp; 5/*
&nbsp; 正确的多行注释
&nbsp; 注释符星号对齐                           
&nbsp;  */
===-
====================================== 300
===+

1/* 不要在此书写
                             
   不要在此书写 */

1// 声明变量value(无意义)
===-
====================================== 1
<strong>■ TODO</strong>
===+
// TODO 未处理IE6-8的兼容性
function setOpacity(node, val) {
    node.style.opacity = val;
}
===-
--------------------------------------

-------------------------------------- 400
===+
[#]  文档注释 
规范：
    1. 星号对齐
    2. 注释内容与星号间留一个空格
    3. 文档注释必须包含一个或多个注释标签
===-
====================================== 1
===+

类型：String/Number/Object/Array/ArrayLike<Element>/Element
多类型：{(string|string[])} {*}

参数有默认值时：[参数名=默认值]
===-
--------------------------------------

-------------------------------------- 200
===+
1/**
 * 模块说明
 * @module 模块名
 */

2/**
 * 类说明
 * @class 类名
 * @constructor
 * @param {参数类型} 参数名 参数说明
 */

3/**
 * 类方法说明
 * @method 方法名
 * @for 所属类名                     
 * @param {参数类型} 参数名 参数说明  
 * @return {返回值类型} 返回值说明    
 * @static                          
 */
===-
====================================== 300
===+
1/**
 * 提供最基础、最核心的接口
 * @module Core
 */

2/**
 * 节点集合类
 * @class NodeList
 * @constructor                     
 * @param {ArrayLike<Element>} nodes 初始化节点
 */

3/**
 * 返回当前集合中指定位置的元素
 * @method
 * @for NodeList                                         
 * @param {Number} [i=0] 位置下标
 * @return {Element} 指定元素   
 */
===-
====================================== 4
===+
4/**
 * 属性说明
 * @property {属性类型} 属性名
 */




&nbsp; // 必须搭配@constructor或@static使用，分别标记非静态类与静态类
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp; // 没有指定@for时，表示此函数为全局或模块顶层函数
&nbsp; // 当函数有参数时
&nbsp; // 当函数有返回值时
&nbsp; // 当函数为静态函数时

===-
--------------------------------------

-------------------------------------- 1
===+
[#]  文件注释 
规范：
    1. 文件注释位于文件的最前面
    2. 文件注释必须全部以英文字符表示，并存在于文件的开发版本与生产版本中2222

3/*!
 * jRaiser 2 Javascript Library
 * kan.56.com - v1.0.0 (2013-03-15T14:55:51+0800)      // 概要说明及版本(必须) 修改时间(必须)以ISO格式表示
 * http://jraiser.org/ | Released under MIT license    // 项目地址(开源组件必须) 开源协议(开源组件必须)
 * Copyright 2005-2013 56.com                          // 版权声明(必须)
 *
 * Include sizzle (http://sizzlejs.com/)               // 如果文件内包含开源组件 则必须在文件注释中进行说明
 */
===-
--------------------------------------

===+
[#]  块标签 
===-
-------------------------------------- 2
===+
# 对文件进行描述
@author       指定项目作者
@copyright    描述版权信息
@see          描述可以参考外部资源
@version      描述版本信息
@tutorial     插入一个指向教程的链接，作为文档的一部分
@since        描述该功能哪个版本哪个时间添加进来的
@summary      描述一个简写版本
@file         文件说明，在文件开头使用
@license      描述代码才有那种软件许可协议

# 标注js使用方法
@returns      描述一个函数的返回值
@param        描述传递给函数的参数
@description  描述
@example      举例
@throws       描述可能会被抛出什么样的错误

# 开发者备注
@deprecated   标注关联代码已经被弃用
@todo         描述一个将要完成的任务
===-
====================================== 3
===+
# 文件详细结构
@abstract     标注该成员必须在子类中实现或重写
@access       标注该成员的访问级别
@access private > @private
@access protected > @protected
@access public > @public
@augments(@extends)    标注这个子类继承自哪个父类，后面需要加父类名
@class(@constructor)   标注该函数是一个构造函数，需要使用new来实例化
@constant(@const)      标注这个对象是一个常量
@constructs            标注这个函数用来作为类的构造器
@default               标注默认值
@exports               标注javascript模块导出的内容
@function(@func、@method) 标注该对象作为一个函数
@global                   标注为全局变量(对象)
@implements    标注实现一个接口
@inheritdoc    标注继承其父类的文档
@inner         标注为其父类的内部成员
@instance      标注为其父类的实例成员
@interface     标注其为可以实现的接口
@kind          指明标注的类型(@kind class = @class)
@lends         将一个字面量对象的所有成员标记为某个类(或模块)的成员
@memberof      标注成员属于哪个父级
@mixes         标注该对象混入了另一个对象的所有成员
@mixin         标注一个混入对象
@module        将当前文档标注为一个模块
===-
====================================== 3
===+

@protected  标注为受保护的
@public     标注为公开的
@readonly   标注为只读的
@requires   标注这个文件需要一个javascript模块
@static     标注为静态的
@type       标注类型
@typeof     标注一个自定义的类型
@this       描述this关键字的指向
@alias      标注成员有一个别名
@borrow     将另一个标识符的描述添加到当前标识符的描述
@name       强制jsdoc使用这个给定的名称，而忽略代码里的实际名称
@namespace  标注一个命名空间对象
@override   标注覆盖其父类同名的方法
@private    标注为私有
@classdesc  与@class结合使用，描述类
@callback   描述一个回调函数
@enum       描述一个静态属性值的全部相同的集合，通常与@readonly结合使用
@event      描述事件
@member     描述一个成员 @member [] []
@property   描述一个对象的属性
@external   标识一个外部的类，命名空间，或模块
@files      标明当一个方法被调用时将触发一个指定类型的事件
@listens    标注监听事件
@variation  区分具有相同名称的不同对象
===-
--------------------------------------

:::

