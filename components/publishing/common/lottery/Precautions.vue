<template>
  <div class="precautions-wrap">
    <p class="tit">{{ title }}</p>
    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  title: { type: String, default: '유의사항' }
})
</script>

<style lang="scss" scoped>
.precautions-wrap {
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 0.8rem;
  .tit {
    margin-bottom: 1.6rem;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 2rem;
  }
  .text {
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.6rem;
    color: #555;
  }
}
</style>
