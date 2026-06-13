<script setup>
import { ref, computed, nextTick, watch, onMounted } from 'vue'
import { Search, ArrowRight, Upload, Cpu, ChatDotRound, Delete } from '@element-plus/icons-vue'
import gsap from 'gsap'

// ─── Knowledge bases ───
const kbCategories = [
    { id:'primary', label:'小学教育', icon:'📖', count:6, color:'#34d399' },
    { id:'junior', label:'初中教育', icon:'📚', count:8, color:'#22d3ee' },
    { id:'senior', label:'高中教育', icon:'🎓', count:10, color:'#00d4ff' },
    { id:'humanities', label:'大学·文科', icon:'📜', count:12, color:'#a78bfa' },
    { id:'science', label:'大学·理科', icon:'🔬', count:8, color:'#3b82f6' },
    { id:'engineering', label:'大学·工科', icon:'⚙️', count:10, color:'#fbbf24' },
    { id:'arts', label:'艺术修养', icon:'🎨', count:6, color:'#f472b6' },
    { id:'ai-tech', label:'AI·技术', icon:'🤖', count:4, color:'#8b5cf6' },
]

const activeKb = ref('humanities')

// ─── Mock documents per KB ───
const docsMap = {
    primary:   [{t:'小学古诗词精选.pdf',s:'2.3MB',d:'2024-01'},{t:'趣味数学启蒙.docx',s:'1.8MB',d:'2024-02'},{t:'自然科普绘本.pdf',s:'4.1MB',d:'2024-03'}],
    junior:    [{t:'初中语文必背篇目.pdf',s:'3.2MB',d:'2024-01'},{t:'初中物理实验手册.docx',s:'2.1MB',d:'2024-02'}],
    senior:    [{t:'高考数学真题汇编.pdf',s:'5.6MB',d:'2024-01'},{t:'高中生物知识点总结.docx',s:'1.9MB',d:'2024-03'}],
    humanities:[{t:'《论语》精读讲义.pdf',s:'4.2MB',d:'2024-01'},{t:'西方哲学史笔记.docx',s:'2.8MB',d:'2024-02'},{t:'中国通史纲要.pdf',s:'6.1MB',d:'2024-03'}],
    science:   [{t:'高等数学公式手册.pdf',s:'3.4MB',d:'2024-01'},{t:'量子力学入门.pdf',s:'5.2MB',d:'2024-02'}],
    engineering:[{t:'数据结构与算法.pdf',s:'4.8MB',d:'2024-01'},{t:'计算机网络原理.docx',s:'3.1MB',d:'2024-02'},{t:'Python编程指南.pdf',s:'2.5MB',d:'2024-03'}],
    arts:      [{t:'中国书法技法.pdf',s:'7.2MB',d:'2024-01'},{t:'西方美术史.pdf',s:'5.8MB',d:'2024-02'}],
    'ai-tech': [{t:'Transformer架构详解.pdf',s:'3.6MB',d:'2024-01'},{t:'RAG系统设计指南.docx',s:'2.1MB',d:'2024-02'},{t:'LangChain实战手册.pdf',s:'4.5MB',d:'2024-03'}],
}

const currentDocs = computed(() => docsMap[activeKb.value] || [])
const currentKb = computed(() => kbCategories.find(k => k.id === activeKb.value))

// ─── Enrolled courses ───
const enrolledCourses = [
    { id:1, t:'《论语》精读二十讲', a:'墨韵先生', cat:'humanities' },
    { id:2, t:'Python 数据科学实战', a:'程远', cat:'engineering' },
    { id:3, t:'颜体楷书入门到精通', a:'砚田墨香', cat:'arts' },
    { id:4, t:'大模型应用开发实战', a:'凌风', cat:'ai-tech' },
]
const selectedCourse = ref(null)
const showCoursePicker = ref(false)
const assistMode = ref('qa') // qa | video | image | pdf

// ─── Chat ───
const chatBodyRef = ref(null)
const inputText = ref('')
const loading = ref(false)
const messages = ref([
    { role:'assistant', content:'你好！我是墨学 AI 知识助手。选择左侧知识库，上传你的学习资料，我可以基于资料内容为你提供精准的知识问答。', sources:[] }
])

function addMessage(role, content, sources=[], courseId=null) {
    messages.value.push({ role, content, sources, courseId })
}
function scrollBottom() {
    nextTick(() => { if (chatBodyRef.value) chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight })
}

