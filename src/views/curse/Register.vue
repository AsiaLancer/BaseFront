<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { User, Lock, Message, View, Hide } from '@element-plus/icons-vue'
import { getStarStyle } from '@/utils/designUtils.js'

const router = useRouter()
const userStore = useUserStore()

// 表单引用
const formRef = ref(null)

// 密码显示状态
const passwordVisible = ref(false)
const confirmPasswordVisible = ref(false)

// 同意用户协议
const agreedToTerms = ref(false)

// 发送验证码按钮状态
const sendCodeLoading = ref(false)
const sendCodeText = ref('发送验证码')
const sendCodeCooldown = ref(0)

// 表单数据
const formData = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    verifyCode: '',
    nickname: '',
    phone: '',
    code: ''
})

// 密码强度计算
const passwordStrength = computed(() => {
    const pwd = formData.password
    if (!pwd) return { level: 0, text: '', color: '' }

    let strength = 0
    if (pwd.length >= 8) strength++
    if (/[a-z]/.test(pwd)) strength++
    if (/[A-Z]/.test(pwd)) strength++
    if (/[0-9]/.test(pwd)) strength++
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++

    const levels = [
        { level: 1, text: '弱', color: '#f56c6c' },
        { level: 2, text: '较弱', color: '#e6a23c' },
        { level: 3, text: '中等', color: '#e6a23c' },
        { level: 4, text: '较强', color: '#67c23a' },
        { level: 5, text: '强', color: '#67c23a' }
    ]

    return levels[Math.min(strength, 5) - 1] || levels[0]
})

// 自定义验证器 - 用户名
const validateUsername = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入用户名'))
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
        callback(new Error('用户名由3-20位字母、数字或下划线组成'))
    } else {
        callback()
    }
}

// 自定义验证器 - 邮箱
const validateEmail = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入邮箱'))
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        callback(new Error('请输入正确的邮箱格式'))
    } else {
        callback()
    }
}

// 自定义验证器 - 确认密码
const validateConfirmPassword = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请再次输入密码'))
    } else if (value !== formData.password) {
        callback(new Error('两次密码输入不一致'))
    } else {
        callback()
    }
}

// 表单验证规则
const rules = {
    username: [
        { required: true, validator: validateUsername, trigger: 'blur' }
    ],
    email: [
        { required: true, validator: validateEmail, trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度为 6-20 个字符', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, validator: validateConfirmPassword, trigger: 'blur' }
    ],
    verifyCode: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { len: 6, message: '验证码为6位数字', trigger: 'blur' }
    ]
}

// 是否正在提交
const loading = ref(false)

// 发送验证码
const handleSendCode = async () => {
    // 验证邮箱
    const emailValid = await formRef.value?.validateField('email').catch(() => false)
    if (!emailValid) return

    sendCodeLoading.value = true
    sendCodeText.value = '发送中...'

    // 模拟发送验证码
    setTimeout(() => {
        sendCodeLoading.value = false
        sendCodeText.value = '已发送'

        // 倒计时
        sendCodeCooldown.value = 60
        const timer = setInterval(() => {
            sendCodeCooldown.value--
            sendCodeText.value = `${sendCodeCooldown.value}秒后重发`
            if (sendCodeCooldown.value <= 0) {
                clearInterval(timer)
                sendCodeText.value = '发送验证码'
            }
        }, 1000)
    }, 1000)
}

// 跳转到登录页
const goLogin = () => {
    router.push('/login')
}

// 提交表单
const handleSubmit = async () => {
    // 验证协议勾选
    if (!agreedToTerms.value) {
        ElMessage.warning('请阅读并同意用户协议和隐私政策')
        return
    }

    // 表单验证
    const valid = await formRef.value?.validate().catch(() => false)
    if (!valid) return
    loading.value = true
    // 调用注册
    try {
        const success = await userStore.register({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            nickname: formData.nickname || formData.username
        })
        if (success) {
            // 注册成功，跳转到登录页
            router.push('/login')
        }
    } finally {
        loading.value = false
    }

}

</script>

