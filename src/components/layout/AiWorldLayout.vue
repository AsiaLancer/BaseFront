<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { computed, ref } from 'vue'
import { Search, Sunny, Moon, Bell, User, CaretBottom, ArrowRight, Setting, SwitchButton } from '@element-plus/icons-vue'
import { useTheme } from '@/utils/useTheme'
import SettingsDrawer from '@/components/common/SettingsDrawer.vue'

const router = useRouter()
const userStore = useUserStore()
const { getEffectiveTheme, toggleTheme } = useTheme()
const isDark = computed(() => getEffectiveTheme() === 'dark')
const isLoggedIn = computed(() => userStore.isLoggedIn)
const username = computed(() => userStore.username)
const userInfo = computed(() => userStore.userInfo)

const searchQuery = ref('')
const showSettings = ref(false)

const navItems = [
    { l:'首页', to:'/ai-world' },
    { l:'直播', to:'/ai-world/live' },
    { l:'视频', to:'/ai-world/videos' },
    { l:'漫画', to:'/ai-world/comics' },
    { l:'论坛', to:'/ai-world/forum' },
]

function goHome() { router.push('/ai-world') }
function goLogin() { router.push('/login') }
function goProfile() { router.push('/course/profile') }
async function handleLogout() { await userStore.logout(); router.push('/login') }
function onCmd(cmd) {
    if (cmd === 'profile') goProfile()
    else if (cmd === 'settings') showSettings.value = true
    else if (cmd === 'logout') handleLogout()
}
</script>

<template>
<div class="aw-layout">
    <!-- Top nav -->
    <header class="aw-header">
        <div class="aw-header-inner">
            <button class="aw-brand" @click="goHome">
                <span class="aw-logo">MOXUE</span>
                <span class="aw-tag">AI WORLD</span>
            </button>
            <router-link to="/course" class="aw-back-link">
                <el-icon><ArrowRight/></el-icon> 返回墨学
            </router-link>
            <nav class="aw-nav">
                <router-link v-for="item in navItems" :key="item.l" :to="item.to"
                    class="aw-nav-link" active-class="aw-nav-active">{{item.l}}</router-link>
            </nav>
            <div class="aw-actions">
                <button class="aw-icon-btn" @click="toggleTheme" :aria-label="isDark?'亮色':'暗色'">
                    <el-icon :size="18"><component :is="isDark?Sunny:Moon"/></el-icon>
                </button>
                <div class="aw-search">
                    <el-input v-model="searchQuery" size="small" placeholder="搜索视频、直播…" :prefix-icon="Search" class="aw-search-input"/>
                </div>
                <template v-if="isLoggedIn">
                    <el-badge :value="5" class="aw-badge"><el-icon :size="18"><Bell/></el-icon></el-badge>
                    <el-dropdown trigger="click" @command="onCmd">
                        <button class="aw-user-btn">
                            <el-avatar :src="userInfo?.avatar" :size="28"><el-icon><User/></el-icon></el-avatar>
                            <span class="aw-username">{{username||'用户'}}</span>
                            <el-icon :size="12"><CaretBottom/></el-icon>
                        </button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="profile">个人主页</el-dropdown-item>
                                <el-dropdown-item command="settings">设置</el-dropdown-item>
                                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
                <template v-else>
                    <el-button size="small" round @click="goLogin">登录</el-button>
                </template>
            </div>
        </div>
    </header>
    <!-- Page content -->
    <main class="aw-main">
        <router-view />
    </main>
    <SettingsDrawer :visible="showSettings" @close="showSettings=false"/>
</div>
</template>

<style scoped>
.aw-layout { min-height:100vh;background:var(--surface-root);display:flex;flex-direction:column; }
.aw-header { position:sticky;top:0;z-index:100;height:56px;background:var(--surface-root);border-bottom:1px solid var(--border-subtle); }
.aw-header-inner { max-width:1400px;margin:0 auto;padding:0 24px;height:100%;display:flex;align-items:center;gap:20px; }
.aw-brand { display:flex;align-items:baseline;gap:8px;background:none;border:none;cursor:pointer;flex-shrink:0;padding:0; }
.aw-logo { font-family:var(--font-display);font-size:18px;font-weight:700;color:#00d4ff;letter-spacing:2px; }
.aw-tag { font-size:10px;color:#8b5cf6;letter-spacing:3px;text-transform:uppercase;border:1px solid rgba(139,92,246,.2);padding:1px 6px;border-radius:4px; }
.aw-back-link { display:inline-flex;align-items:center;gap:4px;font-size:12px;color:var(--text-muted);text-decoration:none;padding:6px 12px;border-radius:8px;border:1px solid var(--border-subtle);transition:all .2s;flex-shrink:0; }
.aw-back-link:hover { color:#00d4ff;border-color:rgba(0,212,255,.2); }
.aw-nav { display:flex;gap:8px; }
.aw-nav-link { padding:8px 22px;font-size:14px;color:var(--text-secondary);text-decoration:none;border-radius:8px;transition:all .2s; }
.aw-nav-link:hover { color:var(--text-primary); }
.aw-nav-active { color:#00d4ff!important;background:rgba(0,212,255,.06); }
.aw-actions { display:flex;align-items:center;gap:12px;margin-left:auto;flex-shrink:0; }
.aw-icon-btn { background:none;border:none;cursor:pointer;color:var(--text-secondary);display:flex;padding:4px;border-radius:6px;transition:all .2s; }
.aw-icon-btn:hover { color:#00d4ff;background:var(--surface-glass-hover); }
.aw-search { width:200px; }
.aw-search-input { --el-input-bg-color:var(--surface-glass);--el-input-border-color:var(--border-subtle);--el-input-hover-border-color:var(--border-emphasis);--el-input-focus-border-color:#00d4ff;--el-input-text-color:var(--text-primary);--el-input-placeholder-color:var(--text-muted); }
.aw-search-input :deep(.el-input__wrapper) { border-radius:9999px!important;height:34px!important; }
.aw-badge { cursor:pointer;color:var(--text-secondary); }
.aw-user-btn { display:flex;align-items:center;gap:6px;background:none;border:none;cursor:pointer;color:var(--text-primary);font-size:13px; }
.aw-username { max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
.aw-main { flex:1; }

@media(max-width:768px){ .aw-nav{display:none} .aw-search{display:none} }
</style>
