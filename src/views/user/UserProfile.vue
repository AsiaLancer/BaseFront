<script setup>
import { ref, computed, reactive, onMounted, nextTick } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import {
    User, Edit, Star, Reading, Medal, ArrowRight, Setting, Lock, Bell,
    Camera, Check, Close, Clock, Collection, Notebook, SwitchButton, Sunny, Moon
} from '@element-plus/icons-vue'
import { useTheme } from '@/utils/useTheme'
import { ElMessage } from 'element-plus'
import gsap from 'gsap'

const router = useRouter()
const userStore = useUserStore()
const { getEffectiveTheme, toggleTheme } = useTheme()

// ─── Data ───
const user = computed(() => userStore.userInfo || {})
const isLoggedIn = computed(() => userStore.isLoggedIn)
const username = computed(() => userStore.username || '未登录')
const isDark = computed(() => getEffectiveTheme() === 'dark')

// Tabs
const activeTab = ref('courses')
const tabs = [
    { k:'courses', l:'我的课程', icon:Notebook },
    { k:'favorites', l:'我的收藏', icon:Collection },
    { k:'history', l:'学习记录', icon:Clock },
    { k:'achievements',l:'我的成就', icon:Medal },
]

// Settings drawer
const showSettings = ref(false)

// ─── Avatar ───
const avatarInput = ref(null)
function triggerAvatar() { avatarInput.value?.click() }
function onAvatarChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
        if (userStore.userInfo) userStore.userInfo.avatar = ev.target.result
    }
    reader.readAsDataURL(file)
    ElMessage.success('头像已更新')
}

// ─── Bio editing ───
const editingBio = ref(false)
const bioDraft = ref('')
function startEditBio() {
    bioDraft.value = user.value.bio || ''
    editingBio.value = true
}
function saveBio() {
    if (userStore.userInfo) userStore.userInfo.bio = bioDraft.value
    editingBio.value = false
    ElMessage.success('个人介绍已更新')
}
function cancelBio() { editingBio.value = false }

// ─── Mock enrolled courses ───
const enrolledCourses = ref([
    { id:1,t:'《论语》精读二十讲',a:'墨韵先生',progress:75,img:'xn1.png',d:'20课时'},
    { id:4,t:'大模型应用开发实战',a:'凌风',progress:42,img:'xn4.png',d:'40课时'},
    { id:2,t:'Python 数据科学实战',a:'程远',progress:100,img:'xn2.png',d:'32课时'},
    { id:3,t:'颜体楷书入门到精通',a:'砚田墨香',progress:18,img:'xn3.png',d:'16课时'},
])

// ─── Mock favorites ───
const favorites = ref([1,3])

// ─── Mock history ───
const history = ref([
    { id:1,t:'《论语》精读二十讲',a:'墨韵先生',time:'2小时前',img:'xn1.png'},
    { id:4,t:'大模型应用开发实战',a:'凌风',time:'昨天',img:'xn4.png'},
    { id:6,t:'全栈 Web 开发训练营',a:'无极',time:'3天前',img:'xn6.png'},
    { id:2,t:'Python 数据科学实战',a:'程远',time:'1周前',img:'xn2.png'},
])

// ─── Mock achievements ───
const achievements = [
    { icon:'📖',t:'初出茅庐',d:'完成第1门课程', earned:true },
    { icon:'🔥',t:'连续学习',d:'连续7天登录学习', earned:true },
    { icon:'⭐',t:'满分学员',d:'获得课程满分评价', earned:false },
    { icon:'🏆',t:'学霸达人',d:'完成5门课程', earned:false },
    { icon:'💬',t:'社区活跃',d:'发表100条讨论', earned:false },
    { icon:'🎯',t:'持之以恒',d:'连续学习30天', earned:false },
]

function imgSrc(name) { return new URL(`@/assets/imgs/${name}`, import.meta.url).href }
function toggleFav(id) {
    const idx = favorites.value.indexOf(id)
    idx > -1 ? favorites.value.splice(idx,1) : favorites.value.push(id)
    ElMessage.success(idx > -1 ? '已取消收藏' : '已收藏')
}

