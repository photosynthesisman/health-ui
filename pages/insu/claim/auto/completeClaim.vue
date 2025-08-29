<template>
  <BaseBody logo-type="text" class="pb-36">
    <CompleteTitleSection :title="'자동청구 신청을<br/>완료했어요.'" />
    <InfoText :text="'실손보험 자동청구 내역은 청구의신 앱에서 확인 가능해요.'" />
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="청구의신 앱 설치하기"
      class="lg w-full medium btn-sticky"
    />
  </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import InfoText from '~/components/insu/InfoText.vue'
import CompleteTitleSection from '~/components/insu/CompleteTitleSection.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
</script>
<style lang="scss" scoped>
:deep(.header-section) {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
:deep(.wrap-info-text) {
  position: absolute;
  left: 0;
  bottom: 5.6rem;
  width: 100%;
  margin-bottom: 0;
  justify-content: center;
}
</style>
