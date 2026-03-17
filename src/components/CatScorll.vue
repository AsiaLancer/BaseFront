<template>
    <div class="cat-box">
        <ul class="cat-box-list">
            <li>
                <a href="#">
                    <img src="../assets/imgs/xn1.png" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../assets/imgs/xn2.png" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../assets/imgs/xn3.png" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../assets/imgs/xn4.png" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../assets/imgs/xn5.png" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../assets/imgs/xn6.png" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../assets/imgs/xn7.png" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../assets/imgs/xn8.png" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../assets/imgs/xn9.png" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../assets/imgs/xn10.png" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../assets/imgs/xn11.png" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../assets/imgs/xn12.png" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../assets/imgs/xn13.png" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../assets/imgs/xn14.png" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../assets/imgs/xn15.png" alt="">
                </a>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.cat-box {
    width: 1600px;
    margin: 50px auto;
    position: relative;
    overflow: hidden;
}

.cat-box::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100px;
    background-color: #fff;
    border-radius: 50%;
    transform: translateY(-50%);
}

.cat-box::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100px;
    background-color: #fff;
    border-radius: 50%;
    transform: translateY(50%);
}

.cat-box ul {
    display: flex;
    gap: 15px;
    overflow-x: scroll;
    scrollbar-width: none;
    scroll-behavior: smooth;
}

.cat-box ul::-webkit-scrollbar {
    display: none;
}

.cat-box ul li {
    flex: 0 0 200px;

}

.cat-box ul li img {
    width: 100%;
}
</style>
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    //获取可滚动的容器
    const scrollContainer = document.querySelector('.cat-box-list');
    scrollContainer.addEventListener('wheel', (e) => {
        //阻止默认的垂直滚动行为
        e.preventDefault();
        //根据滚轮的垂直滚动量（deltaY）调整横向滚动量（scrollLeft）
        //乘以系数（如1.5）可调整滚动灵敏度
        scrollContainer.scrollLeft += e.deltaY * 1.5;
    })
})



</script>