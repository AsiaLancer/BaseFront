<!-- components/Layout/Sidebar.vue -->
<template>
    <aside class="sidebar" :class="{ 'is-collapse': !sidebarOpened }">
        <!-- Logo -->
        <div class="logo">
            <img src="/favicon.ico" alt="logo" class="logo-img" />
            <span v-if="sidebarOpened" class="logo-text">管理后台</span>
        </div>
        <!-- 菜单 -->
        <el-menu :default-active="activeMenu" :collapse="!sidebarOpened" :unique-opened="true" class="sidebar-menu"
            background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF" :router="true">
            <MenuItem v-for="menu in menuList" :key="menu.path" :item="menu" :parentPath="''" />
        </el-menu>
    </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePermissionStore } from '@/stores/permission'
import { useSettingsStore } from '@/stores/setting'
import MenuItem from './MenuItem.vue'

const route = useRoute()
const permissionStore = usePermissionStore()
const settingsStore = useSettingsStore()

// 递归处理路由，生成菜单数据
const flattenRoutes = (routes, parentPath = '') => {
    const result = []
    routes.forEach(route => {
        const fullPath = route.path.startsWith('/')
            ? route.path
            : `${parentPath}/${route.path}`.replace(/\/+/g, '/')

        // 如果有子路由，先处理子路由
        if (route.children && route.children.length > 0) {
            const visibleChildren = route.children.filter(child => !child.meta?.hidden)
            if (visibleChildren.length > 0) {
                // 如果当前路由有 title，作为父菜单
                if (route.meta?.title) {
                    result.push({
                        ...route,
                        path: fullPath,
                        children: flattenRoutes(visibleChildren, fullPath)
                    })
                } else {
                    // 没有 title，直接把子路由提出来
                    result.push(...flattenRoutes(visibleChildren, fullPath))
                }
            }
        } else if (route.meta?.title) {
            // 没有子路由但有 title，直接添加
            result.push({
                ...route,
                path: fullPath
            })
        }
    })
    return result
}

// 菜单数据
const menuList = computed(() => permissionStore.visibleRoutes)
console.log(menuList.value)
// 当前激活的菜单
const activeMenu = computed(() => route.path)

// 侧边栏是否展开
const sidebarOpened = computed(() => settingsStore.sideBarOpened)
</script>

<style scoped>
.sidebar {
    width: 200px;
    height: 100vh;
    background-color: #304156;
    transition: width 0.6s;
    overflow-y: auto;
}

.sidebar.is-collapse {
    width: 64px;
}

.logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2b3a4a;
}

.logo-img {
    width: 32px;
    height: 32px;
}

.sidebar-menu {
    border: none !important;
}

.logo-text {
    margin-left: 8px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
}
</style>