const STORAGE_PREFIX = 'shengxin_'

/**
 * 存储数据到 localStorage
 * @param {string} key - 键名
 * @param {any} value - 值（会自动 JSON 序列化）
 */
export function setItem(key, value) {
    try {
        const data = JSON.stringify(value)
        localStorage.setItem(STORAGE_PREFIX + key, data)
        return true
    } catch (error) {
        console.error('Storage setItem error:', error)
        return false
    }
}

/**
 * 从 localStorage 获取数据
 * @param {string} key - 键名
 * @param {any} defaultValue - 默认值（如果数据不存在则返回）
 * @returns {any} - 数据（会自动 JSON 解析）
 */
export function getItem(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(STORAGE_PREFIX + key)
        return data ? JSON.parse(data) : defaultValue
    } catch (error) {
        console.error('Storage getItem error:', error)
        return defaultValue
    }
}

/**
 * 从 localStorage 中移除数据
 * @param {string} key - 键名
 */
export function removeItem(key) {
    try {
        localStorage.removeItem(STORAGE_PREFIX + key)
        return true
    } catch (error) {
        console.error('Storage removeItem error:', error)
        return false
    }
}

/**
 * 清空所有以 shengxin_ 前缀的存储数据
 */
export function clear() {
    try {
        const keys = Object.keys(localStorage)
        keys.forEach(key => {
            if (key.startsWith(STORAGE_PREFIX)) {
                localStorage.removeItem(key)
            }
        })
        return true
    } catch (error) {
        console.error('Storage clear error:', error)
        return false
    }
}
/**
 * 检查 localStorage 中是否存在指定键名的数据
 * @param {string} key - 键名
 * @returns {boolean} - 是否存在数据
 */
export function hasItem(key) {
    return getItem(STORAGE_PREFIX + key) !== null
}

/**
 * 获取所有存储在 localStorage 中的键名（不包含前缀）
 * @returns {string[]} - 键名数组
 */
export function keys() {
    return Object.keys(localStorage)
        .filter(key => key.startsWith(STORAGE_PREFIX))
        .map(key => key.replace(STORAGE_PREFIX, ''))
}

export default {
    setItem,
    getItem,
    removeItem,
    clear,
    hasItem,
    keys,
}