<template>
    <div class="register-page">
        <!-- 背景装饰 -->
        <div class="register-bg">
            <div class="bg-circle circle-1"></div>
            <div class="bg-circle circle-2"></div>
            <div class="bg-circle circle-3"></div>
            <div class="bg-circle circle-4"></div>
            <div class="stars-container">
                <div v-for="i in 200" :key="i" class="star" :style="getStarStyle()"></div>
            </div>
        </div>
        <!-- 注册容器 -->
        <div class="register-container">
            <img class="sidebar-img-left" src="@/assets/imgs/sidebar-left1.webp" alt="">
            <img class="sidebar-img-right" src="@/assets/imgs/sidebar-right1.webp" alt="">
            <img class="sidebar-img-top" src="@/assets/imgs/sidebar-top1.webp" alt="">
            <img class="sidebar-q-left" src="@/assets/imgs/sidebar-left2.webp" alt="">
            <img class="sidebar-q-right" src="@/assets/imgs/sidebar-right2.webp" alt="">
            <img class="sidebar-q-top" src="@/assets/imgs/sidebar-top2.webp" alt="">
            <!-- 左侧品牌区域 -->
            <div class="register-brand">
                <div class="brand-content">
                    <h1 class="brand-title">昇新</h1>
                    <p class="brand-subtitle">开启您的学习之旅</p>
                    <div class="brand-quote">
                        <blockquote>
                            "学而时习之，不亦说乎"
                        </blockquote>
                        <cite>—— 论语</cite>
                    </div>
                    <div class="register-logo-img"></div>
                </div>
            </div>

            <!-- 右侧注册表单 -->
            <div class="register-form-wrapper">
                <div class="register-form-container">
                    <div class="form-header">
                        <h2 class="form-title">创建账号</h2>
                        <p class="form-subtitle">加入昇新，探索知识的海洋</p>
                    </div>

                    <!-- 表单 -->
                    <el-form ref="formRef" :model="formData" :rules="rules" class="register-form"
                        @keyup.enter="handleSubmit">
                        <!-- 用户名 -->
                        <el-form-item prop="username">
                            <el-input v-model="formData.username" placeholder="请输入用户名" size="large" :prefix-icon="User"
                                clearable />
                        </el-form-item>

                        <!-- 邮箱 + 验证码 -->
                        <el-form-item prop="email">
                            <el-row :gutter="0" style="width: 100%">
                                <el-col :span="16">
                                    <el-input v-model="formData.email" placeholder="请输入邮箱" size="large"
                                        :prefix-icon="Message" clearable />
                                </el-col>
                                <el-col :span="8">
                                    <el-button @click="handleSendCode" :loading="sendCodeLoading"
                                        :disabled="sendCodeCooldown > 0" size="large" type="primary"
                                        style="width: 100%">
                                        {{ sendCodeText }}
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>

                        <!-- 验证码 -->
                        <el-form-item prop="verifyCode">
                            <el-input v-model="formData.verifyCode" placeholder="请输入验证码" size="large" maxlength="6" />
                        </el-form-item>

                        <!-- 密码 -->
                        <el-form-item prop="password">
                            <el-input v-model="formData.password" :type="passwordVisible ? 'text' : 'password'"
                                placeholder="请设置密码" size="large" :prefix-icon="Lock">
                                <template #suffix>
                                    <el-icon @click="passwordVisible = !passwordVisible">
                                        <component :is="passwordVisible ? Hide : View" />
                                    </el-icon>
                                </template>
                            </el-input>
                        </el-form-item>

                        <!-- 密码强度提示 -->
                        <div v-if="formData.password" class="password-strength">
                            <el-progress :percentage="passwordStrength.level * 20" :color="passwordStrength.color"
                                :show-text="false" />
                            <span class="strength-text" :style="{ color: passwordStrength.color }">
                                密码强度：{{ passwordStrength.text }}
                            </span>
                        </div>

                        <!-- 确认密码 -->
                        <el-form-item prop="confirmPassword">
                            <el-input v-model="formData.confirmPassword"
                                :type="confirmPasswordVisible ? 'text' : 'password'" placeholder="请再次输入密码" size="large"
                                :prefix-icon="Lock">
                                <template #suffix>
                                    <el-icon @click="confirmPasswordVisible = !confirmPasswordVisible">
                                        <component :is="confirmPasswordVisible ? Hide : View" />
                                    </el-icon>
                                </template>
                            </el-input>
                        </el-form-item>

                        <!-- 用户协议 -->
                        <div class="terms-section">
                            <el-checkbox v-model="agreedToTerms">
                                我已阅读并同意
                            </el-checkbox>
                            <el-link type="primary" class="terms-link">《用户协议》</el-link>
                            <span>和</span>
                            <el-link type="primary" class="terms-link">《隐私政策》</el-link>
                        </div>

                        <!-- 提交按钮 -->
                        <el-form-item>
                            <el-button type="primary" size="large" class="submit-btn" :loading="loading"
                                @click="handleSubmit">
                                {{ loading ? '注册中...' : '注 册' }}
                            </el-button>
                        </el-form-item>
                    </el-form>

                    <!-- 登录入口 -->
                    <div class="form-footer">
                        <span class="footer-text">已有账号？</span>
                        <el-link type="primary" class="login-link" @click="goLogin">
                            立即登录
                        </el-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* 密码强度 */
.password-strength {
    margin-bottom: var(--spacing-base);
}

.strength-text {
    font-size: var(--font-size-xs);
    margin-top: var(--spacing-xs);
}

/* 用户协议 */
.terms-section {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-lg);
    font-size: var(--font-size-sm);
}

.terms-link {
    margin: 0 2px;
}

.register-logo-img {
    margin-top: var(--spacing-lg);
    width: 200px;
    height: 200px;
    background-image: url('@/assets/imgs/logo-chara.png');
    background-size: cover;
    background-position: center;
}
</style>
