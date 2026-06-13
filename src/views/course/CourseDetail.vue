<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Star, Clock, User, ArrowRight, Collection, ArrowLeft } from '@element-plus/icons-vue'
import gsap from 'gsap'

const route = useRoute()
const router = useRouter()

// ─── Mock API ───
const delay = (ms=300) => new Promise(r => setTimeout(r, ms))
const courseDB = {
    1:{id:1,cat:'humanities',t:'《论语》精读二十讲',a:'墨韵先生',r:'国学院教授',n:12580,rt:4.9,p:'免费',lv:'入门',d:'20课时',
        desc:'系统解读《论语》二十篇，结合历史背景与当代应用，深入浅出地阐释儒家思想精髓。从"学而时习之"到"己所不欲勿施于人"，每一讲精心设计，适合零基础入门的传统文化爱好者。课程以原文精讲为主，辅以历史典故与现代案例，帮助学员真正理解儒家思想的内核。',
        outline:['孔子其人其时代','"学而"篇——学习的快乐','"为政"篇——治国之道','"八佾"篇——礼乐精神','"里仁"篇——仁者爱人','"公冶长"篇——识人之明','"雍也"篇——中庸之道','"述而"篇——教学相长'],
        skills:['经典阅读','历史思维','哲学思辨','文言基础'],
        reviews:[{u:'墨香学员',r:5,c:'墨韵先生的课真是醍醐灌顶，每节课都有新的收获！'},{u:'国学爱好者',r:5,c:'深入浅出，把深奥的道理讲得通俗易懂。'},{u:'小李同学',r:4,c:'课程内容很棒，如果能增加更多互动环节就更好了。'}],
        img:'xn1.png',related:[2,4,5]},
    2:{id:2,cat:'tech',t:'Python 数据科学实战',a:'程远',r:'前阿里P8算法专家',n:8960,rt:4.8,p:'¥299',lv:'进阶',d:'32课时',
        desc:'从零基础到熟练运用 Python 进行数据分析与可视化。涵盖 NumPy、Pandas、Matplotlib 等核心库，结合真实数据集实战，让你掌握数据科学家的必备技能。课程采用项目驱动教学，每个模块都有对应的实战项目，确保学员学以致用。',
        outline:['Python 环境搭建与基础语法','NumPy 多维数组与数值计算','Pandas 数据清洗与处理','Matplotlib 数据可视化基础','Seaborn 高级图表绘制','Scikit-learn 机器学习入门','实战：电商用户行为分析','实战：金融时序数据预测'],
        skills:['Python','数据分析','可视化','ML入门'],
        reviews:[{u:'转行程序员',r:5,c:'程远老师的实战经验太丰富了，跟着做项目进步很快！'},{u:'数据小白',r:5,c:'从零开始完全能跟上，课程结构设计很合理。'}],
        img:'xn2.png',related:[1,6,8]},
    3:{id:3,cat:'arts',t:'颜体楷书入门到精通',a:'砚田墨香',r:'中书协会员',n:5680,rt:4.9,p:'免费',lv:'入门',d:'16课时',
        desc:'学习颜真卿楷书的笔法、结构和章法。从基本笔画到完整作品，循序渐进掌握颜体的雄浑厚重之美。每节课配有高清示范视频，老师逐笔讲解，让零基础学员也能快速入门。',
        outline:['文房四宝介绍与执笔法','基本笔画：横与竖','基本笔画：撇与捺','基本笔画：点与钩','偏旁部首精讲(上)','偏旁部首精讲(下)','颜体结构特点分析','《多宝塔碑》临摹与结业创作'],
        skills:['书法','楷书','颜体','传统文化'],
        reviews:[{u:'书法爱好者',r:5,c:'老师写得太好了，跟着练了两个月进步明显！'},{u:'退休学书法',r:5,c:'讲解细致，示范清晰，很适合中老年学员。'},{u:'大学生小陈',r:4,c:'静下心来学书法真的能修身养性。'}],
        img:'xn3.png',related:[1,9,14]},
    4:{id:4,cat:'ai',t:'大模型应用开发实战',a:'凌风',r:'AI Lab 负责人',n:11200,rt:4.7,p:'¥499',lv:'高级',d:'40课时',
        desc:'深入大语言模型的应用层开发。从 Prompt Engineering 到 RAG 架构，从 Fine-tuning 到 Agent 开发，全方位掌握 LLM 应用构建能力。课程紧跟技术前沿，包含大量生产级代码示例。',
        outline:['LLM 基础与生态概览','Prompt Engineering 进阶技巧','LangChain 框架核心概念','RAG 架构设计与实现','向量数据库选型与优化','Agent 开发范式与工具调用','Fine-tuning 实战全流程','模型部署与性能优化'],
        skills:['LLM','LangChain','RAG','Agent'],
        reviews:[{u:'AI工程师',r:5,c:'凌风老师把前沿技术讲得很透彻，代码示例非常实用！'},{u:'产品经理转AI',r:4,c:'内容有些深度，但跟着学下来收获很大。'},{u:'在校研究生',r:5,c:'帮我快速建立了LLM应用开发的完整知识体系。'}],
        img:'xn4.png',related:[2,8,10]},
}
// Fill remaining courses with generated data
for (let i=5;i<=30;i++) {
    const cats=['humanities','tech','arts','ai']
    const cat=cats[i%4]
    const titles={humanities:['《诗经》选读','西方哲学史','中国哲学简史','《道德经》导读','《孙子兵法》与现代管理','唐宋八大家文选','《资治通鉴》选读'],tech:['Vue 3 源码解析','Node.js 微服务架构','Rust 系统编程','Kubernetes 实战','TypeScript 类型体操','Flutter 跨平台开发','全栈项目实战'],arts:['水墨山水画技法','篆刻艺术入门','工笔花鸟画','古琴演奏入门','茶道与生活美学','书法创作提高','中国传统色彩'],ai:['Prompt 工程实战','计算机视觉入门','NLP 自然语言处理','强化学习基础','AIGC 内容创作实战','深度学习与神经网络','AI 产品设计']}
    courseDB[i]={id:i,cat,a:['墨韵先生','程远','凌风','砚田墨香','清风居士','无极','文心','司马清风','丹青妙手','思辨先生'][i%10],r:['国学院教授','前阿里P8','AI Lab负责人','中书协会员','文学教授','全栈架构师','AI研究员','历史学博士','国画大师','哲学博士'][i%10],n:1000+Math.floor(Math.random()*15000),rt:(3.5+Math.random()*1.5).toFixed(1),p:Math.random()>.5?'免费':`¥${(Math.floor(Math.random()*5)+1)*99}`,lv:['入门','进阶','高级'][i%3],d:`${12+Math.floor(Math.random()*30)}课时`,
        desc:'这是一门精心设计的课程，旨在帮助学员系统掌握相关领域知识与技能。课程内容丰富，理论与实践相结合，适合不同基础的学习者。',
        outline:['第一讲：课程导论与概览','第二讲：基础概念与框架','第三讲：核心技术深入','第四讲：实战案例分析','第五讲：进阶技巧掌握','第六讲：综合项目实战','第七讲：常见问题与优化','第八讲：总结与展望'],
        skills:['核心技能','实践能力','思维训练'],
        reviews:[{u:'学员A',r:5,c:'非常棒的课程，讲解清晰！'},{u:'学员B',r:4,c:'内容很实用，推荐给大家。'}],
        img:'xn1.png',related:[(i%30)+1,((i+1)%30)+1,((i+2)%30)+1]}
}

