<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Star, User, Clock, Collection, ArrowLeft, ChatDotRound, FullScreen, Setting, View, List, Close } from '@element-plus/icons-vue'
import gsap from 'gsap'

const route = useRoute()
const router = useRouter()
const isAiWorld = window.location.pathname.startsWith('/ai-world')

// ─── Video data ───
const videoSrc = ref(null)
const posterSrc = ref(null)
onMounted(async () => {
    const { default: vid } = await import('@/assets/media123.mp4')
    const { default: poster } = await import('@/assets/imgs/xn1.png')
    videoSrc.value = vid; posterSrc.value = poster
})

// ─── Player state ───
const videoRef = ref(null)
const danmakuInput = ref('')
const playing = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)
const muted = ref(false)
const playbackRate = ref(1)
const isFullscreen = ref(false)
const showDanmaku = ref(true)
const danmakuOpacity = ref(0.8)

const progress = computed(() => duration.value ? (currentTime.value / duration.value * 100) : 0)
const currentTimeStr = computed(() => fmtTime(currentTime.value))
const durationStr = computed(() => fmtTime(duration.value))

function fmtTime(s) { const m=Math.floor(s/60),sec=Math.floor(s%60); return `${m}:${String(sec).padStart(2,'0')}` }

// Player controls
function togglePlay() { const v=videoRef.value; if(!v)return; v.paused?v.play():v.pause() }
function onTimeUpdate() { currentTime.value = videoRef.value?.currentTime || 0 }
function onLoaded() { duration.value = videoRef.value?.duration || 0 }
function onPlay() { playing.value = true }
function onPause() { playing.value = false }
function onEnded() { playing.value = false }
function seek(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    if (videoRef.value) videoRef.value.currentTime = pct * duration.value
}
function setVolume(e) { const v = parseFloat(e.target.value); volume.value = v; if(videoRef.value) { videoRef.value.volume = v; muted.value = v===0 } }
function toggleMute() { if(videoRef.value) { videoRef.value.muted = !videoRef.value.muted; muted.value = videoRef.value.muted } }
function setSpeed(r) { playbackRate.value = r; if(videoRef.value) videoRef.value.playbackRate = r }
function toggleFullscreen() {
    const el = document.querySelector('.vw-player-wrap')
    if (!document.fullscreenElement) { el?.requestFullscreen(); isFullscreen.value = true }
    else { document.exitFullscreen(); isFullscreen.value = false }
}

// ─── Danmaku ───
const danmakuList = ref([
    { id:1,text:'讲得太好了！',time:2,color:'#00d4ff' },
    { id:2,text:'AI讲师好厉害',time:5,color:'#fff' },
    { id:3,text:'这个知识点很重要',time:8,color:'#fbbf24' },
    { id:4,text:'已三连',time:12,color:'#8b5cf6' },
    { id:5,text:'666666',time:15,color:'#00d4ff' },
    { id:6,text:'讲得很清晰',time:20,color:'#fff' },
    { id:7,text:'收藏了',time:25,color:'#fbbf24' },
    { id:8,text:'有课代表吗',time:30,color:'#fff' },
    { id:9,text:'学到了',time:35,color:'#00d4ff' },
    { id:10,text:'墨学越来越好',time:40,color:'#8b5cf6' },
])
const activeDanmaku = computed(() => {
    if (!showDanmaku.value) return []
    return danmakuList.value.filter(d => Math.abs(d.time - currentTime.value) < 3)
})

function sendDanmaku() {
    const text = danmakuInput.value.trim()
    if (!text) return
    danmakuList.value.push({ id:Date.now(), text, time:currentTime.value, color:'#fff' })
    danmakuInput.value = ''
}

// ─── Comments ───
const commentText = ref('')
const comments = ref([
    { u:'AI学习者',t:'2小时前',c:'这个视频把Transformer架构讲得太清楚了，推荐！',likes:128 },
    { u:'前端小王',t:'5小时前',c:'老师用的示例代码能分享吗？',likes:56 },
    { u:'数据科学家',t:'昨天',c:'Attention机制部分如果能再展开讲讲就更好了',likes:89 },
])
function addComment() {
    const c = commentText.value.trim()
    if (!c) return
    comments.value.unshift({ u:'我',t:'刚刚',c,likes:0 })
    commentText.value = ''
}

// Speed options
const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]
const showSpeedMenu = ref(false)

// Cleanup
onUnmounted(() => { if (document.fullscreenElement) document.exitFullscreen() })
</script>

