<!-- components/Layout/Navbar.vue -->
<template>
    <div class="navbar">
        <!-- 折叠按钮 -->
        <div class="hamburger" @click="toggleSideBar">
            <i :class="sidebarOpened ? 'el-icon-fold' : 'el-icon-unfold'"></i>1
        </div>
        <!-- 右侧用户信息 -->
        <div class="user-info">
            <el-dropdown @command="handleCommand">
                <span class="user-name">
                    {{ userStore.username }}
                    <i class="el-icon-arrow-down"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useSettingsStore } from '@/stores/setting';
import { computed } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const settingsStore = useSettingsStore()

const sidebarOpened = computed(() => settingsStore.sideBarOpened)

const toggleSideBar = () => {
    settingsStore.toggleSideBar()
}

const handleCommand = async (command) => {
    if (command === 'logout') {
        ElMessageBox.confirm('确定要退出登录吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            await userStore.logout()
            router.push('/login')
        })
    } else if (command === 'profile') {
        router.push('/profile')
    }
}
</script>

<style scoped>
.navbar {
    height: 50px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
}

.hamburger {
    font-size: 20px;
    cursor: pointer;
    border: 1px solid #993535;
    color: #993535;
}

.user-info {
    cursor: pointer;
}

.user-name {
    color: #333;
    display: inline-flex;
    align-items: center;
    outline: none;
}

.user-name:focus,
.user-name:hover {
    outline: none;
}
</style>