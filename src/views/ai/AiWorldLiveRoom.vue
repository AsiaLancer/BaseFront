<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, User, Star, ChatDotRound, View } from '@element-plus/icons-vue'
import gsap from 'gsap'

const route = useRoute()
const router = useRouter()

// ─── Streamer data ───
const streamer = ref({
    name:'凌风', role:'AI研究员', fans:'12.8K', watching:3200, avatar:'xn4.png',
    title:'AI论文精读：Attention is All You Need', tags:['AI','论文','深度学习'],
    desc:'专注AI前沿论文解读，每周直播精读一篇顶会论文。从Attention机制到Transformer架构，带你深入理解深度学习核心技术。',
})
import posterImg from '@/assets/imgs/xn4.png'
import liveVideo from '@/assets/media111.mp4'

const viewers = ref(3200)

// ─── Chat messages ───
const chatMessages = ref([
    { u:'AI学习者',c:'凌风老师讲得太好了！',color:'#00d4ff' },
    { u:'小王',c:'Attention机制终于听懂了',color:'#fff' },
    { u:'数据科学家',c:'能讲一下Multi-Head吗',color:'#fbbf24' },
    { u:'AI爱好者',c:'已三连',color:'#8b5cf6' },
    { u:'学生甲',c:'666666',color:'#00d4ff' },
    { u:'路人',c:'刚来，讲到哪里了',color:'#fff' },
])
const chatInput = ref('')
const chatBody = ref(null)

function sendChat() {
    const t = chatInput.value.trim()
    if (!t) return
    chatMessages.value.push({ u:'我',c:t,color:'#34d399' })
    chatInput.value = ''
    if (Math.random() < 0.5) viewers.value++
    nextTick(() => { if(chatBody.value) chatBody.value.scrollTop = chatBody.value.scrollHeight })
}

// Simulate incoming messages
let chatTimer = null
onMounted(() => {
    chatTimer = setInterval(() => {
        const msgs = ['讲得真好','+1','学习了','哈哈哈','👍','太强了','打卡','有人在吗','老师好']
        chatMessages.value.push({ u:`观众${Math.floor(Math.random()*999)}`,c:msgs[Math.floor(Math.random()*msgs.length)],color:'#fff' })
        viewers.value += Math.floor(Math.random()*3)-1
        nextTick(() => { if(chatBody.value) chatBody.value.scrollTop = chatBody.value.scrollHeight })
    }, 3000)
    gsap.fromTo('.lr-header',{opacity:0,y:-20},{opacity:1,y:0,duration:.5,ease:'power3.out'})
    gsap.fromTo('.lr-chat',{opacity:0,x:30},{opacity:1,x:0,duration:.5,ease:'power3.out',delay:.2})
})
onUnmounted(() => clearInterval(chatTimer))
</script>

<template>
<div class="lr-page">
    <!-- Top bar -->
    <div class="lr-header">
        <a @click="router.back()" class="lr-back"><el-icon><ArrowLeft/></el-icon> 返回</a>
        <div class="lr-streamer-info">
            <div class="lr-avatar"><img :src="posterImg" alt=""/></div>
            <div>
                <h1>{{streamer.name}}<span class="lr-live-badge">🔴 直播中</span></h1>
                <p>{{streamer.title}}</p>
            </div>
        </div>
        <div class="lr-header-actions">
            <span class="lr-viewers"><span class="lr-dot"></span>{{viewers.toLocaleString()}} 观看</span>
            <el-button size="small" round class="lr-follow-btn">+ 关注 {{streamer.fans}}</el-button>
        </div>
    </div>

    <div class="lr-body">
        <!-- Main: video area -->
        <div class="lr-main">
            <div class="lr-player">
                <video :src="liveVideo" autoplay muted loop class="lr-video"></video>
                <div class="lr-player-overlay">
                    <span class="lr-live-tag">🔴 LIVE</span>
                    <span class="lr-viewer-count">{{viewers.toLocaleString()}} 观看</span>
                </div>
            </div>

            <!-- Streamer description -->
            <div class="lr-desc-card">
                <div class="lr-tags"><span v-for="t in streamer.tags" :key="t" class="lr-tag">{{t}}</span></div>
                <p>{{streamer.desc}}</p>
            </div>
        </div>

        <!-- Sidebar: chat -->
        <aside class="lr-chat">
            <div class="lr-chat-head">
                <span><el-icon><ChatDotRound/></el-icon> 弹幕聊天</span>
                <span class="lr-chat-count">{{chatMessages.length}}</span>
            </div>
            <div class="lr-chat-body" ref="chatBody">
                <div v-for="(m,i) in chatMessages" :key="i" class="lr-chat-msg">
                    <span class="lr-chat-user" :style="{color:m.color}">{{m.u}}</span>
                    <span class="lr-chat-text">: {{m.c}}</span>
                </div>
            </div>
            <div class="lr-chat-input">
                <el-input v-model="chatInput" placeholder="发送弹幕…" size="small" @keyup.enter="sendChat" class="lr-chat-field"/>
                <el-button size="small" type="primary" round @click="sendChat">发送</el-button>
            </div>
        </aside>
    </div>
