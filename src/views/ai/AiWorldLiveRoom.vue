<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, ChatDotRound, Share, Close } from '@element-plus/icons-vue'
import gsap from 'gsap'

const router = useRouter()

// ─── Streamer ───
const streamer = { name:'凌风', role:'AI研究员', fans:'12.8K', title:'AI论文精读：Attention is All You Need', tags:['AI','论文'] }
const viewers = ref(3200)
const followed = ref(false)
const duration = ref('02:34:18')

// ─── Quality ───
const qualities = ['超清 1080P','高清 720P','标清 480P','自动']
const quality = ref('超清 1080P')
const showQuality = ref(false)

// ─── Gifts ───
const gifts = [
    { icon:'🌸',name:'鲜花',price:1,color:'#f472b6' },
    { icon:'👍',name:'点赞',price:1,color:'#00d4ff' },
    { icon:'🎈',name:'气球',price:5,color:'#fbbf24' },
    { icon:'🍰',name:'蛋糕',price:10,color:'#34d399' },
    { icon:'🚀',name:'火箭',price:50,color:'#f87171' },
    { icon:'👑',name:'皇冠',price:100,color:'#8b5cf6' },
]
const giftLog = ref([])
const flyingGifts = ref([])
const showGiftPanel = ref(false)

function sendGift(gift) {
    giftLog.value.unshift({ u:'我', g:gift.name, color:gift.color })
    if (giftLog.value.length > 20) giftLog.value.pop()
    const id = Date.now()
    flyingGifts.value.push({ id, icon:gift.icon, name:gift.name, color:gift.color, x:Math.random()*60+20 })
    setTimeout(() => { flyingGifts.value = flyingGifts.value.filter(f => f.id !== id) }, 2000)
    viewers.value++
}
const recentGifts = computed(() => giftLog.value.slice(0,5))

// ─── Danmaku ───
const danmakuList = ref([
    { id:1,text:'讲得太好了！',color:'#00d4ff' },{ id:2,text:'已三连',color:'#fff' },
    { id:3,text:'666666',color:'#fbbf24' },{ id:4,text:'有人吗',color:'#8b5cf6' },
])
const danmakuOn = ref(true)
const danmakuInput = ref('')
const danmakuRecent = computed(() => danmakuList.value.slice(-15))

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
}

// ─── Chat ───
const chatMessages = ref([
    { u:'AI学习者',c:'凌风老师讲得太好了！',color:'#00d4ff' },
    { u:'小王',c:'Attention机制终于听懂了',color:'#fff' },
])
const chatInput = ref('')
const chatBody = ref(null)
const chatTab = ref('chat')
const danmakuSidebar = computed(() => danmakuList.value.slice(-30))

function sendChat() {
    const t = chatInput.value.trim()
    if (!t) return
    chatMessages.value.push({ u:'我',c:t,color:'#34d399' })
    chatInput.value = ''
    nextTick(() => { if(chatBody.value) chatBody.value.scrollTop = chatBody.value.scrollHeight })
}

// Simulate
let timers = []
onMounted(() => {
    timers.push(setInterval(() => {
        chatMessages.value.push({ u:`观众${Math.floor(Math.random()*999)}`,c:['讲得真好','+1','学习了','👍'][Math.floor(Math.random()*4)],color:'#fff' })
        viewers.value += Math.floor(Math.random()*3)-1
        nextTick(() => { if(chatBody.value) chatBody.value.scrollTop = chatBody.value.scrollHeight })
    }, 3000))
    timers.push(setInterval(() => {
        danmakuList.value.push({ id:Date.now(),text:['666','讲得好','老师好'][Math.floor(Math.random()*3)],color:['#00d4ff','#fff','#fbbf24'][Math.floor(Math.random()*3)] })
        if(danmakuList.value.length>50) danmakuList.value.splice(0,10)
    }, 2000))
})
onUnmounted(() => timers.forEach(clearInterval))

import posterImg from '@/assets/imgs/xn4.png'
import liveVideo from '@/assets/media111.mp4'
</script>

