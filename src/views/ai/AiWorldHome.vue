<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Search, ArrowRight, Star, VideoPlay } from '@element-plus/icons-vue'
import gsap from 'gsap'

const router = useRouter()

// Categories
const cats = ['全部分区','AI技术','编程开发','数学物理','人文历史','艺术设计','音乐舞蹈','游戏电竞','生活日常','知识科普']
const activeCat = ref('全部分区')

const filteredVideos = computed(() => {
    if (activeCat.value === '全部分区') return videos
    return videos.filter(v => v.cat === activeCat.value || activeCat.value === '全部分区')
})

const filteredLive = computed(() => {
    if (activeCat.value === '全部分区') return liveStreams
    return [] // live filtering can be added later
})

// Hero carousel
const banners = [
    { t:'探索AI的无限可能',sub:'加入墨学AI世界 · 发现精彩内容',color:'#00d4ff',img:'xn1.png' },
    { t:'Spring Boot 3.0 实战',sub:'从零搭建微服务架构',color:'#8b5cf6',img:'xn2.png' },
    { t:'《论语》精读系列',sub:'墨韵先生带你读懂儒家经典',color:'#fbbf24',img:'xn3.png' },
]
const bannerIdx = ref(0)

// Videos
const videos = [
    { id:1,t:'深度学习入门：从感知机到Transformer',a:'凌风',v:128000,d:'32:15',img:'xn4.png',cat:'AI技术' },
    { id:2,t:'《道德经》与现代生活哲学',a:'清虚先生',v:89000,d:'24:08',img:'xn5.png',cat:'人文历史' },
    { id:3,t:'Rust异步编程实战指南',a:'无极',v:67000,d:'45:30',img:'xn6.png',cat:'编程开发' },
    { id:4,t:'颜体楷书基本笔画精讲',a:'砚田墨香',v:45000,d:'18:22',img:'xn7.png',cat:'艺术设计' },
    { id:5,t:'Kubernetes集群运维实战',a:'程远',v:92000,d:'56:40',img:'xn8.png',cat:'编程开发' },
    { id:6,t:'Python数据可视化进阶',a:'程远',v:78000,d:'28:15',img:'xn9.png',cat:'编程开发' },
    { id:7,t:'中国山水画技法入门',a:'丹青妙手',v:34000,d:'22:10',img:'xn10.png',cat:'艺术设计' },
    { id:8,t:'大模型Prompt工程完全指南',a:'凌风',v:156000,d:'38:45',img:'xn11.png',cat:'AI技术' },
]

// Live streams
const liveStreams = [
    { id:'l1',t:'AI论文精读：Attention is All You Need',a:'凌风',w:3200,img:'xn12.png' },
    { id:'l2',t:'周末书法直播：临摹《兰亭序》',a:'砚田墨香',w:1800,img:'xn13.png' },
    { id:'l3',t:'LeetCode周赛实时解题',a:'无极',w:2500,img:'xn14.png' },
    { id:'l4',t:'古琴演奏：《流水》',a:'琴心居士',w:960,img:'xn15.png' },
]

// Rankings
const rankings = [
    { t:'深度学习入门：从感知机到Transformer',v:128000 },
    { t:'大模型Prompt工程完全指南',v:156000 },
    { t:'Spring Boot 3.0 微服务实战',v:112000 },
    { t:'《论语》精读二十讲',v:98000 },
    { t:'Kubernetes集群运维实战',v:92000 },
]

function imgSrc(name) { return new URL(`@/assets/imgs/${name}`, import.meta.url).href }
function fmtViews(n) { return n>=10000?(n/10000).toFixed(1)+'万':n }

let bannerTimer = null

onMounted(async () => {
    bannerTimer = setInterval(() => { bannerIdx.value = (bannerIdx.value + 1) % banners.length }, 5000)
    await nextTick()
    gsap.fromTo('.awv-card', { opacity:0, y:30 }, { opacity:1, y:0, duration:.4, stagger:.05, ease:'power3.out' })
})
onUnmounted(() => { clearInterval(bannerTimer) })
</script>

