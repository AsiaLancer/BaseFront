<script setup>

import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import CourseHeader from '@/components/layout/courselayout/CourseHeader.vue'

const route = useRoute()
const userStore = useUserStore()

// 侧边栏折叠状态
const sidebarCollapsed = ref(false)

// 是否显示侧边栏（登录后）
const showSidebar = computed(() => userStore.isLoggedIn)

// 监听路由变化，自动收起侧边栏
watch(() => route.path, () => {
    // 可根据需要添加逻辑
})

// 更新折叠状态
const onSidebarCollapse = (collapsed) => {
    sidebarCollapsed.value = collapsed
}
</script>

<template>
    <div class="main-layout">
        <!-- 顶部导航 -->
        <CourseHeader class="layout-header" />

        <!-- 主体内容区域 -->
        <div class="layout-body">
            <!-- 内容区域 -->
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>
