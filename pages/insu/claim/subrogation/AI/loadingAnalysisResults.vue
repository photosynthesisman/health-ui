<template>
  <BaseBody>
    <div class="wrap-loading">
      <img src="/assets/images/insu/img-loading-find.svg" alt="병원 없음" class="img" />
      <div class="tit">AI가 실손 예상 보험금을<br />분석하고 있어요.</div>
      <div class="sut-tit">최대 1분까지 걸릴 수 있어요.</div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
</script>

<style scoped lang="scss">
.wrap-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18.4rem 0;
  .img {
    width: 12.8rem;
    height: 12.8rem;
  }
  .tit {
    margin-top: 0.8rem;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1.3;
    text-align: center;
  }
  .sub-tit {
    margin-top: 0.8rem;
    font-size: 1.6rem;
    color: #555;
  }
}
</style>
