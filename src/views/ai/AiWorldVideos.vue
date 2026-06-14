<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { VideoPlay, Star, ArrowRight } from '@element-plus/icons-vue'
import VideoPreview from '@/components/common/VideoPreview.vue'
import mediaVideo from '@/assets/media111.mp4'
import gsap from 'gsap'

const router = useRouter()

// Categories
const cats = ['全部','AI技术','编程开发','人文历史','艺术设计','音乐舞蹈','游戏电竞','知识科普']
const activeCat = ref('全部')
const sortBy = ref('hot')
const sorts = [
    { k:'hot',l:'热门' },
    { k:'new',l:'最新' },
    { k:'likes',l:'最多点赞' },
    { k:'views',l:'最多播放' },
]

// Video data with varying aspect ratios for waterfall effect
const allVideos = [
    { id:1,t:'深度学习入门：从感知机到Transformer',a:'凌风',v:128000,d:'32:15',img:'xn4.png',cat:'AI技术',time:'2小时前',ratio:1.6 },
    { id:2,t:'《道德经》与现代生活哲学',a:'清虚先生',v:89000,d:'24:08',img:'xn5.png',cat:'人文历史',time:'5小时前',ratio:1.4 },
    { id:3,t:'Rust异步编程实战指南',a:'无极',v:67000,d:'45:30',img:'xn6.png',cat:'编程开发',time:'昨天',ratio:1.8 },
    { id:4,t:'颜体楷书基本笔画精讲',a:'砚田墨香',v:45000,d:'18:22',img:'xn7.png',cat:'艺术设计',time:'昨天',ratio:1.5 },
    { id:5,t:'Kubernetes集群运维实战',a:'程远',v:92000,d:'56:40',img:'xn8.png',cat:'编程开发',time:'2天前',ratio:1.7 },
    { id:6,t:'Python数据可视化进阶',a:'程远',v:78000,d:'28:15',img:'xn9.png',cat:'编程开发',time:'3天前',ratio:1.4 },
    { id:7,t:'中国山水画技法入门',a:'丹青妙手',v:34000,d:'22:10',img:'xn10.png',cat:'艺术设计',time:'5天前',ratio:1.6 },
    { id:8,t:'大模型Prompt工程完全指南',a:'凌风',v:156000,d:'38:45',img:'xn11.png',cat:'AI技术',time:'1周前',ratio:1.8 },
    { id:9,t:'Spring Boot微服务架构',a:'无极',v:112000,d:'48:20',img:'xn12.png',cat:'编程开发',time:'1周前',ratio:1.5 },
    { id:10,t:'量子计算入门',a:'文心',v:23000,d:'30:10',img:'xn13.png',cat:'知识科普',time:'2周前',ratio:1.4 },
    { id:11,t:'古筝名曲演奏教学',a:'琴心居士',v:18000,d:'20:30',img:'xn14.png',cat:'音乐舞蹈',time:'2周前',ratio:1.6 },
    { id:12,t:'AI绘画Stable Diffusion精讲',a:'凌风',v:98000,d:'35:15',img:'xn15.png',cat:'AI技术',time:'3周前',ratio:1.7 },
]

const filtered = computed(() => {
    let list = activeCat.value === '全部' ? [...allVideos] : allVideos.filter(v => v.cat === activeCat.value)
    if (sortBy.value === 'new') list.sort((a,b) => b.id - a.id)
    if (sortBy.value === 'views') list.sort((a,b) => b.v - a.v)
    return list
})

import bn4 from '@/assets/imgs/xn4.png'; import bn5 from '@/assets/imgs/xn5.png'
import bn6 from '@/assets/imgs/xn6.png'; import bn7 from '@/assets/imgs/xn7.png'
import bn8 from '@/assets/imgs/xn8.png'; import bn9 from '@/assets/imgs/xn9.png'
import bn10 from '@/assets/imgs/xn10.png'; import bn11 from '@/assets/imgs/xn11.png'
import bn12 from '@/assets/imgs/xn12.png'; import bn13 from '@/assets/imgs/xn13.png'
import bn14 from '@/assets/imgs/xn14.png'; import bn15 from '@/assets/imgs/xn15.png'
const imgs = {xn4:bn4,xn5:bn5,xn6:bn6,xn7:bn7,xn8:bn8,xn9:bn9,xn10:bn10,xn11:bn11,xn12:bn12,xn13:bn13,xn14:bn14,xn15:bn15}
function imgSrc(n) { return imgs[n] || bn4 }
function fmtViews(n) { return n>=10000?(n/10000).toFixed(1)+'万':n }

// Waterfall columns
const cols = computed(() => {
    const result = [[], [], []]
    filtered.value.forEach((v, i) => result[i % 3].push(v))
    return result
})

// Animate on category change
watch(activeCat, async () => {
    await nextTick()
    gsap.fromTo('.vwf-card', { opacity:0, y:40, scale:.95 }, { opacity:1, y:0, scale:1, duration:.5, stagger:.06, ease:'power3.out' })
})

import { watch } from 'vue'

