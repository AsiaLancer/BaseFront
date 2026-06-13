<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Search, ArrowRight, Collection, Reading, MagicStick, Monitor, DataAnalysis, Cpu, Document, Star, ChatDotRound } from '@element-plus/icons-vue'
import LightningBolt from '@/components/three/LightningBolt.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const router = useRouter()
const userStore = useUserStore()
const logged = computed(()=>userStore.isLoggedIn)

const loading = ref(true)
const ready   = ref(false)
const active  = ref('all')
const query   = ref('')
const mx = ref(0), my = ref(0)
const catRf=ref(),crsRf=ref(),aiRf=ref(),pathRf=ref(),statRf=ref()
const nums = ref([0,0,0,0]), T=[128,86,52000,4.9]

const onMouse = e => { mx.value=(e.clientX/window.innerWidth-.5)*2; my.value=(e.clientY/window.innerHeight-.5)*2 }

const cats = [
    { k:'all',l:'全部',icon:Collection,n:128 },
    { k:'humanities',l:'人文通识',icon:Reading,n:48 },
    { k:'arts',l:'艺术修养',icon:MagicStick,n:32 },
    { k:'tech',l:'技术实践',icon:Monitor,n:36 },
    { k:'ai',l:'AI 前沿',icon:Cpu,n:12 },
]
const courses = [
    { id:1,cat:'humanities',t:'《论语》精读二十讲',a:'墨韵先生',r:'国学院教授',n:12580,rt:4.9,p:'免费',lv:'入门',d:'20课时',img:'https://picsum.photos/seed/h1/800/500',w:800,h:500,tg:['经典','儒家'] },
    { id:2,cat:'tech',t:'Python 数据科学实战',a:'程远',r:'前阿里P8算法专家',n:8960,rt:4.8,p:'¥299',lv:'进阶',d:'32课时',img:'https://picsum.photos/seed/h2/800/500',w:800,h:500,tg:['Python','数据'] },
    { id:3,cat:'arts',t:'颜体楷书入门到精通',a:'砚田墨香',r:'中书协会员',n:5680,rt:4.9,p:'免费',lv:'入门',d:'16课时',img:'https://picsum.photos/seed/h3/800/500',w:800,h:500,tg:['书法','楷书'] },
    { id:4,cat:'ai',t:'大模型应用开发实战',a:'凌风',r:'AI Lab 负责人',n:11200,rt:4.7,p:'¥499',lv:'高级',d:'40课时',img:'https://picsum.photos/seed/h4/800/500',w:800,h:500,tg:['LLM','Agent'] },
    { id:5,cat:'humanities',t:'史记与历史思维',a:'司马清风',r:'历史学博士',n:4320,rt:4.8,p:'¥199',lv:'进阶',d:'24课时',img:'https://picsum.photos/seed/h5/800/500',w:800,h:500,tg:['历史','史记'] },
    { id:6,cat:'tech',t:'全栈 Web 开发训练营',a:'无极',r:'全栈架构师',n:15600,rt:4.9,p:'¥399',lv:'入门',d:'48课时',img:'https://picsum.photos/seed/h6/800/500',w:800,h:500,tg:['Vue','Node'] },
]
const paths = [
    { id:1,t:'国学入门之路',n:8,d:'12周',icon:Document,desc:'《论语》→《道德经》→《诗经》→《周易》',s:3280,c:'#00e5ff' },
    { id:2,t:'AI 工程师培养',n:12,d:'24周',icon:Cpu,desc:'Python → ML → LLM → Agent 开发',s:5620,c:'#ffb800' },
    { id:3,t:'全栈开发者路线',n:10,d:'20周',icon:Monitor,desc:'Vue → Node → 数据库 → 云部署',s:4210,c:'#a855f7' },
    { id:4,t:'书画艺术修养',n:6,d:'8周',icon:MagicStick,desc:'书法 → 国画 → 篆刻 → 装裱鉴赏',s:1890,c:'#ff2d95' },
]
const filtered = computed(()=>active.value==='all'?courses:courses.filter(c=>c.cat===active.value))

const fl = {
    '探索':[{l:'全部课程'},{l:'学习路径'},{l:'AI 学伴'},{l:'名师团队'}],
    '分类':[{l:'人文通识'},{l:'艺术修养'},{l:'技术实践'},{l:'AI 前沿'}],
    '关于':[{l:'关于墨学'},{l:'加入我们'},{l:'帮助中心'},{l:'反馈建议'}],
    '法律':[{l:'用户协议'},{l:'隐私政策'},{l:'Cookie 政策'},{l:'京ICP备2024XXXXXX号'}],
}

