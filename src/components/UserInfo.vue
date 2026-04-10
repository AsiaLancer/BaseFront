<script setup lang="ts">
import { ref } from 'vue'
const sidebars = ref(['学习', '工作', '生活', '其他', '关于', '联系'])
import { useRouter } from 'vue-router'

const router = useRouter()
function openBlank(routeConfig) {
    const { href } = router.resolve(routeConfig)
    window.open(href, '_blank')
}
</script>

<template>
    <div class="container">
        <div class="nav-bar">
            <RouterLink to="/">首页</RouterLink>
            <RouterLink to="/home">关于</RouterLink>
            <RouterLink to="/mHtml">手机端</RouterLink>
            <RouterLink to="/design-code-index">课程首页</RouterLink>
        </div>
        <div class="main">
            <div class="left-wrapper">
                <div class="sidebar">
                    <div class="sidebar-item" v-for="item in sidebars" :key="item">{{ item }}</div>
                </div>
            </div>
            <div class="right-wrapper">
                <div class="main-content">
                    <div class="nav">
                        <router-link :to="{ name: 'UserInfoChildren1' }"
                            active-class="my-active">Children1</router-link>
                        <router-link :to="{ name: 'UserInfoChildren2' }"
                            active-class="my-active">Children2</router-link>
                    </div>
                    <div class="content">
                        <RouterView />
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            footer
        </div>
    </div>

</template>

<style lang="css" scoped>
.container {
    position: relative;
    min-height: 100vh;
    width: 100%;
    color: #fff;
}

.container::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, #000000 0%, #1a1a1a 40%, #504635 70%, #9b8d6a 100%);
    z-index: -999;
}

.footer {
    height: 1000px;
}

.nav-bar {
    position: sticky;
    top: 0;
    height: 42px;
    width: 100%;
    line-height: 42px;
    color: #fff;
    background-image: radial-gradient(transparent 1px, #2e2d2d 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
    z-index: 999;
    display: flex;
    gap: 20px;
    padding: 0 20px;
}

.nav-bar a {
    color: #fff;
}


.my-active {
    color: red;
}

.main {
    display: flex;
    border: 1px solid red;
    height: 720px
}

.left-wrapper {
    width: 200px;
}

.right-wrapper {
    flex: 1;
}

.nav {
    height: 50px;

}

.sidebar {
    height: 100%;
    border: 1px solid #fff;
}

.sidebar-item {
    height: 50px;
    line-height: 50px;
    text-align: center;
}

.main-content {
    height: 100%;
    border: 1px solid #fff;
}

.nav {
    height: 50px;
    line-height: 50px;
    border: 1px solid #fff;
}
</style>