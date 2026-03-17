<script setup>

</script>

<template>
    <div class="nav-bar-list">
        <div class="nav-bar-list-item">
            首页
        </div>
        <div class="nav-bar-list-item">
            课程
        </div>
        <div class="nav-bar-list-item">
            关于
        </div>
        <div class="nav-bar-list-item">
            联系
        </div>
        <div class="nav-bar-list-item">
            电影
        </div>
        <div class="nav-bar-list-item">
            学习
        </div>
        <div class="nav-bar-list-item">
            电视
        </div>
        <div class="nav-bar-list-item">
            图书
        </div>
        <div class="nav-bar-list-item">
            游戏
        </div>
        <div class="nav-bar-list-item">
            更多
        </div>
        <div class="nav-bar-list-item">
            活动
        </div>
        <div class="nav-bar-list-item">
            经济
        </div>
        <div class="nav-bar-list-item">
            助农
        </div>
        <div class="nav-bar-list-item">
            和平
        </div>
    </div>
</template>

<style scoped>
.nav-bar-list {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-content: space-between;
    align-content: space-between;
    height: 100px;
    width: 520px;
    margin: 100px auto;
}

.nav-bar-list-item {
    font-size: 16px;
    color: #333;
    background: #f5f5f5;
    text-align: center;
    height: 40px;
    width: 70px;
    line-height: 40px;
    border-radius: 5px;
}

.nav-bar-list-item:hover {
    background: #e5e5e5;
    color: #fff;
    cursor: pointer;
}
</style>
