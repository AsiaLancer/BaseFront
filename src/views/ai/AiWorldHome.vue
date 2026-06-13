<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Search, ArrowRight, Star, VideoPlay } from '@element-plus/icons-vue'
import gsap from 'gsap'
import VideoPreview from '@/components/common/VideoPreview.vue'
import mediaVideo from '@/assets/media123.mp4'

// Static image imports for banner
import bn1 from '@/assets/imgs/xn1.png'
import bn2 from '@/assets/imgs/xn2.png'
import bn3 from '@/assets/imgs/xn3.png'
import bn4 from '@/assets/imgs/xn4.png'
import bn5 from '@/assets/imgs/xn5.png'
import bn6 from '@/assets/imgs/xn6.png'
import bn7 from '@/assets/imgs/xn7.png'
import bn8 from '@/assets/imgs/xn8.png'
import bn9 from '@/assets/imgs/xn9.png'
import bn10 from '@/assets/imgs/xn10.png'
import bn11 from '@/assets/imgs/xn11.png'
import bn12 from '@/assets/imgs/xn12.png'
import bn13 from '@/assets/imgs/xn13.png'
import bn14 from '@/assets/imgs/xn14.png'
import bn15 from '@/assets/imgs/xn15.png'

const imgMap = { 'xn1':bn1,'xn2':bn2,'xn3':bn3,'xn4':bn4,'xn5':bn5,'xn6':bn6,'xn7':bn7,'xn8':bn8,'xn9':bn9,'xn10':bn10,'xn11':bn11,'xn12':bn12,'xn13':bn13,'xn14':bn14,'xn15':bn15 }
function imgSrc(name) { return imgMap[name.replace('.png','')] || bn1 }

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
    { t:'探索AI的无限可能',sub:'加入墨学AI世界 · 发现精彩内容 · 无限创作',color:'#00d4ff',img:'xn1.png',tag:'热门推荐' },
    { t:'大模型应用开发实战',sub:'凌风老师 · 从Prompt到Agent全流程 · 已更新40课时',color:'#8b5cf6',img:'xn4.png',tag:'AI技术' },
    { t:'《论语》精读系列',sub:'墨韵先生带你读懂儒家经典 · 20讲完整版',color:'#fbbf24',img:'xn3.png',tag:'人文经典' },
    { t:'Python数据科学从零到精通',sub:'程远老师 · 32课时系统课程 · 实战项目驱动',color:'#3b82f6',img:'xn2.png',tag:'编程开发' },
]
const bannerIdx = ref(0)