<template>
<div class="lr-root">
    <!-- ═══════ FULLSCREEN VIDEO ═══════ -->
    <div class="lr-stage" @dblclick="sendHeart">
        <video :src="liveVideo" autoplay muted loop class="lr-video"></video>

        <!-- Danmaku -->
        <div v-if="danmakuOn" class="lr-danmaku">
            <div v-for="d in danmakuRecent" :key="d.id" class="lr-dm" :style="{color:d.color,top:(5+(d.id%8)*10)+'%'}">{{d.text}}</div>
        </div>
        <!-- Hearts -->
        <div v-for="h in hearts" :key="h.id" class="lr-heart" :style="{left:h.x+'%'}">❤️</div>
        <!-- Gifts -->
        <div v-for="g in flyingGifts" :key="g.id" class="lr-fly" :style="{left:g.x+'%',color:g.color}">{{g.icon}}{{g.name}}</div>

        <!-- ═══ TOP-LEFT: streamer info ═══ -->
        <div class="lr-top-left">
            <div class="lr-tl-avatar"><img :src="posterImg"/></div>
            <div>
                <div class="lr-tl-name">{{streamer.name}}<span class="lr-tl-live">🔴 LIVE</span></div>
                <div class="lr-tl-count">{{viewers.toLocaleString()}} 观看</div>
            </div>
            <button class="lr-tl-follow" :class="{on:followed}" @click="followed=!followed">{{followed?'已关注':'关注'}}</button>
        </div>

        <!-- ═══ TOP-RIGHT: actions ═══ -->
        <div class="lr-top-right">
            <button class="lr-tr-btn" @click="router.back()"><el-icon><ArrowLeft/></el-icon></button>
            <button class="lr-tr-btn"><el-icon><Share/></el-icon></button>
            <button class="lr-tr-btn" @click="showQuality=true">画质</button>
        </div>

        <!-- ═══ BOTTOM-RIGHT: gift bar ═══ -->
        <div class="lr-bottom-right">
            <div class="lr-br-gifts">
                <button v-for="g in gifts" :key="g.name" class="lr-br-gift" @click="sendGift(g)">{{g.icon}}<span>{{g.price}}币</span></button>
            </div>
            <button class="lr-br-more" @click="showGiftPanel=true">更多礼物 ›</button>
        </div>

        <!-- Quality popup -->
        <Transition name="modal"><div v-if="showQuality" class="lr-popup" @click.self="showQuality=false"><div class="lr-popup-box"><h4>画质选择</h4><div v-for="q in qualities" :key="q" :class="{active:quality===q}" @click="quality=q;showQuality=false">{{q}}</div></div></div></Transition>
    </div>

    <!-- ═══════ RIGHT SIDEBAR: chat ═══════ -->
    <aside class="lr-sidebar">
        <div class="lr-sb-tabs">
            <button :class="{active:chatTab==='chat'}" @click="chatTab='chat'">聊天</button>
            <button :class="{active:chatTab==='danmaku'}" @click="chatTab='danmaku'">弹幕</button>
        </div>
        <div class="lr-sb-body" ref="chatBody">
            <template v-if="chatTab==='chat'">
                <div v-for="(m,i) in chatMessages" :key="i" class="lr-sb-msg"><span :style="{color:m.color}">{{m.u}}</span>: {{m.c}}</div>
            </template>
            <template v-else>
                <div v-for="d in danmakuSidebar" :key="d.id" class="lr-sb-msg"><span :style="{color:d.color}">弹幕</span>: {{d.text}}</div>
            </template>
        </div>
        <div class="lr-sb-input">
            <el-input v-model="danmakuInput" v-if="chatTab==='danmaku'" placeholder="发送弹幕…" size="small" @keyup.enter="sendDanmaku"/>
            <el-input v-model="chatInput" v-else placeholder="发送消息…" size="small" @keyup.enter="sendChat"/>
        </div>
    </aside>

    <!-- Gift panel modal -->
    <Transition name="modal"><div v-if="showGiftPanel" class="lr-popup" @click.self="showGiftPanel=false"><div class="lr-popup-box lr-gift-popup"><h4>送礼物</h4><div class="lr-gift-grid"><div v-for="g in gifts" :key="g.name" class="lr-gift-card" @click="sendGift(g);showGiftPanel=false"><span class="lr-gc-icon">{{g.icon}}</span><span class="lr-gc-name">{{g.name}}</span><span class="lr-gc-price">{{g.price}}币</span></div></div></div></div></Transition>
</div>
</template>

<style scoped>
/* ═══════ ROOT ═══════ */
.lr-root { display:flex; height:calc(100vh - 56px); background:#000; position:relative; }

/* ═══════ STAGE ═══════ */
.lr-stage { flex:1; position:relative; min-width:0; }
.lr-video { width:100%; height:100%; object-fit:contain; }

/* Danmaku */
.lr-danmaku { position:absolute; inset:0; pointer-events:none; z-index:2; overflow:hidden; }
.lr-dm { position:absolute; right:-100%; white-space:nowrap; font-size:18px; font-weight:700; text-shadow:0 0 4px rgba(0,0,0,.8); animation:dmScroll 4s linear forwards; }
@keyframes dmScroll { from{right:-100%} to{right:110%} }

/* Hearts */
.lr-heart { position:absolute; bottom:0; font-size:28px; animation:heartUp 1.5s ease-out forwards; pointer-events:none; z-index:3; }
@keyframes heartUp { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-300px) scale(1.5);opacity:0} }

/* Flying gifts */
.lr-fly { position:absolute; bottom:20%; font-size:20px; font-weight:700; animation:giftUp 2s ease-out forwards; pointer-events:none; z-index:3; text-shadow:0 0 12px currentColor; }
@keyframes giftUp { 0%{transform:translateY(0) scale(.5);opacity:1} 50%{transform:scale(1.3)} 100%{transform:translateY(-250px) scale(1);opacity:0} }