function initScroll(){
    if(catRf.value) gsap.to('.cat-chip',{y:0,opacity:1,dur:.5,stagger:.05,ease:'power3.out',scrollTrigger:{trigger:catRf.value,start:'top bottom-=60',once:!0}})
    if(crsRf.value) gsap.to('.c-card',{y:0,opacity:1,dur:.6,stagger:.07,ease:'power3.out',scrollTrigger:{trigger:crsRf.value,start:'top bottom-=80',once:!0}})
    if(aiRf.value)  gsap.to('.ai-panel',{y:0,opacity:1,dur:.7,ease:'power3.out',scrollTrigger:{trigger:aiRf.value,start:'top bottom-=80',once:!0}})
    if(pathRf.value)gsap.to('.p-card',{y:0,opacity:1,dur:.5,stagger:.06,ease:'power3.out',scrollTrigger:{trigger:pathRf.value,start:'top bottom-=80',once:!0}})
    if(statRf.value)gsap.to('.stat-i',{scale:1,opacity:1,dur:.4,stagger:.1,ease:'back.out(1.4)',scrollTrigger:{trigger:statRf.value,start:'top bottom-=40',once:!0,onEnter}})
}
function onEnter(){gsap.to(nums.value,{dur:1.6,ease:'power2.out',0:T[0],1:T[1],2:T[2],3:T[3],snap:{0:1,1:1,2:1,3:.1},overwrite:!0,onUpdate(){nums.value=[...nums.value]}})}
function cardIn(_,el){gsap.to(el,{y:-6,dur:.3,ease:'power3.out'})}
function cardOut(_,el){gsap.to(el,{y:0,dur:.2,ease:'power2.in'})}
function onKey(fn){return e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fn()}}}
function imgLoad(e){e.target.classList.add('loaded')}
function go(l){
    const routes = {login:'/login',register:'/register',ai:'/course/aichat',courses:'/course/courses'}
    if(routes[l]) router.push(routes[l])
}

onMounted(async()=>{
    setTimeout(()=>loading.value=false,800)
    setTimeout(()=>{if(!ready.value)ready.value=true},1200)
    window.addEventListener('mousemove',onMouse,{passive:!0})
    await nextTick()
    try{
        gsap.timeline()
            .fromTo('.hero-title',{opacity:0,y:30},{opacity:1,y:0,dur:.8,ease:'power3.out'})
            .fromTo('.hero-desc',{opacity:0,y:20},{opacity:1,y:0,dur:.55,ease:'power3.out'},'-.45')
            .fromTo('.hero-search',{opacity:0,y:16},{opacity:1,y:0,dur:.5,ease:'power3.out'},'-.35')
            .fromTo('.hero-cta',{opacity:0,y:12},{opacity:1,y:0,dur:.45,ease:'power3.out'},'-.3')
            .add(()=>{ready.value=true},'-.1')
        await nextTick();initScroll()
    }catch(e){ready.value=true}
})
onUnmounted(()=>{window.removeEventListener('mousemove',onMouse);ScrollTrigger.getAll().forEach(s=>s.kill())})
</script>