</div>
</template>

<style scoped>
.lr-page { max-width:1400px; margin:0 auto; padding:16px 24px 40px; }

/* Header */
.lr-header { display:flex;align-items:center;gap:24px;padding:16px 20px;border-radius:14px;background:var(--surface-glass);border:1px solid var(--border-subtle);margin-bottom:20px; }
.lr-back { font-size:13px;color:var(--text-muted);cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:4px;flex-shrink:0; }
.lr-back:hover { color:#00d4ff; }
.lr-streamer-info { display:flex;align-items:center;gap:14px;flex:1;min-width:0; }
.lr-avatar { width:48px;height:48px;border-radius:50%;overflow:hidden;border:2px solid rgba(0,212,255,.3);flex-shrink:0; }
.lr-avatar img { width:100%;height:100%;object-fit:cover; }
.lr-streamer-info h1 { font-size:16px;color:var(--text-primary);display:inline-flex;align-items:center;gap:8px; }
.lr-live-badge { font-size:11px;color:#f87171;font-weight:600; }
.lr-streamer-info p { font-size:12px;color:var(--text-muted); }
.lr-header-actions { display:flex;align-items:center;gap:16px;flex-shrink:0; }
.lr-viewers { font-size:13px;color:var(--text-secondary);display:inline-flex;align-items:center;gap:6px; }
.lr-dot { width:6px;height:6px;border-radius:50%;background:#f87171;animation:livePulse 2s infinite; }
@keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:.3} }
.lr-follow-btn { border-color:#00d4ff!important;color:#00d4ff!important; }

/* Body */
.lr-body { display:flex;gap:20px; }
.lr-main { flex:1;min-width:0; }
.lr-chat { width:320px;flex-shrink:0; }

/* Player */
.lr-player { position:relative;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#000;margin-bottom:16px; }
.lr-video { width:100%;height:100%;object-fit:contain; }
.lr-player-overlay { position:absolute;top:16px;left:16px;display:flex;gap:10px;z-index:1; }
.lr-live-tag { padding:4px 12px;border-radius:6px;font-size:12px;background:#f87171;color:#fff;font-weight:600; }
.lr-viewer-count { padding:4px 10px;border-radius:6px;font-size:12px;background:rgba(0,0,0,.5);color:#fff; }

/* Description */
.lr-desc-card { padding:20px;border-radius:14px;background:var(--surface-glass);border:1px solid var(--border-subtle); }
.lr-tags { display:flex;gap:6px;margin-bottom:12px; }
.lr-tag { padding:3px 10px;border-radius:6px;font-size:11px;background:rgba(0,212,255,.06);color:rgba(0,212,255,.8);border:1px solid rgba(0,212,255,.08); }
.lr-desc-card p { font-size:13px;color:var(--text-secondary);line-height:1.6; }

/* Chat */
.lr-chat { display:flex;flex-direction:column;border-radius:14px;background:var(--surface-glass);border:1px solid var(--border-subtle);overflow:hidden; }
.lr-chat-head { display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid var(--border-subtle);font-size:14px;color:var(--text-primary); }
.lr-chat-count { font-size:11px;color:var(--text-muted);background:rgba(255,255,255,.04);padding:1px 8px;border-radius:9999px; }
.lr-chat-body { flex:1;overflow-y:auto;padding:12px 16px;display:flex;flex-direction:column;gap:6px;max-height:500px; }
.lr-chat-msg { font-size:12px;line-height:1.5; }
.lr-chat-user { font-weight:600; }
.lr-chat-text { color:var(--text-secondary); }
.lr-chat-input { display:flex;gap:8px;padding:12px 16px;border-top:1px solid var(--border-subtle); }
.lr-chat-field { flex:1;--el-input-bg-color:var(--surface-glass);--el-input-border-color:var(--border-subtle);--el-input-focus-border-color:#00d4ff;--el-input-text-color:var(--text-primary); }

@media(max-width:768px){.lr-body{flex-direction:column}.lr-chat{width:100%;max-height:300px}.lr-header{flex-wrap:wrap;gap:12px}}
</style>
