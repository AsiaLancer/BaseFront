<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 表单引用
const formRef = ref(null)
// 登录方式
const loginType = ref('password') // 'password' | 'username' | 'email'
// 密码显示状态
const passwordVisible = ref(false)
const loginForm = reactive({
    username: '',
    password: '',
    remember: true
})
// 表单验证规则
const rules = {
    loginAccount: [
        { required: true, message: '请输入用户名或邮箱', trigger: 'blur' },
        { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度为 6-20 个字符', trigger: 'blur' }
    ]
}

// 初始化用户状态
onMounted(() => {
    if (userStore.isLoggedIn) {
        router.push('/layout')
    }
})
const loading = ref(false)

const handleLogin = async () => {
    if (!loginForm.username || !loginForm.password) {
        ElMessage.warning('请输入用户名和密码')
        return
    }

    loading.value = true

    try {
        const result = await userStore.login(loginForm)

        if (result.success) {
            ElMessage.success('登录成功')

            // 跳转到之前页面或首页
            const redirect = route.query.redirect || '/layout'
            router.push(redirect)
        } else {
            ElMessage.error(result.message || '登录失败')
        }
    } finally {
        loading.value = false
    }
}
const getStarStyle = (index) => {
    // 随机位置：宽度 0-100%，高度 0-50%（只在上半部分）
    const left = Math.random() * 100
    const top = Math.random() * 40  // 只在上半部分

    // 随机大小：1px 到 4px
    const size = 1 + Math.random() * 3

    // 随机透明度
    const opacity = 0.3 + Math.random() * 0.7

    // 随机动画时长：2s 到 8s
    const duration = 2 + Math.random() * 6

    // 随机延迟
    const delay = Math.random() * 5

    return {
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: opacity,
        '--duration': `${duration}s`,
        '--opacity': opacity,
        animationDelay: `${delay}s`
    }
}
</script>

<template>
    <!-- <div class="login-container">
        <el-card class="login-card">
            <h2 class="title">管理后台登录</h2>

            <el-form :model="loginForm" class="login-form">
                <el-form-item>
                    <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="User" />
                </el-form-item>

                <el-form-item>
                    <el-input v-model="loginForm.password" type="password" placeholder="密码" prefix-icon="Lock"
                        @keyup.enter="handleLogin" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" :loading="loading" class="login-button" @click="handleLogin">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div> -->
    <div class="login-page">
        <!-- 背景装饰 -->
        <div class="login-bg">
            <div class="bg-circle circle-1"></div>
            <div class="bg-circle circle-2"></div>
            <div class="bg-circle circle-3"></div>
            <div class="stars-container">
                <div v-for="i in 200" :key="i" class="star" :style="getStarStyle(i)"></div>
            </div>
        </div>
        <!-- 登录容器 -->
        <div class="login-container">
            <!-- 左侧品牌区域 -->
            <div class="login-brand">
                <div class="brand-content">
                    <h1 class="brand-title">墨学</h1>
                    <p class="brand-subtitle">传承千年智慧 · 启迪当代学人</p>
                    <div class="brand-features">
                        <div class="feature-item">
                            <span class="feature-icon">📚</span>
                            <span class="feature-text">海量课程资源</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🎓</span>
                            <span class="feature-text">名师在线授课</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🏆</span>
                            <span class="feature-text">学习成就体系</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右侧登录表单区域 -->
            <div class="login-form-wrapper">
                <div class="login-form-container">
                    <div class="form-header">
                        <h2 class="form-title">欢迎回来</h2>
                        <p class="form-subtitle">登录墨学账号，开启学习之旅</p>
                    </div>
                    <!-- 登录类型切换 -->
                    <div class="login-type-tabs">
                        <span class="tab-item" :class="{ active: loginType === 'password' }"
                            @click="switchLoginType('password')">
                            密码登录
                        </span>
                        <span class="tab-item" :class="{ active: loginType === 'code' }"
                            @click="switchLoginType('code')">
                            验证码登录
                        </span>
                    </div>

                    <!-- 表单 -->
                    <el-form ref="formRef" :model="loginForm" :rules="rules" class="login-form"
                        @keydown="handleKeydown">
                        <!-- 账号输入 -->
                        <el-form-item prop="loginAccount">
                            <el-input v-model="loginForm.loginAccount" placeholder="请输入用户名或邮箱" size="large"
                                :prefix-icon="User" clearable />
                        </el-form-item>

                        <!-- 密码输入 -->
                        <el-form-item prop="password">
                            <el-input v-model="loginForm.password" :type="passwordVisible ? 'text' : 'password'"
                                placeholder="请输入密码" size="large" :prefix-icon="Lock"
                                :suffix-icon="passwordVisible ? Hide : View"
                                @click:suffix="passwordVisible = !passwordVisible" />
                        </el-form-item>

                        <!-- 记住密码 & 忘记密码 -->
                        <div class="form-options">
                            <el-checkbox v-model="loginForm.remember">记住账号</el-checkbox>
                            <el-link type="primary" class="forgot-link">忘记密码？</el-link>
                        </div>

                        <!-- 提交按钮 -->
                        <el-form-item>
                            <el-button type="primary" size="large" class="submit-btn" :loading="loading"
                                @click="handleSubmit">
                                {{ loading ? '登录中...' : '登 录' }}
                            </el-button>
                        </el-form-item>
                    </el-form>

                    <!-- 注册入口 -->
                    <div class="form-footer">
                        <span class="footer-text">还没有账号？</span>
                        <el-link type="primary" class="register-link" @click="goRegister">
                            立即注册
                        </el-link>
                    </div>

                    <!-- 测试账号提示 -->
                    <div class="test-accounts">
                        <p class="test-title">测试账号：</p>
                        <div class="test-list">
                            <span>admin / 123456</span>
                            <span>teacher / 123456</span>
                            <span>student / 123456</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.brand-content {
    color: var(--text-primary);
    text-align: center;
}

.brand-title {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: var(--spacing-base);
    background: linear-gradient(135deg, var(--color-bronze), var(--color-gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.brand-subtitle {
    font-size: var(--font-size-lg);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-xxl);
}

.brand-features {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.feature-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-size: var(--font-size-md);
}


.form-header {
    margin-bottom: var(--spacing-xl);
}

.form-title {
    font-size: var(--font-size-xxl);
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
}

.form-subtitle {
    color: var(--text-secondary);
    font-size: var(--font-size-base);
}

/* 登录类型切换 */
.login-type-tabs {
    display: flex;
    margin-bottom: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
}

.tab-item {
    padding: var(--spacing-sm) var(--spacing-base);
    color: var(--text-secondary);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all var(--transition-fast);
}

.tab-item:hover,
.tab-item.active {
    color: var(--color-bronze);
    border-bottom-color: var(--color-bronze);
}

.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
}

.forgot-link {
    font-size: var(--font-size-sm);
}

.submit-btn {
    width: 100%;
    height: 44px;
    font-size: var(--font-size-md);
}

.form-footer {
    text-align: center;
    margin-top: var(--spacing-lg);
}

.footer-text {
    color: var(--text-secondary);
}

/* 测试账号提示 */
.test-accounts {
    margin-top: var(--spacing-xl);
    padding: var(--spacing-base);
    background: var(--bg-color);
    border-radius: var(--radius-base);
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
}

.test-title {
    margin-bottom: var(--spacing-xs);
    color: var(--text-placeholder);
}

.test-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
}

.test-list span {
    padding: 2px 8px;
    background: var(--bg-hover);
    border-radius: var(--radius-sm);
}
</style>
