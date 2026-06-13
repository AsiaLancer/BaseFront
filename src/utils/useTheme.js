/**
 * Theme composable — Dark/Light mode with system preference detection
 * Persists user choice to localStorage, falls back to prefers-color-scheme
 */
import { ref, onMounted } from 'vue'

const THEME_KEY = 'moxue-theme'
const theme = ref('system') // 'system' | 'dark' | 'light'

export function useTheme() {
    function getSystemPreference() {
        if (typeof window === 'undefined') return 'dark'
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    }

    function getEffectiveTheme() {
        if (theme.value === 'system') return getSystemPreference()
        return theme.value
    }

    function applyTheme(effective) {
        const root = document.documentElement
        // Add transitioning class for smooth switch
        root.classList.add('theme-transitioning')
        // Apply
        root.classList.remove('theme-light', 'theme-dark')
        root.classList.add(`theme-${effective}`)
        // Clean up transition class after animation
        setTimeout(() => root.classList.remove('theme-transitioning'), 500)
    }

    function setTheme(newTheme) {
        theme.value = newTheme
        if (newTheme === 'system') {
            localStorage.removeItem(THEME_KEY)
        } else {
            localStorage.setItem(THEME_KEY, newTheme)
        }
        applyTheme(getEffectiveTheme())
    }

    function toggleTheme() {
        const current = getEffectiveTheme()
        setTheme(current === 'dark' ? 'light' : 'dark')
    }

    // Initialize
    onMounted(() => {
        const saved = localStorage.getItem(THEME_KEY)
        if (saved === 'dark' || saved === 'light') {
            theme.value = saved
        }
        applyTheme(getEffectiveTheme())

        // Listen for system changes
        const mq = window.matchMedia('(prefers-color-scheme: light)')
        mq.addEventListener('change', () => {
            if (theme.value === 'system') {
                applyTheme(getSystemPreference())
            }
        })
    })

    return {
        theme,
        getEffectiveTheme,
        setTheme,
        toggleTheme,
    }
}
