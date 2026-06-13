<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { VideoPlay, Star, ArrowRight } from '@element-plus/icons-vue'
import gsap from 'gsap'

const router = useRouter()

// ─── Sidebar categories ───
const categories = [
    { k:'all',l:'全部直播',icon:'📡',count:24,color:'#00d4ff' },
    { k:'ai',l:'AI 讲座',icon:'🤖',count:8,color:'#8b5cf6' },
    { k:'coding',l:'编程教学',icon:'💻',count:6,color:'#3b82f6' },
    { k:'art',l:'才艺表演',icon:'🎨',count:5,color:'#f472b6' },
    { k:'gaming',l:'游戏直播',icon:'🎮',count:3,color:'#fbbf24' },
    { k:'vtuber',l:'虚拟主播',icon:'🎭',count:4,color:'#22d3ee' },
    { k:'music',l:'音乐演奏',icon:'🎵',count:3,color:'#34d399' },
]
const activeCat = ref('all')

// ─── Featured stream ───
const featured = computed(() => liveData.value[0])

// ─── Live data ───
const allLive = [
    { id:1,t:'AI论文精读：Attention is All You Need',a:'凌风',w:3200,img:'xn12.png',cat:'ai',tag:'热门' },
    { id:2,t:'周末书法直播：临摹《兰亭序》',a:'砚田墨香',w:1800,img:'xn13.png',cat:'art',tag:'' },
    { id:3,t:'LeetCode周赛实时解题',a:'无极',w:2500,img:'xn14.png',cat:'coding',tag:'' },
    { id:4,t:'古琴演奏：《流水》',a:'琴心居士',w:960,img:'xn15.png',cat:'music',tag:'' },
    { id:5,t:'Python异步编程实战直播',a:'程远',w:4200,img:'xn16.png',cat:'coding',tag:'热门' },
    { id:6,t:'大模型Agent开发全流程',a:'凌风',w:3800,img:'xn4.png',cat:'ai',tag:'NEW' },
    { id:7,t:'数字绘画：赛博朋克风格',a:'丹青妙手',w:2100,img:'xn10.png',cat:'art',tag:'' },
    { id:8,t:'AI虚拟歌姬调校教学',a:'星尘',w:5600,img:'xn11.png',cat:'vtuber',tag:'热门' },
    { id:9,t:'《道德经》与现代管理',a:'清虚先生',w:1500,img:'xn5.png',cat:'ai',tag:'' },
    { id:10,t:'Rust系统编程直播课',a:'无极',w:2800,img:'xn6.png',cat:'coding',tag:'' },
    { id:11,t:'K8s集群管理实战',a:'程远',w:1900,img:'xn8.png',cat:'coding',tag:'' },
    { id:12,t:'Virtual YouTuber出道直播',a:'AI小墨',w:7800,img:'xn7.png',cat:'vtuber',tag:'热门' },
]

const liveData = computed(() => {
    if (activeCat.value === 'all') return allLive
    return allLive.filter(l => l.cat === activeCat.value)
})

import bn12 from '@/assets/imgs/xn12.png'
import bn13 from '@/assets/imgs/xn13.png'
import bn14 from '@/assets/imgs/xn14.png'
import bn15 from '@/assets/imgs/xn15.png'
import bn16 from '@/assets/imgs/xn16.png'
import bn4 from '@/assets/imgs/xn4.png'
import bn10 from '@/assets/imgs/xn10.png'
import bn11 from '@/assets/imgs/xn11.png'
import bn5 from '@/assets/imgs/xn5.png'
import bn6 from '@/assets/imgs/xn6.png'
import bn8 from '@/assets/imgs/xn8.png'
import bn7 from '@/assets/imgs/xn7.png'
const imgM = {xn12:bn12,xn13:bn13,xn14:bn14,xn15:bn15,xn16:bn16,xn4:bn4,xn10:bn10,xn11:bn11,xn5:bn5,xn6:bn6,xn8:bn8,xn7:bn7}
function imgSrc(n) { return imgM[n] || bn12 }

function fmtViews(n) { return n>=10000?(n/10000).toFixed(1)+'万':n }

function animateCards() {
    nextTick(() => {
        gsap.fromTo('.lvl-card', { opacity:0, y:20 }, { opacity:1, y:0, duration:.35, stagger:.04, ease:'power3.out' })
    })
}
onMounted(async () => { await nextTick(); animateCards() })
watch(activeCat, () => animateCards())
</script>