<template>
<div class="site" :class="{ready}">

    <Transition name="load-out"><div v-if="loading" class="loader"><div class="loader-ring"></div></div></Transition>

    <LightningBolt />

    <!-- Noise grain texture -->
    <div class="noise-grain" aria-hidden="true"></div>

    <!-- Parallax shapes -->
    <div class="shapes-layer" aria-hidden="true">
        <span class="shp hexagon"  :style="{transform:`translate3d(${(mx*6).toFixed(1)}px,${(my*6).toFixed(1)}px,0)`}"></span>
        <span class="shp diamond"  :style="{transform:`translate3d(${(mx*10).toFixed(1)}px,${(my*10).toFixed(1)}px,0)`}"></span>
        <span class="shp circle"   :style="{transform:`translate3d(${(mx*14).toFixed(1)}px,${(my*14).toFixed(1)}px,0)`}"></span>
        <span class="shp dots"     :style="{transform:`translate3d(${(mx*18).toFixed(1)}px,${(my*18).toFixed(1)}px,0)`}"></span>
        <span class="shp triangle" :style="{transform:`translate3d(${(mx*24).toFixed(1)}px,${(my*24).toFixed(1)}px,0)`}"></span>
    </div>

    <!-- ═══════ HERO — Z-pattern ═══════ -->
    <section class="hero">
        <div class="hero-wrap">
            <!-- Z-LEFT: brand + title + trust -->
            <div class="hero-left">
                <p class="hero-badge"><span class="badge-dot"></span>MOXUE ACADEMY<span class="badge-dot"></span></p>
                <h1 class="hero-title">
                    <span class="ht-1">学贯古今</span>
                    <span class="ht-2">智启未来</span>
                </h1>
                <p class="hero-desc">
                    面向全龄段的通识教育平台&ensp;·&ensp;从人文经典到 AI 前沿&ensp;·&ensp;以科技重新定义学习
                </p>
                <div class="hero-trust">
                    <span class="ht-stat"><b>128+</b> 课程</span><span class="ht-dot">·</span>
                    <span class="ht-stat"><b>52K+</b> 学员</span><span class="ht-dot">·</span>
                    <span class="ht-stat"><b>4.9</b> 满意度</span>
                </div>
            </div>
            <!-- Z-RIGHT: search + CTA -->
            <div class="hero-right">
                <!-- Search card with orbiting AI button -->
                <div class="hero-search-orbit">
                    <div class="hero-search-card hero-search">
                        <el-input id="hero-search" v-model="query" size="large" placeholder="搜索课程、讲师、学习路径…" :prefix-icon="Search" autocomplete="off" spellcheck="false" class="hero-input" />
                        <el-button type="primary" size="large" round class="hero-search-btn">探索课程 <el-icon class="ml-2"><ArrowRight/></el-icon></el-button>
                    </div>
                    <!-- Orbiting AI button ring -->
                    <div class="orbit-ring" aria-hidden="true">
                        <div class="orbit-dot"></div>
                        <div class="orbit-dot"></div>
                        <div class="orbit-dot"></div>
                    </div>
                    <!-- AI button on orbit -->
                    <div class="orbit-ai-btn" v-if="logged">
                        <el-button type="primary" size="default" round @click="go('ai')" class="ai-orbit-btn">
                            <el-icon class="mr-1"><ChatDotRound/></el-icon>AI 学伴
                        </el-button>
                    </div>
                </div>
                <!-- CTA -->
                <div class="hero-cta">
                    <template v-if="!logged">
                        <el-button type="primary" size="large" round @click="go('register')">免费注册</el-button>
                        <el-button size="large" round class="hero-cta-ghost" @click="go('login')">登录已有账号</el-button>
                    </template>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════ CATEGORIES ═══════ -->
    <section ref="catRf" class="sec">
        <div class="sec-label"><span></span>学科导航<span></span></div>
        <nav class="cat-bar">
            <button v-for="c in cats" :key="c.k" class="cat-chip" :class="{active:active===c.k}"
                @click="active=c.k" @keydown="onKey(()=>active=c.k)" :aria-pressed="active===c.k" type="button">
                <el-icon class="cat-chip-ic" aria-hidden="true"><component :is="c.icon"/></el-icon>
                <span>{{c.l}}</span>
                <span class="cat-chip-n">{{c.n}}</span>
            </button>
        </nav>
    </section>

    <!-- ═══════ COURSES ═══════ -->
    <section ref="crsRf" class="sec">
        <header class="sec-head">
            <h2 class="sec-h2">精选课程<span class="sec-h2-sub"> · 跨学科精选，从经典到前沿</span></h2>
            <a class="sec-link" @click="go('courses')">全部课程 <el-icon><ArrowRight/></el-icon></a>
        </header>
        <div class="course-grid">
            <article v-for="c in filtered" :key="c.id" class="c-card" tabindex="0"
                @click="go('ai')" @keydown="onKey(()=>go('ai'))"
                @mouseenter="cardIn($event,$event.currentTarget)"
                @mouseleave="cardOut($event,$event.currentTarget)">
                <div class="cc-cover">
                    <img :src="c.img" :alt="c.t" :width="c.w" :height="c.h" loading="lazy" decoding="async" @load="imgLoad"/>
                    <span class="cc-badge cc-lv">{{c.lv}}</span>
                    <span class="cc-badge" :class="c.p==='免费'?'cc-free':'cc-paid'">{{c.p}}</span>
                </div>
                <div class="cc-body">
                    <div class="cc-tags"><span v-for="tg in c.tg" :key="tg" class="cc-tag">{{tg}}</span></div>
                    <h3 class="cc-title">{{c.t}}</h3>
                    <p class="cc-auth"><span>{{c.a}}</span><span class="cc-role">{{c.r}}</span></p>
                    <div class="cc-foot">
                        <span class="cc-rating"><el-icon><Star/></el-icon>{{c.rt}}</span>
                        <span>{{c.n.toLocaleString()}} 学员</span>
                        <span class="tabular-nums">{{c.d}}</span>
                    </div>
                </div>
            </article>
        </div>
    </section>

    <!-- ═══════ AI ═══════ -->
    <section ref="aiRf" class="sec">
        <div class="ai-panel">
            <div class="ai-visual" aria-hidden="true">
                <div class="ai-core"></div>
                <el-icon :size="42" class="ai-icon"><Cpu/></el-icon>
            </div>
            <div class="ai-content">
                <div class="sec-label left">AI 学伴</div>
                <h2 class="ai-h2">你的专属智能学习助手</h2>
                <p class="ai-p">基于大语言模型的 AI 导师，实时解答课程疑问、智能推荐学习资源、辅助编程练习。让每位学习者都拥有专属私教。</p>
                <div class="ai-feats">
                    <span v-for="(f,i) in [{c:'#00e5ff',t:'智能答疑'},{c:'#ffb800',t:'作文批改'},{c:'#a855f7',t:'资料检索'},{c:'#39ff14',t:'代码辅助'}]" :key="i" class="ai-feat" :style="{'--fc':f.c}">
                        <span class="ai-feat-dot"></span>{{f.t}}
                    </span>
                </div>
                <el-button type="primary" size="large" round @click="go('ai')">开始对话 <el-icon class="ml-2"><ChatDotRound/></el-icon></el-button>
            </div>
        </div>
    </section>

    <!-- ═══════ PATHS ═══════ -->
    <section ref="pathRf" class="sec">
        <header class="sec-head">
            <h2 class="sec-h2">学习路径<span class="sec-h2-sub"> · 结构化进阶，从入门到精通</span></h2>
        </header>
        <div class="path-grid">
            <article v-for="p in paths" :key="p.id" class="p-card" tabindex="0" @keydown="onKey(()=>{})" :style="{'--pc':p.c}">
                <div class="p-accent"></div>
                <el-icon :size="24" class="p-icon"><component :is="p.icon"/></el-icon>
                <h3 class="p-title">{{p.t}}</h3>
                <p class="p-desc">{{p.desc}}</p>
                <div class="p-meta"><b :style="{color:p.c}" class="tabular-nums">{{p.n}}</b>门 · {{p.d}} · {{p.s.toLocaleString()}}人</div>
                <div class="p-track"><div class="p-fill" :style="{width:(p.n/12*100)+'%',background:p.c}"></div></div>
                <span class="p-link">查看路径 <el-icon class="p-link-ar"><ArrowRight/></el-icon></span>
            </article>
        </div>
    </section>

    <!-- ═══════ STATS ═══════ -->
    <section ref="statRf" class="sec">
        <div class="stats-grid">
            <div v-for="(s,i) in [{l:'精选课程',u:'门',ic:Collection},{l:'合作名师',u:'位',ic:Star},{l:'在读学员',u:'+',ic:Reading},{l:'课程满意度',u:'分',ic:DataAnalysis}]" :key="i" class="stat-i">
                <span class="stat-ic"><el-icon :size="18"><component :is="s.ic"/></el-icon></span>
                <span class="stat-n">{{i===3?nums[i].toFixed(1):Math.round(nums[i]).toLocaleString()}}<small>{{s.u}}</small></span>
                <span class="stat-lab">{{s.l}}</span>
            </div>
        </div>
    </section>

    <!-- ═══════ FOOTER ═══════ -->
    <footer class="footer">
        <div class="footer-grid">
            <div class="footer-brand">
                <span class="footer-logo">MOXUE</span>
                <p>面向未来的全龄段通识教育平台。从人文经典到 AI 前沿，以科技重新定义学习。</p>
                <div class="footer-socials"><a href="#">微信</a><a href="#">微博</a><a href="#">GitHub</a></div>
            </div>
            <div v-for="(items,title) in fl" :key="title" class="footer-col">
                <h4>{{title}}</h4>
                <ul><li v-for="l in items" :key="l.l"><a href="#">{{l.l}}</a></li></ul>
            </div>
        </div>
        <div class="footer-bar"><span>© 2024 MoXue Academy</span><span>京ICP备2024XXXXXXXX号-1 | 京公网安备 110XXXXXXXX号</span></div>
    </footer>