async function send() {
    const q = inputText.value.trim()
    if (!q || loading.value) return
    const course = selectedCourse.value
    const prefix = course ? `[课程: ${course.t}] ` : ''
    addMessage('user', prefix + q, [], course?.id)
    inputText.value = ''
    loading.value = true
    scrollBottom()

    const kb = currentKb.value
    const docs = currentDocs.value
    await new Promise(r => setTimeout(r, 800 + Math.random() * 1200))

    const mockSources = docs.slice(0, 1 + Math.floor(Math.random() * 2)).map(d => d.t)
    if (course) mockSources.unshift(`${course.t} - ${course.a}`)
    const responses = {
        humanities: '根据知识库中的《论语》精读讲义，孔子强调"仁"的核心在于"爱人"。在《论语·颜渊》篇中，樊迟问仁，子曰："爱人。"这是儒家思想的核心价值观，也是中国传统文化的精髓所在。',
        science: '根据高等数学公式手册，微积分的基本思想是通过极限来研究函数的局部性质。牛顿-莱布尼茨公式建立了微分和积分之间的联系，是现代科学计算的数学基础。',
        engineering: '根据《数据结构与算法》和《Python编程指南》，常见的数据结构包括数组、链表、栈、队列、树和图。在Python中，可以使用内置的list、dict以及collections模块来实现这些数据结构。',
        'ai-tech': '根据《Transformer架构详解》和《RAG系统设计指南》，RAG（检索增强生成）系统通过将用户查询与知识库文档进行语义匹配，检索相关段落后交由LLM生成回答，有效解决了大模型的知识截止和幻觉问题。',
        arts: '根据《中国书法技法》，书法学习应从基本笔画开始，掌握中锋、侧锋、逆锋等运笔方法。颜体楷书以雄浑厚重著称，适合初学者打好基础。',
        primary: '根据《小学古诗词精选》，李白的《静夜思》以简洁的语言表达了深沉的思乡之情。通过诵读和简单讲解，可以帮助小学生理解古诗的韵律和意境。',
        junior: '根据《初中物理实验手册》，力学是初中物理的基础模块。通过斜面实验和弹簧测力计的使用，学生可以直观理解力、质量和加速度之间的关系。',
        senior: '根据《高考数学真题汇编》，函数与导数是高考数学的重点考查内容。掌握导数的几何意义和单调性分析，能够解决大部分函数相关的压轴题。',
    }
    const answer = responses[activeKb.value] || `根据${kb?.label}知识库的文档，我对你的问题进行了分析。相关文档中的内容表明该领域的核心概念需要通过系统性学习来掌握。建议你查看具体文档获取更多细节。`

    addMessage('assistant', answer, mockSources)
    loading.value = false
    scrollBottom()
}

function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
}

watch(activeKb, () => {
    messages.value = [{ role:'assistant', content:`已切换到「${currentKb.value?.label}」知识库。你可以基于该库中的文档进行提问。`, sources:[] }]
})

onMounted(() => {
    gsap.fromTo('.kb-item', { opacity:0, x:-20 }, { opacity:1, x:0, duration:.4, stagger:.05, ease:'power3.out' })
})
</script>

