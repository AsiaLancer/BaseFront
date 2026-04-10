<script setup lang="ts">

</script>

<template>
    <div class="flow-gradient">
        <p>
            123
        </p>
    </div>

    <div class="conic-gradient">
        <p>
            123
        </p>
    </div>
</template>

<style scoped>
.conic-gradient {
    position: relative;
    width: 400px;
    height: 300px;
    margin: 50px auto;
    border-radius: 6px;
    padding: 5px;
    line-height: 300px;
    text-align: center;
    background-color: #000;
    overflow: hidden;
}

.conic-gradient::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background-image: conic-gradient(transparent, transparent, transparent, #00ccff);
    animation: rotate 1s linear infinite;
}

.conic-gradient::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    border-radius: 4px;
    background-color: #000;
}

.conic-gradient p {
    position: relative;
    color: #fff;
    font-size: 24px;
    z-index: 1;
}


.flow-gradient {
    position: relative;
    margin: 50px auto;
    width: 200px;
    height: 100px;
    padding: 4px;
    text-align: center;
    line-height: 100px;
    border-radius: 6px;
    overflow: hidden;
}

.flow-gradient:hover::before {
    animation: move .75s linear infinite;
}

.flow-gradient::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(115deg, #4fcf70, #a767e5,
            #12bcfe, #fad648, #4fcf70);
    background-size: 50% 100%;
    /* animation: rotate 1s linear infinite; */
}


.flow-gradient p {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #000;
    color: #fff;
    border-radius: 6px;
}




@keyframes move {
    to {
        transform: translateX(-50%);
    }
}
</style>
