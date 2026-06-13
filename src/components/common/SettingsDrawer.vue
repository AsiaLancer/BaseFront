<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useTheme } from '@/utils/useTheme'
import { Close, Sunny, Moon, Lock, Bell, SwitchButton, ArrowRight } from '@element-plus/icons-vue'

const props = defineProps({ visible: Boolean })
const emit = defineEmits(['close'])

const router = useRouter()
const userStore = useUserStore()
const { getEffectiveTheme, toggleTheme } = useTheme()
const isDark = computed(() => getEffectiveTheme() === 'dark')

function close() { emit('close') }
async function handleLogout() {
    await userStore.logout()
    router.push('/login')
    close()
}
</script>

<template>
<Transition name="drawer">
<div v-if="visible" class="sd-overlay" @click.self="close">
    <div class="sd-panel">
        <div class="sd-head">
            <h3>设置</h3>
            <button class="sd-close" @click="close"><el-icon :size="18"><Close/></el-icon></button>
        </div>
        <div class="sd-body">
            <div class="sd-item" @click="toggleTheme">
                <span><el-icon><component :is="isDark?Sunny:Moon"/></el-icon> 主题切换</span>
                <span class="sd-val">{{ isDark?'暗色模式':'亮色模式' }}</span>
            </div>
            <div class="sd-item">
                <span><el-icon><Lock/></el-icon> 隐私设置</span>
                <el-icon><ArrowRight/></el-icon>
            </div>
            <div class="sd-item">
                <span><el-icon><Bell/></el-icon> 通知设置</span>
                <el-icon><ArrowRight/></el-icon>
            </div>
            <div class="sd-divider"></div>
            <div class="sd-item danger" @click="handleLogout">
                <span><el-icon><SwitchButton/></el-icon> 退出登录</span>
            </div>
        </div>
    </div>
</div>
</Transition>
</template>

<style scoped>
.sd-overlay { position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.5);display:flex;justify-content:flex-end; }
.sd-panel { width:360px;height:100%;background:var(--surface-root);border-left:1px solid var(--border-subtle);display:flex;flex-direction:column; }
.sd-head { display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid var(--border-subtle); }
.sd-head h3 { font-family:var(--font-display);font-size:16px;color:var(--text-primary); }
.sd-close { background:none;border:none;color:var(--text-muted);cursor:pointer;padding:4px;border-radius:6px;transition:all .15s; }
.sd-close:hover { color:var(--text-primary);background:var(--surface-glass-hover); }
.sd-body { flex:1;padding:16px 0; }
.sd-item { display:flex;justify-content:space-between;align-items:center;padding:14px 24px;cursor:pointer;transition:background .15s;color:var(--text-secondary);font-size:14px; }
.sd-item:hover { background:var(--surface-glass-hover); }
.sd-item span { display:inline-flex;align-items:center;gap:10px; }
.sd-item.danger { color:#f87171; }
.sd-val { font-size:12px;color:var(--text-muted); }
.sd-divider { height:1px;background:var(--border-subtle);margin:8px 24px; }
.drawer-enter-active,.drawer-leave-active { transition:opacity .25s; }
.drawer-enter-active .sd-panel,.drawer-leave-active .sd-panel { transition:transform .25s ease; }
.drawer-enter-from,.drawer-leave-to { opacity:0; }
.drawer-enter-from .sd-panel,.drawer-leave-to .sd-panel { transform:translateX(100%); }
</style>
