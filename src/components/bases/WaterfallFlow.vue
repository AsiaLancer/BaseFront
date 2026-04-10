<script setup>

</script>

<template>
    <div class="waterfall-flow">
        <div class="waterfall-flow-item">
            <img src="../assets/imgs/im_00002_.png" alt="">
            <img src="../assets/imgs/xn20.png" alt="">
            <img src="../assets/imgs/im_00004_.png" alt="">
            <img src="../assets/imgs/xn23.png" alt="">
        </div>
        <div class="waterfall-flow-item">
            <img src="../assets/imgs/xn21.png" alt="">
            <img src="../assets/imgs/im_00001_.png" alt="">
            <img src="../assets/imgs/xn24.png" alt="">
            <img src="../assets/imgs/im_00003_.png" alt="">
        </div>
        <div class="waterfall-flow-item">
            <img src="../assets/imgs/xiana9.png" alt="">
            <img src="../assets/imgs/im_00002_.png" alt="">
            <img src="../assets/imgs/xn22.png" alt="">
            <img src="../assets/imgs/im_00004_.png" alt="">
        </div>
        <div class="waterfall-flow-item">
            <img src="../assets/imgs/xiana7.png" alt="">
            <img src="../assets/imgs/xn25.png" alt="">
            <img src="../assets/imgs/xiana10.png" alt="">
            <img src="../assets/imgs/xn23.png" alt="">
        </div>
    </div>
</template>

<style scoped>
.waterfall-flow {
    margin: 20px auto;
    width: 80%;
    display: flex;
}

.waterfall-flow-item {
    flex: 1;
    /* background-color: pink; */
    border-radius: 5px;
    text-align: center;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin: 0 5px;
}

.waterfall-flow-item img {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
}
</style>