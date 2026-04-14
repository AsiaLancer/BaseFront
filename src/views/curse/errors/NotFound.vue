<script setup>
import { useRouter } from 'vue-router'
import { ElButton } from 'element-plus'

defineOptions({ name: 'NotFoundPage' })

const router = useRouter()

// 返回首页
const goHome = () => {
    router.push('/curse')
}

// 返回上一页
const goBack = () => {
    router.back()
}
</script>

<template>
    <div class="not-found-page">
        <div class="not-found-content">
            <div class="error-code">404</div>
            <h1 class="error-title">页面不存在</h1>
            <p class="error-desc">
                抱歉，您访问的页面可能已删除或地址有误
            </p>
            <div class="error-actions">
                <el-button type="primary" size="large" @click="goHome">
                    返回首页
                </el-button>
                <el-button size="large" @click="goBack">
                    返回上一页
                </el-button>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.not-found-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.not-found-content {
    max-width: 500px;
}

.error-code {
    font-size: 120px;
    font-weight: bold;
    background: linear-gradient(135deg, var(--color-ancient), var(--color-bronze));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: var(--spacing-lg);
}

.error-title {
    font-size: var(--font-size-xxl);
    color: var(--text-primary);
    margin-bottom: var(--spacing-base);
}

.error-desc {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-xl);
}

.error-actions {
    display: flex;
    justify-content: center;
    gap: var(--spacing-base);
}
</style>
