<script setup>
import { ref, computed, reactive, onMounted, nextTick } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import {
    User, Edit, Notebook, Medal, Setting,
    Camera, Clock, Collection,
} from '@element-plus/icons-vue'
import SettingsDrawer from '@/components/common/SettingsDrawer.vue'
import { ElMessage } from 'element-plus'
import gsap from 'gsap'

const router = useRouter()
const userStore = useUserStore()
const user = computed(() => userStore.userInfo || {})
const isLoggedIn = computed(() => userStore.isLoggedIn)
const username = computed(() => userStore.username || '未登录')
const isDark = computed(() => getEffectiveTheme() === 'dark')

// ─── Edit mode ───
const editing = ref(false)
const editForm = reactive({ nickname:'', bio:'', email:'', phone:'' })
function startEdit() {
    editForm.nickname = user.value.nickname || ''
    editForm.bio = user.value.bio || ''
    editForm.email = user.value.email || ''
    editForm.phone = user.value.phone || ''
    editing.value = true
}
function saveEdit() {
    if (userStore.userInfo) {
        userStore.userInfo.nickname = editForm.nickname
        userStore.userInfo.bio = editForm.bio
        userStore.userInfo.email = editForm.email
        userStore.userInfo.phone = editForm.phone
    }
    editing.value = false
    ElMessage.success('资料已更新')
}

// Avatar
const avatarInput = ref(null)
function triggerAvatar() { avatarInput.value?.click() }
function onAvatarChange(e) {
    const file = e.target.files?.[0]; if (!file) return
    const r = new FileReader()
    r.onload = ev => { if (userStore.userInfo) userStore.userInfo.avatar = ev.target.result }
    r.readAsDataURL(file)
    ElMessage.success('头像已更新')
}

// Tabs
const tabs = [
    { k:'courses', l:'我的课程', icon:Notebook },
    { k:'favorites', l:'收藏', icon:Collection },
    { k:'history', l:'历史', icon:Clock },
    { k:'achievements',l:'成就', icon:Medal },
]
const activeTab = ref('courses')

// Mock data
const enrolled = [
    { id:1,t:'《论语》精读二十讲',a:'墨韵先生',p:75,img:'xn1.png',d:'20课时' },
    { id:4,t:'大模型应用开发实战',a:'凌风',p:42,img:'xn4.png',d:'40课时' },
    { id:2,t:'Python 数据科学实战',a:'程远',p:100,img:'xn2.png',d:'32课时' },
    { id:3,t:'颜体楷书入门到精通',a:'砚田墨香',p:18,img:'xn3.png',d:'16课时' },
]
const favs = ref([1,3])
const history = [
    { id:1,t:'《论语》精读二十讲',a:'墨韵先生',time:'2小时前',img:'xn1.png' },
    { id:4,t:'大模型应用开发实战',a:'凌风',time:'昨天',img:'xn4.png' },
    { id:6,t:'全栈 Web 开发训练营',a:'无极',time:'3天前',img:'xn6.png' },
    { id:2,t:'Python 数据科学实战',a:'程远',time:'1周前',img:'xn2.png' },
]
const achievements = [
    { icon:'📖',t:'初出茅庐',d:'完成第1门课程',earned:true },
    { icon:'🔥',t:'连续学习',d:'连续7天登录',earned:true },
    { icon:'⭐',t:'满分学员',d:'获满分评价',earned:false },
    { icon:'🏆',t:'学霸达人',d:'完成5门课程',earned:false },
    { icon:'💬',t:'社区活跃',d:'100条讨论',earned:false },
    { icon:'🎯',t:'持之以恒',d:'连续30天',earned:false },
]

function imgSrc(name) { return new URL(`@/assets/imgs/${name}`, import.meta.url).href }
function toggleFav(id) {
    const i = favs.value.indexOf(id)
    i > -1 ? favs.value.splice(i,1) : favs.value.push(id)
    ElMessage.success(i > -1 ? '已取消收藏' : '已收藏')
}

// Settings
const showSettings = ref(false)

async function handleLogout() { await userStore.logout(); router.push('/login') }

onMounted(async () => {
    if (!isLoggedIn.value) { router.push('/login'); return }
    await nextTick()
    gsap.fromTo('.up-card', { opacity:0, y:30 }, { opacity:1, y:0, duration:.4, stagger:.06, ease:'power3.out' })
})
</script>

