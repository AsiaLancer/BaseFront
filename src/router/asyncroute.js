// router/routes/async.js

// 需要权限的路由配置
export const asyncRoutes = [
    {
        path: '/layout',
        component: () => import('@/components/layout/Layout.vue'),
        redirect: '/layout/dashboard',
        meta: { requiresAuth: true },
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/curse/Dashboard.vue'),
                meta: {
                    title: '仪表盘',
                    icon: 'iconfont icon-icon-test4',
                    permission: 'dashboard:view'
                }
            }
        ]
    },
    {
        path: '/users',
        component: () => import('@/components/layout/Layout.vue'),
        redirect: '/users/list',
        meta: { requiresAuth: true, roles: ['admin'] },
        children: [
            {
                path: 'list',
                name: 'UserList',
                component: () => import('@/views/curse/UserList.vue'),
                meta: {
                    title: '用户列表',
                    icon: 'user',
                    permission: 'user:list'
                }
            },
            {
                path: ':id',
                name: 'UserDetail',
                component: () => import('@/views/curse/UserDetail.vue'),
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
        meta: { requiresAuth: true, roles: ['admin'] },
        children: [
            {
                path: '',
                name: 'Settings',
                component: () => import('@/views/curse/Settings.vue'),
                meta: {
                    title: '系统设置',
                    icon: 'setting',
                    permission: 'system:settings'
                }
            }
        ]
    }
]