<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useTheme } from '@/utils/useTheme'
import {
    Search, Bell, Setting, User,
    SwitchButton, CaretBottom, ChatDotRound, Reading, Sunny, Moon
} from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const themeApi = useTheme()
const { getEffectiveTheme, toggleTheme } = themeApi
const isDark = computed(() => {
    try { return getEffectiveTheme() === 'dark' }
    catch { return true }
})
const isLoggedIn = computed(() => userStore.isLoggedIn)
const username = computed(() => userStore.username)
const userInfo = computed(() => userStore.userInfo)

const searchQuery = ref('')
const scrolled = ref(false)

if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => { scrolled.value = window.scrollY > 20 }, { passive: true })
}

function goHome()    { router.push('/course') }
function goLogin()   { router.push('/login') }
function goProfile() { router.push('/course/profile') }
function goAI()      { router.push('/course/aichat') }
function goSettings(){ router.push('/course/settings') }
async function handleLogout() { await userStore.logout(); router.push('/login') }

function onCmd(cmd) {
    if (cmd === 'profile') goProfile()
    else if (cmd === 'aichat') goAI()
    else if (cmd === 'settings') goSettings()
    else if (cmd === 'logout') handleLogout()
}
</script>

<template>
    <header class="nav-sticky" :class="{ 'nav-scrolled': scrolled }">
        <div class="nav-inner">
            <!-- Brand Zone: Logo + Name + Tagline -->
            <button class="brand-zone" @click="goHome" aria-label="墨学首页">
                <span class="brand-logo">MOXUE</span>
                <span class="brand-tagline">传承智慧 · 启迪未来</span>
            </button>

            <!-- Desktop nav links -->
            <nav class="nav-links" aria-label="主导航">
                <router-link to="/course" class="nav-link" active-class="nav-link-active">首页</router-link>
                <router-link to="/course/courses" class="nav-link" active-class="nav-link-active">课程</router-link>
                <router-link to="/course/aichat" class="nav-link" active-class="nav-link-active">AI 学伴</router-link>
                <router-link to="/course/paths" class="nav-link" active-class="nav-link-active">学习路径</router-link>
            </nav>

            <!-- Right actions -->
            <div class="nav-actions">
                <!-- Theme toggle -->
                <button class="nav-icon-btn" @click="toggleTheme" :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'">
                    <el-icon :size="20"><component :is="isDark ? Sunny : Moon" /></el-icon>
                </button>

                <!-- Search -->
                <div class="hidden lg:block w-48 xl:w-56">
                    <el-input v-model="searchQuery" size="small" placeholder="搜索…"
                        :prefix-icon="Search"
                        class="nav-search-input" />
                </div>

                <template v-if="isLoggedIn">
                    <!-- Notification -->
                    <el-badge :value="3" :max="99" class="nav-icon-btn">
                        <el-icon :size="20"><Bell /></el-icon>
                    </el-badge>

                    <!-- User dropdown -->
                    <el-dropdown trigger="click" @command="onCmd">
                        <button class="nav-user-btn">
                            <el-avatar :src="userInfo?.avatar" :size="30" class="flex-shrink-0">
                                <el-icon><User /></el-icon>
                            </el-avatar>
                            <span class="hidden md:inline text-sm text-text-primary ml-2">{{ username || '用户' }}</span>
                            <el-icon :size="14" class="text-text-muted ml-1"><CaretBottom /></el-icon>
                        </button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="profile"><el-icon><User /></el-icon>个人主页</el-dropdown-item>
                                <el-dropdown-item command="aichat"><el-icon><ChatDotRound /></el-icon>AI 学伴</el-dropdown-item>
                                <el-dropdown-item command="settings"><el-icon><Setting /></el-icon>账号设置</el-dropdown-item>
                                <el-dropdown-item command="logout" divided><el-icon><SwitchButton /></el-icon>退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>

                <template v-else>
                    <el-button size="small" round class="!border-white/10 !text-text-secondary" @click="goLogin">
                        登录
                    </el-button>
                    <el-button size="small" type="primary" round @click="router.push('/register')">
                        注册
                    </el-button>
                </template>
            </div>
        </div>
    </header>
