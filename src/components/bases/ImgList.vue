<script setup>

</script>

<template>
    <div class="img-list-container">
        <img src="../assets/imgs/xn20.png" alt="">
        <img src="../assets/imgs/xn21.png" alt="">
        <img src="../assets/imgs/xn22.png" alt="">
        <img src="../assets/imgs/xn23.png" alt="">
        <img src="../assets/imgs/xn24.png" alt="">
        <img src="../assets/imgs/xn25.png" alt="">
        <img src="../assets/imgs/xn26.png" alt="">
        <img src="../assets/imgs/xn27.png" alt="">
        <img src="../assets/imgs/xn28.png" alt="">
        <img src="../assets/imgs/xn29.png" alt="">
        <img src="../assets/imgs/xn30.png" alt="">
        <img src="../assets/imgs/xn31.png" alt="">
        <img src="../assets/imgs/xn32.png" alt="">
    </div>
</template>

<style scoped>
.img-list-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    width: 80%;
    height: 300px;
    margin: 50px auto;
    gap: 10px;
}

.img-list-container img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}
</style>