<template>
  <div class="notice-box">
    {{ text }}
    <i class="info" alt="info"></i>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<style scoped lang="scss">
.notice-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  margin: 0 -2rem;
  padding: 1.3rem 0;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.8rem;
  background-color: #eee;
  color: #555;
  .info {
    width: 2rem;
    height: 2rem;
    background: url('/assets/images/insu/icon-info.svg') center center no-repeat;
    background-size: 100%;
  }
}
</style>
