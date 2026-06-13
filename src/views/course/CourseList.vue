<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { Search, ArrowRight, Collection, Reading, MagicStick, Monitor, DataAnalysis, Cpu, Star } from '@element-plus/icons-vue'
import gsap from 'gsap'

const searchQuery = ref('')
const activeCat = ref('all')
const currentPage = ref(1)
const pageSize = 6

const cats = [
    { k:'all',l:'全部',icon:Collection,n:32 },
    { k:'humanities',l:'人文通识',icon:Reading,n:12 },
    { k:'arts',l:'艺术修养',icon:MagicStick,n:8 },
    { k:'tech',l:'技术实践',icon:Monitor,n:10 },
    { k:'ai',l:'AI 前沿',icon:Cpu,n:6 },
]

const allCourses = [
    { id:1,cat:'humanities',t:'《论语》精读二十讲',a:'墨韵先生',r:'国学院教授',n:12580,rt:4.9,p:'免费',lv:'入门',d:'20课时',img:'https://picsum.photos/seed/c1/800/500',w:800,h:500,tg:['经典','儒家'] },
    { id:2,cat:'tech',t:'Python 数据科学实战',a:'程远',r:'前阿里P8算法专家',n:8960,rt:4.8,p:'¥299',lv:'进阶',d:'32课时',img:'https://picsum.photos/seed/c2/800/500',w:800,h:500,tg:['Python','数据'] },
    { id:3,cat:'arts',t:'颜体楷书入门到精通',a:'砚田墨香',r:'中书协会员',n:5680,rt:4.9,p:'免费',lv:'入门',d:'16课时',img:'https://picsum.photos/seed/c3/800/500',w:800,h:500,tg:['书法','楷书'] },
    { id:4,cat:'ai',t:'大模型应用开发实战',a:'凌风',r:'AI Lab 负责人',n:11200,rt:4.7,p:'¥499',lv:'高级',d:'40课时',img:'https://picsum.photos/seed/c4/800/500',w:800,h:500,tg:['LLM','Agent'] },
    { id:5,cat:'humanities',t:'史记与历史思维',a:'司马清风',r:'历史学博士',n:4320,rt:4.8,p:'¥199',lv:'进阶',d:'24课时',img:'https://picsum.photos/seed/c5/800/500',w:800,h:500,tg:['历史','史记'] },
    { id:6,cat:'tech',t:'全栈 Web 开发训练营',a:'无极',r:'全栈架构师',n:15600,rt:4.9,p:'¥399',lv:'入门',d:'48课时',img:'https://picsum.photos/seed/c6/800/500',w:800,h:500,tg:['Vue','Node'] },
    { id:7,cat:'humanities',t:'《道德经》导读',a:'清虚先生',r:'哲学博士',n:3890,rt:4.7,p:'免费',lv:'入门',d:'12课时',img:'https://picsum.photos/seed/c7/800/500',w:800,h:500,tg:['哲学','道家'] },
    { id:8,cat:'tech',t:'深度学习与神经网络',a:'凌风',r:'AI Lab 负责人',n:7820,rt:4.6,p:'¥599',lv:'高级',d:'36课时',img:'https://picsum.photos/seed/c8/800/500',w:800,h:500,tg:['AI','深度学习'] },
    { id:9,cat:'arts',t:'水墨山水画技法',a:'丹青妙手',r:'国画大师',n:2340,rt:4.8,p:'¥299',lv:'进阶',d:'20课时',img:'https://picsum.photos/seed/c9/800/500',w:800,h:500,tg:['国画','山水'] },
    { id:10,cat:'ai',t:'Prompt 工程实战',a:'程远',r:'AI研究员',n:5680,rt:4.5,p:'¥199',lv:'进阶',d:'16课时',img:'https://picsum.photos/seed/c10/800/500',w:800,h:500,tg:['Prompt','LLM'] },
    { id:11,cat:'humanities',t:'中国哲学简史',a:'墨韵先生',r:'国学院教授',n:2100,rt:4.9,p:'免费',lv:'入门',d:'18课时',img:'https://picsum.photos/seed/c11/800/500',w:800,h:500,tg:['哲学','历史'] },
    { id:12,cat:'tech',t:'Vue 3 源码解析',a:'无极',r:'全栈架构师',n:3450,rt:4.8,p:'¥399',lv:'高级',d:'28课时',img:'https://picsum.photos/seed/c12/800/500',w:800,h:500,tg:['Vue','前端'] },
]

