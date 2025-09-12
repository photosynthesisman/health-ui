<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 안내"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60 space-between"
  >
    <TitleSection
      class="mt-24"
      title="놓치기 쉬운 실손 보험금<br />간편하게 자동청구 하세요"
      description="통원 진료 후 보험금청구서와 필요한 서류들을 가입 보험사로 자동 전달해 간편하게 실손보험금을 청구 할 수 있어요."
    />

    <AutoClaimUnavailable />
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="실손보험 자동청구 신청하기"
        class="lg w-full btn-sticky"
        @click="requsetForIssuance"
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'

import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import AutoClaimUnavailable from '~/components/publishing/insu/auto/AutoClaimUnavailable.vue'

const clickSignup = (type: string) => {
  navigateTo('/insu/claim/auto/hospitalsOfferAutomaticBilling4Guide')
}
const requsetForIssuance = () => {
  navigateTo('/insu/claim/auto/agreement')
}
</script>

<style scoped lang="scss"></style>
