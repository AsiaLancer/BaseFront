<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, ChatDotRound, Share, Present } from '@element-plus/icons-vue'
import gsap from 'gsap'

const router = useRouter()

// ─── Streamer ───
const streamer = { name:'凌风', role:'AI研究员', fans:'12.8K', title:'AI论文精读：Attention is All You Need', tags:['AI','论文','深度学习'], desc:'专注AI前沿论文解读，每周直播精读一篇顶会论文。' }
const viewers = ref(3200)
const followed = ref(false)
const duration = ref('02:34:18')

// ─── Quality ───
const qualities = ['超清 1080P','高清 720P','标清 480P','自动']
const quality = ref('超清 1080P')
const showQuality = ref(false)

// ─── Gifts ───
const gifts = [
    { icon:'🌸', name:'鲜花', price:1, color:'#f472b6' },
    { icon:'👍', name:'点赞', price:1, color:'#00d4ff' },
    { icon:'🎈', name:'气球', price:5, color:'#fbbf24' },
    { icon:'🍰', name:'蛋糕', price:10, color:'#34d399' },
    { icon:'🚀', name:'火箭', price:50, color:'#f87171' },
    { icon:'👑', name:'皇冠', price:100, color:'#8b5cf6' },
]
const giftLog = ref([])
const flyingGifts = ref([])
const showGiftPanel = ref(false)
const showControls = ref(false)
let hideTimer = null
function onPlayerMove() {
    showControls.value = true
    clearTimeout(hideTimer)
    hideTimer = setTimeout(() => { showControls.value = false }, 3000)
}

function sendGift(gift) {
    giftLog.value.unshift({ u:'我', g:gift.name, color:gift.color })
    if (giftLog.value.length > 20) giftLog.value.pop()
    const id = Date.now()
    flyingGifts.value.push({ id, icon:gift.icon, name:gift.name, color:gift.color, x:Math.random()*60+20 })
    setTimeout(() => { flyingGifts.value = flyingGifts.value.filter(f => f.id !== id) }, 2000)
    viewers.value++
}

// ─── Danmaku ───
const danmakuList = ref([
    { id:1,text:'讲得太好了！',color:'#00d4ff' },{ id:2,text:'已三连',color:'#fff' },
    { id:3,text:'666666',color:'#fbbf24' },{ id:4,text:'有人吗',color:'#8b5cf6' },
])
const danmakuOn = ref(true)
const danmakuInput = ref('')
const danmakuRecent = computed(() => danmakuList.value.slice(-12))
const danmakuSidebar = computed(() => danmakuList.value.slice(-30))

function sendDanmaku() {
    const t = danmakuInput.value.trim()
    if (!t) return
    danmakuList.value.push({ id:Date.now(), text:t, color:'#fff' })
    danmakuInput.value = ''
}

// ─── Hearts ───
const hearts = ref([])
function sendHeart() {
    const id = Date.now()
    hearts.value.push({ id, x:Math.random()*60+20 })
    setTimeout(() => { hearts.value = hearts.value.filter(h => h.id !== id) }, 1500)
    viewers.value++
}

// ─── Chat ───
const chatTab = ref('danmaku')
const chatMessages = ref([
    { u:'AI学习者',c:'凌风老师讲得太好了！',color:'#00d4ff' },
    { u:'小王',c:'Attention机制终于听懂了',color:'#fff' },
])
const chatInput = ref('')
const chatBody = ref(null)
const recentGifts = computed(() => giftLog.value.slice(0,5))

function sendChat() {
    const t = chatInput.value.trim()
    if (!t) return
    chatMessages.value.push({ u:'我',c:t,color:'#34d399' })
    chatInput.value = ''
    nextTick(() => { if(chatBody.value) chatBody.value.scrollTop = chatBody.value.scrollHeight })
}

