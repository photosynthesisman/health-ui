<template>
  <button class="item" @click="$emit('click')">
    <img :src="logo" :alt="name + ' 로고'" class="logo-insurance" />
    <div class="name-insurance">{{ name }}</div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  logo: string
  name: string
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<style lang="scss" scoped>
.item {
  padding: 1.8rem 1.6rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;
  border-radius: 0.8rem;
  background-color: #f9f9f9;
  .logo-insurance {
    width: 4rem;
    height: 4rem;
  }
  .name-insurance {
    font-size: 1.4rem;
    font-weight: 500;
    color: #2b2b2b;
  }
}
</style>