<template>
<div class="vw-page">
    <!-- Back nav -->
    <div class="vw-top-bar">
        <a @click="router.push(isAiWorld?'/ai-world':'/course/courses')" class="vw-back">
            <el-icon><ArrowLeft/></el-icon> {{isAiWorld?'返回AI World':'返回课程'}}
        </a>
        <span class="vw-bread">/ 视频详情</span>
    </div>

    <!-- ═══════ PLAYER ═══════ -->
    <div class="vw-player-wrap">
        <!-- Video -->
        <video ref="videoRef" :src="videoSrc" :poster="posterSrc"
            class="vw-video" crossorigin="anonymous"
            @timeupdate="onTimeUpdate" @loadedmetadata="onLoaded"
            @play="onPlay" @pause="onPause" @ended="onEnded"
            @click="togglePlay"></video>

        <!-- Play overlay -->
        <div v-if="!playing" class="vw-play-overlay" @click="togglePlay">
            <span class="vw-play-big">▶</span>
        </div>

        <!-- Danmaku layer -->
        <div class="vw-danmaku-layer" :style="{opacity:danmakuOpacity}">
            <div v-for="d in activeDanmaku" :key="d.id" class="vw-danmaku-item"
                :style="{color:d.color,top:(10+(d.id%8)*10)+'%',animationDuration:(4+d.text.length*0.3)+'s'}">
                {{d.text}}
            </div>
        </div>

        <!-- Controls bar -->
        <div class="vw-controls" @click.stop>
            <!-- Progress -->
            <div class="vw-progress-bar" @click="seek">
                <div class="vw-progress-track">
                    <div class="vw-progress-fill" :style="{width:progress+'%'}"></div>
                    <div class="vw-progress-thumb" :style="{left:progress+'%'}"></div>
                </div>
            </div>
            <!-- Buttons -->
            <div class="vw-ctrl-row">
                <div class="vw-ctrl-left">
                    <button class="vw-ctrl-btn" @click="togglePlay">{{playing?'⏸':'▶'}}</button>
                    <span class="vw-time">{{currentTimeStr}} / {{durationStr}}</span>
                    <button class="vw-ctrl-btn" @click="toggleMute">{{muted?'🔇':volume>0.5?'🔊':'🔉'}}</button>
                    <input type="range" min="0" max="1" step="0.05" :value="volume" @input="setVolume" class="vw-vol-slider"/>
                </div>
                <div class="vw-ctrl-right">
                    <!-- Danmaku toggle -->
                    <button class="vw-ctrl-btn" :class="{active:showDanmaku}" @click="showDanmaku=!showDanmaku" title="弹幕">弹</button>
                    <button class="vw-ctrl-btn" @click="danmakuOpacity=danmakuOpacity>0.5?0.3:0.8" title="弹幕透明度">
                        <el-icon :size="14"><View/></el-icon>
                    </button>
                    <!-- Speed -->
                    <div class="vw-speed-wrap">
                        <button class="vw-ctrl-btn" @click="showSpeedMenu=!showSpeedMenu">倍速 {{playbackRate}}x</button>
                        <div v-if="showSpeedMenu" class="vw-speed-menu">
                            <span v-for="s in speeds" :key="s" :class="{active:playbackRate===s}" @click="setSpeed(s);showSpeedMenu=false">{{s}}x</span>
                        </div>
                    </div>
                    <!-- Settings -->
                    <button class="vw-ctrl-btn" title="设置"><el-icon :size="16"><Setting/></el-icon></button>
                    <!-- Fullscreen -->
                    <button class="vw-ctrl-btn" @click="toggleFullscreen" title="全屏">
                        <el-icon :size="16"><FullScreen/></el-icon>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- ═══════ BELOW PLAYER ═══════ -->
    <div class="vw-below">
        <!-- Main -->
        <div class="vw-main">
            <!-- Video info -->
            <div class="vw-info">
                <h1 class="vw-title">大模型应用开发实战 · 第4讲</h1>
                <div class="vw-meta">
                    <span><el-icon><Star/></el-icon> 4.7</span>
                    <span><el-icon><User/></el-icon> 11.2K 观看</span>
                    <span><el-icon><Clock/></el-icon> 40课时</span>
                    <span><el-icon><Collection/></el-icon> 高级</span>
                </div>
                <div class="vw-teacher">
                    <span class="vw-teacher-avatar">👨‍🏫</span>
                    <div>
                        <span class="vw-teacher-name">凌风 · AI Lab 负责人</span>
                        <p class="vw-teacher-desc">专注大模型应用开发，前大厂AI研究员</p>
                    </div>
                    <el-button size="small" round class="vw-follow-btn">+ 关注</el-button>
                </div>
            </div>

            <!-- Danmaku input -->
            <div class="vw-danmaku-send">
                <el-input v-model="danmakuInput" placeholder="发送弹幕…" size="small" @keyup.enter="sendDanmaku" class="vw-danmaku-input"/>
                <el-button size="small" round @click="sendDanmaku">发送</el-button>
            </div>

            <!-- Comments -->
            <div class="vw-comments">
                <h3><el-icon><ChatDotRound/></el-icon> 评论 ({{comments.length}})</h3>
                <div class="vw-comment-input">
                    <el-input v-model="commentText" type="textarea" :rows="2" placeholder="发表评论…"/>
                    <el-button size="small" type="primary" round @click="addComment" class="vw-comment-btn">发表</el-button>
                </div>
                <div v-for="c in comments" :key="c.c" class="vw-comment-item">
                    <span class="vw-cm-avatar">👤</span>
                    <div class="vw-cm-body">
                        <div class="vw-cm-head"><span class="vw-cm-user">{{c.u}}</span><span class="vw-cm-time">{{c.t}}</span></div>
                        <p class="vw-cm-text">{{c.c}}</p>
                        <span class="vw-cm-like">👍 {{c.likes}}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sidebar -->
        <aside class="vw-sidebar">
            <h3>AI讲师其他视频</h3>
            <div v-for="i in 3" :key="i" class="vw-side-card">
                <div class="vw-side-img"><img :src="posterSrc" alt=""/></div>
                <div class="vw-side-info">
                    <h4>大模型应用开发实战 · 第{{i+3}}讲</h4>
                    <p>凌风 · {{(3+i*2).toFixed(1)}}K 观看</p>
                </div>
            </div>
        </aside>
    </div>
