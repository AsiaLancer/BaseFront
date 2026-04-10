<script setup>

</script>

<template>
    <div class="sidebar">
        <ul>
            <li>
                <a href="#">首页</a>
            </li>
            <li>
                <a href="#">手机</a>
            </li>
            <li>
                <a href="#">电脑</a>
            </li>
            <li>
                <a href="#">平板</a>
            </li>
            <li>
                <a href="#">智能</a>
            </li>
            <li>
                <a href="#">电视</a>
            </li>
            <li>
                <a href="#">手表</a>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.sidebar {
    width: 200px;
    height: 100%;
    background-color: #f5f5f5;
    padding: 20px 0;
}


.sidebar ul li a {
    display: block;
    height: 42px;
    line-height: 42px;
    text-decoration: none;
    background-color: #f55d5d;
    border-radius: 4px;
    color: #fff;
    padding-left: 20px;
}

.sidebar ul li a:hover {
    background-color: #e54d4d;
}
</style>
