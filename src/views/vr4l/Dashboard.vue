<!-- views/dashboard/index.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const stats = ref([
    { title: '用户总数', value: 1024, icon: 'user' },
    { title: '订单总数', value: 5678, icon: 'shopping-cart' },
    { title: '今日访问', value: 234, icon: 'view' },
    { title: '活跃用户', value: 89, icon: 'user-filled' }
])

onMounted(() => {
    // 可以在这里获取仪表盘数据
})
</script>

<template>
    <div class="dashboard">
        <h1>欢迎回来，{{ userStore.username }}</h1>

        <el-row :gutter="20" class="stats-row">
            <el-col v-for="stat in stats" :key="stat.title" :xs="24" :sm="12" :md="6">
                <el-card class="stat-card">
                    <div class="stat-content">
                        <div class="stat-info">
                            <p class="stat-title">{{ stat.title }}</p>
                            <p class="stat-value">{{ stat.value }}</p>
                        </div>
                        <i :class="`el-icon-${stat.icon}`" class="stat-icon"></i>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.dashboard {
    padding: 20px;
}

h1 {
    margin-bottom: 30px;
    color: #333;
}

.stats-row {
    margin-top: 20px;
}

.stat-card {
    margin-bottom: 20px;
}

.stat-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.stat-title {
    color: #909399;
    font-size: 14px;
    margin-bottom: 10px;
}

.stat-value {
    font-size: 28px;
    font-weight: bold;
    color: #303133;
}

.stat-icon {
    font-size: 50px;
    color: #409EFF;
}
</style>