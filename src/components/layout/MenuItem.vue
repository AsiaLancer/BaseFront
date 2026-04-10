<!-- components/Layout/MenuItem.vue -->
<template>
    <el-sub-menu v-if="menu.children && menu.children.length > 0"
        :index="`${parentPath}/${menu.path}`.replace(/\/+/g, '/')">
        <i :class="menu.meta?.icon"></i>
        <template #title>
            <span>{{ menu.meta?.title }}</span>
        </template>
        <!-- 递归渲染子菜单 -->
        <MenuItem v-for="child in menu.children" :key="child.path" :item="child"
            :parentPath="`${parentPath}/${menu.path}`.replace(/\/+/g, '/')" />
    </el-sub-menu>

    <!-- 没有子菜单 -->
    <el-menu-item v-else :index="`${parentPath}/${menu.path}`.replace(/\/+/g, '/')">
        <i :class="menu.meta?.icon"></i>
        <template #title>
            <span>{{ menu.meta?.title }}</span>
        </template>
    </el-menu-item>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    parentPath: {
        type: String,
        default: ''
    }
})

const menu = props.item
</script>