<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { ElMessage } from 'element-plus'
import { User, Lock, View, Hide } from '@element-plus/icons-vue'
import storages from '@/utils/storages.js'
import { getStarStyle } from '@/utils/designUtils.js'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 表单引用
const formRef = ref(null)

// 密码显示状态
const passwordVisible = ref(true)

const loginForm = reactive({
    username: '',
    password: '',
    remember: true,
    code: '',
    phone: '',
    loginType: 'password'
})
// 表单验证规则
const rules = {
    username: [
        { required: true, message: '请输入用户名或邮箱', trigger: 'blur' },
        { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度为 6-20 个字符', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
    ]
}

const loading = ref(false)

const handleLogin = async () => {
    if (!loginForm.username || !loginForm.password) {
        ElMessage.warning('请输入用户名和密码')
        return
    }
    // 表单验证
    const valid = await formRef.value?.validate().catch(() => false)
    if (!valid) {
        ElMessage.warning('请填写正确的用户名和密码')
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


function switchLoginType(type) {
    loginForm.loginType = type
}

const goRegister = () => {
    router.push('/register')
}
const initIsLoggedIn = () => {
    if (storages.getItem("last_login_number") && storages.getItem("loginType")) {
        loginForm.loginType = storages.getItem("loginType")
        loginForm.username = storages.getItem("last_login_number")
    }
    // 检查用户是否已登录
    if (userStore.isLoggedIn) {
        router.push('/layout')
    }
}

// 初始化用户状态
onMounted(
    initIsLoggedIn
)
</script>

<template>

    <div class="login-page">
        <!-- 背景装饰 -->
        <div class="login-bg">
            <div class="bg-circle circle-1"></div>
            <div class="bg-circle circle-2"></div>
            <div class="bg-circle circle-3"></div>
            <div class="bg-circle circle-4"></div>
            <div class="stars-container">
                <div v-for="i in 200" :key="i" class="star" :style="getStarStyle()"></div>
            </div>
        </div>
        <!-- 登录容器 -->
        <div class="login-container">
            <img class="sidebar-img-left" src="@/assets/imgs/sidebar-left1.webp" alt="">
            <img class="sidebar-img-right" src="@/assets/imgs/sidebar-right1.webp" alt="">
            <img class="sidebar-img-top3" src="@/assets/imgs/sidebar-top3.webp" alt="">
            <img class="sidebar-q-left" src="@/assets/imgs/sidebar-left2.webp" alt="">
            <img class="sidebar-q-right" src="@/assets/imgs/sidebar-right2.webp" alt="">
            <img class="sidebar-q-top" src="@/assets/imgs/sidebar-top2.webp" alt="">

            <!-- 左侧品牌区域 -->
            <div class="login-brand">
                <div class="brand-content">
                    <h1 class="brand-title">昇新</h1>
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
                    </div>
                </div>
            </div>
            <!-- 右侧登录表单区域 -->
            <div class="login-form-wrapper">
                <div class="login-form-container">
                    <div class="form-header">
                        <h2 class="form-title">欢迎回来</h2>
                        <p class="form-subtitle">登录昇新账号，开启学习之旅</p>
                    </div>
                    <!-- 登录类型切换 -->
                    <div class="login-type-tabs">
                        <span class="tab-item" :class="{ active: loginForm.loginType === 'password' }"
                            @click="switchLoginType('password')">
                            密码登录
                        </span>
                        <span class="tab-item" :class="{ active: loginForm.loginType === 'code' }"
                            @click="switchLoginType('code')">
                            验证码登录
                        </span>
                    </div>

                    <!-- 表单 -->
                    <el-form ref="formRef" :model="loginForm" :rules="rules" class="login-form"
                        @keyup.enter="handleLogin">
                        <!-- 账号输入 -->
                        <el-form-item v-if="loginForm.loginType === 'password'" prop="username">
                            <el-input v-model="loginForm.username" placeholder="请输入用户名或邮箱" size="large"
                                :prefix-icon="User" clearable />
                        </el-form-item>
                        <el-form-item v-if="loginForm.loginType === 'code'" prop="phone">
                            <el-input v-model="loginForm.phone" placeholder="请输入手机号码" size="large" :prefix-icon="User"
                                clearable />
                        </el-form-item>
                        <!-- 密码输入 -->
                        <el-form-item v-if="loginForm.loginType === 'password'" prop="password">
                            <el-input v-model="loginForm.password" :type="passwordVisible ? 'password' : 'text'"
                                placeholder="请输入密码" size="large" :prefix-icon="Lock">
                                <template #suffix>
                                    <el-icon @click="passwordVisible = !passwordVisible">
                                        <component :is="passwordVisible ? Hide : View" />
                                    </el-icon>
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item v-else prop="code">
                            <el-col :span="10">
                                <el-input v-model="loginForm.code" placeholder="请输入验证码" size="large"
                                    :prefix-icon="Lock" />
                            </el-col>
                            <el-col :span="8">
                                <el-button type="primary" size="large" class="send-code-btn" @click="sendCode">
                                    发送验证码
                                </el-button>
                            </el-col>
                        </el-form-item>

                        <!-- 记住密码 & 忘记密码 -->
                        <div class="form-options">
                            <el-checkbox v-model="loginForm.remember">记住账号</el-checkbox>
                            <el-link v-if="loginForm.loginType === 'password'" type="primary"
                                class="forgot-link">忘记密码？</el-link>
                        </div>

                        <!-- 提交按钮 -->
                        <el-form-item>
                            <el-button type="primary" size="large" class="submit-btn" :loading="loading"
                                @click="handleLogin">
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
                            <span>admin/123456</span>
                            <span>teacher/123456</span>
                            <span>student/123456</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.feature-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-size: var(--font-size-md);
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
