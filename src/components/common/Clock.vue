<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const time = ref(new Date())
let timer = null
const formattedTime = computed(() => {
    return time.value.toLocaleTimeString('zh-CN', { hour12: false })
})
const formattedDate = computed(() => {
    return time.value.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    })
})

onMounted(() => {
    timer = setInterval(() => {
        time.value = new Date()
    }, 1000)
})
onUnmounted(() => {
    clearInterval(timer)
})
</script>

<template>
    <div class="clock-container">
        <div class="datetime">
            {{ formattedTime }}
        </div>
        <div class="date">
            {{ formattedDate }}
        </div>
    </div>
</template>

<style lang="css" scoped>
.clock-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.datetime {
    font-size: var(--font-size-32);
    font-weight: bold;
    color: var(--color-white);
}

.date {
    font-size: var(--font-size-24);
    color: var(--color-white);
}
</style>