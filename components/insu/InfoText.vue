<template>
  <div class="wrap-info-text" :class="{ 'gray-type': gray }">
    <i class="info" alt="info"></i>
    <div class="text">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: '설명 텍스트 입니다'
  },
  gray: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
.wrap-info-text {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.2rem;
  &.gray-type {
    .info {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M10 10V6.25M10 12.7795V12.8125M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
    .text {
      color: #959595;
    }
  }
  .info {
    width: 2rem;
    height: 2rem;
    background: url('/assets/images/insu/icon-info.svg') center center no-repeat;
    background-size: 100%;
  }
  .text {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2rem;
    color: #555;
  }
}
</style>
