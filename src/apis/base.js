import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

request.interceptors.request.use(
    (config) => {
        // 这里什么都不用做！
        // 因为我们用 HttpOnly Cookie，不手动加 Authorization
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
request.interceptors.response.use(
    (response) => {
        // 直接把后端返回的 data 抽出来
        const res = response.data

        // 后端通用成功码：200 或 0 都行，你们统一就行
        if (res.code === 200) {
            return res // 直接返回数据
        } else {
            // 后端返回错误，统一提示
            ElMessage.error(res.msg || '请求失败')
            return Promise.reject(res)
        }
    },
    (error) => {
        // HTTP 错误统一处理
        let msg = '网络异常'

        if (error.response) {
            const status = error.response.status
            switch (status) {
                case 401:
                    msg = '未登录或登录已过期'
                    // 这里可以跳登录页
                    break
                case 403:
                    msg = '没有权限'
                    break
                case 404:
                    msg = '接口不存在'
                    break
                case 500:
                    msg = '服务器错误'
                    break
            }
        }

        ElMessage.error(msg)
        return Promise.reject(error)
    }
)

/**
 * GET 请求
 * @param {string} url - 接口地址
 * @param {object} params - 请求参数
 * @returns {Promise} - 包含后端返回数据的 Promise
 */
export const get = (url, params) => {
    return request({
        url,
        method: 'GET',
        params
    })
}

/**
 * POST 请求
 * @param {string} url - 接口地址
 * @param {object} data - 请求数据
 * @returns {Promise} - 包含后端返回数据的 Promise
 */
export const post = (url, data) => {
    return request({
        url,
        method: 'POST',
        data
    })
}