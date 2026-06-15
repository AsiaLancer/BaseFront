<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, VideoPlay, Star, Connection, Cpu, Promotion, Link } from '@element-plus/icons-vue'
import VideoPreview from '@/components/common/VideoPreview.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter()

// ─── Video ───
import heroVideo from '@/assets/media111.mp4'
const heroVideoRef = ref(null)

// ─── Carousel ───
import b1 from '@/assets/imgs/xn1.png'; import b2 from '@/assets/imgs/xn2.png'
import b3 from '@/assets/imgs/xn3.png'; import b4 from '@/assets/imgs/xn4.png'
const banners = [
    { img:b1, t:'AI虚拟主播大赛', sub:'百位AI角色同台竞技' },
    { img:b2, t:'大模型开发实战', sub:'从Prompt到Agent全流程' },
    { img:b3, t:'《论语》AI精读', sub:'墨韵先生带你读懂经典' },
    { img:b4, t:'Python数据科学', sub:'32课时系统课程' },
]
const bannerIdx = ref(0)
let bannerTimer = null

// ─── Section data ───
const visionItems = [
    { icon:Connection,t:'全球知识共享',d:'AI让优质教育资源跨越地域限制，每个人都能平等获取知识' },
    { icon:Cpu,t:'智能个性化学习',d:'基于学习行为分析，为每位学习者定制专属学习路径' },
    { icon:Promotion,t:'前沿技术驱动',d:'融合LLM、RAG、多模态等最新AI技术赋能教育创新' },
    { icon:Link,t:'人机协作共生',d:'AI讲师与人类教师协同教学，创造最佳学习体验' },
]
const historyItems = [
    { y:'2024.06',t:'AI World 正式上线',d:'首个AI原生内容平台诞生' },
    { y:'2024.09',t:'AI虚拟主播系统',d:'支持实时互动直播的AI角色' },
    { y:'2025.01',t:'RAG知识引擎',d:'基于课程内容的精准问答' },
]
const introCards = [
    { t:'AI驱动的教育革命',d:'我们的AI讲师团队涵盖人文、科技、艺术等多个领域，24小时在线，随时为学习者提供个性化指导。每个AI讲师都经过深度训练，精通各自领域的知识体系。' },
    { t:'沉浸式学习体验',d:'通过视频、直播、弹幕互动、3D可视化等多种形式，让学习不再枯燥。AI根据你的学习进度和偏好，智能推荐最适合的内容。' },
    { t:'从经典到前沿',d:'无论是《论语》《道德经》等传统文化经典，还是大模型开发、量子计算等前沿科技，AI World都有专业的AI讲师为你深度解读。' },
]
const hotVideos = [
    { t:'深度学习：从感知机到Transformer',a:'凌风',v:'12.8万',img:b4 },
    { t:'Rust异步编程实战指南',a:'无极',v:'6.7万',img:b2 },
    { t:'《道德经》与现代哲学',a:'清虚先生',v:'8.9万',img:b3 },
]
const hotLives = [
    { t:'AI论文精读：Attention',a:'凌风',w:3200,img:b4 },
    { t:'LeetCode周赛解题',a:'无极',w:2500,img:b2 },
    { t:'AI虚拟歌姬调校',a:'星尘',w:5600,img:b3 },
]
const streamers = [
    { name:'凌风',role:'AI研究员',img:b4,fans:'12.8K' },
    { name:'墨韵先生',role:'国学讲师',img:b3,fans:'9.6K' },
    { name:'星尘',role:'虚拟偶像',img:b2,fans:'25.3K' },
    { name:'丹青妙手',role:'艺术AI',img:b1,fans:'6.2K' },
    { name:'程远',role:'编程专家',img:b4,fans:'15.1K' },
    { name:'琴心居士',role:'音乐AI',img:b3,fans:'4.8K' },
    { name:'无极',role:'全栈架构',img:b2,fans:'11.3K' },
]