async function fetchCourse(id) {
    await delay(200)
    return courseDB[id] || null
}

// ─── State ───
const course = ref(null)
const activeTab = ref('outline')
const favorited = ref(false)
const loading = ref(true)

const c = computed(()=>course.value||{t:'',a:'',r:'',n:0,rt:0,p:'',lv:'',d:'',desc:'',outline:[],skills:[],reviews:[],related:[]})
const imgUrl = computed(()=>imgSrc(c.value.img||'xn1.png'))
function imgSrc(name){ return new URL(`@/assets/imgs/${name}`,import.meta.url).href }
const relatedCourses = computed(()=>(c.value.related||[]).map(id=>courseDB[id]).filter(Boolean))

onMounted(async()=>{
    const id=parseInt(route.params.id)||1
    course.value=await fetchCourse(id)
    loading.value=false
    favorited.value=!!localStorage.getItem(`fav-${id}`)
    await nextTick()
    gsap.fromTo('.cd-hero',{opacity:0,y:30},{opacity:1,y:0,duration:.6,ease:'power3.out'})
    gsap.fromTo('.cd-card',{opacity:0,y:40},{opacity:1,y:0,duration:.5,stagger:.08,ease:'power3.out',delay:.2})
})

function stars(n){ return '⭐'.repeat(Number(n)) }

function toggleFav(){
    const id=c.value.id
    favorited.value=!favorited.value
    favorited.value?localStorage.setItem(`fav-${id}`,'1'):localStorage.removeItem(`fav-${id}`)
}
</script>