<template>
<div class="lvl-page">
    <!-- ═══════ LEFT SIDEBAR ═══════ -->
    <aside class="lvl-sidebar">
        <div class="lvl-side-head">
            <span class="lvl-side-live">🔴 LIVE</span>
            <span class="lvl-side-count">{{allLive.length}} 个直播间</span>
        </div>
        <nav class="lvl-side-nav">
            <button v-for="cat in categories" :key="cat.k" class="lvl-side-item"
                :class="{active:activeCat===cat.k}"
                :style="{'--cc':cat.color}"
                @click="activeCat=cat.k">
                <span class="lvl-side-icon">{{cat.icon}}</span>
                <span class="lvl-side-label">{{cat.l}}</span>
                <span class="lvl-side-num">{{cat.count}}</span>
                <span v-if="activeCat===cat.k" class="lvl-side-indicator"></span>
            </button>
        </nav>
    </aside>

    <!-- ═══════ MAIN ═══════ -->
    <main class="lvl-main">
        <!-- Featured stream -->
        <div v-if="featured" class="lvl-featured">
            <div class="lvl-feat-cover">
                <img :src="imgSrc(featured.img)" :alt="featured.t"/>
                <div class="lvl-feat-overlay"></div>
                <span class="lvl-feat-live">🔴 直播中</span>
                <span class="lvl-feat-views">{{fmtViews(featured.w)}} 观看</span>
                <div class="lvl-feat-info">
                    <span v-if="featured.tag" class="lvl-feat-tag">{{featured.tag}}</span>
                    <h2>{{featured.t}}</h2>
                    <p>{{featured.a}} · {{fmtViews(featured.w)}} 观看</p>
                    <el-button type="primary" round size="large" class="lvl-feat-btn" @click="router.push('/ai-world/live/'+featured.id)">
                        进入直播间 <el-icon class="ml-2"><ArrowRight/></el-icon>
                    </el-button>
                </div>
            </div>
        </div>

        <!-- Live grid -->
        <div class="lvl-section">
            <div class="lvl-sec-head">
                <h3>{{categories.find(c=>c.k===activeCat)?.l||'全部直播'}}</h3>
                <span class="lvl-sec-count">{{liveData.length}} 个直播间</span>
            </div>
            <div class="lvl-grid">
                <article v-for="live in liveData" :key="live.id" class="lvl-card"
                    @click="router.push('/ai-world/live/'+live.id)">
                    <div class="lvl-card-cover">
                        <img :src="imgSrc(live.img)" :alt="live.t"/>
                        <span class="lvl-card-live">🔴 LIVE</span>
                        <span class="lvl-card-views">{{fmtViews(live.w)}} 观看</span>
                        <span v-if="live.tag" class="lvl-card-tag">{{live.tag}}</span>
                    </div>
                    <div class="lvl-card-body">
                        <h4>{{live.t}}</h4>
                        <p>{{live.a}}</p>
                    </div>
                </article>
            </div>
        </div>
    </main>
</div>
</template>

<style scoped>
.lvl-page { display:flex; min-height:calc(100vh - 56px); background:var(--surface-root); }