let timers = []
onMounted(() => {
    timers.push(setInterval(() => {
        chatMessages.value.push({ u:`观众${Math.floor(Math.random()*999)}`,c:['讲得真好','+1','学习了','哈哈哈','👍'][Math.floor(Math.random()*5)],color:'#fff' })
        viewers.value += Math.floor(Math.random()*3)-1
        nextTick(() => { if(chatBody.value) chatBody.value.scrollTop = chatBody.value.scrollHeight })
    }, 3000))
    timers.push(setInterval(() => {
        danmakuList.value.push({ id:Date.now(), text:['666','讲得好','老师好'][Math.floor(Math.random()*3)], color:['#00d4ff','#fff','#fbbf24'][Math.floor(Math.random()*3)] })
        if (danmakuList.value.length > 50) danmakuList.value.splice(0,10)
    }, 2000))
})
onUnmounted(() => timers.forEach(clearInterval))

import posterImg from '@/assets/imgs/xn4.png'
import liveVideo from '@/assets/media111.mp4'
</script>

<template>
<div class="lr-page">
    <!-- Top bar -->
    <div class="lr-header">
        <a @click="router.back()" class="lr-back"><el-icon><ArrowLeft/></el-icon></a>
        <div class="lr-streamer-info">
            <div class="lr-avatar"><img :src="posterImg" alt=""/></div>
            <div>
                <h1>{{streamer.name}}<span class="lr-live-badge">🔴 LIVE</span></h1>
                <p>{{streamer.title}}</p>
            </div>
        </div>
        <div class="lr-header-actions">
            <span class="lr-viewers"><span class="lr-dot"></span>{{viewers.toLocaleString()}}</span>
            <span class="lr-duration">{{duration}}</span>
            <el-button size="small" round :class="{followed}" class="lr-follow-btn" @click="followed=!followed">{{followed?'已关注':'+ 关注'}}</el-button>
            <el-button size="small" round class="lr-share-btn"><el-icon><Share/></el-icon></el-button>
        </div>
    </div>

    <div class="lr-body">
        <!-- Main: video -->
        <div class="lr-main">
            <div class="lr-player" @dblclick="sendHeart" @mousemove="onPlayerMove" @mouseleave="showControls=false">
                <video :src="liveVideo" autoplay muted loop class="lr-video"></video>

                <!-- Danmaku layer -->
                <div v-if="danmakuOn" class="lr-danmaku-layer">
                    <div v-for="d in danmakuRecent" :key="d.id" class="lr-dm-item" :style="{color:d.color,top:(5+(d.id%8)*10)+'%'}">{{d.text}}</div>
                </div>
                <!-- Hearts -->
                <div v-for="h in hearts" :key="h.id" class="lr-heart" :style="{left:h.x+'%'}">❤️</div>
                <!-- Flying gifts -->
                <div v-for="g in flyingGifts" :key="g.id" class="lr-fly-gift" :style="{left:g.x+'%',color:g.color}">{{g.icon}}{{g.name}}</div>

                <!-- Top overlay -->
                <div class="lr-player-top">
                    <span class="lr-live-tag">🔴 LIVE</span>
                    <span class="lr-viewer-count">{{viewers.toLocaleString()}} 观看</span>
                </div>

                <!-- Bottom control bar — hover to show -->
                <div class="lr-controls" :class="{show:showControls}">
                    <div class="lr-ctrl-row">
                        <button class="lr-ctrl-btn" @click="showGiftPanel=true">🎁 礼物</button>
                        <button class="lr-ctrl-btn" @click="danmakuOn=!danmakuOn">{{danmakuOn?'弹幕开':'弹幕关'}}</button>
                        <button class="lr-ctrl-btn" @click="showQuality=true">画质</button>
                        <button class="lr-ctrl-btn">🔊</button>
                        <button class="lr-ctrl-btn">⛶</button>
                    </div>
                </div>
            </div>

            <!-- Gift popup -->
            <Transition name="modal">
            <div v-if="showGiftPanel" class="lr-modal-mask" @click.self="showGiftPanel=false">
                <div class="lr-modal">
                    <div class="lr-modal-head"><h3>送礼物</h3><button @click="showGiftPanel=false">✕</button></div>
                    <div class="lr-gift-grid">
                        <div v-for="g in gifts" :key="g.name" class="lr-gift-card" @click="sendGift(g);showGiftPanel=false">
                            <span class="lr-gc-icon">{{g.icon}}</span>
                            <span class="lr-gc-name">{{g.name}}</span>
                            <span class="lr-gc-price">{{g.price}}币</span>
                        </div>
                    </div>
                </div>
            </div>
            </Transition>

            <!-- Quality popup -->
            <Transition name="modal">
            <div v-if="showQuality" class="lr-modal-mask" @click.self="showQuality=false">
                <div class="lr-modal lr-modal-sm">
                    <div class="lr-modal-head"><h3>画质选择</h3><button @click="showQuality=false">✕</button></div>
                    <div class="lr-quality-list">
                        <span v-for="q in qualities" :key="q" :class="{active:quality===q}" @click="quality=q;showQuality=false">{{q}}</span>
                    </div>
                </div>
            </div>
            </Transition>

            <!-- Description -->
            <div class="lr-desc-card">
                <div class="lr-tags"><span v-for="t in streamer.tags" :key="t" class="lr-tag">{{t}}</span></div>
                <p>{{streamer.desc}}</p>
                <div v-if="recentGifts.length" class="lr-gift-log">
                    <span v-for="(g,i) in recentGifts" :key="i" class="lr-gl-item"><b>{{g.u}}</b> 送出 <span :style="{color:g.color}">{{g.g}}</span></span>
                </div>
            </div>
        </div>

        <!-- Sidebar chat -->
        <aside class="lr-chat">
            <div class="lr-chat-head">
                <div class="lr-chat-tabs">
                    <button :class="{active:chatTab==='danmaku'}" @click="chatTab='danmaku'">弹幕</button>
                    <button :class="{active:chatTab==='chat'}" @click="chatTab='chat'">聊天</button>
                </div>
                <span class="lr-chat-count">{{chatMessages.length}}</span>
            </div>
            <div class="lr-chat-body" ref="chatBody">
                <template v-if="chatTab==='chat'">
                    <div v-for="(m,i) in chatMessages" :key="i" class="lr-chat-msg">
                        <span class="lr-cu" :style="{color:m.color}">{{m.u}}</span><span class="lr-ct">: {{m.c}}</span>
                    </div>
                </template>
                <template v-else>
                    <div v-for="d in danmakuSidebar" :key="d.id" class="lr-chat-msg">
                        <span class="lr-cu" :style="{color:d.color}">弹幕</span><span class="lr-ct">: {{d.text}}</span>
                    </div>
                </template>
            </div>
            <div class="lr-chat-input">
                <el-input v-model="danmakuInput" v-if="chatTab==='danmaku'" placeholder="发送弹幕…" size="small" @keyup.enter="sendDanmaku" class="lr-chat-field"/>
                <el-input v-model="chatInput" v-else placeholder="发送消息…" size="small" @keyup.enter="sendChat" class="lr-chat-field"/>
                <el-button size="small" type="primary" round @click="chatTab==='danmaku'?sendDanmaku():sendChat()">发送</el-button>
            </div>
        </aside>
    </div>