<template>
<div class="cd-page" v-if="!loading&&course">
    <!-- Breadcrumb -->
    <div class="cd-bread"><a @click="router.push('/course/courses')">全部课程</a> <span>/</span> <span>{{c.t}}</span></div>

    <!-- Hero -->
    <div class="cd-hero">
        <div class="cd-hero-img"><img :src="imgUrl" :alt="c.t"/></div>
        <div class="cd-hero-body">
            <div class="cd-tags"><span v-for="s in c.skills" :key="s" class="cd-tag">{{s}}</span></div>
            <h1 class="cd-title">{{c.t}}</h1>
            <div class="cd-meta">
                <span class="cd-meta-i"><el-icon><Star/></el-icon>{{c.rt}}</span>
                <span class="cd-meta-i"><el-icon><User/></el-icon>{{c.n?.toLocaleString()}}学员</span>
                <span class="cd-meta-i"><el-icon><Clock/></el-icon>{{c.d}}</span>
                <span class="cd-meta-i"><el-icon><Collection/></el-icon>{{c.lv}}</span>
            </div>
            <div class="cd-teacher"><span class="cd-tn">{{c.a}}</span><span class="cd-tr">{{c.r}}</span></div>
            <div class="cd-hero-actions">
                <el-button type="primary" size="large" round class="cd-enroll-btn">
                    {{c.p==='免费'?'免费加入':'立即购买 · '+c.p}} <el-icon class="ml-2"><ArrowRight/></el-icon>
                </el-button>
                <el-button size="large" round class="cd-fav-btn" :class="{favorited}" @click="toggleFav">
                    {{favorited?'已收藏':'收藏'}}
                </el-button>
                <el-button size="large" round class="cd-back-btn" @click="router.back()">
                    <el-icon><ArrowLeft/></el-icon> 返回
                </el-button>
            </div>
        </div>
    </div>

    <!-- Content -->
    <div class="cd-body">
        <!-- Tabs -->
        <div class="cd-tabs">
            <button :class="{active:activeTab==='outline'}" @click="activeTab='outline'">课程大纲</button>
            <button :class="{active:activeTab==='desc'}" @click="activeTab='desc'">课程介绍</button>
            <button :class="{active:activeTab==='reviews'}" @click="activeTab='reviews'">学员评价 ({{c.reviews.length}})</button>
        </div>

        <!-- Outline -->
        <div v-if="activeTab==='outline'" class="cd-card cd-outline">
            <h3>课程大纲</h3>
            <ol><li v-for="(item,i) in c.outline" :key="i"><span class="cd-ol-num">{{i+1}}</span>{{item}}</li></ol>
        </div>

        <!-- Description -->
        <div v-if="activeTab==='desc'" class="cd-card cd-desc">
            <h3>课程介绍</h3>
            <p>{{c.desc}}</p>
            <div class="cd-skill-tags"><span class="cd-skill-label">你将学到：</span><span v-for="s in c.skills" :key="s" class="cd-skill-tag">{{s}}</span></div>
        </div>

        <!-- Reviews -->
        <div v-if="activeTab==='reviews'" class="cd-card cd-reviews">
            <h3>学员评价</h3>
            <div v-for="(r,i) in c.reviews" :key="i" class="cd-review-item">
                <div class="cd-review-head"><span class="cd-ru">{{r.u}}</span><span class="cd-rr">{{ stars(r.r) }}</span></div>
                <p class="cd-rc">{{r.c}}</p>
            </div>
        </div>
    </div>

    <!-- Related courses -->
    <div v-if="relatedCourses.length" class="cd-related">
        <h3>相关课程</h3>
        <div class="cd-related-grid">
            <article v-for="rc in relatedCourses" :key="rc.id" class="cd-rc-card"
                @click="router.push(`/course/course/${rc.id}`)">
                <div class="cd-rc-cover">
                    <img :src="imgSrc(rc.img||'xn1.png')" :alt="rc.t"/>
                </div>
                <div class="cd-rc-body">
                    <h4>{{rc.t}}</h4>
                    <p>{{rc.a}} · {{rc.rt}}⭐</p>
                </div>
            </article>
        </div>
    </div>
</div>
</template>

<style scoped>
.cd-page{max-width:1100px;margin:0 auto;padding:36px 28px 80px}

