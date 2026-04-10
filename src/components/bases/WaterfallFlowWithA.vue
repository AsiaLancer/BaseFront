<script setup>

</script>

<template>
    <div class="waterfall-flow">
        <div class="waterfall-flow-item">
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00002_.png" alt="">
            </a>
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00003_.png" alt="">
            </a>
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00004_.png" alt="">
            </a>
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00005_.png" alt="">
            </a>
        </div>
        <div class="waterfall-flow-item">
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00002_.png" alt="">
            </a>
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00001_.png" alt="">
            </a>
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00004_.png" alt="">
            </a>
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00003_.png" alt="">
            </a>
        </div>
        <div class="waterfall-flow-item">
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00001_.png" alt="">
            </a>
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00002_.png" alt="">
            </a>
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00003_.png" alt="">
            </a>
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00004_.png" alt="">
            </a>
        </div>
        <div class="waterfall-flow-item">
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00002_.png" alt="">
            </a>
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00004_.png" alt="">
            </a>
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00001_.png" alt="">
            </a>
            <a href="https://www.baidu.com">
                <img src="../assets/imgs/im_00005_.png" alt="">
            </a>
        </div>
    </div>
</template>

<style scoped>
.waterfall-flow {
    margin: 20px auto;
    width: 80%;
    display: flex;
    gap: 10px;
}

.waterfall-flow-item {
    flex: 1;
}

.waterfall-flow-item img {
    width: 100%;
    vertical-align: middle;
}

.waterfall-flow-item a {
    background-color: pink;
    overflow: hidden;
    width: 100%;
    text-decoration: none;
    color: #000;
    display: block;
    border-radius: 5px;
    /* font-size: 0; */
    margin-bottom: 10px;
}
</style>