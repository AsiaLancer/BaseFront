// stores/permission.js
import { defineStore } from 'pinia'
import { getMenuListApi, getButtonListApi } from '@/apis/permission'
import { ref, computed } from 'vue'

export const usePermissionStore = defineStore('permission', () => {
    // ============ State ============
    const routes = ref([])           // 菜单路由列表
    const buttons = ref([])          // 按钮权限列表
    const isRoutesGenerated = ref(false)

    // ============ Getters ============

    // 可见菜单（过滤 hidden）
    const visibleRoutes = computed(() => {
        return routes.value.filter(route => !route.meta?.hidden)
    })

    // 是否有按钮权限
    const hasButtonPermission = computed(() => (code) => {
        return buttons.value.includes(code)
    })

    // ============ Actions ============

    // 生成路由
    async function generateRoutes() {
        try {
            // 获取菜单
            const menuRes = await getMenuListApi()
            routes.value = menuRes.data

            // 获取按钮权限
            const btnRes = await getButtonListApi()
            buttons.value = btnRes.data

            isRoutesGenerated.value = true

            return routes.value
        } catch (error) {
            console.error('生成路由失败', error)
            return []
        }
    }

    // 重置权限
    function resetPermission() {
        routes.value = []
        buttons.value = []
        isRoutesGenerated.value = false
    }

    return {
        // state
        routes,
        buttons,
        isRoutesGenerated,
        // getters
        visibleRoutes,
        hasButtonPermission,
        // actions
        generateRoutes,
        resetPermission
    }
})