<script setup>
const props = defineProps({
    id: String
})
</script>

<template>
    <div>
        UserInfo Children2
        13
        {{ $route.params.id }}
        {{ "-----" }}
        {{ props.id }}
    </div>
    <div class="breadcrumb">
        <span v-for="(route, index) in $route.matched" :key="route.path">
            <RouterLink :to="route.path" v-if="index < $route.matched.length - 1">
                {{ route.meta.title || route.name }}
            </RouterLink>
            <span v-else>{{ route.meta.title || route.name }}</span>
            <span v-if="index < $route.matched.length - 1"> / </span>
        </span>
    </div>

</template>

<style lang="css" scoped></style>