onMounted(async () => {
    await nextTick()
    // Staggered waterfall entrance
    gsap.fromTo('.vwf-col', { opacity:0, y:60 }, { opacity:1, y:0, duration:.7, stagger:.15, ease:'power3.out' })
    gsap.fromTo('.vwf-card', { opacity:0, y:50, scale:.92 }, { opacity:1, y:0, scale:1, duration:.6, stagger:.08, ease:'back.out(1.2)', delay:.3 })
})
</script>

<template>
<div class="vwf-page">
    <!-- Category bar -->
    <div class="vwf-cats">
        <span v-for="c in cats" :key="c" class="vwf-cat" :class="{active:activeCat===c}" @click="activeCat=c">{{c}}</span>
    </div>

    <!-- Sort bar -->
    <div class="vwf-sort">
        <span class="vwf-sort-label">排序</span>
        <button v-for="s in sorts" :key="s.k" class="vwf-sort-btn" :class="{active:sortBy===s.k}" @click="sortBy=s.k">{{s.l}}</button>
    </div>

    <!-- Waterfall grid -->
    <div class="vwf-waterfall">
        <div v-for="(col, ci) in cols" :key="ci" class="vwf-col">
            <article v-for="v in col" :key="v.id" class="vwf-card"
                :style="{'--ratio':v.ratio}"
                @click="router.push('/ai-world/video/'+v.id)">
                <div class="vwf-cover">
                    <img :src="imgSrc(v.img)" :alt="v.t"/>
                    <VideoPreview :src="mediaVideo" :poster="imgSrc(v.img)"/>
                    <span class="vwf-duration">{{v.d}}</span>
                    <span class="vwf-views">{{fmtViews(v.v)}}</span>
                </div>
                <div class="vwf-body">
                    <h3>{{v.t}}</h3>
                    <p>{{v.a}}<span class="vwf-time">{{v.time}}</span></p>
                </div>
            </article>
        </div>
    </div>

    <!-- End indicator -->
    <div class="vwf-end">
        <span class="vwf-end-line"></span>
        <span class="vwf-end-text">— 已经到底了 —</span>
        <span class="vwf-end-line"></span>
    </div>
</div>
</template>

<style scoped>
.vwf-page { max-width:1400px; margin:0 auto; padding:28px 24px 60px; }

/* Category bar */
.vwf-cats { display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px; }

/* Sort */
.vwf-sort { display:flex;align-items:center;gap:6px;margin-bottom:28px; }
.vwf-sort-label { font-size:12px;color:var(--text-muted);margin-right:8px; }
.vwf-sort-btn { padding:4px 14px;border-radius:9999px;font-size:12px;color:var(--text-secondary);background:var(--surface-glass);border:1px solid transparent;cursor:pointer;transition:all .2s; }
.vwf-sort-btn:hover { color:var(--text-primary);border-color:var(--border-subtle); }
.vwf-sort-btn.active { color:#00d4ff;background:rgba(0,212,255,.06);border-color:rgba(0,212,255,.15); }

/* End */
.vwf-end { display:flex;align-items:center;justify-content:center;gap:16px;padding:48px 0; }
.vwf-end-line { flex:0 0 60px;height:1px;background:var(--border-subtle); }
.vwf-end-text { font-size:13px;color:var(--text-muted); }
.vwf-cat { padding:7px 18px;border-radius:9999px;font-size:13px;color:var(--text-secondary);cursor:pointer;transition:all .2s;background:var(--surface-glass);border:1px solid transparent; }
.vwf-cat:hover { color:var(--text-primary);border-color:var(--border-subtle); }
.vwf-cat.active { color:#00d4ff;background:rgba(0,212,255,.06);border-color:rgba(0,212,255,.2); }

/* Waterfall */
.vwf-waterfall { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
.vwf-col { display:flex;flex-direction:column;gap:20px; }
.vwf-card { border-radius:14px;overflow:hidden;cursor:pointer;transition:all .3s;background:var(--surface-glass);border:1px solid var(--border-subtle); }
.vwf-card:hover { transform:translateY(-6px);border-color:rgba(0,212,255,.2);box-shadow:0 16px 48px rgba(0,0,0,.4); }
.vwf-cover { position:relative;aspect-ratio:calc(var(--ratio,1.6));overflow:hidden;background:var(--surface-glass); }
.vwf-cover img { width:100%;height:100%;object-fit:cover;transition:transform .5s; }
.vwf-card:hover .vwf-cover img { transform:scale(1.05); }
.vwf-duration { position:absolute;bottom:8px;right:8px;padding:3px 8px;border-radius:4px;font-size:11px;background:rgba(0,0,0,.75);color:#fff; }
.vwf-views { position:absolute;bottom:8px;left:8px;padding:3px 8px;border-radius:4px;font-size:11px;background:rgba(0,0,0,.75);color:#fff; }
.vwf-body { padding:14px 16px 18px; }
.vwf-body h3 { font-size:14px;color:var(--text-primary);line-height:1.45;margin-bottom:6px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
.vwf-body p { font-size:11px;color:var(--text-muted);display:flex;justify-content:space-between; }
.vwf-time { color:var(--text-muted); }

@media(max-width:1024px){.vwf-waterfall{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.vwf-waterfall{grid-template-columns:1fr}.vwf-page{padding:16px 12px 40px}}
</style>
