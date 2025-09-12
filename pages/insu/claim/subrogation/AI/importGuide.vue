<template>
  <BaseBody
    :show-back-button="true"
    page-title="내 보험 정보"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <TitleSection
      title="흩어져 있는 내 보험,<br />클릭 한번으로 모아보세요"
      class="mt-24"
      :description="'금융 마이데이터를 통해 내 보험<br/>가입내역과 납입 보험료를 확인해요.'"
    />
    <img class="img-main" src="/assets/images/insu/ai/img-importGuide.png" alt="이미지:내 보험 가져오기 안내" />
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="내 보험 가져오기"
      class="lg w-full medium btn-sticky"
    />
  </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import TitleSection from '~/components/insu/TitleSection.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
</script>

<style scoped lang="scss">
.img-main {
  margin: 10rem auto 0;
  width: 23rem;
}
</style>
