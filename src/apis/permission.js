// apis/permission.js
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// 模拟后端返回的菜单路由
// 注意：这里的格式和前端 asyncRoutes 一致，但只返回用户有权限的
export async function getMenuListApi() {
    await delay(500)

    const role = localStorage.getItem('role') || 'user'

    // 根据角色返回不同菜单
    const adminMenus = [
        {
            path: '/layout',
            component: () => import('@/components/layout/Layout.vue'),
            redirect: '/layout/dashboard',
            meta: { requiresAuth: true, title: '数据操作' },
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: () => import('@/views/vr4l/Dashboard.vue'),
                    meta: {
                        title: '仪表盘',
                        icon: 'dashboard',
                        permission: 'dashboard:view'
                    }
                }
            ]
        },
        {
            path: '/users',
            component: () => import('@/components/layout/Layout.vue'),
            redirect: '/users/list',
            meta: { requiresAuth: true, roles: ['admin', 'user-manager'], title: '用户操作' },
            children: [
                {
                    path: 'list',
                    name: 'UserList',
                    component: () => import('@/views/vr4l/UserList.vue'),
                    meta: {
                        title: '用户列表',
                        icon: 'user',
                        permission: 'user:list'
                    }
                },
                {
                    path: ':id',
                    name: 'UserDetail',
                    component: () => import('@/views/vr4l/UserDetail.vue'),
                    meta: {
                        title: '用户详情',
                        permission: 'user:view'
                    }
                }
            ]
        },
        {
            path: '/settings',
            component: () => import('@/components/layout/Layout.vue'),
            meta: { requiresAuth: true, roles: ['admin'], title: '设置' },
            children: [
                {
                    path: '',
                    name: 'Settings',
                    component: () => import('@/views/vr4l/Settings.vue'),
                    meta: {
                        title: '系统设置',
                        icon: 'setting',
                        permission: 'system:settings'
                    }
                }
            ]
        }
    ]

    const userMenus = [
        {
            path: '/layout',
            component: () => import('@/components/layout/Layout.vue'),
            redirect: '/layout/dashboard',
            meta: { requiresAuth: true, title: '数据操作' },
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: () => import('@/views/vr4l/Dashboard.vue'),
                    meta: {
                        title: '仪表盘',
                        icon: 'dashboard',
                        permission: 'dashboard:view'
                    }
                }
            ]
        }
    ]

    return {
        data: role === 'admin' ? adminMenus : userMenus
    }
}

// 模拟后端返回的按钮权限列表
export async function getButtonListApi() {
    await delay(300)

    const role = localStorage.getItem('role') || 'user'

    const adminButtons = [
        'user:add', 'user:edit', 'user:delete', 'user:view',
        'dashboard:view', 'system:settings'
    ]

    const userButtons = [
        'dashboard:view'
    ]

    return {
        data: role === 'admin' ? adminButtons : userButtons
    }
}