/* ═══════ SIDEBAR ═══════ */
.lvl-sidebar { width:220px;flex-shrink:0;border-right:1px solid var(--border-subtle);padding:24px 0;display:flex;flex-direction:column; }
.lvl-side-head { padding:0 20px 20px;border-bottom:1px solid var(--border-subtle);margin-bottom:8px; }
.lvl-side-live { font-family:var(--font-display);font-size:15px;color:#f87171;font-weight:600;display:block;margin-bottom:4px; }
.lvl-side-count { font-size:11px;color:var(--text-muted); }
.lvl-side-nav { padding:8px;display:flex;flex-direction:column;gap:2px; }
.lvl-side-item { display:flex;align-items:center;gap:10px;width:100%;padding:10px 16px;border-radius:10px;background:none;border:none;color:var(--text-secondary);font-size:13px;cursor:pointer;transition:all .2s;text-align:left;position:relative; }
.lvl-side-item:hover { background:var(--surface-glass-hover);color:var(--text-primary); }
.lvl-side-item.active { background:rgba(0,212,255,.04);color:var(--text-primary); }
.lvl-side-icon { font-size:18px;flex-shrink:0; }
.lvl-side-label { flex:1; }
.lvl-side-num { font-size:11px;color:var(--text-muted);background:rgba(255,255,255,.03);padding:1px 8px;border-radius:9999px; }
.lvl-side-item.active .lvl-side-num { background:rgba(0,212,255,.1);color:#00d4ff; }
.lvl-side-indicator { position:absolute;left:0;top:12px;bottom:12px;width:3px;border-radius:0 3px 3px 0;background:var(--cc,#00d4ff); }

/* ═══════ MAIN ═══════ */
.lvl-main { flex:1;min-width:0;padding:24px 28px;overflow-y:auto; }

/* Featured */
.lvl-featured { margin-bottom:32px; }
.lvl-feat-cover { position:relative;border-radius:16px;overflow:hidden;aspect-ratio:21/9;background:var(--surface-glass); }
.lvl-feat-cover img { width:100%;height:100%;object-fit:cover; }
.lvl-feat-overlay { position:absolute;inset:0;background:linear-gradient(to top,rgba(6,11,24,.9) 0%,rgba(6,11,24,.2) 50%,rgba(6,11,24,.05) 100%); }
.lvl-feat-live { position:absolute;top:16px;left:16px;padding:4px 12px;border-radius:6px;font-size:12px;background:#f87171;color:#fff;font-weight:600; }
.lvl-feat-views { position:absolute;top:16px;right:16px;padding:4px 10px;border-radius:6px;font-size:12px;background:rgba(0,0,0,.5);color:#fff; }
.lvl-feat-info { position:absolute;left:0;bottom:0;padding:32px;z-index:2;max-width:60%; }
.lvl-feat-tag { display:inline-block;padding:3px 10px;border-radius:9999px;font-size:11px;background:rgba(0,212,255,.2);color:#00d4ff;border:1px solid rgba(0,212,255,.3);margin-bottom:10px; }
.lvl-feat-info h2 { font-family:var(--font-display);font-size:26px;font-weight:700;color:#fff;margin-bottom:6px; }
.lvl-feat-info p { font-size:14px;color:rgba(255,255,255,.5);margin-bottom:16px; }
.lvl-feat-btn { --el-button-bg-color:#00d4ff;--el-button-border-color:#00d4ff;--el-button-hover-bg-color:#33e0ff; }

/* Grid */
.lvl-section { }
.lvl-sec-head { display:flex;align-items:baseline;gap:12px;margin-bottom:20px; }
.lvl-sec-head h3 { font-family:var(--font-display);font-size:17px;color:var(--text-primary); }
.lvl-sec-count { font-size:12px;color:var(--text-muted); }
.lvl-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;min-height:400px; }
.lvl-card { cursor:pointer;transition:all .25s;opacity:0;transform:translateY(30px); }
.lvl-card:hover { transform:translateY(-4px); }
.lvl-card-cover { position:relative;aspect-ratio:16/10;border-radius:10px;overflow:hidden;background:var(--surface-glass); }
.lvl-card-cover img { width:100%;height:100%;object-fit:cover; }
.lvl-card-live { position:absolute;top:8px;left:8px;padding:2px 8px;border-radius:4px;font-size:10px;background:#f87171;color:#fff; }
.lvl-card-views { position:absolute;bottom:6px;right:6px;padding:2px 6px;border-radius:4px;font-size:11px;background:rgba(0,0,0,.7);color:#fff; }
.lvl-card-tag { position:absolute;top:8px;right:8px;padding:2px 8px;border-radius:4px;font-size:10px;background:rgba(0,212,255,.8);color:#060b18;font-weight:600; }
.lvl-card-body { padding:8px 2px; }
.lvl-card-body h4 { font-size:13px;color:var(--text-primary);line-height:1.4;margin-bottom:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
.lvl-card-body p { font-size:11px;color:var(--text-muted); }

@media(max-width:1024px){.lvl-sidebar{width:180px}.lvl-grid{grid-template-columns:repeat(2,1fr)}.lvl-feat-info h2{font-size:20px}}
@media(max-width:768px){.lvl-sidebar{display:none}.lvl-grid{grid-template-columns:1fr}.lvl-main{padding:16px}.lvl-feat-info{padding:16px}.lvl-feat-info h2{font-size:16px}}
</style>
