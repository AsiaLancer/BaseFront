
/**
 * 发送邮箱验证码
 * @param {string} email - 邮箱地址
 * @returns {Promise} - 包含后端返回数据的 Promise
 */
export const sendEmailCode = (email) => {
    setTimeout(() => {
        return Promise.resolve({ msg: '验证码发送成功', code: 200, data: { canSend: true, remain: 60 } })
    }, 1000)
    todo: 发送验证码到邮箱
}