// Videos
const videos = [
    { id:1,t:'深度学习入门：从感知机到Transformer',a:'凌风',v:128000,d:'32:15',img:'xn4.png',cat:'AI技术',video:mediaVideo,time:'2小时前' },
    { id:2,t:'《道德经》与现代生活哲学',a:'清虚先生',v:89000,d:'24:08',img:'xn5.png',cat:'人文历史',video:mediaVideo,time:'5小时前' },
    { id:3,t:'Rust异步编程实战指南',a:'无极',v:67000,d:'45:30',img:'xn6.png',cat:'编程开发',video:mediaVideo,time:'昨天' },
    { id:4,t:'颜体楷书基本笔画精讲',a:'砚田墨香',v:45000,d:'18:22',img:'xn7.png',cat:'艺术设计',video:mediaVideo,time:'昨天' },
    { id:5,t:'Kubernetes集群运维实战',a:'程远',v:92000,d:'56:40',img:'xn8.png',cat:'编程开发',video:mediaVideo,time:'2天前' },
    { id:6,t:'Python数据可视化进阶',a:'程远',v:78000,d:'28:15',img:'xn9.png',cat:'编程开发',video:mediaVideo,time:'3天前' },
    { id:7,t:'中国山水画技法入门',a:'丹青妙手',v:34000,d:'22:10',img:'xn10.png',cat:'艺术设计',video:mediaVideo,time:'5天前' },
    { id:8,t:'大模型Prompt工程完全指南',a:'凌风',v:156000,d:'38:45',img:'xn11.png',cat:'AI技术',video:mediaVideo,time:'1周前' },
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
        <div class="aw-banner">
            <Transition name="banner-fade" mode="out-in">
                <div :key="bannerIdx" class="aw-banner-slide">
                    <img :src="imgSrc(banners[bannerIdx].img)" alt="" class="aw-banner-cover"/>
                    <div class="aw-banner-overlay"></div>
                    <div class="aw-banner-info">
                        <span class="aw-banner-tag">{{banners[bannerIdx].tag}}</span>
                        <h1>{{banners[bannerIdx].t}}</h1>
                        <p>{{banners[bannerIdx].sub}}</p>
                        <el-button type="primary" round size="large" class="aw-banner-btn">
                            {{bannerIdx===2?'立即观看':'立即观看'}}
                        </el-button>
                    </div>
                </div>
            </Transition>
            <!-- Preview thumbnails row -->
            <div class="aw-banner-thumbs">
                <div v-for="(b,i) in banners" :key="i" class="aw-banner-thumb" :class="{active:i===bannerIdx}" @click="bannerIdx=i">
                    <img :src="imgSrc(b.img)" alt=""/>
                </div>
            </div>
        </div>
        <!-- Announcements sidebar -->
        <div class="aw-announce">
            <h3>📢 AI世界公告</h3>
            <div class="aw-announce-list">
                <div v-for="(a,i) in [{t:'AI虚拟主播大赛报名开启',d:'06-15'},{t:'新AI讲师「星尘」入驻',d:'06-14'},{t:'AI漫画创作工具2.0上线',d:'06-12'},{t:'周末AI音乐会直播预告',d:'06-10'}]" :key="i" class="aw-announce-item">
                    <span class="aw-ann-text">{{a.t}}</span>
                    <span class="aw-ann-date">{{a.d}}</span>
                </div>
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
                    <a @click="router.push('/ai-world/video/'+v.id)">更多 <el-icon><ArrowRight/></el-icon></a>
                </div>
                <div class="aw-video-grid">
                    <div v-for="v in filteredVideos" :key="v.id" class="awv-card" @click="router.push('/ai-world/video/'+v.id)">
                        <div class="awv-cover">
                            <img :src="imgSrc(v.img)" :alt="v.t"/>
                        <VideoPreview :src="v.video" :poster="imgSrc(v.img)"/>
                            <span class="awv-duration">{{v.d}}</span>
                            <span class="awv-views">{{fmtViews(v.v)}} 观看</span>
                        </div>
                        <div class="awv-info">
                            <h3>{{v.t}}</h3>
                            <p>{{v.a}}<span class="awv-time">{{v.time}}</span></p>
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
.aw-hero { margin-bottom:24px;display:flex;gap:12px; }
.aw-banner { flex:1;display:flex;flex-direction:column;gap:8px; }
.aw-banner-slide { position:relative;height:300px;border-radius:16px;overflow:hidden;background:#0a1030; }
.aw-banner-cover { width:100%;height:100%;object-fit:cover;display:block; }
.aw-banner-overlay { position:absolute;inset:0;background:linear-gradient(to top,rgba(10,16,48,.9) 0%,rgba(10,16,48,.4) 50%,rgba(10,16,48,.1) 100%); }
.aw-banner-info { position:absolute;left:0;bottom:0;padding:40px 48px;z-index:2;max-width:55%; }
.aw-banner-tag { display:inline-block;padding:3px 12px;border-radius:9999px;font-size:11px;color:#fff;background:rgba(0,212,255,.25);border:1px solid rgba(0,212,255,.35);margin-bottom:12px; }
.aw-banner-info h1 { font-family:var(--font-display);font-size:28px;font-weight:700;color:#fff;margin-bottom:8px; }
.aw-banner-info p { font-size:14px;color:rgba(255,255,255,.55);margin-bottom:20px; }
.aw-banner-btn { --el-button-bg-color:#00d4ff;--el-button-border-color:#00d4ff;--el-button-hover-bg-color:#33e0ff; }

/* Banner thumbnails */
.aw-banner-thumbs { display:flex;gap:8px; }
.aw-banner-thumb { width:80px;height:50px;border-radius:8px;overflow:hidden;cursor:pointer;opacity:.4;transition:all .2s;border:2px solid transparent;flex-shrink:0; }
.aw-banner-thumb.active { opacity:1;border-color:#00d4ff; }
.aw-banner-thumb:hover { opacity:.7; }
.aw-banner-thumb img { width:100%;height:100%;object-fit:cover; }

/* Announcements */
.aw-announce { width:240px;flex-shrink:0;background:var(--surface-glass);border:1px solid var(--border-subtle);border-radius:14px;padding:18px;display:flex;flex-direction:column; }
.aw-announce h3 { font-size:13px;color:var(--text-secondary);margin-bottom:14px;font-family:var(--font-display);letter-spacing:1px; }
.aw-announce-list { display:flex;flex-direction:column;gap:2px;flex:1; }
.aw-announce-item { display:flex;justify-content:space-between;align-items:center;padding:9px 10px;border-radius:8px;cursor:pointer;transition:background .15s; }
.aw-announce-item:hover { background:var(--surface-glass-hover); }
.aw-ann-text { font-size:12px;color:var(--text-secondary);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.aw-ann-date { font-size:10px;color:var(--text-muted);margin-left:8px;flex-shrink:0; }

.banner-fade-enter-active,.banner-fade-leave-active { transition:opacity .4s; }
.banner-fade-enter-from,.banner-fade-leave-to { opacity:0; }

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
.awv-info p { font-size:11px;color:var(--text-muted);display:flex;justify-content:space-between;align-items:center; }
.awv-time { color:var(--text-muted);font-size:10px; }

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

@media(max-width:1024px){.aw-video-grid,.aw-live-grid{grid-template-columns:repeat(2,1fr)}.aw-sidebar{display:none}.aw-announce{display:none}.aw-banner-info{padding:32px}.aw-banner-info h1{font-size:22px} }
@media(max-width:768px){.aw-video-grid,.aw-live-grid{grid-template-columns:1fr}.aw-banner-slide{height:200px}.aw-banner-info{padding:20px}.aw-banner-info h1{font-size:18px}.aw-banner-thumbs{display:none}}
</style>
