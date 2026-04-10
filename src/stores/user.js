// stores/user.js
import { defineStore } from 'pinia'
import { loginApi, logoutApi, getUserInfoApi } from '@/apis/user'
import { usePermissionStore } from './permission'
import { ref, computed } from 'vue'
export const useUserStore = defineStore('user', () => {
    // ============ State ============
    const token = ref(localStorage.getItem('token') || '')
    const userInfo = ref(null)
    const role = ref('')
    const username = ref(localStorage.getItem('username') || '未知用户')

    // ============ Getters ============
    const isLoggedIn = computed(() => !!token.value)
    const avatar = computed(() => userInfo.value?.avatar || '/default-avatar.png')

    // ============ Actions ============

    // 登录
    async function login(loginForm) {
        try {
            const res = await loginApi(loginForm)
            token.value = res.token
            role.value = res.data.role
            userInfo.value = res.data
            username.value = res.data.username

            // 持久化
            localStorage.setItem('token', res.token)
            localStorage.setItem('role', res.data.role)
            localStorage.setItem('username', res.data.username)
            return { success: true }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    // 获取用户信息
    async function fetchUserInfo() {
        if (!token.value) return null
        try {
            const res = await getUserInfoApi()
            userInfo.value = res.data
            role.value = res.data.role
            username.value = res.data.username
            return res.data
        } catch (error) {
            console.error('获取用户信息失败', error.message)
            return null
        }
    }

    // 登出
    async function logout() {
        try {
            await logoutApi()
        } catch (e) {
            // 忽略退出接口错误
        } finally {
            // 清理状态
            token.value = ''
            role.value = ''
            userInfo.value = null
            username.value = '未知用户'
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            localStorage.removeItem('username')
            // 清理权限状态
            const permissionStore = usePermissionStore()
            permissionStore.resetPermission()
        }
    }

    // 初始化（页面刷新时调用）
    async function initUserState() {
        if (token.value && !userInfo.value) {
            await fetchUserInfo()
        }
    }

    return {
        // state
        token,
        userInfo,
        role,
        // getters
        isLoggedIn,
        username,
        avatar,
        // actions
        login,
        logout,
        fetchUserInfo,
        initUserState
    }
})