</div>
</template>

<style scoped>
.vw-page { max-width:1200px; margin:0 auto; padding:24px 28px 60px; }
.vw-top-bar { margin-bottom:20px; }
.vw-back { font-size:14px; color:var(--text-secondary); cursor:pointer; text-decoration:none; display:inline-flex;align-items:center;gap:4px; }
.vw-back:hover { color:#00d4ff; }
.vw-bread { font-size:14px; color:var(--text-muted); }

/* ═══════ PLAYER ═══════ */
.vw-player-wrap { position:relative; background:#000; border-radius:16px; overflow:hidden; aspect-ratio:16/9; margin-bottom:28px; }
.vw-video { width:100%;height:100%;object-fit:contain; }
.vw-play-overlay { position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.3);cursor:pointer;z-index:2; }
.vw-play-big { font-size:64px;color:#fff;opacity:.8;transition:transform .2s; }
.vw-play-overlay:hover .vw-play-big { transform:scale(1.15);opacity:1; }

/* Danmaku */
.vw-danmaku-layer { position:absolute;inset:0;pointer-events:none;z-index:3;overflow:hidden; }
.vw-danmaku-item { position:absolute;right:-100%;white-space:nowrap;font-size:18px;font-weight:700;text-shadow:1px 1px 2px rgba(0,0,0,.8);animation:danmakuScroll linear forwards; }
@keyframes danmakuScroll { from{right:-100%} to{right:110%} }

/* Controls */
.vw-controls { position:absolute;bottom:0;left:0;right:0;z-index:4;background:linear-gradient(transparent,rgba(0,0,0,.8));padding:40px 16px 12px; }
.vw-progress-bar { padding:8px 0;cursor:pointer; }
.vw-progress-track { height:4px;background:rgba(255,255,255,.2);border-radius:2px;position:relative;transition:height .15s; }
.vw-progress-bar:hover .vw-progress-track { height:6px; }
.vw-progress-fill { height:100%;background:#00d4ff;border-radius:2px;position:relative; }
.vw-progress-thumb { position:absolute;top:50%;transform:translate(-50%,-50%);width:12px;height:12px;border-radius:50%;background:#00d4ff;opacity:0;transition:opacity .15s; }
.vw-progress-bar:hover .vw-progress-thumb { opacity:1; }
.vw-ctrl-row { display:flex;justify-content:space-between;align-items:center;margin-top:6px; }
.vw-ctrl-left,.vw-ctrl-right { display:flex;align-items:center;gap:8px; }
.vw-ctrl-btn { background:none;border:none;color:#fff;cursor:pointer;padding:4px 8px;border-radius:4px;font-size:13px;transition:background .15s;white-space:nowrap; }
.vw-ctrl-btn:hover,.vw-ctrl-btn.active { background:rgba(255,255,255,.15); }
.vw-time { font-size:12px;color:rgba(255,255,255,.7);min-width:110px;text-align:center;font-variant-numeric:tabular-nums; }
.vw-vol-slider { width:60px;height:3px;accent-color:#00d4ff; }
.vw-speed-wrap { position:relative; }
.vw-speed-menu { position:absolute;bottom:36px;right:0;background:rgba(0,0,0,.9);border-radius:8px;padding:4px;display:flex;flex-direction:column;gap:2px;z-index:10; }
.vw-speed-menu span { padding:6px 16px;font-size:12px;color:#fff;cursor:pointer;border-radius:4px;white-space:nowrap; }
.vw-speed-menu span:hover,.vw-speed-menu span.active { background:rgba(0,212,255,.2);color:#00d4ff; }

/* ═══════ BELOW ═══════ */
.vw-below { display:flex;gap:32px; }
.vw-main { flex:1;min-width:0; }
.vw-sidebar { width:280px;flex-shrink:0; }

/* Info */
.vw-info { padding:20px 24px;border-radius:14px;background:var(--surface-glass);border:1px solid var(--border-subtle);margin-bottom:20px; }
.vw-title { font-family:var(--font-display);font-size:20px;font-weight:600;color:var(--text-primary);margin-bottom:10px; }
.vw-meta { display:flex;gap:16px;font-size:13px;color:var(--text-secondary);margin-bottom:14px; }
.vw-meta span { display:inline-flex;align-items:center;gap:4px; }
.vw-teacher { display:flex;align-items:center;gap:12px; }
.vw-teacher-avatar { font-size:32px; }
.vw-teacher-name { font-size:14px;color:var(--text-primary);display:block; }
.vw-teacher-desc { font-size:12px;color:var(--text-muted); }
.vw-follow-btn { border-color:#00d4ff!important;color:#00d4ff!important;margin-left:auto; }

/* Danmaku send */
.vw-danmaku-send { display:flex;gap:8px;margin-bottom:20px; }
.vw-danmaku-input { flex:1;--el-input-bg-color:var(--surface-glass);--el-input-border-color:var(--border-subtle);--el-input-focus-border-color:#00d4ff;--el-input-text-color:var(--text-primary); }

/* Comments */
.vw-comments { }
.vw-comments h3 { font-family:var(--font-display);font-size:15px;color:var(--text-primary);margin-bottom:16px;display:inline-flex;align-items:center;gap:6px; }
.vw-comment-input { display:flex;flex-direction:column;gap:8px;margin-bottom:20px; }
.vw-comment-btn { align-self:flex-end;--el-button-bg-color:#00d4ff;--el-button-border-color:#00d4ff; }
.vw-comment-item { display:flex;gap:12px;padding:16px 0;border-bottom:1px solid var(--border-subtle); }
.vw-cm-avatar { font-size:28px;flex-shrink:0; }
.vw-cm-body { flex:1; }
.vw-cm-head { display:flex;gap:8px;align-items:center;margin-bottom:6px; }
.vw-cm-user { font-size:13px;color:var(--text-primary);font-weight:500; }
.vw-cm-time { font-size:11px;color:var(--text-muted); }
.vw-cm-text { font-size:14px;color:var(--text-secondary);line-height:1.6;margin-bottom:6px; }
.vw-cm-like { font-size:12px;color:var(--text-muted);cursor:pointer; }
.vw-cm-like:hover { color:#00d4ff; }

/* Sidebar */
.vw-sidebar h3 { font-family:var(--font-display);font-size:14px;color:var(--text-primary);margin-bottom:14px; }
.vw-side-card { display:flex;gap:10px;padding:10px;border-radius:10px;cursor:pointer;transition:background .15s;margin-bottom:8px; }
.vw-side-card:hover { background:var(--surface-glass-hover); }
.vw-side-img { width:100px;height:60px;border-radius:8px;overflow:hidden;flex-shrink:0;background:var(--surface-glass); }
.vw-side-img img { width:100%;height:100%;object-fit:cover; }
.vw-side-info h4 { font-size:12px;color:var(--text-primary);line-height:1.4;margin-bottom:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
.vw-side-info p { font-size:11px;color:var(--text-muted); }

@media(max-width:1024px){.vw-below{flex-direction:column}.vw-sidebar{width:100%}}
@media(max-width:768px){.vw-page{padding:16px 12px 40px}.vw-title{font-size:16px}.vw-ctrl-btn{font-size:11px;padding:2px 4px}.vw-vol-slider{display:none}.vw-speed-menu{bottom:32px}}
</style>
