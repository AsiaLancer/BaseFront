<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { Star, Reading, Medal, Edit, ArrowRight, User } from '@element-plus/icons-vue'

const userStore = useUserStore()
const router = useRouter()
const user = computed(() => userStore.userInfo || {})
const isLoggedIn = computed(() => userStore.isLoggedIn)
const username = computed(() => userStore.username || '未登录')

if (!isLoggedIn.value) router.push('/login')
</script>

<template>
<div class="up-page" v-if="isLoggedIn">
    <!-- Profile header -->
    <div class="up-header">
        <div class="up-avatar-wrap">
            <el-avatar :src="user.avatar" :size="88" class="up-avatar">
                <el-icon :size="44"><User /></el-icon>
            </el-avatar>
            <span v-if="user.isVip" class="up-vip-badge">VIP{{ user.vipLevel }}</span>
        </div>
        <div class="up-info">
            <h1 class="up-name">{{ user.nickname || username }}</h1>
            <p class="up-role">{{ user.role === 'admin' ? '管理员' : user.role === 'teacher' ? '讲师' : '学员' }}</p>
            <p class="up-bio">{{ user.bio || '这个人很懒，什么都没写…' }}</p>
            <div class="up-stats">
                <span><b>{{ user.courses || 0 }}</b> 课程</span>
                <span class="up-stat-div">·</span>
                <span><b>{{ (user.fans || 0).toLocaleString() }}</b> 粉丝</span>
                <span class="up-stat-div">·</span>
                <span><b>{{ user.following || 0 }}</b> 关注</span>
                <span class="up-stat-div">·</span>
                <span><b>{{ (user.likes || 0).toLocaleString() }}</b> 获赞</span>
            </div>
        </div>
        <el-button round class="up-edit-btn"><el-icon><Edit/></el-icon> 编辑资料</el-button>
    </div>

    <!-- Tabs -->
    <div class="up-tabs">
        <button class="up-tab active">我的课程</button>
        <button class="up-tab">学习成就</button>
    </div>

    <!-- Courses placeholder -->
    <div class="up-empty">
        <el-icon :size="48"><Reading/></el-icon>
        <p>还没有加入任何课程</p>
        <el-button type="primary" round @click="router.push('/course/courses')">
            浏览课程 <el-icon class="ml-1"><ArrowRight/></el-icon>
        </el-button>
    </div>
</div>
</template>

<script>
import { User as UserIcon } from '@element-plus/icons-vue'
export default { components: { UserIcon } }
</script>

<style scoped>
.up-page { max-width:800px; margin:0 auto; padding:48px 28px 80px; }

/* Header */
.up-header { display:flex; align-items:flex-start; gap:28px; margin-bottom:40px; padding:32px; border-radius:20px; background:var(--surface-glass); border:1px solid var(--border-subtle); }
.up-avatar-wrap { position:relative; flex-shrink:0; }
.up-avatar { border:3px solid rgba(0,212,255,.3); }
.up-vip-badge { position:absolute; bottom:-4px; left:50%; transform:translateX(-50%); padding:2px 10px; border-radius:9999px; font-size:10px; font-weight:700; background:linear-gradient(135deg,#fbbf24,#f59e0b); color:#000; }
.up-info { flex:1; min-width:0; }
.up-name { font-family:var(--font-display); font-size:26px; font-weight:700; color:var(--text-primary); margin-bottom:4px; }
.up-role { font-size:13px; color:#00d4ff; margin-bottom:8px; }
.up-bio { font-size:14px; color:var(--text-secondary); line-height:1.6; margin-bottom:16px; }
.up-stats { display:flex; gap:12px; font-size:14px; color:var(--text-muted); }
.up-stats b { color:var(--text-primary); font-family:var(--font-display); }
.up-stat-div { color:var(--border-subtle); }
.up-edit-btn { height:40px; border-color:var(--border-default)!important; color:var(--text-secondary)!important; flex-shrink:0; align-self:center; }

/* Tabs */
.up-tabs { display:flex; gap:0; margin-bottom:32px; border-bottom:1px solid var(--border-subtle); }
.up-tab { padding:12px 28px; background:none; border:none; border-bottom:2px solid transparent; color:var(--text-muted); font-size:15px; cursor:pointer; transition:all .2s; }
.up-tab.active { color:#00d4ff; border-bottom-color:#00d4ff; }
.up-tab:hover { color:var(--text-primary); }

/* Empty */
.up-empty { text-align:center; padding:80px 0; color:var(--text-muted); }
.up-empty p { margin:16px 0; font-size:15px; }

@media(max-width:768px){ .up-header{flex-direction:column;align-items:center;text-align:center} .up-edit-btn{align-self:center} }
</style>
