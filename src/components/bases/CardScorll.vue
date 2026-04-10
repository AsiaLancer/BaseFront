<template>
    <div class="container">
        <div class="shell">
            <div class="box">
                <h2 class="title">NO1</h2>
                <img src="../assets/imgs/im_00002_.png" alt="">
                <p class="text">
                    劝君莫惜金缕衣，劝君惜取少年时。
                </p>
            </div>

            <div class="box">
                <h2 class="title">NO2</h2>
                <img src="../assets/imgs/im_00003_.png" alt="">
                <p class="text">
                    劝君莫惜金缕衣，劝君惜取少年时。
                </p>
            </div>

            <div class="box">
                <h2 class="title">NO3</h2>
                <img src="../assets/imgs/im_00004_.png" alt="">
                <p class="text">
                    劝君莫惜金缕衣，劝君惜取少年时。
                </p>
            </div>

            <div class="box">
                <h2 class="title">NO4</h2>
                <img src="../assets/imgs/im_00005_.png" alt="">
                <p class="text">
                    劝君莫惜金缕衣，劝君惜取少年时。
                </p>
            </div>

            <div class="box">
                <h2 class="title">NO5</h2>
                <img src="../assets/imgs/im_00001_.png" alt="">
                <p class="text">
                    闵子然
                </p>
            </div>


            <div class="box">
                <h2 class="title">NO6</h2>
                <img src="../assets/imgs/im_00006_.png" alt="">
                <p class="text">
                    李泰然
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(45deg, rgba(142, 197, 252, 1.000) 0%,
            rgba(193, 210, 255, 1.000) 50%, rgba(224, 195, 255, 1.000) 100%);
}

.shell {
    width: 1320px;
    height: 700px;
    display: flex;
    border-radius: 10px;
    overflow: hidden;
    flex-direction: row;
}

.box {
    position: relative;
    height: 100%;
    width: 20%;
    overflow: hidden;
    transition: .5s;
    color: #fff;
}

.box:hover {
    width: 80%;
}

.box:hover .text {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 200ms;
}

.box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: .5s;
}

.title {
    position: absolute;
    top: 1rem;
    font-size: 1.5rem;
    z-index: 2;
    text-align: center;
    width: 100%;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}

.text {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 1.5rem;
    padding-bottom: 1.5rem;
    text-align: center;
    opacity: 0;
    transform: translateY(100%);
    transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
    text-shadow: 0 0 10px rgba(60, 138, 255);
    background: linear-gradient(to top, rgba(137, 152, 236, 0.8), transparent);
}

.box::before {
    content: '';
    position: absolute;
    z-index: 1;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), transparent 25%, transparent 50%, rgba(0, 0, 0, 0.25));
}
</style>