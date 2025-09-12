<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI 실손 예상 보험금 확인 결과"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="병원 없음" class="img" />
      <div class="tit">AI가 분석한 실손 보험금<br />예상 결과가 없어요</div>
      <Button
        btn-type="line"
        element-type="button"
        aria-label="AI 실손 예상 보험금 확인하기"
        class="xs"
        :width="18.4"
        @click="clickNext"
      />
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'

const clickNext = () => {
  return navigateTo('/insu/claim/subrogation/ai/selectMedicalHistory')
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
