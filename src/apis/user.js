// apis/user.js
const userList = [
    { id: 1, username: 'AsiaLancer', password: '123456', role: 'admin', email: 'admin@example.com', phone: '13800000000' },
    { id: 2, username: 'user1', password: '123456', role: 'user-manager', email: 'user1@example.com', phone: '13800000001' },
    { id: 3, username: 'user2', password: '123456', role: 'user-manager', email: 'user2@example.com', phone: '13800000002' },
    { id: 4, username: 'user3', password: '123456', role: 'user-manager', email: 'user3@example.com', phone: '13800000003' },
    { id: 5, username: 'user4', password: '123456', role: 'user-manager', email: 'user4@example.com', phone: '13800000004' },
    { id: 6, username: 'user5', password: '123456', role: 'user-manager', email: 'user5@example.com', phone: '13800000005' }
]

// 模拟延迟
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// 登录
export async function loginApi(loginForm) {
    await delay(800)

    const user = userList.find(
        item => item.username === loginForm.username && item.password === loginForm.password
    )

    if (!user) {
        throw new Error('用户名或密码错误')
    }

    // 生成模拟 token（包含用户名，方便解析）
    const token = `${Math.random().toString(36).substring(2)}_${user.username}`

    // 返回用户信息（排除密码）
    const { password, ...userInfo } = user

    return { token, data: userInfo }
}

// 获取当前用户信息（根据 token）
export async function getUserInfoApi() {
    await delay(300)

    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('未登录')
    }

    // 从 token 中解析用户名
    const username = token.split('_')[1]
    const user = userList.find(item => item.username === username)

    if (!user) {
        throw new Error('用户不存在')
    }

    const { password, ...userInfo } = user
    return { data: userInfo }
}

// 退出登录
export async function logoutApi() {
    await delay(300)
    return { success: true }
}