<template>
<div class="up-root" v-if="isLoggedIn">

    <!-- ═══════ PROFILE HERO ═══════ -->
    <div class="up-hero">
        <!-- Large decorative avatar area -->
        <div class="up-hero-visual">
            <div class="up-avatar-ring"></div>
            <div class="up-avatar-wrap" @click="triggerAvatar">
                <el-avatar :src="user.avatar" :size="120" class="up-avatar">
                    <el-icon :size="56"><User/></el-icon>
                </el-avatar>
                <span class="up-avatar-cam"><el-icon><Camera/></el-icon></span>
            </div>
            <input ref="avatarInput" type="file" accept="image/*" hidden @change="onAvatarChange"/>
            <span v-if="user.isVip" class="up-vip">VIP{{ user.vipLevel }}</span>
        </div>

        <!-- Info + actions -->
        <div class="up-hero-info">
            <div class="up-name-row">
                <h1 class="up-name">{{ user.nickname || username }}</h1>
                <span class="up-role">{{ user.role==='admin'?'管理员':user.role==='teacher'?'讲师':'学员' }}</span>
            </div>
            <p class="up-bio">{{ user.bio || '这个人很懒，什么都没写…' }}</p>

            <!-- Stats bar -->
            <div class="up-stat-bar">
                <div class="up-stat"><b>{{ user.courses||0 }}</b><span>课程</span></div>
                <div class="up-stat"><b>{{ (user.fans||0).toLocaleString() }}</b><span>粉丝</span></div>
                <div class="up-stat"><b>{{ (user.following||0) }}</b><span>关注</span></div>
                <div class="up-stat"><b>{{ (user.likes||0).toLocaleString() }}</b><span>获赞</span></div>
            </div>

            <!-- Actions -->
            <div class="up-hero-actions">
                <el-button type="primary" round class="up-btn-primary" @click="startEdit">
                    <el-icon><Edit/></el-icon> 编辑资料
                </el-button>
                <el-button round class="up-btn-ghost" @click="showSettings=true">
                    <el-icon><Setting/></el-icon> 设置
                </el-button>
            </div>
        </div>
    </div>

    <!-- ═══════ EDIT MODAL ═══════ -->
    <Transition name="modal">
    <div v-if="editing" class="up-modal-overlay" @click.self="editing=false">
        <div class="up-modal">
            <div class="up-modal-head">
                <h3>编辑资料</h3>
                <el-button text @click="editing=false"><el-icon><Close/></el-icon></el-button>
            </div>
            <div class="up-modal-body">
                <label>昵称</label>
                <el-input v-model="editForm.nickname" placeholder="你的昵称" maxlength="20" show-word-limit/>
                <label>个人介绍</label>
                <el-input v-model="editForm.bio" type="textarea" :rows="3" placeholder="介绍一下自己…" maxlength="200" show-word-limit/>
                <label>邮箱</label>
                <el-input v-model="editForm.email" placeholder="email@example.com"/>
                <label>手机号</label>
                <el-input v-model="editForm.phone" placeholder="手机号码"/>
            </div>
            <div class="up-modal-foot">
                <el-button round @click="editing=false">取消</el-button>
                <el-button type="primary" round class="up-btn-primary" @click="saveEdit">保存</el-button>
            </div>
        </div>
    </div>
    </Transition>

    <!-- ═══════ TABS ═══════ -->
    <div class="up-tabs">
        <button v-for="tab in tabs" :key="tab.k" :class="{active:activeTab===tab.k}" @click="activeTab=tab.k">
            <el-icon><component :is="tab.icon"/></el-icon> {{tab.l}}
        </button>
    </div>

    <!-- ═══════ COURSES ═══════ -->
    <div v-if="activeTab==='courses'" class="up-grid">
        <div v-for="c in enrolled" :key="c.id" class="up-card up-course" @click="router.push(`/course/course/${c.id}`)">
            <div class="up-course-img"><img :src="imgSrc(c.img)" :alt="c.t"/></div>
            <div class="up-course-info">
                <h4>{{c.t}}</h4>
                <p>{{c.a}} · {{c.d}}</p>
                <div class="up-progress"><div class="up-progress-bar"><div class="up-progress-fill" :style="{width:c.p+'%'}"></div></div><span>{{c.p}}%</span></div>
            </div>
        </div>
        <div v-if="!enrolled.length" class="up-empty">还没有课程</div>
    </div>

    <!-- ═══════ FAVORITES ═══════ -->
    <div v-if="activeTab==='favorites'" class="up-list">
        <div v-for="id in favs" :key="id" class="up-card up-list-item">
            <span>课程 #{{ id }} — 已收藏</span>
            <el-button size="small" text type="danger" @click="toggleFav(id)">取消</el-button>
        </div>
        <div v-if="!favs.length" class="up-empty">还没有收藏</div>
    </div>

    <!-- ═══════ HISTORY ═══════ -->
    <div v-if="activeTab==='history'" class="up-list">
        <div v-for="h in history" :key="h.id" class="up-card up-history" @click="router.push(`/course/course/${h.id}`)">
            <div class="up-history-img"><img :src="imgSrc(h.img)" :alt="h.t"/></div>
            <div class="up-history-mid"><h4>{{h.t}}</h4><p>{{h.a}}</p></div>
            <span class="up-history-time">{{h.time}}</span>
        </div>
        <div v-if="!history.length" class="up-empty">还没有记录</div>
    </div>

    <!-- ═══════ ACHIEVEMENTS ═══════ -->
    <div v-if="activeTab==='achievements'" class="up-achi-grid">
        <div v-for="a in achievements" :key="a.t" class="up-card up-achi" :class="{earned:a.earned}">
            <span class="up-achi-icon">{{a.icon}}</span>
            <h4>{{a.t}}</h4>
            <p>{{a.d}}</p>
            <span v-if="a.earned" class="up-achi-badge">已获得</span>
        </div>
    </div>

    <SettingsDrawer :visible="showSettings" @close="showSettings=false" />