<template>
<div class="aw-home">

    <!-- ═══════ HERO BANNER ═══════ -->
    <div class="aw-hero">
        <div class="aw-banner" :style="{'--bc':banners[bannerIdx].color}">
            <img :src="imgSrc(banners[bannerIdx].img)" alt="" class="aw-banner-img"/>
            <div class="aw-banner-info">
                <h1>{{banners[bannerIdx].t}}</h1>
                <p>{{banners[bannerIdx].sub}}</p>
                <el-button type="primary" round size="large" class="aw-banner-btn">立即观看</el-button>
            </div>
            <div class="aw-banner-dots">
                <span v-for="(b,i) in banners" :key="i" :class="{active:i===bannerIdx}" @click="bannerIdx=i"></span>
            </div>
        </div>
    </div>

    <!-- ═══════ CATEGORIES ═══════ -->
    <div class="aw-cats">
        <span v-for="c in cats" :key="c" class="aw-cat" :class="{active:activeCat===c}" @click="activeCat=c">{{c}}</span>
    </div>

    <div class="aw-content">
        <!-- Main -->
        <div class="aw-main-col">
            <!-- Section: 推荐视频 -->
            <section class="aw-section">
                <div class="aw-sec-head">
                    <h2><el-icon><VideoPlay/></el-icon> 推荐视频</h2>
                    <a @click="router.push('/ai-world/videos')">更多 <el-icon><ArrowRight/></el-icon></a>
                </div>
                <div class="aw-video-grid">
                    <div v-for="v in filteredVideos" :key="v.id" class="awv-card" @click="router.push('/ai-world/videos')">
                        <div class="awv-cover">
                            <img :src="imgSrc(v.img)" :alt="v.t"/>
                            <span class="awv-duration">{{v.d}}</span>
                            <span class="awv-views">{{fmtViews(v.v)}} 观看</span>
                        </div>
                        <div class="awv-info">
                            <h3>{{v.t}}</h3>
                            <p>{{v.a}}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Section: 直播中 -->
            <section class="aw-section">
                <div class="aw-sec-head">
                    <h2><span class="aw-live-dot"></span> 正在直播</h2>
                    <a @click="router.push('/ai-world/live')">更多 <el-icon><ArrowRight/></el-icon></a>
                </div>
                <div class="aw-live-grid">
                    <div v-for="l in filteredLive" :key="l.id" class="awl-card" @click="router.push('/ai-world/live')">
                        <div class="awl-cover">
                            <img :src="imgSrc(l.img)" :alt="l.t"/>
                            <span class="awl-badge">🔴 LIVE</span>
                            <span class="awl-watchers">{{fmtViews(l.w)}} 观看</span>
                        </div>
                        <h3>{{l.t}}</h3>
                        <p>{{l.a}}</p>
                    </div>
                </div>
            </section>
        </div>

        <!-- Sidebar -->
        <aside class="aw-sidebar">
            <div class="aw-side-card">
                <h3><el-icon><Star/></el-icon> 热门排行</h3>
                <div v-for="(r,i) in rankings" :key="i" class="aw-rank-item">
                    <span class="aw-rank-num" :class="{top:i<3}">{{i+1}}</span>
                    <span class="aw-rank-title">{{r.t}}</span>
                    <span class="aw-rank-views">{{fmtViews(r.v)}}</span>
                </div>
            </div>
        </aside>
    </div>

</div>
</template>

<style scoped>
.aw-home { max-width:1400px; margin:0 auto; padding:0 24px 60px; }

