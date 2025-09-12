<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI분석 숨은 보상금 찾기 결과"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="병원 없음" class="img" />
      <div class="tit">숨은 보상금 찾기 결과가 없어요.</div>
      <Button
        btn-type="line"
        element-type="button"
        aria-label="AI분석 숨은 보상금 찾기"
        class="xs"
        :width="16"
        @click="clickNext"
      />
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import BaseBody from '~/components/layout/BaseBody.vue'

const clickNext = () => {
  return navigateTo('/insu/claim/subrogation/ai/searchResult')
}
</script>

<style scoped lang="scss">
.wrap-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 18.4rem 0;
  color: #555;
  .img {
    width: 8rem;
    height: 8rem;
  }
  .tit {
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 1.4;
    color: #555;
    text-align: center;
  }
}
</style>
