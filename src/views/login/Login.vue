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
            const redirect = route.query.redirect || '/course'
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
const goHome = () => {
    router.push('/course')
}
const initIsLoggedIn = () => {
    if (storages.getItem("last_login_number") && storages.getItem("loginType")) {
        loginForm.loginType = storages.getItem("loginType")
        loginForm.username = storages.getItem("last_login_number")
    }
    // 检查用户是否已登录
    if (userStore.isLoggedIn) {
        goHome()
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
            <div class="bg-glow bg-glow-1"></div>
            <div class="bg-glow bg-glow-2"></div>
            <div class="bg-grid"></div>
            <div class="stars-container">
                <div v-for="i in 100" :key="i" class="star" :style="getStarStyle()"></div>
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
                    <div class="brand-icon">
                        <span class="bi-ring"></span>
                        <span class="bi-text">昇</span>
                    </div>
                    <h1 class="brand-title" @click="goHome">墨学</h1>
                    <p class="brand-subtitle">传承千年智慧 · 启迪当代学人</p>
                    <!-- 宣传轮播 -->
                    <div class="brand-carousel">
                        <div class="bc-slide">
                            <img src="https://picsum.photos/seed/promo1/360/180" alt="">
                            <p class="bc-text">海量精品课程，随时随地学习</p>
                        </div>
                        <div class="bc-slide">
                            <img src="https://picsum.photos/seed/promo2/360/180" alt="">
                            <p class="bc-text">AI 智能伴学，个性化学习路径</p>
                        </div>
                        <div class="bc-slide">
                            <img src="https://picsum.photos/seed/promo3/360/180" alt="">
                            <p class="bc-text">名师在线授课，成就更好的你</p>
                        </div>
                    </div>
                    <!-- 数据行 -->
                    <div class="brand-stats">
                        <div class="bs-item"><b>128+</b><span>精品课程</span></div>
                        <div class="bs-div"></div>
                        <div class="bs-item"><b>86</b><span>合作名师</span></div>
                        <div class="bs-div"></div>
                        <div class="bs-item"><b>52K+</b><span>在读学员</span></div>
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

                    <!-- 第三方登录 -->
                    <div class="social-login">
                        <p class="social-title">其他登录方式</p>
                        <div class="social-list">
                            <button class="social-btn wechat" title="微信登录">
                                <span class="social-icon">💬</span>
                                <span>微信</span>
                            </button>
                            <button class="social-btn qq" title="QQ登录">
                                <span class="social-icon">🐧</span>
                                <span>QQ</span>
                            </button>
                            <button class="social-btn github" title="GitHub登录">
                                <span class="social-icon">🐙</span>
                                <span>GitHub</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.login-container>img { pointer-events: none; }

/* New immersive background */
.login-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.bg-glow { position: absolute; border-radius: 50%; filter: blur(100px); opacity: .05; }
.bg-glow-1 { width: 500px; height: 400px; background: radial-gradient(circle, #00d4ff, transparent 70%); top: -10%; right: -8%; animation: glowDrift 14s ease-in-out infinite; }
.bg-glow-2 { width: 400px; height: 350px; background: radial-gradient(circle, #8b5cf6, transparent 70%); bottom: -8%; left: -5%; animation: glowDrift 18s ease-in-out infinite reverse; }
@keyframes glowDrift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-30px,20px) scale(1.2)} 66%{transform:translate(20px,-15px) scale(.85)} }
.bg-grid { position: absolute; inset: 0; opacity: .015;
    background-image: linear-gradient(rgba(0,212,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,.5) 1px, transparent 1px);
    background-size: 50px 50px; }

/* ═══════ MICRO-INTERACTIONS ═══════ */

/* Brand title glow pulse */
.brand-title { animation: brandPulse 3s ease-in-out infinite; }
@keyframes brandPulse { 0%,100%{filter:drop-shadow(0 0 6px rgba(0,212,255,.15))} 50%{filter:drop-shadow(0 0 14px rgba(0,212,255,.3))} }

/* Feature items — hover lift */
.feature-item { transition: transform .25s, border-color .25s, box-shadow .25s; cursor: default; }
.feature-item:hover { transform: translateY(-2px); border-color: rgba(0,212,255,.15); box-shadow: 0 4px 16px rgba(0,0,0,.2); }

/* Tab active — smooth slide */
.tab-item { position: relative; transition: color .25s; }
.tab-item.active::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 2px; background: #00d4ff; animation: tabSlide .3s ease-out; }
@keyframes tabSlide { from{transform:scaleX(0)} to{transform:scaleX(1)} }

/* Input focus — glow ring */
.login-form :deep(.el-input__wrapper.is-focus) { box-shadow: 0 0 0 3px rgba(0,212,255,.1) !important; }

/* Submit button — hover scale */
.submit-btn {
    transition: transform .2s, box-shadow .2s !important;
    --el-button-bg-color: #00d4ff !important;
    --el-button-border-color: #00d4ff !important;
    --el-button-hover-bg-color: #33e0ff !important;
    --el-button-hover-border-color: #33e0ff !important;
    --el-button-text-color: #060b18 !important;
    --el-button-hover-text-color: #060b18 !important;
}
.submit-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(0,212,255,.25) !important; }
.submit-btn:active { transform: scale(.98) !important; }
.send-code-btn { --el-button-bg-color:#00d4ff !important; --el-button-border-color:#00d4ff !important; --el-button-hover-bg-color:#33e0ff !important; --el-button-hover-border-color:#33e0ff !important; --el-button-text-color:#060b18 !important; }

/* Password toggle — spin on toggle */
.pwd-toggle { transition: transform .3s; }
.pwd-toggle:active { transform: rotate(180deg); }

/* Sidebar images — subtle float */
.login-container>img { transition: transform .4s ease-out; }
.login-container:hover>img:nth-child(1) { transform: translateX(4px); }
.login-container:hover>img:nth-child(2) { transform: translateX(-4px); }
.login-container:hover>img:nth-child(3) { transform: translateY(-4px); }

/* Left brand — fixed width */
.login-brand { flex: 0 0 420px !important; }
.brand-content { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; }

/* Brand icon */
.brand-icon { position:relative; width:52px; height:52px; margin-bottom:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.bi-ring { position:absolute; inset:0; border-radius:50%; border:1px solid rgba(0,212,255,.1); animation:biSpin 12s linear infinite; }
.bi-text { font-family:'KaiTi','STKaiti',serif; font-size:26px; color:#00d4ff; position:relative; z-index:1; }
@keyframes biSpin { to{transform:rotate(360deg)} }

/* Title */
.brand-title { animation:brandPulse 3s ease-in-out infinite; margin-bottom:4px; }
@keyframes brandPulse { 0%,100%{filter:drop-shadow(0 0 6px rgba(0,212,255,.15))} 50%{filter:drop-shadow(0 0 14px rgba(0,212,255,.3))} }
.brand-subtitle { margin-bottom:20px; }

/* Carousel */
.brand-carousel { position:relative; width:360px; height:240px; border-radius:10px; overflow:hidden; flex-shrink:0; }
.bc-slide { position:absolute; inset:0; display:flex; flex-direction:column; animation:carouselSlide 9s infinite; }
.bc-slide:nth-child(1) { animation-delay:0s; }
.bc-slide:nth-child(2) { animation-delay:3s; }
.bc-slide:nth-child(3) { animation-delay:6s; }
.bc-slide img { width:100%; height:180px; object-fit:cover; border-radius:10px 10px 0 0; flex-shrink:0; }
.bc-text { font-size:14px; color:var(--text-secondary); text-align:center; padding:16px 8px 0; margin:0; }
@keyframes carouselSlide {
    0%   { transform:translateX(100%); }
    5%   { transform:translateX(0); }
    28%  { transform:translateX(0); }
    33%  { transform:translateX(-100%); }
    100% { transform:translateX(-100%); }
}

/* Stats row */
.brand-stats { display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 16px; }
.bs-item { text-align: center; }
.bs-item b { display: block; font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text-primary); }
.bs-item span { font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; }
.bs-div { width: 1px; height: 26px; background: var(--border-subtle); }

/* Hide old features */
.brand-features { display:none !important; }

/* Social login */
.social-login { margin-top: 24px; text-align: center; }
.social-title { font-size: 12px; color: var(--text-muted); margin-bottom: 12px; display: flex; align-items: center; gap: 12px; }
.social-title::before, .social-title::after { content: ''; flex: 1; height: 1px; background: var(--border-subtle); }
.social-list { display: flex; gap: 10px; justify-content: center; }
.social-btn {
    display: flex; align-items: center; gap: 6px; padding: 8px 18px;
    border-radius: 10px; border: 1px solid var(--border-default);
    background: var(--surface-glass); color: var(--text-secondary);
    font-size: 13px; cursor: pointer; transition: all .2s;
}
.social-btn:hover { border-color: var(--border-emphasis); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,.15); }
.social-btn:active { transform: scale(.97); }
.social-icon { font-size: 16px; }

/* Forgot link — underline slide */
.forgot-link { position: relative; text-decoration: none; background: linear-gradient(#00d4ff,#00d4ff) 0 100%/0 1px no-repeat; transition: background-size .3s; }
.forgot-link:hover { background-size: 100% 1px; }

/* Checkbox — color match */
.form-options :deep(.el-checkbox__input.is-checked .el-checkbox__inner) { background-color: #00d4ff !important; border-color: #00d4ff !important; }

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
    color: #00d4ff;
    border-bottom-color: #00d4ff;
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
