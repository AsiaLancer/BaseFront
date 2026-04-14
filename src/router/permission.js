// router/permission.js
import router from './index'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import { ElMessage } from 'element-plus'

// 白名单
const whiteList = ['/login', '/404', '/403', '/register']

// 递归过滤路由
function filterRoutes(routes, roles) {
    return routes.filter(route => {
        // 检查角色权限
        if (route.meta?.roles && route.meta.roles.length > 0) {
            if (!route.meta.roles.some(role => roles.includes(role))) {
                return false
            }
        }

        // 递归处理子路由
        if (route.children && route.children.length > 0) {
            route.children = filterRoutes(route.children, roles)
        }

        return true

    })
}

// 动态添加路由
function addRoutes(accessRoutes) {
    accessRoutes.forEach(route => {
        // 处理路由名称，避免重复
        const routeName = route.name
        if (router.hasRoute(routeName)) {
            router.removeRoute(routeName)
        }
        router.addRoute(route)
    })
}

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
    // 1. 设置页面标题
    document.title = to.meta.title
        ? `${to.meta.title}`
        : '管理后台'

    const userStore = useUserStore()
    const permissionStore = usePermissionStore()

    // 2. 白名单路由直接通过
    if (whiteList.includes(to.path)) {
        next()
        return
    }

    // 3. 检查登录状态
    if (!userStore.isLoggedIn) {
        // 计算 redirect 参数
        const redirect = to.fullPath
        next(`/login?redirect=${encodeURIComponent(redirect)}`)
        return
    }

    // 4. 已登录，检查是否需要动态生成路由
    if (!permissionStore.isRoutesGenerated) {
        try {
            // 初始化用户状态
            await userStore.initUserState()

            // 获取权限路由
            const accessRoutes = await permissionStore.generateRoutes()
            // 根据用户角色过滤路由
            const filteredRoutes = filterRoutes(
                accessRoutes,
                [userStore.role]
            )
            // 动态添加路由
            addRoutes(filteredRoutes)
            // 继续导航，使用 replace 避免历史记录问题
            next({ ...to, replace: true })
        } catch (error) {
            console.error('路由生成失败', error)
            ElMessage.error('路由初始化失败，请重新登录')
            await userStore.logout()
            next(`/login?redirect=${to.path}`)
        }
    } else {
        // 已经有路由，直接通过
        next()
    }
})