// ─── Logout ───
async function handleLogout() {
    await userStore.logout()
    router.push('/login')
}

// ─── Init ───
onMounted(async () => {
    if (!isLoggedIn.value) { router.push('/login'); return }
    await nextTick()
    gsap.fromTo('.up-card', { opacity:0, y:30 }, { opacity:1, y:0, duration:.4, stagger:.06, ease:'power3.out' })
})
</script>

<template>
<div class="up-root" v-if="isLoggedIn">

    <!-- ═══════ HEADER ═══════ -->
    <div class="up-header">
        <!-- Avatar -->
        <div class="up-avatar-section">
            <div class="up-avatar-wrap" @click="triggerAvatar">
                <el-avatar :src="user.avatar" :size="96" class="up-avatar">
                    <el-icon :size="48"><User/></el-icon>
                </el-avatar>
                <span class="up-avatar-cam"><el-icon><Camera/></el-icon></span>
                <input ref="avatarInput" type="file" accept="image/*" hidden @change="onAvatarChange"/>
            </div>
            <span v-if="user.isVip" class="up-vip-badge">VIP {{ user.vipLevel }}</span>
        </div>
        <!-- Info -->
        <div class="up-info">
            <div class="up-name-row">
                <h1 class="up-name">{{ user.nickname || username }}</h1>
                <span class="up-role-tag">{{ user.role==='admin'?'管理员':user.role==='teacher'?'讲师':'学员' }}</span>
            </div>
            <!-- Bio -->
            <div class="up-bio-area">
                <template v-if="!editingBio">
                    <p class="up-bio">{{ user.bio || '这个人很懒，什么都没写…' }}</p>
                    <el-button size="small" text class="up-bio-edit" @click="startEditBio"><el-icon><Edit/></el-icon></el-button>
                </template>
                <div v-else class="up-bio-editor">
                    <el-input v-model="bioDraft" type="textarea" :rows="2" maxlength="200" show-word-limit placeholder="介绍一下自己…"/>
                    <div class="up-bio-actions">
                        <el-button size="small" type="primary" @click="saveBio"><el-icon><Check/></el-icon>保存</el-button>
                        <el-button size="small" @click="cancelBio"><el-icon><Close/></el-icon>取消</el-button>
                    </div>
                </div>
            </div>
            <!-- Stats -->
            <div class="up-stats">
                <span><b>{{ user.courses || 0 }}</b> 课程</span><span class="up-sd">·</span>
                <span><b>{{ (user.fans || 0).toLocaleString() }}</b> 粉丝</span><span class="up-sd">·</span>
                <span><b>{{ user.following || 0 }}</b> 关注</span><span class="up-sd">·</span>
                <span><b>{{ (user.likes || 0).toLocaleString() }}</b> 获赞</span>
            </div>
        </div>
        <!-- Actions -->
        <div class="up-header-actions">
            <el-button round class="up-action-btn" @click="showSettings=true"><el-icon><Setting/></el-icon> 设置</el-button>
            <el-button round class="up-action-btn" @click="router.push('/course/course/1')"><el-icon><Edit/></el-icon> 编辑资料</el-button>
        </div>
    </div>

    <!-- ═══════ TABS ═══════ -->
    <div class="up-tabs">
        <button v-for="tab in tabs" :key="tab.k" :class="{active:activeTab===tab.k}" @click="activeTab=tab.k">
            <el-icon><component :is="tab.icon"/></el-icon> {{tab.l}}
        </button>
    </div>

    <!-- ═══════ TAB: 我的课程 ═══════ -->
    <div v-if="activeTab==='courses'" class="up-tab-content">
        <div v-if="enrolledCourses.length" class="up-course-grid">
            <div v-for="c in enrolledCourses" :key="c.id" class="up-card up-course-card"
                @click="router.push(`/course/course/${c.id}`)">
                <div class="up-cc-cover"><img :src="imgSrc(c.img)" :alt="c.t"/></div>
                <div class="up-cc-body">
                    <h4>{{c.t}}</h4>
                    <p>{{c.a}} · {{c.d}}</p>
                    <div class="up-cc-progress">
                        <div class="up-cc-bar"><div class="up-cc-fill" :style="{width:c.progress+'%'}"></div></div>
                        <span>{{c.progress}}%</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="up-empty">
            <el-icon :size="48"><Notebook/></el-icon>
            <p>还没有加入任何课程</p>
            <el-button type="primary" round @click="router.push('/course/courses')">浏览课程</el-button>
        </div>
    </div>

    <!-- ═══════ TAB: 收藏 ═══════ -->
    <div v-if="activeTab==='favorites'" class="up-tab-content">
        <div v-if="favorites.length" class="up-fav-list">
            <div v-for="id in favorites" :key="id" class="up-card up-fav-item">
                <span>课程 #{{id}} — 已收藏</span>
                <el-button size="small" text type="danger" @click="toggleFav(id)">取消收藏</el-button>
            </div>
        </div>
        <div v-else class="up-empty"><p>还没有收藏任何课程</p></div>
    </div>

    <!-- ═══════ TAB: 学习记录 ═══════ -->
    <div v-if="activeTab==='history'" class="up-tab-content">
        <div v-if="history.length" class="up-history-list">
            <div v-for="h in history" :key="h.id" class="up-card up-history-item"
                @click="router.push(`/course/course/${h.id}`)">
                <div class="up-hi-img"><img :src="imgSrc(h.img)" :alt="h.t"/></div>
                <div class="up-hi-info">
                    <h4>{{h.t}}</h4>
                    <p>{{h.a}}</p>
                </div>
                <span class="up-hi-time">{{h.time}}</span>
            </div>
        </div>
        <div v-else class="up-empty"><p>还没有学习记录</p></div>
    </div>

    <!-- ═══════ TAB: 成就 ═══════ -->
    <div v-if="activeTab==='achievements'" class="up-tab-content">
        <div class="up-achi-grid">
            <div v-for="a in achievements" :key="a.t" class="up-card up-achi-item" :class="{earned:a.earned}">
                <span class="up-achi-icon">{{a.icon}}</span>
                <h4>{{a.t}}</h4>
                <p>{{a.d}}</p>
                <span v-if="a.earned" class="up-achi-badge">已获得</span>
            </div>
        </div>
    </div>

    <!-- ═══════ SETTINGS DRAWER ═══════ -->
    <Transition name="drawer">
    <div v-if="showSettings" class="up-settings-overlay" @click.self="showSettings=false">
        <div class="up-settings-panel">
            <div class="up-settings-head">
                <h3>设置</h3>
                <el-button text @click="showSettings=false"><el-icon><Close/></el-icon></el-button>
            </div>
            <div class="up-settings-body">
                <div class="up-setting-item" @click="toggleTheme">
                    <span><el-icon><component :is="isDark?Sunny:Moon"/></el-icon> 主题切换</span>
                    <span class="up-setting-val">{{ isDark?'暗色模式':'亮色模式' }}</span>
                </div>
                <div class="up-setting-item">
                    <span><el-icon><Lock/></el-icon> 隐私设置</span>
                    <el-icon><ArrowRight/></el-icon>
                </div>
                <div class="up-setting-item">
                    <span><el-icon><Bell/></el-icon> 通知设置</span>
                    <el-icon><ArrowRight/></el-icon>
                </div>
                <div class="up-setting-divider"></div>
                <div class="up-setting-item danger" @click="handleLogout">
                    <span><el-icon><SwitchButton/></el-icon> 退出登录</span>
                </div>
            </div>
        </div>
    </div>
    </Transition>

