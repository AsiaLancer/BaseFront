<script setup>

</script>

<template>
    <div class="display-card">
        <ul>
            <li>
                第一个卡片
            </li>
            <li>
                第二个卡片
            </li>
            <li>
                第三个卡片
            </li>
            <li>
                第四个卡片
            </li>
        </ul>
    </div>
</template>

<style scoped>
.display-card {
    width: 100%;
    height: 100%;
    padding: 0 auto;
    text-align: center;
}

.display-card ul li {
    display: inline-block;
    width: 200px;
    height: 300px;
    background-color: pink;
    margin: 10px 10px;
    padding: 10px 0;
    border-radius: 5px;
}

.display-card ul li:hover {
    box-shadow: 0 0 10px 2px #ee8282;
}
</style>