</template>

<style scoped>
/* ═══════════ STICKY GLASS NAVBAR ═══════════ */
.nav-sticky {
    position: sticky; top: 0; z-index: 100; height: 64px;
    background: color-mix(in srgb, var(--surface-root, #ffffff) 85%, transparent);
    backdrop-filter: blur(12px) saturate(120%);
    -webkit-backdrop-filter: blur(12px) saturate(120%);
    border-bottom: 1px solid var(--border-subtle);
    transition: background .3s, backdrop-filter .3s, box-shadow .3s;
}
.nav-sticky.nav-scrolled {
    background: color-mix(in srgb, var(--surface-root, #ffffff) 92%, transparent);
    backdrop-filter: blur(16px) saturate(120%);
    -webkit-backdrop-filter: blur(16px) saturate(120%);
    box-shadow: 0 1px 0 var(--border-subtle), 0 4px 24px rgba(0,0,0,.08);
}
.nav-inner { max-width:1200px; margin:0 auto; padding:0 24px; height:100%; display:flex; align-items:center; gap:24px; }

/* Brand */
.nav-logo { background:none; border:none; cursor:pointer; display:flex; align-items:baseline; flex-shrink:0; padding:0; }

/* Links */
.nav-links { display:none; gap:2px; }
@media(min-width:768px){.nav-links{display:flex}}
.nav-link { padding:10px 16px; border-radius:8px; font-size:14px; color:var(--text-secondary); text-decoration:none; transition:color .2s, background .2s; min-height:44px; display:inline-flex; align-items:center; }
.nav-link:hover { color:var(--text-primary); background:var(--surface-glass-hover); }
.nav-link-active { color:#00e5ff !important; background:rgba(0,229,255,.06); }

/* Actions */
.nav-actions { display:flex; align-items:center; gap:12px; margin-left:auto; flex-shrink:0; }
.nav-icon-btn { background:none; border:none; cursor:pointer; color:var(--text-secondary); transition:color .2s; display:flex; padding:4px; border-radius:8px; }
.nav-icon-btn:hover { color:#00e5ff; background:var(--surface-glass-hover); }
.nav-user-btn { display:flex; align-items:center; background:none; border:none; cursor:pointer; padding:2px 10px 2px 2px; border-radius:9999px; transition:background .2s; color:var(--text-primary); }
.nav-user-btn:hover { background:var(--surface-glass-hover); }

/* Search — pill shape, theme-adaptive */
.nav-search-input :deep(.el-input__wrapper) {
    border-radius: 9999px !important;
    background: var(--surface-glass) !important;
    border-color: var(--border-subtle) !important;
    box-shadow: none !important;
    transition: all .25s !important;
    height: 38px !important;
    padding-inline: 16px !important;
}
.nav-search-input :deep(.el-input__wrapper:hover) {
    border-color: var(--border-default) !important;
    background: var(--surface-glass-hover) !important;
}
.nav-search-input :deep(.el-input__wrapper.is-focus) {
    border-color: var(--brand-primary) !important;
    box-shadow: 0 0 0 3px rgba(0,229,255,.1) !important;
    background: var(--surface-glass-hover) !important;
}
.nav-search-input :deep(.el-input__inner) {
    color: var(--text-primary) !important;
    font-size: 13px !important;
}
.nav-search-input :deep(.el-input__inner::placeholder) {
    color: var(--text-muted) !important;
}
.nav-search-input :deep(.el-input__prefix) {
    color: var(--text-muted) !important;
}

/* Login/Register buttons in nav */
.nav-actions :deep(.el-button.is-round) {
    border-color: var(--border-default) !important;
    color: var(--text-secondary) !important;
}
.nav-actions :deep(.el-button--primary.is-round) {
    border-color: transparent !important;
    color: var(--text-inverse) !important;
}

@media(max-width:640px){.nav-inner{padding:0 16px;gap:12px}}
</style>