<template>
<div class="rag-page">
    <!-- ═══════ SIDEBAR ═══════ -->
    <aside class="rag-sidebar">
        <div class="rag-side-head">
            <el-icon :size="20"><Cpu/></el-icon>
            <span>知识库</span>
        </div>
        <!-- KB list -->
        <div class="rag-kb-list">
            <button v-for="kb in kbCategories" :key="kb.id" class="kb-item" :class="{active:activeKb===kb.id}"
                @click="activeKb=kb.id" :style="{'--kc':kb.color}">
                <span class="kb-icon">{{kb.icon}}</span>
                <span class="kb-label">{{kb.label}}</span>
                <span class="kb-count">{{kb.count}}</span>
            </button>
        </div>
        <!-- Documents -->
        <div class="rag-docs">
            <div class="rag-docs-head">
                <span>文档列表</span>
                <el-button size="small" text class="rag-upload-btn"><el-icon><Upload/></el-icon> 上传</el-button>
            </div>
            <div class="rag-docs-list">
                <div v-for="(doc,i) in currentDocs" :key="i" class="rag-doc-item">
                    <span class="doc-name">{{doc.t}}</span>
                    <span class="doc-meta">{{doc.s}} · {{doc.d}}</span>
                </div>
                <div v-if="!currentDocs.length" class="rag-doc-empty">暂无文档</div>
            </div>
        </div>
    </aside>

    <!-- ═══════ CHAT ═══════ -->
    <main class="rag-chat">
        <!-- Header -->
        <div class="rag-chat-head">
            <div class="rag-chat-kb-info">
                <span class="ckb-icon">{{currentKb?.icon}}</span>
                <span class="ckb-label">{{currentKb?.label}}</span>
                <span class="ckb-docs">{{currentDocs.length}} 个文档</span>
            </div>
            <el-button size="small" round class="rag-clear-btn" @click="messages=[{role:'assistant',content:'对话已清空。',sources:[]}]">
                <el-icon><Delete/></el-icon> 清空对话
            </el-button>
        </div>

        <!-- Messages -->
        <div class="rag-chat-body" ref="chatBodyRef">
            <div v-for="(m,i) in messages" :key="i" class="rag-msg" :class="m.role">
                <span class="rag-msg-avatar">{{ m.role==='user'?'👤':'🤖' }}</span>
                <div class="rag-msg-content">
                    <div class="rag-msg-text">{{m.content}}</div>
                    <div v-if="m.sources?.length" class="rag-msg-sources">
                        <span class="rag-source-label">📎 来源:</span>
                        <span v-for="s in m.sources" :key="s" class="rag-source-tag">{{s}}</span>
                    </div>
                </div>
            </div>
            <div v-if="loading" class="rag-msg assistant">
                <span class="rag-msg-avatar">🤖</span>
                <div class="rag-msg-content">
                    <div class="rag-typing"><span></span><span></span><span></span></div>
                </div>
            </div>
        </div>

        <!-- Input -->
        <div class="rag-chat-input">
            <div class="rag-input-row">
                <div class="rag-input-left">
                    <!-- Top row: course + mode -->
                    <div class="rag-input-actions">
                        <button class="rag-course-trigger" @click="showCoursePicker=true">
                            {{selectedCourse?selectedCourse.t:'选择课程'}}
                            <span class="rag-course-arrow">›</span>
                        </button>
                        <div class="rag-mode-chips">
                            <button :class="{active:assistMode==='qa'}" @click="assistMode='qa'">💬 问答</button>
                            <button :class="{active:assistMode==='video'}" @click="assistMode='video'">🎬 视频讲解</button>
                            <button :class="{active:assistMode==='image'}" @click="assistMode='image'">🖼️ 图片讲解</button>
                            <button :class="{active:assistMode==='pdf'}" @click="assistMode='pdf'">📄 PDF总结</button>
                        </div>
                    </div>
                    <!-- Input -->
                    <el-input v-model="inputText" type="textarea" :rows="3"
                        :placeholder="assistMode==='video'?'描述你想了解的知识点，AI 将为你生成视频讲解…':assistMode==='image'?'上传或描述图片内容，AI 将为你详细分析…':assistMode==='pdf'?'上传 PDF 或描述需求，AI 将为你总结要点…':selectedCourse?`向「${selectedCourse.t}」提问…`:'输入问题，基于知识库文档获取精准回答…'"
                        class="rag-input" @keydown="handleKeydown" :disabled="loading"/>
                </div>
                <el-button type="primary" class="rag-send-btn" :loading="loading" @click="send" :disabled="!inputText.trim()">
                    <el-icon :size="20"><ChatDotRound/></el-icon>
                </el-button>
            </div>
            <p class="rag-input-hint">Enter 发送 · Shift+Enter 换行</p>
        </div>

        <!-- Course picker modal -->
        <Transition name="modal">
        <div v-if="showCoursePicker" class="rag-modal-overlay" @click.self="showCoursePicker=false">
            <div class="rag-modal">
                <div class="rag-modal-head">
                    <h3>选择课程提问</h3>
                    <button class="rag-modal-close" @click="showCoursePicker=false">✕</button>
                </div>
                <div class="rag-modal-body">
                    <div class="rag-modal-item" :class="{active:!selectedCourse}" @click="selectedCourse=null;showCoursePicker=false">
                        <span class="rmi-icon">💬</span>
                        <span class="rmi-title">通用问答</span>
                        <span class="rmi-desc">不限定课程范围</span>
                    </div>
                    <div v-for="c in enrolledCourses" :key="c.id" class="rag-modal-item"
                        :class="{active:selectedCourse?.id===c.id}" @click="selectedCourse=c;showCoursePicker=false">
                        <span class="rmi-icon">📖</span>
                        <div class="rmi-info">
                            <span class="rmi-title">{{c.t}}</span>
                            <span class="rmi-desc">{{c.a}}</span>
                        </div>
                        <span v-if="selectedCourse?.id===c.id" class="rmi-check">✓</span>
                    </div>
                </div>
            </div>
        </div>
        </Transition>
    </main>