</div>
</template>

<style scoped>
/* ═══════════════════════════════════════════
   Retro-Future · Clean · Centered
   ═══════════════════════════════════════════ */
.site { min-height:100vh; background:var(--surface-root); opacity:0; transition:opacity .5s; overflow:hidden; }
.site.ready { opacity:1; }

/* Grain texture */
.noise-grain{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px}
@media(max-width:768px){.noise-grain{display:none}}
.sec { max-width:1200px; margin:0 auto; padding:88px 28px; position:relative; z-index:1; }

/* Loader */
.loader { position:fixed; inset:0; z-index:999; display:flex; align-items:center; justify-content:center; background:var(--surface-root); }
.loader-ring { width:32px; height:32px; border:2px solid rgba(255,255,255,.06); border-top-color:#00e5ff; border-radius:50%; animation:spin .8s linear infinite; }
@keyframes spin{to{transform:rotate(360deg)}}
.load-out-leave-active{transition:opacity .3s}
.load-out-leave-to{opacity:0}

/* Parallax shapes */
.shapes-layer { position:fixed; inset:0; z-index:0; pointer-events:none; }
.shp { position:absolute; display:block; transition:transform .8s cubic-bezier(.16,1,.3,1); border:1px solid rgba(0,229,255,.06); background:rgba(0,229,255,.012); }
.hexagon { top:15%; left:8%; width:52px; height:44px; clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%); }
.diamond { top:30%; right:10%; width:34px; height:34px; transform:rotate(45deg); border-radius:3px; }
.circle  { top:55%; left:5%; width:32px; height:32px; border-radius:50%; }
.dots    { top:45%; left:50%; width:52px; height:52px; background:radial-gradient(circle,rgba(0,229,255,.08) 2px,transparent 2px); background-size:13px 13px; border:none; }
.triangle{ bottom:18%; left:12%; width:0;height:0;border-left:14px solid transparent;border-right:14px solid transparent;border-bottom:24px solid rgba(0,229,255,.025);background:transparent;border-top:none; }
@media(max-width:768px){.shapes-layer{display:none}}

