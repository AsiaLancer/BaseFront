<script setup>

</script>

<template>
    <div class="gradient-rotation-container">
        <div class="gradient-rotation">
            <div class="gradient-rotation-item">
                1
            </div>
        </div>
    </div>
</template>

<style scoped>
.gradient-rotation-container {
    width: 400px;
    height: 500px;
    border: 1px solid red;
    overflow: hidden;
}

.gradient-rotation {
    width: 100%;
    height: 100%;
    background-image:
        linear-gradient(to top left, rgba(255, 0, 0, 0.5) 0%, transparent 50%),
        linear-gradient(to top right, rgba(0, 255, 0, 0.5) 0%, transparent 50%),
        linear-gradient(to bottom left, rgba(0, 0, 255, 0.5) 0%, transparent 50%),
        linear-gradient(to bottom right, rgba(255, 255, 0, 0.5) 0%, transparent 50%);
    padding: 15px;
    /**
    让这个旋转 */
    animation: rotation 1s linear infinite;
}

.gradient-rotation-item {
    width: 95%;
    height: 95%;
    background-color: gray;
    margin: 0 auto;
    border-radius: 10px;
}
</style>