const filtered = computed(() => {
    let list = activeCat.value === 'all' ? allCourses : allCourses.filter(c => c.cat === activeCat.value)
    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase()
        list = list.filter(c => c.t.includes(q) || c.a.includes(q) || c.tg.some(t => t.toLowerCase().includes(q)))
    }
    return list
})

const totalPages = computed(() => Math.ceil(filtered.value.length / pageSize))
const paged = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return filtered.value.slice(start, start + pageSize)
})

function imgLoad(e) { e.target.classList.add('loaded') }
function cardIn(_,el) { gsap.to(el, { y: -6, duration: .3, ease: 'power3.out' }) }
function cardOut(_,el) { gsap.to(el, { y: 0, duration: .2, ease: 'power2.in' }) }

onMounted(async () => {
    await nextTick()
    gsap.fromTo('.cl-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .5, stagger: .06, ease: 'power3.out' })
})
</script>

<template>
<div class="cl-page">
    <!-- Header -->
    <div class="cl-hero">
        <h1 class="cl-title">全部课程</h1>
        <p class="cl-sub">跨学科精选 · 从经典到前沿 · {{ allCourses.length }} 门课程</p>
        <!-- Search -->
        <div class="cl-search-row">
            <el-input v-model="searchQuery" size="large" placeholder="搜索课程、讲师…" :prefix-icon="Search" autocomplete="off" class="cl-search" />
        </div>
    </div>

    <!-- Category filter -->
    <div class="cl-cats">
        <button v-for="c in cats" :key="c.k" class="cl-cat-chip" :class="{active:activeCat===c.k}" @click="activeCat=c.k;currentPage=1">
            <el-icon class="cat-ic" aria-hidden="true"><component :is="c.icon"/></el-icon>
            <span>{{c.l}}</span>
            <span class="cat-n">{{c.n}}</span>
        </button>
    </div>

    <!-- Course grid -->
    <div class="cl-grid">
        <article v-for="c in paged" :key="c.id" class="cl-card" tabindex="0"
            @mouseenter="cardIn($event,$event.currentTarget)"
            @mouseleave="cardOut($event,$event.currentTarget)">
            <div class="cl-cover">
                <img :src="c.img" :alt="c.t" :width="c.w" :height="c.h" loading="lazy" decoding="async" @load="imgLoad"/>
                <span class="cl-badge cl-lv">{{c.lv}}</span>
                <span class="cl-badge" :class="c.p==='免费'?'cl-free':'cl-paid'">{{c.p}}</span>
            </div>
            <div class="cl-body">
                <div class="cl-tags"><span v-for="tg in c.tg" :key="tg" class="cl-tag">{{tg}}</span></div>
                <h3 class="cl-card-title">{{c.t}}</h3>
                <p class="cl-auth"><span>{{c.a}}</span><span class="cl-role">{{c.r}}</span></p>
                <div class="cl-foot">
                    <span class="cl-rating"><el-icon><Star/></el-icon>{{c.rt}}</span>
                    <span>{{c.n.toLocaleString()}} 学员</span>
                    <span class="tabular-nums">{{c.d}}</span>
                </div>
            </div>
        </article>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages>1" class="cl-pager">
        <button :disabled="currentPage===1" @click="currentPage--">上一页</button>
        <span v-for="p in totalPages" :key="p" class="cl-page-btn" :class="{active:p===currentPage}" @click="currentPage=p">{{p}}</span>
        <button :disabled="currentPage===totalPages" @click="currentPage++">下一页</button>
    </div>
</div>
</template>

<style scoped>
.cl-page { max-width:1200px; margin:0 auto; padding:60px 28px 80px; }

/* Hero */
.cl-hero { text-align:center; padding:40px 0 0; }
.cl-title { font-family:var(--font-display); font-size:36px; font-weight:700; color:var(--text-primary); margin-bottom:12px; }
.cl-sub { color:var(--text-muted); font-size:15px; margin-bottom:28px; }
.cl-search-row { max-width:480px; margin:0 auto; }
.cl-search { --el-input-bg-color:var(--surface-glass); --el-input-border-color:var(--border-default); --el-input-hover-border-color:var(--border-emphasis); --el-input-focus-border-color:#00d4ff; --el-input-text-color:var(--text-primary); --el-input-placeholder-color:var(--text-muted); }
.cl-search :deep(.el-input__wrapper) { border-radius:14px!important; height:48px!important; }

/* Category chips */
.cl-cats { display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin:36px 0; }
.cl-cat-chip { display:inline-flex;align-items:center;gap:8px;padding:9px 20px;background:var(--surface-glass);border:1px solid var(--border-subtle);border-radius:9999px;cursor:pointer;color:var(--text-secondary);font-size:14px;transition:all .25s;outline:none; }
.cl-cat-chip:focus-visible{outline:2px solid #00d4ff;outline-offset:2px}
.cl-cat-chip.active,.cl-cat-chip:hover{border-color:rgba(0,212,255,.35);color:var(--text-primary);background:rgba(0,212,255,.04);box-shadow:0 0 24px rgba(0,212,255,.06)}
.cat-ic{font-size:15px;flex-shrink:0}
.cat-n{font-size:11px;color:var(--text-muted);min-width:20px;text-align:right;font-variant-numeric:tabular-nums;padding:1px 6px;border-radius:9999px;background:rgba(255,255,255,.02)}

/* Grid */
.cl-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:28px; margin-bottom:48px; }
.cl-card { border-radius:16px;overflow:hidden;cursor:pointer;background:var(--surface-glass);border:1px solid var(--border-subtle);transition:all .3s;outline:none;touch-action:manipulation;opacity:0;transform:translateY(40px); }
.cl-card:focus-visible{outline:2px solid #00d4ff;outline-offset:2px}
.cl-card:hover{border-color:rgba(0,212,255,.2);box-shadow:0 20px 60px rgba(0,0,0,.45)}
.cl-cover{position:relative;aspect-ratio:800/500;overflow:hidden;background:var(--surface-glass)}
.cl-cover img{width:100%;height:100%;object-fit:cover;transition:transform .6s,opacity .5s;opacity:0}
.cl-cover img.loaded{opacity:1}
.cl-card:hover .cl-cover img{transform:scale(1.04)}
.cl-badge{position:absolute;top:14px;padding:3px 12px;border-radius:9999px;font-size:11px;z-index:2}
.cl-lv{left:14px;background:rgba(6,9,24,.7);backdrop-filter:blur(8px);color:var(--text-primary);border:1px solid rgba(255,255,255,.08)}
.cl-free{right:14px;background:rgba(52,211,153,.08);color:#34d399;border:1px solid rgba(52,211,153,.15)}
.cl-paid{right:14px;background:rgba(0,212,255,.12);color:#00d4ff;font-weight:600;border:1px solid rgba(0,212,255,.2)}
.cl-body{padding:20px 20px 24px}
.cl-tags{display:flex;gap:6px;margin-bottom:12px}
.cl-tag{padding:3px 10px;background:rgba(0,212,255,.05);border-radius:4px;font-size:11px;color:rgba(0,212,255,.75);border:1px solid rgba(0,212,255,.06)}
.cl-card-title{font-size:16px;color:var(--text-primary);font-weight:500;margin-bottom:10px;line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.cl-auth{display:flex;gap:8px;align-items:baseline;margin-bottom:16px;font-size:13px;color:var(--text-primary)}
.cl-role{font-size:11px;color:var(--text-muted)}
.cl-foot{display:flex;gap:16px;padding-top:14px;border-top:1px solid var(--border-subtle);font-size:12px;color:var(--text-muted);align-items:center}
.cl-rating{display:inline-flex;align-items:center;gap:4px;color:#fbbf24;font-weight:500}

/* Pagination */
.cl-pager{display:flex;justify-content:center;align-items:center;gap:8px}
.cl-pager button,.cl-page-btn{padding:8px 16px;border-radius:8px;border:1px solid var(--border-subtle);background:var(--surface-glass);color:var(--text-secondary);font-size:14px;cursor:pointer;transition:all .2s}
.cl-pager button:hover,.cl-page-btn:hover{border-color:rgba(0,212,255,.3);color:var(--text-primary)}
.cl-page-btn.active{background:rgba(0,212,255,.1);border-color:#00d4ff;color:#00d4ff}
.cl-pager button:disabled{opacity:.3;cursor:not-allowed}

@media(max-width:1024px){.cl-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.cl-grid{grid-template-columns:1fr}.cl-page{padding:40px 16px 60px}.cl-title{font-size:28px}}
</style>
