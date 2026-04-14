import storages from '@/utils/storages.js'
// apis/user.js
const userList = [
    {
        id: '1',
        username: 'AsiaLancer',
        email: 'AsiaLancer@moxue.com',
        password: '123456',
        nickname: '管理员',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        role: 'admin',
        isVip: true,
        vipLevel: 3,
        bio: '墨学平台创始人，致力于弘扬中华传统文化与现代教育的融合。',
        fans: 12580,
        following: 256,
        likes: 45890,
        works: 48,
        courses: 12,
        phone: '13800000000',
        registerTime: '2023-01-15',
        lastLoginTime: '2024-03-10'
    },
    {
        id: '2',
        username: 'teacher',
        email: 'teacher@moxue.com',
        password: '123456',
        nickname: '墨韵讲师',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher',
        role: 'teacher',
        isVip: true,
        vipLevel: 2,
        bio: '国学院资深讲师，专注古典文学与现代教学方法研究。',
        fans: 5680,
        following: 128,
        likes: 12560,
        works: 24,
        courses: 8,
        phone: '13800000001',
        registerTime: '2023-03-20',
        lastLoginTime: '2024-03-10'
    },
    {
        id: '3',
        username: 'student',
        email: 'student@moxue.com',
        password: '123456',
        nickname: '墨香学员',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student',
        role: 'user',
        isVip: false,
        vipLevel: 0,
        bio: '热爱传统文化的学习者，正在墨学平台不断提升自己。',
        fans: 256,
        following: 89,
        likes: 1234,
        works: 5,
        courses: 12,
        phone: '13800000002',
        registerTime: '2023-06-01',
        lastLoginTime: '2024-03-09'
    },
    {
        id: '4',
        username: 'student',
        email: 'student@moxue.com',
        password: '123456',
        nickname: '墨撒旦阿萨',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student',
        role: 'user',
        isVip: false,
        vipLevel: 0,
        bio: '热爱传统文化的学习者，正在墨学平台不断提升自己。',
        fans: 26,
        following: 8129,
        likes: 11234,
        works: 51,
        courses: 112,
        phone: '13800000003',
        registerTime: '2023-06-01',
        lastLoginTime: '2024-03-09'
    },

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

    const token = storages.getItem('token')
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