</div>
</template>

<style scoped>
.up-root { max-width:900px; margin:0 auto; padding:56px 28px 80px; }

/* ═══════ HERO — bold asymmetric ═══════ */
.up-hero { display:flex; gap:48px; align-items:center; margin-bottom:44px; }
.up-hero-visual { flex-shrink:0; display:flex; flex-direction:column; align-items:center; }
.up-avatar-ring { width:140px;height:140px;border-radius:50%;border:1px solid rgba(0,212,255,.08);position:absolute;animation:ringSpin 14s linear infinite; }
@keyframes ringSpin { to{transform:rotate(360deg)} }
.up-avatar-wrap { position:relative; width:120px; height:120px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
.up-avatar { border:4px solid rgba(0,212,255,.2); transition:border-color .25s; }
.up-avatar-wrap:hover .up-avatar { border-color:#00d4ff; }
.up-avatar-cam { position:absolute; bottom:4px; right:4px; width:30px;height:30px;border-radius:50%;background:var(--surface-overlay);display:flex;align-items:center;justify-content:center;color:#00d4ff;font-size:14px;border:2px solid var(--surface-root); }
.up-vip { margin-top:10px; padding:3px 14px; border-radius:9999px; font-size:10px; font-weight:700; background:linear-gradient(135deg,#fbbf24,#f59e0b); color:#000; }
.up-hero-info { flex:1; min-width:0; }
.up-name-row { display:flex; align-items:center; gap:12px; margin-bottom:8px; }
.up-name { font-family:var(--font-display); font-size:32px; font-weight:700; color:var(--text-primary); }
.up-role { padding:3px 14px; border-radius:9999px; font-size:11px; background:rgba(0,212,255,.08); color:#00d4ff; border:1px solid rgba(0,212,255,.15); }
.up-bio { font-size:15px; color:var(--text-secondary); line-height:1.6; margin-bottom:20px; }
.up-stat-bar { display:flex; gap:32px; margin-bottom:24px; }
.up-stat { text-align:center; }
.up-stat b { display:block; font-family:var(--font-display); font-size:22px; font-weight:700; color:var(--text-primary); }
.up-stat span { font-size:11px; color:var(--text-muted); text-transform:uppercase; letter-spacing:2px; }
.up-hero-actions { display:flex; gap:10px; }
.up-btn-primary { --el-button-bg-color:#00d4ff;--el-button-border-color:#00d4ff;--el-button-hover-bg-color:#33e0ff;--el-button-hover-border-color:#33e0ff;--el-button-text-color:#060b18;height:42px;font-size:14px; }
.up-btn-ghost { height:42px;font-size:14px;border-color:var(--border-default)!important;color:var(--text-secondary)!important; }

/* ═══════ MODAL ═══════ */
.up-modal-overlay { position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center; }
.up-modal { width:480px;max-width:90vw;background:var(--surface-root);border:1px solid var(--border-subtle);border-radius:20px;overflow:hidden; }
.up-modal-head { display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid var(--border-subtle); }
.up-modal-head h3 { font-family:var(--font-display);font-size:16px;color:var(--text-primary); }
.up-modal-body { padding:24px;display:flex;flex-direction:column;gap:16px; }
.up-modal-body label { font-size:13px;color:var(--text-secondary);font-weight:500; }
.up-modal-foot { display:flex;justify-content:flex-end;gap:10px;padding:16px 24px;border-top:1px solid var(--border-subtle); }
.modal-enter-active,.modal-leave-active { transition:opacity .2s; }
.modal-enter-active .up-modal,.modal-leave-active .up-modal { transition:transform .2s ease; }
.modal-enter-from,.modal-leave-to { opacity:0; }
.modal-enter-from .up-modal,.modal-leave-to .up-modal { transform:scale(.95); }

/* ═══════ TABS ═══════ */
.up-tabs { display:flex;gap:0;margin-bottom:32px;border-bottom:1px solid var(--border-subtle); }
.up-tabs button { display:inline-flex;align-items:center;gap:6px;padding:14px 28px;background:none;border:none;border-bottom:2px solid transparent;color:var(--text-muted);font-size:14px;cursor:pointer;transition:all .2s; }
.up-tabs button.active { color:#00d4ff;border-bottom-color:#00d4ff; }
.up-tabs button:hover { color:var(--text-primary); }

/* ═══════ CONTENT ═══════ */
.up-card { background:var(--surface-glass);border:1px solid var(--border-subtle);border-radius:14px;transition:all .25s;opacity:0;transform:translateY(30px); }
.up-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:20px; }
.up-course { overflow:hidden;cursor:pointer; }
.up-course:hover { border-color:rgba(0,212,255,.2);transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.3); }
.up-course-img { aspect-ratio:16/10;overflow:hidden;background:var(--surface-glass); }
.up-course-img img { width:100%;height:100%;object-fit:cover; }
.up-course-info { padding:16px 18px 20px; }
.up-course-info h4 { font-size:15px;color:var(--text-primary);margin-bottom:4px; }
.up-course-info p { font-size:12px;color:var(--text-muted);margin-bottom:12px; }
.up-progress { display:flex;align-items:center;gap:10px; }
.up-progress-bar { flex:1;height:4px;background:var(--border-subtle);border-radius:2px;overflow:hidden; }
.up-progress-fill { height:100%;background:linear-gradient(90deg,#00d4ff,#8b5cf6);border-radius:2px;transition:width .5s; }
.up-progress span { font-size:12px;color:var(--text-muted);font-variant-numeric:tabular-nums; }

/* Lists */
.up-list { display:flex;flex-direction:column;gap:10px; }
.up-list-item { display:flex;align-items:center;justify-content:space-between;padding:16px 20px; }
.up-history { display:flex;align-items:center;gap:16px;padding:14px 20px;cursor:pointer; }
.up-history:hover { border-color:rgba(0,212,255,.15); }
.up-history-img { width:60px;height:40px;border-radius:8px;overflow:hidden;flex-shrink:0;background:var(--surface-glass); }
.up-history-img img { width:100%;height:100%;object-fit:cover; }
.up-history-mid { flex:1;min-width:0; }
.up-history-mid h4 { font-size:14px;color:var(--text-primary);margin-bottom:2px; }
.up-history-mid p { font-size:12px;color:var(--text-muted); }
.up-history-time { font-size:12px;color:var(--text-muted);flex-shrink:0; }

/* Achievements */
.up-achi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
.up-achi { text-align:center;padding:28px 20px; }
.up-achi.earned { border-color:rgba(0,212,255,.15); }
.up-achi:not(.earned) { opacity:.35; }
.up-achi-icon { font-size:36px;display:block;margin-bottom:10px; }
.up-achi h4 { font-size:14px;color:var(--text-primary);margin-bottom:4px; }
.up-achi p { font-size:12px;color:var(--text-muted); }
.up-achi-badge { display:inline-block;margin-top:8px;padding:2px 10px;border-radius:9999px;font-size:10px;background:rgba(0,212,255,.1);color:#00d4ff; }

.up-empty { text-align:center;padding:60px 0;color:var(--text-muted);font-size:15px;grid-column:1/-1; }

@media(max-width:768px){
    .up-root{padding:36px 16px 60px}
    .up-hero{flex-direction:column;align-items:center;text-align:center;gap:24px}
    .up-stat-bar{justify-content:center;gap:24px}
    .up-hero-actions{justify-content:center}
    .up-grid{grid-template-columns:1fr}
    .up-achi-grid{grid-template-columns:repeat(2,1fr)}
    .up-tabs button{padding:12px 16px;font-size:13px}
}
</style>
