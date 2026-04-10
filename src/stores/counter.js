import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0,
    }),
    getters: {
        doubleCount(state) {
            return state.count * 2
        }
    },
    actions: {
        increment() {
            this.count++
        },
    },
})

export const useBooleanStore = defineStore('boolean', () => {
    const isTrue = ref(true)

    const isHover = computed(() => isTrue.value)
    function toggle() {
        isTrue.value = !isTrue.value
    }

    return { isTrue, toggle, isHover }
})