/* ═══════ BANNER ═══════ */
.aw-hero { margin-bottom:24px; }
.aw-banner { position:relative; height:320px; border-radius:16px; overflow:hidden; background:linear-gradient(135deg,var(--bc,#0a1030),#0a1030); display:flex;align-items:center; }
.aw-banner-img { position:absolute;right:0;top:0;width:55%;height:100%;object-fit:cover;mask-image:linear-gradient(to left,black 60%,transparent);-webkit-mask-image:linear-gradient(to left,black 60%,transparent); }
.aw-banner-info { position:relative;z-index:1;padding:48px;max-width:50%; }
.aw-banner-info h1 { font-family:var(--font-display);font-size:30px;font-weight:700;color:#fff;margin-bottom:12px; }
.aw-banner-info p { font-size:15px;color:rgba(255,255,255,.6);margin-bottom:24px; }
.aw-banner-btn { --el-button-bg-color:#00d4ff;--el-button-border-color:#00d4ff;--el-button-hover-bg-color:#33e0ff; }
.aw-banner-dots { position:absolute;bottom:16px;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:2; }
.aw-banner-dots span { width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.3);cursor:pointer;transition:all .3s; }
.aw-banner-dots span.active { background:#fff;width:24px;border-radius:4px; }

/* ═══════ CATEGORIES ═══════ */
.aw-cats { display:flex;gap:6px;flex-wrap:wrap;margin-bottom:28px;padding:4px 0; }
.aw-cat { padding:6px 16px;border-radius:9999px;font-size:13px;color:var(--text-secondary);cursor:pointer;transition:all .2s;background:var(--surface-glass);border:1px solid transparent;white-space:nowrap; }
.aw-cat:hover { color:var(--text-primary);border-color:var(--border-subtle); }
.aw-cat.active { color:#00d4ff;background:rgba(0,212,255,.06);border-color:rgba(0,212,255,.15); }

/* ═══════ CONTENT ═══════ */
.aw-content { display:flex;gap:28px; }
.aw-main-col { flex:1;min-width:0; }
.aw-sidebar { width:300px;flex-shrink:0; }

/* Section */
.aw-section { margin-bottom:40px; }
.aw-sec-head { display:flex;justify-content:space-between;align-items:center;margin-bottom:16px; }
.aw-sec-head h2 { font-family:var(--font-display);font-size:17px;color:var(--text-primary);display:inline-flex;align-items:center;gap:8px; }
.aw-sec-head a { font-size:13px;color:var(--text-muted);text-decoration:none;display:flex;align-items:center;gap:4px;cursor:pointer; }
.aw-sec-head a:hover { color:#00d4ff; }
.aw-live-dot { width:8px;height:8px;border-radius:50%;background:#f87171;animation:livePulse 2s infinite; }
@keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:.3} }

/* Video grid */
.aw-video-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px; }
.awv-card { cursor:pointer;transition:all .25s; }
.awv-card:hover { transform:translateY(-4px); }
.awv-cover { position:relative;aspect-ratio:16/10;border-radius:10px;overflow:hidden;background:var(--surface-glass); }
.awv-cover img { width:100%;height:100%;object-fit:cover; }
.awv-duration { position:absolute;bottom:6px;right:6px;padding:2px 6px;border-radius:4px;font-size:11px;background:rgba(0,0,0,.7);color:#fff; }
.awv-views { position:absolute;bottom:6px;left:6px;padding:2px 6px;border-radius:4px;font-size:11px;background:rgba(0,0,0,.7);color:#fff; }
.awv-info { padding:8px 2px; }
.awv-info h3 { font-size:13px;color:var(--text-primary);line-height:1.4;margin-bottom:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
.awv-info p { font-size:11px;color:var(--text-muted); }

/* Live grid */
.aw-live-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px; }
.awl-card { cursor:pointer;transition:all .25s; }
.awl-card:hover { transform:translateY(-4px); }
.awl-cover { position:relative;aspect-ratio:16/10;border-radius:10px;overflow:hidden;background:var(--surface-glass); }
.awl-cover img { width:100%;height:100%;object-fit:cover; }
.awl-badge { position:absolute;top:8px;left:8px;padding:2px 8px;border-radius:4px;font-size:10px;background:#f87171;color:#fff; }
.awl-watchers { position:absolute;bottom:6px;right:6px;padding:2px 6px;border-radius:4px;font-size:11px;background:rgba(0,0,0,.7);color:#fff; }
.awl-card h3 { font-size:13px;color:var(--text-primary);margin:8px 2px 4px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
.awl-card p { font-size:11px;color:var(--text-muted);margin:0 2px; }

/* Sidebar */
.aw-side-card { background:var(--surface-glass);border:1px solid var(--border-subtle);border-radius:14px;padding:20px; }
.aw-side-card h3 { font-family:var(--font-display);font-size:14px;color:var(--text-primary);margin-bottom:16px;display:inline-flex;align-items:center;gap:6px; }
.aw-rank-item { display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border-subtle); }
.aw-rank-item:last-child { border-bottom:none; }
.aw-rank-num { width:22px;height:22px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--text-muted);background:rgba(255,255,255,.03);flex-shrink:0; }
.aw-rank-num.top { background:linear-gradient(135deg,#00d4ff,#8b5cf6);color:#fff; }
.aw-rank-title { flex:1;font-size:13px;color:var(--text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.aw-rank-views { font-size:11px;color:var(--text-muted);flex-shrink:0; }

@media(max-width:1024px){.aw-video-grid,.aw-live-grid{grid-template-columns:repeat(2,1fr)}.aw-sidebar{display:none} .aw-banner-info{padding:32px} .aw-banner-info h1{font-size:22px} }
@media(max-width:768px){.aw-video-grid,.aw-live-grid{grid-template-columns:1fr}.aw-banner{height:200px}.aw-banner-info{padding:20px}.aw-banner-info h1{font-size:18px}.aw-banner-img{display:none}}
</style>