/* ═══ TOP-LEFT ═══ */
.lr-top-left { position:absolute; top:16px; left:16px; display:flex; align-items:center; gap:12px; z-index:4; }
.lr-tl-avatar { width:44px;height:44px;border-radius:50%;overflow:hidden;border:2px solid rgba(0,212,255,.4);flex-shrink:0; }
.lr-tl-avatar img { width:100%;height:100%;object-fit:cover; }
.lr-tl-name { font-size:15px;color:#fff;font-weight:600;display:flex;align-items:center;gap:6px;text-shadow:0 1px 3px rgba(0,0,0,.5); }
.lr-tl-live { font-size:10px;color:#f87171;font-weight:600;padding:1px 6px;border-radius:4px;background:rgba(0,0,0,.4); }
.lr-tl-count { font-size:12px;color:rgba(255,255,255,.7); }
.lr-tl-follow { padding:5px 14px;border-radius:6px;font-size:12px;color:#fff;background:rgba(0,212,255,.6);border:none;cursor:pointer;font-weight:600; }
.lr-tl-follow.on { background:rgba(255,255,255,.15); }

/* ═══ TOP-RIGHT ═══ */
.lr-top-right { position:absolute; top:16px; right:16px; display:flex; gap:8px; z-index:4; }
.lr-tr-btn { padding:6px 12px;border-radius:6px;font-size:12px;color:#fff;background:rgba(0,0,0,.4);border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px; }
.lr-tr-btn:hover { background:rgba(255,255,255,.15); }

/* ═══ BOTTOM-RIGHT ═══ */
.lr-bottom-right { position:absolute; bottom:12px; right:12px; display:flex; align-items:center; gap:8px; z-index:4; }
.lr-br-gifts { display:flex; gap:4px; }
.lr-br-gift { display:flex; align-items:center; gap:3px;padding:4px 10px;border-radius:8px;font-size:11px;color:#fff;background:rgba(0,0,0,.4);border:1px solid rgba(255,255,255,.08);cursor:pointer; }
.lr-br-gift:hover { background:rgba(255,255,255,.1); }
.lr-br-gift span { font-size:10px;color:rgba(255,255,255,.5); }
.lr-br-more { padding:4px 10px;border-radius:8px;font-size:11px;color:rgba(255,255,255,.6);background:rgba(0,0,0,.4);border:1px solid rgba(255,255,255,.08);cursor:pointer; }

/* ═══ POPUP ═══ */
.lr-popup { position:absolute;inset:0;z-index:10;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center; }
.lr-popup-box { background:rgba(16,20,40,.95);border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:20px;min-width:240px; }
.lr-popup-box h4 { font-size:14px;color:#fff;margin-bottom:12px;text-align:center;font-family:var(--font-display); }
.lr-popup-box div { padding:8px 16px;font-size:13px;color:rgba(255,255,255,.6);cursor:pointer;border-radius:6px;transition:all .15s; }
.lr-popup-box div:hover,.lr-popup-box div.active { background:rgba(0,212,255,.1);color:#00d4ff; }

.lr-gift-popup { width:300px; }
.lr-gift-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:8px; }
.lr-gift-card { text-align:center;padding:12px 6px;border-radius:10px;cursor:pointer;transition:all .15s;border:1px solid transparent; }
.lr-gift-card:hover { background:rgba(255,255,255,.04);border-color:rgba(0,212,255,.15); }
.lr-gc-icon { font-size:28px;display:block;margin-bottom:4px; }
.lr-gc-name { font-size:12px;color:rgba(255,255,255,.7);display:block; }
.lr-gc-price { font-size:10px;color:rgba(255,255,255,.35); }

.modal-enter-active,.modal-leave-active { transition:opacity .2s; }
.modal-enter-from,.modal-leave-to { opacity:0; }

/* ═══ SIDEBAR ═══ */
.lr-sidebar { width:300px;flex-shrink:0;background:rgba(10,14,30,.95);border-left:1px solid rgba(255,255,255,.05);display:flex;flex-direction:column; }
.lr-sb-tabs { display:flex;border-bottom:1px solid rgba(255,255,255,.05); }
.lr-sb-tabs button { flex:1;padding:12px;background:none;border:none;border-bottom:2px solid transparent;color:rgba(255,255,255,.4);font-size:13px;cursor:pointer;transition:all .2s; }
.lr-sb-tabs button.active { color:#00d4ff;border-bottom-color:#00d4ff; }
.lr-sb-body { flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px; }
.lr-sb-msg { font-size:12px;line-height:1.5;color:rgba(255,255,255,.7);word-break:break-all; }
.lr-sb-input { padding:10px 12px;border-top:1px solid rgba(255,255,255,.05); }
.lr-sb-input :deep(.el-input__wrapper) { background:rgba(255,255,255,.04)!important;border-color:rgba(255,255,255,.06)!important;border-radius:8px!important; }
.lr-sb-input :deep(.el-input__inner) { color:#fff!important;font-size:12px!important; }

@media(max-width:768px){ .lr-sidebar{display:none} }
</style>