/* Breadcrumb */
.cd-bread{font-size:13px;color:var(--text-muted);margin-bottom:28px}
.cd-bread a{color:var(--text-secondary);cursor:pointer;text-decoration:none}
.cd-bread a:hover{color:#00d4ff}

/* Hero */
.cd-hero{display:flex;gap:48px;align-items:flex-start;margin-bottom:48px}
.cd-hero-img{flex:0 0 480px;border-radius:16px;overflow:hidden;aspect-ratio:16/10;background:var(--surface-glass)}
.cd-hero-img img{width:100%;height:100%;object-fit:cover}
.cd-hero-body{flex:1;min-width:0;padding-top:4px}
.cd-tags{display:flex;gap:6px;margin-bottom:16px}
.cd-tag{padding:3px 10px;border-radius:6px;font-size:11px;background:rgba(0,212,255,.06);color:rgba(0,212,255,.8);border:1px solid rgba(0,212,255,.08)}
.cd-title{font-family:var(--font-display);font-size:32px;font-weight:700;color:var(--text-primary);margin-bottom:16px;line-height:1.2}
.cd-meta{display:flex;gap:20px;margin-bottom:16px;font-size:14px;color:var(--text-secondary);flex-wrap:wrap}
.cd-meta-i{display:inline-flex;align-items:center;gap:5px}
.cd-meta-i .el-icon{color:#fbbf24}
.cd-teacher{display:flex;gap:10px;align-items:baseline;margin-bottom:24px}
.cd-tn{font-size:16px;color:var(--text-primary)}
.cd-tr{font-size:13px;color:var(--text-muted)}
.cd-hero-actions{display:flex;gap:10px;flex-wrap:wrap}
.cd-enroll-btn{--el-button-bg-color:#00d4ff;--el-button-border-color:#00d4ff;--el-button-hover-bg-color:#33e0ff;--el-button-hover-border-color:#33e0ff;--el-button-text-color:#060b18;height:48px;font-size:15px}
.cd-fav-btn{height:48px;border-color:var(--border-default)!important;color:var(--text-secondary)!important}
.cd-fav-btn.favorited{border-color:#fbbf24!important;color:#fbbf24!important}
.cd-back-btn{height:48px;border-color:var(--border-default)!important;color:var(--text-secondary)!important}

/* Tabs */
.cd-tabs{display:flex;gap:0;margin-bottom:32px;border-bottom:1px solid var(--border-subtle)}
.cd-tabs button{padding:12px 28px;background:none;border:none;border-bottom:2px solid transparent;color:var(--text-muted);font-size:15px;cursor:pointer;transition:all .2s}
.cd-tabs button.active{color:#00d4ff;border-bottom-color:#00d4ff}
.cd-tabs button:hover{color:var(--text-primary)}

/* Cards */
.cd-card{background:var(--surface-glass);border:1px solid var(--border-subtle);border-radius:16px;padding:32px;margin-bottom:24px}
.cd-card h3{font-family:var(--font-display);font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:20px}
.cd-outline ol{padding:0;display:flex;flex-direction:column;gap:12px;color:var(--text-secondary);font-size:15px;line-height:1.6;list-style:none}
.cd-ol-num{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:rgba(0,212,255,.08);color:#00d4ff;font-size:12px;font-weight:600;margin-right:12px;flex-shrink:0}
.cd-desc p{color:var(--text-secondary);font-size:15px;line-height:1.8;margin-bottom:24px}
.cd-skill-tags{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.cd-skill-label{font-size:13px;color:var(--text-muted)}
.cd-skill-tag{padding:4px 14px;border-radius:9999px;font-size:13px;background:rgba(0,212,255,.05);color:#00d4ff;border:1px solid rgba(0,212,255,.1)}

/* Reviews */
.cd-review-item{padding:16px 0;border-bottom:1px solid var(--border-subtle)}
.cd-review-item:last-child{border-bottom:none}
.cd-review-head{display:flex;justify-content:space-between;margin-bottom:8px}
.cd-ru{font-size:14px;color:var(--text-primary);font-weight:500}
.cd-rr{font-size:13px}
.cd-rc{font-size:14px;color:var(--text-secondary);line-height:1.6}

/* Related */
.cd-related{margin-top:48px}
.cd-related h3{font-family:var(--font-display);font-size:20px;font-weight:600;color:var(--text-primary);margin-bottom:24px}
.cd-related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.cd-rc-card{border-radius:12px;overflow:hidden;cursor:pointer;background:var(--surface-glass);border:1px solid var(--border-subtle);transition:all .25s}
.cd-rc-card:hover{border-color:rgba(0,212,255,.2);transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.3)}
.cd-rc-cover{aspect-ratio:16/10;overflow:hidden;background:var(--surface-glass)}
.cd-rc-cover img{width:100%;height:100%;object-fit:cover}
.cd-rc-body{padding:14px 16px}
.cd-rc-body h4{font-size:14px;color:var(--text-primary);margin-bottom:4px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.cd-rc-body p{font-size:12px;color:var(--text-muted)}

@media(max-width:768px){.cd-hero{flex-direction:column;gap:24px}.cd-hero-img{flex:auto;width:100%}.cd-title{font-size:24px}.cd-page{padding:24px 16px 60px}.cd-related-grid{grid-template-columns:repeat(2,1fr)}}
</style>
