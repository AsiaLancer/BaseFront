// stores/settings.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
    // ============ State ============
    const theme = ref('light')
    const sideBarOpened = ref(true)
    const language = ref('zh-CN')
    const size = ref('default')  // element-plus 组件尺寸

    // ============ Getters ============
    const isDark = computed(() => theme.value === 'dark')

    // ============ Actions ============
    function toggleSideBar() {
        sideBarOpened.value = !sideBarOpened.value
    }

    function setTheme(newTheme) {
        theme.value = newTheme
        // 可以在这里触发 CSS 变量更新
        document.documentElement.setAttribute('data-theme', newTheme)
    }

    function setLanguage(lang) {
        language.value = lang
    }

    return {
        theme,
        sideBarOpened,
        language,
        size,
        isDark,
        toggleSideBar,
        setTheme,
        setLanguage
    }
}, {
    // 持久化配置
    persist: {
        paths: ['theme', 'sideBarOpened', 'language', 'size']
    }
})