</div>
</template>

<style scoped>
.lr-page { max-width:1400px; margin:0 auto; padding:16px 24px 40px; }

/* Header */
.lr-header { display:flex;align-items:center;gap:20px;padding:14px 20px;border-radius:14px;background:var(--surface-glass);border:1px solid var(--border-subtle);margin-bottom:20px; }
.lr-back { font-size:13px;color:var(--text-muted);cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:4px;flex-shrink:0; }
.lr-back:hover { color:#00d4ff; }
.lr-streamer-info { display:flex;align-items:center;gap:14px;flex:1;min-width:0; }
.lr-avatar { width:48px;height:48px;border-radius:50%;overflow:hidden;border:2px solid rgba(0,212,255,.3);flex-shrink:0; }
.lr-avatar img { width:100%;height:100%;object-fit:cover; }
.lr-streamer-info h1 { font-size:16px;color:var(--text-primary);display:inline-flex;align-items:center;gap:8px; }
.lr-live-badge { font-size:11px;color:#f87171;font-weight:600; }
.lr-streamer-info p { font-size:12px;color:var(--text-muted); }
.lr-header-actions { display:flex;align-items:center;gap:14px;flex-shrink:0; }
.lr-viewers { font-size:13px;color:var(--text-secondary);display:inline-flex;align-items:center;gap:6px; }
.lr-dot { width:6px;height:6px;border-radius:50%;background:#f87171;animation:livePulse 2s infinite; }
@keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:.3} }
.lr-duration { font-size:12px;color:var(--text-muted);font-variant-numeric:tabular-nums; }
.lr-follow-btn { border-color:#00d4ff!important;color:#00d4ff!important; }
.lr-follow-btn.followed { border-color:#34d399!important;color:#34d399!important; }
.lr-share-btn { border-color:var(--border-default)!important;color:var(--text-secondary)!important; }

/* Body */
.lr-body { display:flex;gap:20px; }
.lr-main { flex:1;min-width:0; }
.lr-chat { width:320px;flex-shrink:0; }

/* Player */
.lr-player { position:relative;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#000;margin-bottom:16px; }
.lr-video { width:100%;height:100%;object-fit:contain; }

/* Danmaku */
.lr-danmaku-layer { position:absolute;inset:0;pointer-events:none;z-index:2;overflow:hidden; }
.lr-dm-item { position:absolute;right:-100%;white-space:nowrap;font-size:16px;font-weight:700;text-shadow:1px 1px 2px rgba(0,0,0,.8);animation:dmScroll linear forwards;animation-duration:4s; }
@keyframes dmScroll { from{right:-100%} to{right:110%} }

/* Hearts */
.lr-heart { position:absolute;bottom:0;font-size:28px;animation:heartUp 1.5s ease-out forwards;pointer-events:none;z-index:3; }
@keyframes heartUp { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-300px) scale(1.5);opacity:0} }

/* Flying gifts */
.lr-fly-gift { position:absolute;bottom:20%;font-size:18px;font-weight:700;animation:giftUp 2s ease-out forwards;pointer-events:none;z-index:3;text-shadow:0 0 10px currentColor; }
@keyframes giftUp { 0%{transform:translateY(0) scale(.5);opacity:1} 50%{transform:scale(1.2)} 100%{transform:translateY(-200px) scale(1);opacity:0} }

/* Player top */
.lr-player-top { position:absolute;top:16px;left:16px;display:flex;gap:10px;z-index:3; }
.lr-live-tag { padding:4px 12px;border-radius:6px;font-size:12px;background:#f87171;color:#fff;font-weight:600; }
.lr-viewer-count { padding:4px 10px;border-radius:6px;font-size:12px;background:rgba(0,0,0,.5);color:#fff; }

/* Bottom control bar — auto-hide, shows on hover */
.lr-controls { position:absolute;bottom:0;left:0;right:0;z-index:3;opacity:0;transform:translateY(100%);transition:opacity .3s,transform .3s;background:linear-gradient(transparent,rgba(0,0,0,.8));padding:40px 20px 16px; }
.lr-controls.show { opacity:1;transform:translateY(0); }
.lr-ctrl-row { display:flex;gap:8px;justify-content:center; }
.lr-ctrl-btn { padding:6px 18px;border-radius:8px;font-size:13px;color:#fff;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);cursor:pointer;transition:all .2s; }
.lr-ctrl-btn:hover { background:rgba(255,255,255,.2); }

/* Modal popups */
.lr-modal-mask { position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center; }
.lr-modal { width:400px;max-width:90vw;background:var(--surface-root);border:1px solid var(--border-subtle);border-radius:20px;overflow:hidden; }
.lr-modal-sm { width:280px; }
.lr-modal-head { display:flex;justify-content:space-between;align-items:center;padding:18px 22px;border-bottom:1px solid var(--border-subtle); }
.lr-modal-head h3 { font-family:var(--font-display);font-size:15px;color:var(--text-primary); }
.lr-modal-head button { background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:16px;padding:2px 8px;border-radius:6px; }
.lr-modal-head button:hover { background:var(--surface-glass-hover);color:var(--text-primary); }
.lr-gift-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:20px; }
.lr-gift-card { text-align:center;padding:16px 8px;border-radius:12px;cursor:pointer;transition:all .2s;border:1px solid transparent; }
.lr-gift-card:hover { background:var(--surface-glass-hover);border-color:rgba(0,212,255,.15); }
.lr-gc-icon { font-size:30px;display:block;margin-bottom:6px; }
.lr-gc-name { font-size:13px;color:var(--text-secondary);display:block; }
.lr-gc-price { font-size:11px;color:var(--text-muted); }
.lr-quality-list { display:flex;flex-direction:column;padding:8px; }
.lr-quality-list span { padding:12px 18px;font-size:14px;color:var(--text-secondary);cursor:pointer;border-radius:8px;transition:all .15s; }
.lr-quality-list span:hover,.lr-quality-list span.active { background:rgba(0,212,255,.06);color:#00d4ff; }

.modal-enter-active,.modal-leave-active { transition:opacity .2s; }
.modal-enter-active .lr-modal,.modal-leave-active .lr-modal { transition:transform .2s ease; }
.modal-enter-from,.modal-leave-to { opacity:0; }
.modal-enter-from .lr-modal,.modal-leave-to .lr-modal { transform:scale(.95); }

/* Description */
.lr-desc-card { padding:20px;border-radius:14px;background:var(--surface-glass);border:1px solid var(--border-subtle); }
.lr-tags { display:flex;gap:6px;margin-bottom:12px; }
.lr-tag { padding:3px 10px;border-radius:6px;font-size:11px;background:rgba(0,212,255,.06);color:rgba(0,212,255,.8);border:1px solid rgba(0,212,255,.08); }
.lr-desc-card p { font-size:13px;color:var(--text-secondary);line-height:1.6; }
.lr-gift-log { margin-top:10px;display:flex;flex-wrap:wrap;gap:4px 14px; }
.lr-gl-item { font-size:11px;color:var(--text-muted); }
.lr-gl-item b { color:var(--text-secondary); }

/* Chat sidebar */
.lr-chat { display:flex;flex-direction:column;border-radius:14px;background:var(--surface-glass);border:1px solid var(--border-subtle);overflow:hidden; }
.lr-chat-head { display:flex;justify-content:space-between;align-items:center;padding:0;border-bottom:1px solid var(--border-subtle); }
.lr-chat-tabs { display:flex; }
.lr-chat-tabs button { padding:12px 20px;background:none;border:none;border-bottom:2px solid transparent;color:var(--text-muted);font-size:13px;cursor:pointer;transition:all .2s; }
.lr-chat-tabs button.active { color:#00d4ff;border-bottom-color:#00d4ff; }
.lr-chat-count { font-size:11px;color:var(--text-muted);background:rgba(255,255,255,.04);padding:1px 8px;border-radius:9999px;margin-right:14px; }
.lr-chat-body { flex:1;overflow-y:auto;padding:12px 16px;display:flex;flex-direction:column;gap:6px;max-height:450px; }
.lr-chat-msg { font-size:12px;line-height:1.5; }
.lr-cu { font-weight:600; }
.lr-ct { color:var(--text-secondary); }
.lr-chat-input { display:flex;gap:8px;padding:12px 16px;border-top:1px solid(var(--border-subtle)); }
.lr-chat-field { flex:1;--el-input-bg-color:var(--surface-glass);--el-input-border-color:var(--border-subtle);--el-input-focus-border-color:#00d4ff;--el-input-text-color:var(--text-primary); }

@media(max-width:768px){.lr-body{flex-direction:column}.lr-chat{width:100%;max-height:300px}.lr-header{flex-wrap:wrap;gap:12px}}
</style>
