<script setup>
import { useRoute } from 'vue-router'
import CourseHeader from '@/components/layout/courselayout/CourseHeader.vue'

const route = useRoute()
</script>

<template>
    <div class="layout-root">
        <CourseHeader />
        <main class="layout-main">
            <router-view v-slot="{ Component }">
                <transition name="page-fade" mode="out-in">
                    <component :is="Component" :key="route.path" />
                </transition>
            </router-view>
        </main>
    </div>
</template>

<style scoped>
.layout-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--surface-root);
}
.layout-main {
    flex: 1;
    position: relative;
    z-index: 1;
}

/* Page transition */
.page-fade-enter-active,
.page-fade-leave-active {
    transition: opacity .25s ease, transform .25s ease;
}
.page-fade-enter-from {
    opacity: 0;
    transform: translateY(8px);
}
.page-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
