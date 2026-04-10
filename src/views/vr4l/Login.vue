<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const loginForm = reactive({
    username: '',
    password: ''
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
</script>

<template>
    <div class="login-container">
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
    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: linear-gradient(to bottom, #000000 0%, #1a1a1a 40%, #504635 70%, #9b8d6a 100%);
}

.login-card {
    width: 400px;
    padding: 20px;
}

.title {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
}

.login-form {
    margin-top: 20px;
}

.login-button {
    width: 100%;
}
</style>