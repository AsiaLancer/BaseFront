<script setup>
import { ref } from 'vue'

const props = defineProps({
    src: { type: String, default: '' },
    poster: { type: String, default: '' },
})

const hovering = ref(false)
const loaded = ref(false)
const videoRef = ref(null)

function onEnter() {
    hovering.value = true
    if (!loaded.value) { loaded.value = true }
    nextTick(() => {
        const v = videoRef.value
        if (v) { v.currentTime = 0; v.play().catch(()=>{}) }
    })
}
function onLeave() {
    hovering.value = false
    const v = videoRef.value
    if (v) { v.pause(); v.currentTime = 0 }
}

import { nextTick } from 'vue'
</script>

<template>
    <div class="vp-wrap" @mouseenter="onEnter" @mouseleave="onLeave">
        <!-- Muted preview video -->
        <video v-if="loaded" ref="videoRef" :src="src" :poster="poster"
            muted loop playsinline preload="none"
            class="vp-video" :class="{show:hovering}"></video>
        <!-- Play indicator -->
        <span v-if="!hovering" class="vp-indicator"><svg viewBox="0 0 24 24" width="36" height="36" fill="#fff"><path d="M8 5v14l11-7z"/></svg></span>
    </div>
</template>

<style scoped>
.vp-wrap { position:absolute; inset:0; z-index:2; display:flex; align-items:center; justify-content:center; cursor:pointer; }
.vp-video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; transition:opacity .3s; }
.vp-video.show { opacity:1; }
.vp-indicator { position:relative; z-index:1; width:48px;height:48px;border-radius:50%;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;transition:opacity .3s,transform .2s; }
.vp-wrap:hover .vp-indicator { transform:scale(1.1); }
</style>
