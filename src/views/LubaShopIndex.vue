<template>
    <!--商店主页练习 -->
    <div class="shop-index">
        <div class="short-cut">
            <div class="left"></div>
            <div class="center">
                <ul>
                    <li>
                        <a href="">首页</a>
                    </li>
                    <li class="line">
                    </li>
                    <li>
                        <a href="">菜单</a>
                    </li>
                    <li class="line">
                    </li>
                    <li>
                        <a href="">分类</a>
                    </li>
                    <li class="line">
                    </li>
                    <li>
                        <a href="">购物车</a>
                    </li>
                    <li class="line">
                    </li>
                    <li>
                        <a href="">登录</a>
                    </li>
                    <li class="line">
                    </li>
                    <li>
                        <a href="">注册</a>
                    </li>
                    <li class="line">
                    </li>
                    <li>
                        <a href="">联系我们</a>
                    </li>
                    <li class="line">
                    </li>
                    <li>
                        <a href="">关于我们</a>
                    </li>
                </ul>
            </div>
            <div class="right"></div>
        </div>

        <div class="nav-container">
            <div class="logo left">
                <h1>
                    <a href="http://localhost:5173/lubashop-index" title="鲁巴克内商店">
                        鲁巴克内商店
                    </a>
                </h1>
            </div>
            <div class="nav-item center">

            </div>
            <div class="right">
                信息
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.shop-index {
    width: 100%;
    height: 100%;
}

.nav-container {
    display: flex;
    height: 150px;
    border: 1px solid #ccc;
}

.logo h1 {
    width: 100%;
    height: 100%;
    background-image: url('../assets/imgs/im_00005_.png');
}

.logo h1 a {
    height: 100%;
    color: #fff;
    width: 100%;
    display: block;
    text-indent: -9999px;
}

.short-cut {
    height: 54px;
    background-color: #bbe8f0;
    display: flex;
}

.short-cut ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 54px;
    gap: 0 15px;
    margin-right: 20px;
}

.short-cut .line {
    width: 1px;
    height: 12px;
    background-color: #2c2929;
}

.short-cut li a {
    color: #808080;
}

.short-cut li a:hover {
    color: #000000;
}

.left {
    flex: 1;
    background-color: #dac8c8;
    border: 1px dashed #ccc;
}

.center {
    flex: 6;
    background-color: #e4bdbd;
    border: 1px dashed #ececec;
}

.right {
    flex: 1;
    background-color: #dac8c8;
    border: 1px dashed #ccc;
}
</style>
