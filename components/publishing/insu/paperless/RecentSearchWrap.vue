<template>
  <div class="wrap-recent-searches">
    <div class="text">최근 검색</div>
    <Button btn-type="text" element-type="button" aria-label="전체삭제" class="hasLine xs" />
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
</script>

<style lang="scss" scoped>
.wrap-recent-searches {
  width: 100%;
  height: 6.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 140%;
    color: #2b2b2b;
  }
}
</style>
