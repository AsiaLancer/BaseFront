<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
onMounted(async () => {
  await userStore.initUserState()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