/* Hero — Z-pattern */
.hero { position:relative; z-index:1; min-height:88vh; display:flex; align-items:center; padding:100px 0 80px; }
.hero-wrap { width:100%; max-width:1200px; margin:0 auto; padding:0 32px; display:flex; align-items:center; gap:64px; }
.hero-left { flex:1 1 55%; min-width:0; }
.hero-right { flex:0 0 380px; display:flex; flex-direction:column; gap:16px; }

/* Orbit container */
.hero-search-orbit { position:relative; }
.hero-search-card { position:relative; z-index:1; padding:24px; border-radius:16px; background:var(--surface-glass); border:1px solid var(--border-subtle); backdrop-filter:blur(12px); display:flex; flex-direction:column; gap:10px; }
.hero-input { flex:1; --el-input-bg-color:transparent; --el-input-border-color:transparent; --el-input-hover-border-color:transparent; --el-input-focus-border-color:transparent; --el-input-text-color:var(--text-primary); --el-input-placeholder-color:var(--text-muted); }
.hero-input :deep(.el-input__wrapper) { border-radius:12px!important; box-shadow:none!important; height:48px!important; background:transparent!important; padding-left:6px; }
.hero-search-btn { height:48px; font-size:15px; padding:0 24px; --el-button-bg-color:#00d4ff; --el-button-border-color:#00d4ff; --el-button-hover-bg-color:#33e0ff; --el-button-hover-border-color:#33e0ff; --el-button-text-color:#060b18; --el-button-hover-text-color:#060b18; }

/* Orbiting ring */
.orbit-ring { position:absolute; inset:-20px; z-index:0; pointer-events:none; border:1px dashed rgba(34,211,238,.12); border-radius:50%; animation:orbitSpin 14s linear infinite; }
.orbit-dot { position:absolute; width:4px; height:4px; border-radius:50%; background:#22d3ee; box-shadow:0 0 8px rgba(34,211,238,.5); }
.orbit-dot:nth-child(1) { top:-2px; left:50%; }
.orbit-dot:nth-child(2) { bottom:-2px; right:30%; }
.orbit-dot:nth-child(3) { top:40%; right:-2px; }
@keyframes orbitSpin { to { transform:rotate(360deg); } }

/* AI button riding the orbit */
.orbit-ai-btn { position:absolute; z-index:2; top:50%; right:-40px; transform:translateY(-50%); animation:orbitRide 14s linear infinite; }
.ai-orbit-btn {
    background:linear-gradient(135deg,#22d3ee,#a78bfa)!important;
    border:none!important; color:#080c17!important;
    animation:orbitScale 4s ease-in-out infinite;
}
@keyframes orbitRide {
    0%   { right:-50px; top:50%; z-index:2; }
    25%  { right:50%; top:-20px; z-index:0; transform:translate(-50%,-50%) scale(.85); }
    50%  { left:-50px; top:50%; z-index:2; transform:translateY(-50%) scale(1); }
    75%  { left:50%; bottom:-20px; z-index:0; transform:translate(-50%,50%) scale(.85); }
    100% { right:-50px; top:50%; z-index:2; }
}
@keyframes orbitScale {
    0%,100% { transform:scale(1); }
    50% { transform:scale(.88); }
}

.hero-cta { display:flex; gap:10px; flex-wrap:wrap; }
.hero-cta :deep(.el-button--primary) { --el-button-bg-color:#00d4ff; --el-button-border-color:#00d4ff; --el-button-hover-bg-color:#33e0ff; --el-button-hover-border-color:#33e0ff; --el-button-text-color:#060b18; --el-button-hover-text-color:#060b18; }
.hero-cta-ghost { --el-button-text-color:var(--text-secondary); height:48px; border-color:var(--border-default)!important; }
.hero-badge { display:inline-flex;align-items:center;gap:10px;margin-bottom:28px;font-family:var(--font-display);font-size:10px;letter-spacing:5px;color:rgba(0,212,255,.6);text-transform:uppercase;padding:6px 18px;border:1px solid rgba(0,212,255,.1);border-radius:9999px;background:rgba(0,212,255,.03); }
.badge-dot{width:4px;height:4px;border-radius:50%;background:#00d4ff;box-shadow:0 0 8px rgba(0,212,255,.4)}
.hero-title{margin-bottom:24px}
.ht-1{display:block;font-family:var(--font-display);font-size:56px;font-weight:800;color:var(--text-primary);line-height:1.1;letter-spacing:-1px}
.ht-2{display:block;font-family:var(--font-display);font-size:56px;font-weight:800;line-height:1.1;letter-spacing:-1px;background:linear-gradient(135deg,#00d4ff 0%,#8b5cf6 35%,#3b82f6 65%,#00d4ff 100%);background-size:200% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:accent 5s ease-in-out infinite}
@keyframes accent{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.hero-desc{font-size:16px;color:var(--text-secondary);line-height:1.8;margin-bottom:32px;max-width:480px}
.hero-trust{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text-muted)}
.ht-stat b{color:var(--text-secondary);font-family:var(--font-display);font-size:15px;margin-right:3px}
.ht-dot{color:rgba(0,212,255,.35);margin:0 8px}
.cta-ghost{--el-button-text-color:var(--text-secondary);height:48px;border-color:var(--border-default)!important}
.hero-trust{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text-muted)}
.ht-stat b{color:var(--text-secondary);font-family:var(--font-display);font-size:15px;margin-right:3px}
.ht-dot{color:rgba(0,212,255,.35);margin:0 8px}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}

/* Section shared */
.sec-label{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:24px;font-family:var(--font-display);font-size:10px;letter-spacing:4px;color:rgba(0,212,255,.45);text-transform:uppercase}
.sec-label span{flex:0 0 36px;height:1px;background:rgba(0,212,255,.1)}
.sec-label.left{justify-content:flex-start}
.sec-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:44px}
.sec-h2{font-family:var(--font-display);font-size:22px;font-weight:600;color:var(--text-primary)}
.sec-h2-sub{font-weight:400;font-size:15px;color:var(--text-muted);font-family:var(--font-body)}
.sec-link{font-size:14px;color:rgba(0,212,255,.5);text-decoration:none;display:flex;align-items:center;gap:4px;transition:color .2s}
.sec-link:hover{color:#00d4ff}

/* Categories */
.cat-bar{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.cat-chip{display:inline-flex;align-items:center;gap:8px;padding:9px 20px;background:var(--surface-glass);border:1px solid var(--border-subtle);border-radius:9999px;cursor:pointer;color:var(--text-secondary);font-size:14px;transition:all .25s;opacity:0;transform:translateY(40px);outline:none;touch-action:manipulation}
.cat-chip:focus-visible{outline:2px solid #00d4ff;outline-offset:2px}
.cat-chip.active,.cat-chip:hover{border-color:rgba(0,212,255,.35);color:var(--text-primary);background:rgba(0,212,255,.04);box-shadow:0 0 24px rgba(0,212,255,.06)}
.cat-chip-ic{font-size:15px;flex-shrink:0}
.cat-chip-n{font-size:11px;color:var(--text-muted);min-width:20px;text-align:right;font-variant-numeric:tabular-nums;padding:1px 6px;border-radius:9999px;background:rgba(255,255,255,.02)}

/* Course cards */
.course-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.c-card{border-radius:16px;overflow:hidden;cursor:pointer;background:var(--surface-glass);border:1px solid var(--border-subtle);transition:all .3s;opacity:0;transform:translateY(80px);outline:none;touch-action:manipulation}
.c-card:focus-visible{outline:2px solid #00d4ff;outline-offset:2px}
.c-card:hover{border-color:rgba(0,212,255,.25);box-shadow:var(--shadow-lg)}
.cc-cover{position:relative;aspect-ratio:800/500;overflow:hidden;background:var(--surface-glass)}
.cc-cover img{width:100%;height:100%;object-fit:cover;transition:transform .6s,opacity .5s;opacity:0}
.cc-cover img.loaded{opacity:1}
.c-card:hover .cc-cover img{transform:scale(1.04)}
.cc-badge{position:absolute;top:14px;padding:3px 12px;border-radius:9999px;font-size:11px;z-index:2}
.cc-lv{left:14px;background:rgba(6,9,24,.7);backdrop-filter:blur(8px);color:var(--text-primary);border:1px solid rgba(255,255,255,.08)}
.cc-free{right:14px;background:rgba(57,255,20,.08);color:#39ff14;border:1px solid rgba(57,255,20,.15)}
.cc-paid{right:14px;background:rgba(0,229,255,.12);color:#00e5ff;font-weight:600;border:1px solid rgba(0,229,255,.2)}
.cc-body{padding:20px 20px 24px}
.cc-tags{display:flex;gap:6px;margin-bottom:12px}
.cc-tag{padding:3px 10px;background:rgba(0,229,255,.05);border-radius:4px;font-size:11px;color:rgba(0,229,255,.75);border:1px solid rgba(0,229,255,.06)}
.cc-title{font-size:16px;color:var(--text-primary);font-weight:500;margin-bottom:10px;line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.cc-auth{display:flex;gap:8px;align-items:baseline;margin-bottom:16px;font-size:13px;color:var(--text-primary)}
.cc-role{font-size:11px;color:var(--text-muted)}
.cc-foot{display:flex;gap:16px;padding-top:14px;border-top:1px solid var(--border-subtle);font-size:12px;color:var(--text-muted);align-items:center}
.cc-rating{display:inline-flex;align-items:center;gap:4px;color:#ffb800;font-weight:500}

/* AI */
.ai-panel{display:flex;align-items:center;gap:64px;padding:56px 64px;border-radius:20px;background:var(--surface-glass);border:1px solid var(--border-subtle);opacity:0;transform:translateY(60px)}
.ai-visual{position:relative;flex-shrink:0;width:160px;height:160px;display:flex;align-items:center;justify-content:center}
.ai-core{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle,rgba(34,211,238,.05),transparent 70%);animation:corePulse 3s ease-in-out infinite}
@keyframes corePulse{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.15);opacity:1}}
.ai-icon{position:relative;z-index:1;color:#22d3ee;filter:drop-shadow(0 0 20px rgba(34,211,238,.35))}
.ai-content{flex:1;min-width:0}
.ai-h2{font-family:var(--font-display);font-size:26px;font-weight:600;color:var(--text-primary);margin-bottom:14px}
.ai-p{color:var(--text-secondary);line-height:1.8;margin-bottom:22px;font-size:14px}
.ai-feats{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px}
.ai-feat{display:flex;align-items:center;gap:8px;padding:7px 18px;background:rgba(255,255,255,.015);border:1px solid rgba(255,255,255,.04);border-radius:9999px;font-size:13px;color:var(--text-primary);transition:border-color .2s}
.ai-feat:hover{border-color:var(--fc)}
.ai-feat-dot{width:5px;height:5px;border-radius:50%;background:var(--fc);flex-shrink:0;box-shadow:0 0 6px var(--fc)}
.ai-content :deep(.el-button--primary) { --el-button-bg-color:#00d4ff; --el-button-border-color:#00d4ff; --el-button-hover-bg-color:#33e0ff; --el-button-hover-border-color:#33e0ff; --el-button-text-color:#060b18; --el-button-hover-text-color:#060b18; }

/* Paths */
.path-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
.p-card{position:relative;border-radius:14px;padding:26px;cursor:pointer;overflow:hidden;background:var(--surface-glass);border:1px solid var(--border-subtle);transition:all .3s;opacity:0;transform:translateY(60px);outline:none;touch-action:manipulation}
.p-card:focus-visible{outline:2px solid var(--pc);outline-offset:2px}
.p-card:hover{border-color:var(--pc);transform:translateY(-6px);box-shadow:0 10px 32px rgba(0,0,0,.35)}
.p-accent{position:absolute;top:0;left:0;right:0;height:3px;background:var(--pc);opacity:.35;transition:opacity .3s}
.p-card:hover .p-accent{opacity:1}
.p-icon{color:var(--pc);margin-bottom:16px}
.p-title{font-size:16px;color:var(--text-primary);font-weight:600;margin-bottom:8px}
.p-desc{font-size:12px;color:var(--text-secondary);line-height:1.6;margin-bottom:14px}
.p-meta{font-size:11px;color:var(--text-muted);margin-bottom:14px}
.p-track{height:3px;background:var(--border-subtle);border-radius:2px;margin-bottom:14px}
.p-fill{height:100%;border-radius:2px;transition:width 1.2s ease}
.p-link{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--pc);font-weight:500}
.p-link-ar{transition:transform .25s}
.p-card:hover .p-link-ar{transform:translateX(4px)}

/* Stats */
.stats-grid{display:flex;justify-content:space-around;flex-wrap:wrap;gap:40px;padding:24px 0}
.stat-i{text-align:center;opacity:0;transform:scale(.5)}
.stat-ic{display:block;margin-bottom:12px;color:rgba(0,212,255,.2)}
.stat-n{display:block;font-family:var(--font-display);font-size:48px;font-weight:700;color:var(--text-primary);line-height:1.1;font-variant-numeric:tabular-nums}
.stat-n small{font-size:18px;color:rgba(0,212,255,.4);margin-left:3px;font-weight:400}
.stat-lab{font-size:13px;color:var(--text-muted);margin-top:8px;display:block;letter-spacing:2px;text-transform:uppercase}

/* Footer */
.footer{border-top:1px solid var(--border-subtle);position:relative;z-index:1}
.footer-grid{max-width:1200px;margin:0 auto;padding:60px 28px;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr 1fr;gap:32px}
.footer-logo{font-family:var(--font-display);font-size:20px;font-weight:700;letter-spacing:4px;color:#00d4ff;display:block;margin-bottom:12px}
.footer-brand p{font-size:13px;color:var(--text-secondary);line-height:1.7;margin-bottom:16px;max-width:240px}
.footer-socials{display:flex;gap:16px}
.footer-socials a{font-size:13px;color:var(--text-muted);text-decoration:none;transition:color .2s}
.footer-socials a:hover{color:#00e5ff}
.footer-col h4{font-family:var(--font-display);font-size:10px;letter-spacing:3px;color:var(--text-muted);text-transform:uppercase;margin-bottom:18px}
.footer-col ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:11px}
.footer-col a{font-size:13px;color:var(--text-secondary);text-decoration:none;transition:color .2s}
.footer-col a:hover{color:#00e5ff}
.footer-bar{max-width:1200px;margin:0 auto;padding:18px 28px;border-top:1px solid var(--border-subtle);display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);flex-wrap:wrap;gap:8px}

@media(max-width:1024px){
    .hero-wrap{flex-direction:column;gap:40px;padding:0 24px}
    .hero-right{flex:1;width:100%;max-width:440px}
    .ht-1,.ht-2{font-size:40px}
    .course-grid{grid-template-columns:repeat(2,1fr)}
    .path-grid{grid-template-columns:repeat(2,1fr)}
    .ai-panel{flex-direction:column;padding:40px;gap:36px}
    .footer-grid{grid-template-columns:repeat(3,1fr)}
}
@media(max-width:768px){
    .sec{padding:56px 16px}
    .hero{min-height:auto;padding:60px 0 50px}
    .hero-right{max-width:100%}
    .ht-1,.ht-2{font-size:30px}
    .hero-search-card{padding:18px}
    .hero-search-btn{width:100%}
    .course-grid{grid-template-columns:1fr}
    .path-grid{grid-template-columns:1fr}
    .stats-grid{gap:28px}
    .stat-n{font-size:40px}
    .footer-grid{grid-template-columns:repeat(2,1fr)}
    .ai-panel{padding:28px}
}
</style>