</div>
</template>

<style scoped>
.up-root { max-width:900px; margin:0 auto; padding:48px 28px 80px; }

/* ═══════ HEADER ═══════ */
.up-header { display:flex; align-items:flex-start; gap:32px; margin-bottom:36px; padding:36px; border-radius:20px; background:var(--surface-glass); border:1px solid var(--border-subtle); }
.up-avatar-section { display:flex; flex-direction:column; align-items:center; flex-shrink:0; }
.up-avatar-wrap { position:relative; cursor:pointer; }
.up-avatar { border:3px solid rgba(0,212,255,.25); transition:border-color .2s; }
.up-avatar-wrap:hover .up-avatar { border-color:#00d4ff; }
.up-avatar-cam { position:absolute; bottom:2px; right:2px; width:28px; height:28px; border-radius:50%; background:var(--surface-overlay); display:flex; align-items:center; justify-content:center; color:#00d4ff; font-size:14px; border:2px solid var(--surface-root); }
.up-vip-badge { margin-top:8px; padding:2px 12px; border-radius:9999px; font-size:10px; font-weight:700; background:linear-gradient(135deg,#fbbf24,#f59e0b); color:#000; }
.up-info { flex:1; min-width:0; }
.up-name-row { display:flex; align-items:center; gap:12px; margin-bottom:8px; }
.up-name { font-family:var(--font-display); font-size:26px; font-weight:700; color:var(--text-primary); }
.up-role-tag { padding:2px 12px; border-radius:9999px; font-size:11px; background:rgba(0,212,255,.08); color:#00d4ff; border:1px solid rgba(0,212,255,.15); }

/* Bio */
.up-bio-area { margin-bottom:16px; position:relative; }
.up-bio { font-size:14px; color:var(--text-secondary); line-height:1.6; }
.up-bio-edit { color:var(--text-muted)!important; padding:0!important; min-height:auto!important; margin-left:-4px; }
.up-bio-editor { display:flex; flex-direction:column; gap:8px; }
.up-bio-actions { display:flex; gap:8px; }

/* Stats */
.up-stats { display:flex; gap:12px; font-size:14px; color:var(--text-muted); }
.up-stats b { color:var(--text-primary); font-family:var(--font-display); }
.up-sd { color:var(--border-default); }
.up-header-actions { display:flex; flex-direction:column; gap:8px; flex-shrink:0; }
.up-action-btn { border-color:var(--border-default)!important; color:var(--text-secondary)!important; justify-content:flex-start; }

/* ═══════ TABS ═══════ */
.up-tabs { display:flex; gap:0; margin-bottom:32px; border-bottom:1px solid var(--border-subtle); }
.up-tabs button { display:inline-flex;align-items:center;gap:6px;padding:12px 24px;background:none;border:none;border-bottom:2px solid transparent;color:var(--text-muted);font-size:14px;cursor:pointer;transition:all .2s; }
.up-tabs button.active { color:#00d4ff;border-bottom-color:#00d4ff; }
.up-tabs button:hover { color:var(--text-primary); }

/* ═══════ CONTENT ═══════ */
.up-tab-content { min-height:200px; }
.up-card { background:var(--surface-glass); border:1px solid var(--border-subtle); border-radius:14px; transition:all .25s; opacity:0; transform:translateY(30px); }

/* Courses */
.up-course-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; }
.up-course-card { overflow:hidden; cursor:pointer; }
.up-course-card:hover { border-color:rgba(0,212,255,.2); transform:translateY(-4px); box-shadow:0 12px 32px rgba(0,0,0,.3); }
.up-cc-cover { aspect-ratio:16/10; overflow:hidden; background:var(--surface-glass); }
.up-cc-cover img { width:100%;height:100%;object-fit:cover; }
.up-cc-body { padding:16px 18px 20px; }
.up-cc-body h4 { font-size:15px;color:var(--text-primary);margin-bottom:4px; }
.up-cc-body p { font-size:12px;color:var(--text-muted);margin-bottom:12px; }
.up-cc-progress { display:flex;align-items:center;gap:10px; }
.up-cc-bar { flex:1;height:4px;background:var(--border-subtle);border-radius:2px;overflow:hidden; }
.up-cc-fill { height:100%;background:linear-gradient(90deg,#00d4ff,#8b5cf6);border-radius:2px;transition:width .5s; }
.up-cc-progress span { font-size:12px;color:var(--text-muted);font-variant-numeric:tabular-nums;min-width:32px;text-align:right; }

/* Favorites */
.up-fav-list { display:flex;flex-direction:column;gap:10px; }
.up-fav-item { display:flex;align-items:center;justify-content:space-between;padding:16px 20px; }

/* History */
.up-history-list { display:flex;flex-direction:column;gap:10px; }
.up-history-item { display:flex;align-items:center;gap:16px;padding:14px 20px;cursor:pointer; }
.up-history-item:hover { border-color:rgba(0,212,255,.15); }
.up-hi-img { width:60px;height:40px;border-radius:8px;overflow:hidden;flex-shrink:0;background:var(--surface-glass); }
.up-hi-img img { width:100%;height:100%;object-fit:cover; }
.up-hi-info { flex:1;min-width:0; }
.up-hi-info h4 { font-size:14px;color:var(--text-primary);margin-bottom:2px; }
.up-hi-info p { font-size:12px;color:var(--text-muted); }
.up-hi-time { font-size:12px;color:var(--text-muted);flex-shrink:0; }

/* Achievements */
.up-achi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
.up-achi-item { text-align:center;padding:28px 20px; }
.up-achi-item.earned { border-color:rgba(0,212,255,.15); }
.up-achi-item:not(.earned) { opacity:.4; }
.up-achi-icon { font-size:36px;display:block;margin-bottom:10px; }
.up-achi-item h4 { font-size:14px;color:var(--text-primary);margin-bottom:4px; }
.up-achi-item p { font-size:12px;color:var(--text-muted); }
.up-achi-badge { display:inline-block;margin-top:8px;padding:2px 10px;border-radius:9999px;font-size:10px;background:rgba(0,212,255,.1);color:#00d4ff; }

/* Empty */
.up-empty { text-align:center;padding:60px 0;color:var(--text-muted); }
.up-empty p { margin:12px 0 20px;font-size:15px; }

/* ═══════ SETTINGS DRAWER ═══════ */
.up-settings-overlay { position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.5);display:flex;justify-content:flex-end; }
.up-settings-panel { width:360px;height:100%;background:var(--surface-root);border-left:1px solid var(--border-subtle);display:flex;flex-direction:column; }
.up-settings-head { display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid var(--border-subtle); }
.up-settings-head h3 { font-family:var(--font-display);font-size:16px;color:var(--text-primary); }
.up-settings-body { flex:1;padding:16px 0; }
.up-setting-item { display:flex;justify-content:space-between;align-items:center;padding:14px 24px;cursor:pointer;transition:background .15s;color:var(--text-secondary);font-size:14px; }
.up-setting-item:hover { background:var(--surface-glass-hover); }
.up-setting-item span { display:inline-flex;align-items:center;gap:10px; }
.up-setting-item.danger { color:#f87171; }
.up-setting-val { font-size:12px;color:var(--text-muted); }
.up-setting-divider { height:1px;background:var(--border-subtle);margin:8px 24px; }
.drawer-enter-active,.drawer-leave-active { transition:opacity .25s; }
.drawer-enter-active .up-settings-panel,.drawer-leave-active .up-settings-panel { transition:transform .25s ease; }
.drawer-enter-from,.drawer-leave-to { opacity:0; }
.drawer-enter-from .up-settings-panel,.drawer-leave-to .up-settings-panel { transform:translateX(100%); }

@media(max-width:768px){
    .up-root{padding:32px 16px 60px}
    .up-header{flex-direction:column;align-items:center;text-align:center;gap:20px}
    .up-header-actions{flex-direction:row;width:100%}
    .up-course-grid{grid-template-columns:1fr}
    .up-achi-grid{grid-template-columns:repeat(2,1fr)}
    .up-tabs button{padding:10px 14px;font-size:13px}
}
</style>