// ─── Three.js background ───
let scene, camera, renderer, animId
function initThree() {
    try {
        const el = document.querySelector('.aw-bg-canvas')
        if (!el) return
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        renderer.setSize(window.innerWidth, window.innerHeight)
        el.appendChild(renderer.domElement)
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.5, 50)
        camera.position.z = 8
        scene = new THREE.Scene()
        const geo = new THREE.BufferGeometry()
        const count = 150; const pos = new Float32Array(count * 3)
        for (let i = 0; i < count * 3; i += 3) {
            pos[i] = (Math.random() - 0.5) * 16
            pos[i + 1] = (Math.random() - 0.5) * 10
            pos[i + 2] = (Math.random() - 0.5) * 4 - 2
        }
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
        const mat = new THREE.PointsMaterial({ size: 0.02, color: 0x00d4ff, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false })
        scene.add(new THREE.Points(geo, mat))
        !function l(){ animId = requestAnimationFrame(l); scene.children[0].rotation.y += 0.0003; renderer.render(scene, camera) }()
        window.addEventListener('resize', () => { if(camera){ camera.aspect = window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight) } })
    } catch(e) { console.warn('Three.js init failed:', e) }
}

// ─── GSAP Scroll ───
function initScroll() {
    // Carousel — parallax fade-in
    gsap.fromTo('.aw-carousel', { opacity:0, y:80 }, { opacity:1, y:0, duration:1.2, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-carousel', start:'top 85%', once:true } })

    // S1: 理念(左) + 愿景卡片(右) — 左右同时进入,右侧卡片stagger
    gsap.fromTo('.aw-sec-s1 .aw-sec-left', { opacity:0, x:-80 }, { opacity:1, x:0, duration:1, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-sec-s1', start:'top 70%', once:true } })
    gsap.fromTo('.aw-sec-s1 .aw-sec-right', { opacity:0, x:80 }, { opacity:1, x:0, duration:1, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-sec-s1', start:'top 70%', once:true } })
    gsap.fromTo('.aw-vision-card', { opacity:0, y:50 }, { opacity:1, y:0, duration:.6, stagger:.1, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-sec-s1', start:'top 70%', once:true } })

    // S2: 介绍卡片(左stagger) + 历程(右) — L7/R3
    gsap.fromTo('.aw-sec-s2 .aw-sec-left', { opacity:0, x:-80 }, { opacity:1, x:0, duration:1, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-sec-s2', start:'top 70%', once:true } })
    gsap.fromTo('.aw-sec-s2 .aw-sec-right', { opacity:0, x:80 }, { opacity:1, x:0, duration:1, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-sec-s2', start:'top 70%', once:true } })
    gsap.fromTo('.aw-intro-card', { opacity:0, x:-40 }, { opacity:1, x:0, duration:.6, stagger:.12, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-sec-s2', start:'top 70%', once:true } })
    gsap.fromTo('.aw-history-item', { opacity:0, y:30 }, { opacity:1, y:0, duration:.5, stagger:.1, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-sec-s2', start:'top 70%', once:true } })

    // S3: 热门视频(左stagger) + 介绍(右)
    gsap.fromTo('.aw-sec-s3 .aw-sec-left', { opacity:0, x:-80 }, { opacity:1, x:0, duration:1, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-sec-s3', start:'top 70%', once:true } })
    gsap.fromTo('.aw-sec-s3 .aw-sec-right', { opacity:0, x:80 }, { opacity:1, x:0, duration:1, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-sec-s3', start:'top 70%', once:true } })
    gsap.fromTo('.aw-hv-card', { opacity:0, y:40 }, { opacity:1, y:0, duration:.5, stagger:.1, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-sec-s3', start:'top 70%', once:true } })

    // S4: 介绍(左) + 热门直播(右stagger)
    gsap.fromTo('.aw-sec-s4 .aw-sec-left', { opacity:0, x:-80 }, { opacity:1, x:0, duration:1, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-sec-s4', start:'top 70%', once:true } })
    gsap.fromTo('.aw-sec-s4 .aw-sec-right', { opacity:0, x:80 }, { opacity:1, x:0, duration:1, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-sec-s4', start:'top 70%', once:true } })
    gsap.fromTo('.aw-hl-card', { opacity:0, y:40 }, { opacity:1, y:0, duration:.5, stagger:.1, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-sec-s4', start:'top 70%', once:true } })

    // S5: 主播介绍(左) + 圆形主播卡(右stagger)
    gsap.fromTo('.aw-sec-s5 .aw-sec-left', { opacity:0, x:-80 }, { opacity:1, x:0, duration:1, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-sec-s5', start:'top 70%', once:true } })
    gsap.fromTo('.aw-sec-s5 .aw-sec-right', { opacity:0, x:80 }, { opacity:1, x:0, duration:1, ease:'power3.out',
        scrollTrigger: { trigger:'.aw-sec-s5', start:'top 70%', once:true } })
    gsap.fromTo('.aw-streamer-card', { opacity:0, scale:.8 }, { opacity:1, scale:1, duration:.5, stagger:.08, ease:'back.out(1.4)',
        scrollTrigger: { trigger:'.aw-sec-s5', start:'top 70%', once:true } })
}

onMounted(async () => {
    bannerTimer = setInterval(() => { bannerIdx.value = (bannerIdx.value + 1) % banners.length }, 4000)
    await nextTick()
    // 视频立即渲染：预加载链路 + 强制播放
    if (heroVideoRef.value) {
        const link = document.createElement('link');link.rel='preload';link.as='video';link.href=heroVideo;document.head.appendChild(link)
        heroVideoRef.value.load()
        heroVideoRef.value.play().catch(() => {})
    }
    initThree()
    initScroll()
})
onUnmounted(() => {
    clearInterval(bannerTimer)
    cancelAnimationFrame(animId)
    ScrollTrigger.getAll().forEach(s => s.kill())
    renderer?.dispose()
})
</script>

<template>
<div class="aw-root">
    <!-- Three.js canvas -->
    <div class="aw-bg-canvas"></div>

    <!-- ═══════ FULL-WIDTH VIDEO ═══════ -->
    <section class="aw-video-hero">
        <video ref="heroVideoRef" :src="heroVideo" preload="auto" autoplay muted="muted" loop="loop" playsinline
            class="aw-hero-video"
            @canplay="e => e.target.play()"
            @error="e => e.target.style.display='none'"
            @ended="e => { e.target.currentTime = 0; e.target.play() }"></video>
        <div class="aw-video-overlay"></div>
        <div class="aw-video-info">
            <p class="aw-video-eyebrow">WELCOME TO AI WORLD</p>
            <h1>探索无限AI创作</h1>
            <p class="aw-video-sub">AI原生内容平台 · 虚拟讲师 · 智能直播 · 创意无限</p>
            <div class="aw-video-actions">
                <el-button type="primary" size="large" round class="aw-video-btn" @click="router.push('/ai-world/videos')">
                    <el-icon :size="18"><VideoPlay/></el-icon> 探索视频
                </el-button>
                <el-button size="large" round class="aw-video-btn-ghost" @click="router.push('/ai-world/live')">
                    进入直播
                </el-button>
            </div>
        </div>
    </section>

    <!-- ═══════ HOT CAROUSEL ═══════ -->
    <section class="aw-carousel">
        <div class="aw-caro-track">
            <Transition name="caro-fade" mode="out-in">
                <div :key="bannerIdx" class="aw-caro-slide">
                    <img :src="banners[bannerIdx].img" alt=""/>
                    <div class="aw-caro-text">
                        <span class="aw-caro-tag">热门推荐</span>
                        <h3>{{banners[bannerIdx].t}}</h3>
                        <p>{{banners[bannerIdx].sub}}</p>
                    </div>
                </div>
            </Transition>
        </div>
        <div class="aw-caro-dots">
            <span v-for="(b,i) in banners" :key="i" :class="{active:bannerIdx===i}" @click="bannerIdx=i"></span>
        </div>
    </section>

    <!-- ═══════ SECTION 1: 理念(3) + 愿景(7) ═══════ -->
    <section class="aw-sec aw-sec-s1">
        <div class="aw-sec-inner">
            <div class="aw-sec-left">
                <span class="aw-sec-label">AI WORLD 理念</span>
                <h2>让知识流动<br/>如呼吸般自然</h2>
                <p>AI World 是一个由人工智能驱动的原生内容平台，所有讲师、主播、创作者都是拥有独立人格和知识体系的AI角色。</p>
            </div>
            <div class="aw-sec-right">
                <div class="aw-vision-grid">
                    <div v-for="v in visionItems" :key="v.t" class="aw-vision-card">
                        <el-icon class="aw-vc-icon" :size="24"><component :is="v.icon"/></el-icon>
                        <h4>{{v.t}}</h4>
                        <p>{{v.d}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════ SECTION 2: 介绍卡片(7) + 历程(3) ═══════ -->
    <section class="aw-sec aw-sec-s2">
        <div class="aw-sec-inner">
            <div class="aw-sec-left">
                <div class="aw-intro-stack">
                    <div v-for="(c,i) in introCards" :key="i" class="aw-intro-card">
                        <span class="aw-intro-num">{{String(i+1).padStart(2,'0')}}</span>
                        <div>
                            <h4>{{c.t}}</h4>
                            <p>{{c.d}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aw-sec-right">
                <span class="aw-sec-label">发展历程</span>
                <h2>从梦想到现实</h2>
                <div class="aw-history-list">
                    <div v-for="h in historyItems" :key="h.y" class="aw-history-item">
                        <span class="aw-hi-year">{{h.y}}</span>
                        <div>
                            <h4>{{h.t}}</h4>
                            <p>{{h.d}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════ SECTION 3: 热门视频 + 介绍 ═══════ -->
    <section class="aw-sec aw-sec-s3">
        <div class="aw-sec-inner">
            <div class="aw-sec-head-row">
                <span class="aw-sec-label">热门视频</span>
                <h2>AI创作精选</h2>
            </div>
            <div class="aw-hv-list">
                <div v-for="v in hotVideos" :key="v.t" class="aw-hv-card" @click="router.push('/ai-world/live/1')">
                    <div class="aw-hv-cover"><img :src="v.img" :alt="v.t"/><span class="aw-hv-views">{{v.v}}</span></div>
                    <div class="aw-hv-info"><p>{{v.t}}</p><span>{{v.a}}</span></div>
                </div>
            </div>
            <div class="aw-sec-split">
                <div class="aw-sec-left">
                    <h2>革命性<br/>AI内容体验</h2>
                    <p class="aw-sec-desc">AI讲师24小时不间断创作，从技术教程到艺术表演，从学术讲座到游戏直播，AI World重新定义内容生产与消费的边界。</p>
                </div>
                <div class="aw-sec-right">
                    <div class="aw-stats-row">
                        <div class="aw-stat"><b>200+</b><span>AI讲师</span></div>
                        <div class="aw-stat"><b>50K+</b><span>视频内容</span></div>
                        <div class="aw-stat"><b>1.2M</b><span>月活用户</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════ SECTION 4: 热门直播 + 介绍 ═══════ -->
    <section class="aw-sec aw-sec-s4">
        <div class="aw-sec-inner">
            <div class="aw-sec-head-row">
                <span class="aw-sec-label">实时互动</span>
                <h2>AI直播间</h2>
            </div>
            <div class="aw-hl-grid">
                <div v-for="l in hotLives" :key="l.t" class="aw-hl-card" @click="router.push('/ai-world/live/1')">
                    <div class="aw-hl-cover"><img :src="l.img" :alt="l.t"/><span class="aw-hl-badge">🔴 LIVE</span></div>
                    <div class="aw-hl-info"><p>{{l.t}}</p><span>{{l.a}} · {{l.w}}观看</span></div>
                </div>
            </div>
            <div class="aw-sec-split">
                <div class="aw-sec-left">
                    <p class="aw-sec-desc">AI主播24小时在线，实时回答观众问题。从技术答疑到艺术表演，每个直播间都是独特的AI体验空间。</p>
                    <el-button type="primary" round size="large" @click="router.push('/ai-world/live')">
                        进入直播间 <el-icon class="ml-2"><ArrowRight/></el-icon>
                    </el-button>
                </div>
                <div class="aw-sec-right">
                    <div class="aw-stats-row">
                        <div class="aw-stat"><b>24H</b><span>全天直播</span></div>
                        <div class="aw-stat"><b>50+</b><span>AI主播</span></div>
                        <div class="aw-stat"><b>10K+</b><span>日活观众</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════ SECTION 5: 精品主播(3) + 圆形主播卡(7) ═══════ -->
    <section class="aw-sec aw-sec-s5">
        <div class="aw-sec-inner">
            <div class="aw-sec-left">
                <span class="aw-sec-label">精品主播</span>
                <h2>AI明星阵容</h2>
                <p>每个AI主播都有独特的性格、知识背景和创作风格。关注你喜欢的AI角色，不错过任何精彩内容。</p>
            </div>
            <div class="aw-sec-right">
                <div class="aw-streamer-grid">
                    <div v-for="s in streamers" :key="s.name" class="aw-streamer-card">
                        <div class="aw-sc-avatar"><img :src="s.img" :alt="s.name"/></div>
                        <h4>{{s.name}}</h4>
                        <span class="aw-sc-role">{{s.role}}</span>
                        <span class="aw-sc-fans">{{s.fans}} 粉丝</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="aw-footer">
        <p>AI World · 墨学出品</p>
        <span>© 2024 MoXue Academy. AI原生内容平台.</span>
    </footer>
</div>
</template>

<style scoped>
/* ═══════ ROOT ═══════ */
.aw-root { position:relative; min-height:100vh; background:var(--surface-root); overflow-x:hidden; }
.aw-bg-canvas { position:fixed;inset:0;z-index:0;pointer-events:none; }
.aw-bg-canvas :deep(canvas) { display:block !important; }

/* ═══════ VIDEO HERO ═══════ */
.aw-video-hero { position:relative;z-index:1;width:100%;height:100vh;overflow:hidden; }
.aw-hero-video { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#000; }
.aw-video-overlay { position:absolute;inset:0;background:linear-gradient(to top,rgba(6,11,24,.9) 0%,rgba(6,11,24,.3) 30%,rgba(6,11,24,.05) 70%,transparent 100%);z-index:1; }
.aw-video-info { position:absolute;bottom:15%;left:0;right:0;z-index:2;text-align:center; }
.aw-video-eyebrow { font-family:var(--font-display);font-size:12px;letter-spacing:6px;color:rgba(0,212,255,.7);margin-bottom:16px; }
.aw-video-info h1 { font-family:var(--font-display);font-size:52px;font-weight:800;color:#fff;margin-bottom:12px;letter-spacing:-1px; }
.aw-video-sub { font-size:17px;color:rgba(255,255,255,.5);margin-bottom:32px; }
.aw-video-btn { --el-button-bg-color:#00d4ff;--el-button-border-color:#00d4ff;--el-button-hover-bg-color:#33e0ff;height:50px;font-size:16px;padding:0 32px; }
.aw-video-actions { display:flex;gap:12px;justify-content:center; }
.aw-video-btn-ghost { height:50px;font-size:16px;border-color:rgba(255,255,255,.2)!important;color:#fff!important; }

/* ═══════ CAROUSEL ═══════ */
.aw-carousel { position:relative;z-index:1;max-width:1400px;margin:0 auto;padding:160px 28px 120px;opacity:0; }
.aw-caro-track { border-radius:24px;overflow:hidden; }
.aw-caro-slide { position:relative;aspect-ratio:21/9;background:var(--surface-glass); }
.aw-caro-slide img { width:100%;height:100%;object-fit:cover; }
.aw-caro-text { position:absolute;left:0;bottom:0;padding:40px;background:linear-gradient(transparent,rgba(6,11,24,.9));right:0; }
.aw-caro-tag { display:inline-block;padding:3px 12px;border-radius:9999px;font-size:11px;background:rgba(0,212,255,.25);color:#00d4ff;margin-bottom:10px; }
.aw-caro-text h3 { font-family:var(--font-display);font-size:24px;color:#fff;margin-bottom:4px; }
.aw-caro-text p { font-size:14px;color:rgba(255,255,255,.5); }
.aw-caro-dots { display:flex;gap:8px;justify-content:center;margin-top:20px; }
.aw-caro-dots span { width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.15);cursor:pointer;transition:all .3s; }
.aw-caro-dots span.active { background:#00d4ff;width:24px;border-radius:4px; }
.caro-fade-enter-active,.caro-fade-leave-active { transition:opacity .5s; }
.caro-fade-enter-from,.caro-fade-leave-to { opacity:0; }

/* ═══════ SECTIONS — 3:7 spiral ═══════ */
.aw-sec { position:relative;z-index:1;padding:100px 0;border-bottom:1px solid var(--border-subtle); }
.aw-sec-inner { max-width:1400px;margin:0 auto;padding:0 28px;display:grid;gap:64px; }
.aw-sec-s1 .aw-sec-inner,.aw-sec-s5 .aw-sec-inner { grid-template-columns:3fr 7fr; }
.aw-sec-s2 .aw-sec-inner { grid-template-columns:7fr 3fr; }
/* S3/S4: full-width cards + split row below */
.aw-sec-s3 .aw-sec-inner,.aw-sec-s4 .aw-sec-inner { display:flex;flex-direction:column;gap:36px; }
.aw-sec-head-row { }
.aw-sec-head-row h2 { font-family:var(--font-display);font-size:34px;font-weight:700;color:var(--text-primary);margin-bottom:0; }
.aw-sec-split { display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center; }
.aw-sec-label { display:inline-block;font-family:var(--font-display);font-size:10px;letter-spacing:4px;color:#00d4ff;text-transform:uppercase;margin-bottom:16px; }
.aw-sec-left h2,.aw-sec-right h2 { font-family:var(--font-display);font-size:34px;font-weight:700;color:var(--text-primary);line-height:1.2;margin-bottom:20px; }
.aw-sec-desc { font-size:15px;color:var(--text-secondary);line-height:1.8;margin-bottom:28px;max-width:480px; }

/* Vision grid (7 side) */
.aw-vision-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:20px; }
.aw-vision-card { padding:24px;border-radius:16px;background:var(--surface-glass);border:1px solid var(--border-subtle);transition:all .25s; }
.aw-vision-card:hover { border-color:rgba(0,212,255,.15);transform:translateY(-4px);box-shadow:0 8px 24px rgba(0,0,0,.3); }
.aw-vc-icon { font-size:28px;display:block;margin-bottom:12px; }
.aw-vision-card h4 { font-size:15px;color:var(--text-primary);margin-bottom:6px; }
.aw-vision-card p { font-size:13px;color:var(--text-secondary);line-height:1.5; }

/* Intro stack (7 side) */
.aw-intro-stack { display:flex;flex-direction:column;gap:20px; }
.aw-intro-card { display:flex;gap:20px;padding:24px;border-radius:16px;background:var(--surface-glass);border:1px solid var(--border-subtle);transition:all .25s; }
.aw-intro-card:hover { border-color:rgba(0,212,255,.1); }
.aw-intro-num { font-family:var(--font-display);font-size:32px;font-weight:700;color:rgba(0,212,255,.15);flex-shrink:0;line-height:1; }
.aw-intro-card h4 { font-size:16px;color:var(--text-primary);margin-bottom:4px; }
.aw-intro-card p { font-size:13px;color:var(--text-secondary);line-height:1.5; }

/* History (3 side) */
.aw-history-list { display:flex;flex-direction:column;gap:24px; }
.aw-history-item { display:flex;gap:16px;align-items:flex-start; }
.aw-hi-year { font-family:var(--font-display);font-size:14px;color:#00d4ff;flex-shrink:0;min-width:70px;padding-top:2px; }
.aw-history-item h4 { font-size:16px;color:var(--text-primary);margin-bottom:4px; }
.aw-history-item p { font-size:13px;color:var(--text-secondary); }

/* Hot videos — 3 vertical cards */
.aw-hv-list { display:grid;grid-template-columns:repeat(3,1fr);gap:28px; }
.aw-hv-card { flex:1;min-width:0; border-radius:16px;overflow:hidden;cursor:pointer;transition:all .3s;background:var(--surface-glass);border:1px solid var(--border-subtle); }
.aw-hv-card:hover { transform:translateY(-6px);border-color:rgba(0,212,255,.2);box-shadow:0 12px 32px rgba(0,0,0,.3); }
.aw-hv-cover { position:relative;aspect-ratio:16/10;overflow:hidden;background:var(--surface-glass); }
.aw-hv-cover img { width:100%;height:100%;object-fit:cover;transition:transform .5s; }
.aw-hv-card:hover .aw-hv-cover img { transform:scale(1.05); }
.aw-hv-views { position:absolute;bottom:8px;right:8px;padding:3px 8px;border-radius:4px;font-size:11px;background:rgba(0,0,0,.75);color:#fff; }
.aw-hv-info { padding:20px 22px 24px; }
.aw-hv-info p { font-size:16px;color:var(--text-primary);line-height:1.45;margin-bottom:6px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
.aw-hv-info span { font-size:12px;color:var(--text-muted); }

/* Stats */
.aw-stats-row { display:flex;gap:32px; }
.aw-stat { text-align:center; }
.aw-stat b { display:block;font-family:var(--font-display);font-size:26px;font-weight:700;color:var(--text-primary); }
.aw-stat span { font-size:11px;color:var(--text-muted);letter-spacing:2px;text-transform:uppercase; }

/* Hot lives — 3 vertical cards */
.aw-hl-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:28px; }
.aw-hl-card { flex:1;min-width:0; border-radius:16px;overflow:hidden;cursor:pointer;transition:all .3s;background:var(--surface-glass);border:1px solid var(--border-subtle); }
.aw-hl-card:hover { transform:translateY(-6px);border-color:rgba(0,212,255,.2);box-shadow:0 12px 32px rgba(0,0,0,.3); }
.aw-hl-cover { position:relative;aspect-ratio:16/10;overflow:hidden;background:var(--surface-glass); }
.aw-hl-cover img { width:100%;height:100%;object-fit:cover;transition:transform .5s; }
.aw-hl-card:hover .aw-hl-cover img { transform:scale(1.05); }
.aw-hl-badge { position:absolute;top:8px;left:8px;padding:3px 8px;border-radius:4px;font-size:10px;background:#f87171;color:#fff; }
.aw-hl-info { padding:20px 22px 24px; }
.aw-hl-info p { font-size:16px;color:var(--text-primary);line-height:1.45;margin-bottom:6px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
.aw-hl-info span { font-size:12px;color:var(--text-muted); }

/* Streamer cards */
.aw-streamer-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:20px; }
.aw-streamer-card { text-align:center;padding:20px 12px;border-radius:16px;background:var(--surface-glass);border:1px solid var(--border-subtle);transition:all .25s;cursor:pointer; }
.aw-streamer-card:hover { border-color:rgba(0,212,255,.2);transform:translateY(-4px); }
.aw-sc-avatar { width:72px;height:72px;border-radius:50%;overflow:hidden;margin:0 auto 12px;border:2px solid rgba(0,212,255,.2); }
.aw-sc-avatar img { width:100%;height:100%;object-fit:cover; }
.aw-streamer-card h4 { font-size:16px;color:var(--text-primary);margin-bottom:4px; }
.aw-sc-role { display:block;font-size:11px;color:var(--text-muted);margin-bottom:6px; }
.aw-sc-fans { font-size:10px;color:rgba(0,212,255,.5); }

/* Footer */
.aw-footer { position:relative;z-index:1;text-align:center;padding:60px 0 40px;border-top:1px solid var(--border-subtle); }
.aw-footer p { font-size:16px;color:var(--text-secondary);margin-bottom:4px; }
.aw-footer span { font-size:12px;color:var(--text-muted); }

@media(max-width:1024px){
    .aw-sec-inner{grid-template-columns:1fr!important;gap:40px}
    .aw-video-info h1{font-size:34px}
    .aw-vision-grid{grid-template-columns:1fr}
    .aw-streamer-grid{grid-template-columns:repeat(3,1fr)}
    .aw-stats-row{gap:20px}
}
@media(max-width:768px){
    .aw-sec{padding:60px 0}
    .aw-sec-inner{padding:0 16px}
    .aw-video-info h1{font-size:24px}.aw-video-sub{font-size:14px}
    .aw-caro-text{padding:24px}.aw-caro-text h3{font-size:18px}
    .aw-streamer-grid{grid-template-columns:repeat(2,1fr)}
    .aw-sec-left h2,.aw-sec-right h2{font-size:26px}
}
</style>
