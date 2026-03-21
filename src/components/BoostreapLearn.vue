<script setup>
import { ref, onMounted } from 'vue'
import { Tooltip } from 'bootstrap'

const btn = ref(null)
const inputRef = ref(null)

const focusInput = () => {
    inputRef.value.focus()  // 操作 DOM
}
onMounted(() => {
    new Tooltip(btn.value, {
        title: '12312'
    })
})
</script>

<template>
    <div>
        <button class="btn btn-primary" ref="btn">按钮</button>
        <input ref="inputRef" type="text" />

        <h1>这是一个折叠的内容</h1>

        <button @click="focusInput">聚焦</button>
        <div class="collapse">
            <div class="card card-body">
                <p>这是一个折叠的内容</p>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped></style>