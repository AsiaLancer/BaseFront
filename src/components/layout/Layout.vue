<!-- components/Layout/Layout.vue -->
<template>
    <div class="app-wrapper">
        <!-- 侧边栏 -->
        <Sidebar />

        <!-- 主内容区 -->
        <div class="main-container">
            <!-- 顶部导航 -->
            <Navbar />

            <!-- 内容区 -->
            <main class="app-main">
                <!-- 面包屑导航 -->
                <el-breadcrumb separator="/" class="breadcrumb">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
                        {{ item.title }}
                    </el-breadcrumb-item>
                </el-breadcrumb>

                <!-- 路由出口：子路由组件渲染在这里 -->
                <div class="content-wrapper">
                    <RouterView />
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'

const route = useRoute()

// 面包屑：从 matched 中提取
const breadcrumbs = computed(() => {
    return route.matched
        .filter(item => item.meta?.title)
        .map(item => ({
            path: item.path,
            title: item.meta.title
        }))
})
</script>

<style scoped>
.app-wrapper {
    display: flex;
    width: 100%;
    height: 100vh;
}

.main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.app-main {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: #f0f2f5;
}

.breadcrumb {
    margin-bottom: 16px;
    padding: 8px 0;
}

.content-wrapper {
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    min-height: calc(100vh - 140px);
}
</style>