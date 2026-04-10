<script setup>
import { ref, computed, onMounted } from 'vue'
let date = ref(new Date().toLocaleString())
const props = defineProps({
    message: {
        type: String,
        default: '123'
    }
})
const model = defineModel()
const titleModel = defineModel('title')
const items = ref([])
setTimeout(() => {
    items.value = [
        { body: 'Scoped Slots Guide', username: 'Evan You', likes: 20 },
        { body: 'Vue Tutorial', username: 'Natalia Tepluhina', likes: 10 }
    ]
}, 1000)
</script>

<template>
    <p class="foo" :class="$attrs.class">
        New Need Learn
    </p>
    <p class="boo" :class="$attrs.class">
        Boo
    </p>
    <p>{{ date }}</p>
    <button @click="$emit('call-me')">Click Me</button>
    <p>{{ message }}</p>
    <slot />
    <ul>
        <li v-if="!items.length">
            Loading...
        </li>
        <li v-for="item in items">
            <slot name="item" v-bind="item" />
        </li>
    </ul>
    <slot name="fortest"></slot>
    <slot name="fortest"></slot>

    <p>{{ model }}</p>
    <input type="text" v-model="model">
    <p>{{ titleModel }}</p>
    <input type="text" v-model="titleModel">
</template>

<style lang="css" scoped>
ul {
    list-style-type: none;
    padding: 5px;
    background: linear-gradient(315deg, #42d392 25%, #647eff);
}

li {
    padding: 5px 20px;
    margin: 10px;
    background: #fff;
}
</style>