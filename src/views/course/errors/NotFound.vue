<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const isAiWorld = window.location.pathname.startsWith('/ai-world')

function goHome() { router.push(isAiWorld ? '/ai-world' : '/course') }
function goBack() { router.back() }
</script>

<template>
    <div class="nf-page">
        <div class="nf-content">
            <div class="nf-code">404</div>
            <h1 class="nf-title">页面不存在</h1>
            <p class="nf-desc">抱歉，您访问的页面可能已删除或地址有误</p>
            <div class="nf-actions">
                <el-button type="primary" size="large" round @click="goHome">
                    返回{{ isAiWorld ? 'AI World' : '首页' }}
                </el-button>
                <el-button size="large" round class="nf-back" @click="goBack">返回上一页</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.nf-page { min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:var(--surface-root); }
.nf-content { max-width:500px; }
.nf-code { font-size:140px;font-weight:900;line-height:1;background:linear-gradient(135deg,#00d4ff,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;font-family:var(--font-display); }
.nf-title { font-size:24px;color:var(--text-primary);margin-bottom:12px;font-family:var(--font-display); }
.nf-desc { color:var(--text-secondary);margin-bottom:36px; }
.nf-actions { display:flex;justify-content:center;gap:12px; }
.nf-back { border-color:var(--border-default)!important;color:var(--text-secondary)!important; }
</style>
