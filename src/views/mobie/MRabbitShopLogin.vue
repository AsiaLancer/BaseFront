<script setup lang="ts">

</script>

<template>
    <div class="login-container">
        <div class="login-nav">
            <i class="iconfont icon-icon-test27"></i>
            <p>注册</p>
        </div>
        <div class="login-header">
            <p>密码登录</p>
            <div class="login-header-item">
                <span>手机验证码登录</span>
                <i class="iconfont icon-icon-test29"></i>
            </div>
        </div>
        <div class="login-content">
            <form>
                <div class="login-content-item">
                    <input type="text" id="phone" placeholder="请输入手机号" autocomplete="off">
                </div>
                <div class="login-content-item">
                    <input type="password" id="password" placeholder="请输入密码" autocomplete="off">
                    <i class="iconfont icon-icon-test1"></i>
                </div>
                <div class="login-content-agree">
                    <i class="iconfont icon-icon-test17"></i>
                    <span>我已同意用户协议及隐私政策</span>
                </div>
                <div class="login-content-btn">
                    <button type="submit">登录</button>
                </div>
                <div class="login-content-forget">
                    <span>忘记密码？</span>
                </div>
                <div class="login-content-footer">
                    <span class="login-third-party">第三方登录</span>
                    <div class="login-third-party-item">
                        <i class="iconfont icon-icon-test28"></i>
                        <i class="iconfont icon-icon-test26"></i>
                        <i class="iconfont icon-icon-test25"></i>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="css" scoped>
.login-container {
    height: var(--mobileH);
    width: var(--mobileW);
    overflow-x: hidden;
    padding: 0 4vmin;
}

.login-nav {
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 4vmin;
    height: 13.3333vmin;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 10vmin rgba(0, 0, 0, 0.1);
    z-index: 999;
}

.login-nav p {
    font-size: 4.2667vmin;
    color: #86c47a;
}

.login-nav i {
    font-size: 6.4vmin;
}

.login-header {
    height: 8vmin;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 16.6667vmin;
}

.login-header p {
    font-size: 7.4667vmin;
}

.login-header-item {
    width: 40vmin;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.login-header-item span {
    font-size: 4.2667vmin;
    line-height: 6.4vmin;
}

.login-header-item i {
    font-size: 6.4vmin;
}

.login-content {
    width: 100%;
    margin-top: 12vmin;
}

.login-content-item {
    height: 16vmin;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.login-content-item input {
    height: 16vmin;
    width: 100%;
    font-size: 3.7333vmin;
    line-height: 16vmin;
    padding: 0 2.6667vmin;
    outline: none;
    border: none;
    border-bottom: .2667vmin solid #c9c9c9;
}

.login-content-item input:focus {
    border-bottom: .2667vmin solid #e40606;
}

.login-content-item:nth-child(2) {
    position: relative;
}

.login-content-item:nth-child(2) i {
    position: absolute;
    right: 2.6667vmin;
    top: 50%;
    transform: translateY(-50%);
    font-size: 4.8vmin;
}

.login-content-agree {
    height: 8vmin;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 4vmin;
    gap: 1.3333vmin;
}

.login-content-agree i {
    font-size: 4.8vmin;
}

.login-content-agree span {
    font-size: 4vmin;
    line-height: 8vmin;
    color: #df7979;
}

.login-content-btn {
    height: 16vmin;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8vmin;
}

.login-content-btn button {
    height: 16vmin;
    width: 80%;
    font-size: 4.2667vmin;
    line-height: 16vmin;
    color: #fff;
    background-color: #df7979;
    border: none;
    border-radius: 8vmin;
    outline: none;
}

.login-content-forget {
    height: 8vmin;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4vmin;
}

.login-content-forget span {
    font-size: 4vmin;
    line-height: 8vmin;
    color: #df7979;
}

.login-content-footer {
    margin: 40vmin 0 20vmin;
    height: 8vmin;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login-content-footer .login-third-party {
    font-size: 4vmin;
    line-height: 8vmin;
    color: #b8b8b8;
}

.login-content-footer .login-third-party-item {
    height: 8vmin;
    width: 32vmin;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.login-content-footer .login-third-party-item i {
    font-size: 10.6667vmin;
}
</style>