</div>
</template>

<style scoped>
.rag-page { display:flex; height:calc(100vh - 64px); background:var(--surface-root); }

/* ═══════ SIDEBAR ═══════ */
.rag-sidebar { width:280px; flex-shrink:0; border-right:1px solid var(--border-subtle); display:flex;flex-direction:column; overflow-y:auto; }
.rag-side-head { display:flex;align-items:center;gap:8px;padding:20px;font-family:var(--font-display);font-size:14px;color:var(--text-primary);border-bottom:1px solid var(--border-subtle); }
.rag-kb-list { padding:12px; }
.kb-item { display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border-radius:10px;background:none;border:none;color:var(--text-secondary);font-size:13px;cursor:pointer;transition:all .2s;text-align:left;margin-bottom:2px; }
.kb-item:hover { background:var(--surface-glass-hover);color:var(--text-primary); }
.kb-item.active { background:rgba(0,212,255,.06);color:var(--text-primary);border:1px solid rgba(0,212,255,.15); }
.kb-icon { font-size:16px;flex-shrink:0; }
.kb-label { flex:1; }
.kb-count { font-size:11px;color:var(--text-muted);background:rgba(255,255,255,.03);padding:1px 8px;border-radius:9999px; }
.kb-item.active .kb-count { background:rgba(0,212,255,.1);color:#00d4ff; }

/* Documents */
.rag-docs { border-top:1px solid var(--border-subtle);padding:16px;flex:1;overflow-y:auto; }
.rag-docs-head { display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:2px; }
.rag-upload-btn { color:var(--text-muted)!important;font-size:12px; }
.rag-docs-list { display:flex;flex-direction:column;gap:6px; }
.rag-doc-item { padding:10px 12px;border-radius:8px;background:rgba(255,255,255,.015);border:1px solid rgba(255,255,255,.03);cursor:pointer;transition:all .2s; }
.rag-doc-item:hover { border-color:rgba(0,212,255,.12);background:rgba(0,212,255,.02); }
.doc-name { display:block;font-size:12px;color:var(--text-secondary);margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.doc-meta { font-size:10px;color:var(--text-muted); }
.rag-doc-empty { text-align:center;padding:20px;font-size:12px;color:var(--text-muted); }

/* ═══════ CHAT ═══════ */
.rag-chat { flex:1;display:flex;flex-direction:column;min-width:0; }
.rag-chat-head { display:flex;justify-content:space-between;align-items:center;padding:16px 24px;border-bottom:1px solid var(--border-subtle); }
.rag-chat-kb-info { display:flex;align-items:center;gap:10px; }
.ckb-icon { font-size:20px; }
.ckb-label { font-family:var(--font-display);font-size:15px;color:var(--text-primary); }
.ckb-docs { font-size:12px;color:var(--text-muted); }
.rag-clear-btn { border-color:var(--border-default)!important;color:var(--text-muted)!important;font-size:12px; }

/* Messages */
.rag-chat-body { flex:1;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:24px; }
.rag-msg { display:flex;gap:14px; }
.rag-msg-avatar { font-size:28px;flex-shrink:0;line-height:1; }
.rag-msg-content { flex:1;min-width:0; }
.rag-msg-text { font-size:14px;color:var(--text-secondary);line-height:1.7;white-space:pre-wrap; }
.rag-msg.user .rag-msg-text { color:var(--text-primary);background:rgba(0,212,255,.06);padding:14px 18px;border-radius:18px 4px 18px 18px;border:1px solid rgba(0,212,255,.08); }
.rag-msg-sources { margin-top:10px;display:flex;align-items:center;gap:6px;flex-wrap:wrap; }
.rag-source-label { font-size:11px;color:var(--text-muted); }
.rag-source-tag { padding:3px 10px;border-radius:6px;font-size:11px;background:rgba(34,211,238,.06);color:#22d3ee;border:1px solid rgba(34,211,238,.12); }

/* Typing */
.rag-typing { display:flex;gap:4px;padding:12px 0; }
.rag-typing span { width:6px;height:6px;border-radius:50%;background:var(--text-muted);animation:typingBounce 1.4s infinite; }
.rag-typing span:nth-child(2) { animation-delay:.2s; }
.rag-typing span:nth-child(3) { animation-delay:.4s; }
@keyframes typingBounce { 0%,60%,100%{opacity:.3;transform:translateY(0)} 30%{opacity:1;transform:translateY(-6px)} }

/* Input */
.rag-chat-input { padding:24px 32px;border-top:1px solid var(--border-subtle); }
.rag-input-row { display:flex;gap:10px;align-items:flex-end; }
.rag-input-left { flex:1;display:flex;flex-direction:column;gap:12px; }
.rag-input-actions { display:flex;align-items:center;gap:12px;flex-wrap:wrap; }
.rag-course-trigger { display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:9999px;font-size:12px;color:var(--text-secondary);background:var(--surface-glass);border:1px solid var(--border-default);cursor:pointer;transition:all .2s;flex-shrink:0; }
.rag-course-trigger:hover { border-color:rgba(0,212,255,.25);color:#00d4ff; }
.rag-course-arrow { font-size:14px;transition:transform .2s; }
.rag-course-trigger:hover .rag-course-arrow { transform:rotate(90deg); }
.rag-mode-chips { display:flex;gap:4px; }
.rag-mode-chips button { padding:4px 10px;border-radius:9999px;font-size:11px;color:var(--text-muted);background:none;border:1px solid transparent;cursor:pointer;transition:all .2s;white-space:nowrap; }
.rag-mode-chips button:hover { color:var(--text-secondary);border-color:var(--border-subtle); }
.rag-mode-chips button.active { color:#00d4ff;background:rgba(0,212,255,.06);border-color:rgba(0,212,255,.15); }
.rag-input { --el-input-bg-color:var(--surface-glass);--el-input-border-color:var(--border-default);--el-input-hover-border-color:var(--border-emphasis);--el-input-focus-border-color:#00d4ff;--el-input-text-color:var(--text-primary);--el-input-placeholder-color:var(--text-muted); }
.rag-input :deep(.el-textarea__inner) { border-radius:14px!important;resize:none; }
.rag-send-btn { width:48px;height:48px;min-width:48px;padding:0;border-radius:14px!important;--el-button-bg-color:#00d4ff;--el-button-border-color:#00d4ff;--el-button-hover-bg-color:#33e0ff; }
.rag-input-hint { font-size:11px;color:var(--text-muted);margin-top:8px;text-align:center; }

/* Course picker modal */
.rag-modal-overlay { position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center; }
.rag-modal { width:420px;max-width:90vw;background:var(--surface-root);border:1px solid var(--border-subtle);border-radius:20px;overflow:hidden; }
.rag-modal-head { display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid var(--border-subtle); }
.rag-modal-head h3 { font-family:var(--font-display);font-size:15px;color:var(--text-primary); }
.rag-modal-close { background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:16px;padding:4px 8px;border-radius:6px; }
.rag-modal-close:hover { color:var(--text-primary);background:var(--surface-glass-hover); }
.rag-modal-body { padding:12px;max-height:400px;overflow-y:auto; }
.rag-modal-item { display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:12px;cursor:pointer;transition:all .2s; }
.rag-modal-item:hover { background:var(--surface-glass-hover); }
.rag-modal-item.active { background:rgba(0,212,255,.04);border:1px solid rgba(0,212,255,.12); }
.rmi-icon { font-size:22px;flex-shrink:0; }
.rmi-info { flex:1;min-width:0; }
.rmi-title { display:block;font-size:14px;color:var(--text-primary);margin-bottom:2px; }
.rmi-desc { font-size:12px;color:var(--text-muted); }
.rmi-check { color:#00d4ff;font-weight:700;font-size:16px; }

.modal-enter-active,.modal-leave-active { transition:opacity .2s; }
.modal-enter-active .rag-modal,.modal-leave-active .rag-modal { transition:transform .2s ease; }
.modal-enter-from,.modal-leave-to { opacity:0; }
.modal-enter-from .rag-modal,.modal-leave-to .rag-modal { transform:scale(.95); }

@media(max-width:768px){
    .rag-page{flex-direction:column}
    .rag-sidebar{width:100%;max-height:200px;flex-shrink:1}
    .rag-chat{height:calc(100vh - 264px)}
}
</style>
