<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 안내"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-30 space-between"
  >
    <TitleSection
      class="mt-24"
      title="놓치기 쉬운 실손 보험금<br /><strong class='blue'>간편하게 자동청구</strong> 하세요"
      description="통원 진료 후 필요한 청구 서류들을 보험사로<br />자동 전달해 실손보험금을 청구할 수 있어요."
    />

    <SubMainVisual />
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'

import SubMainVisual from '~/components/publishing/insu/auto/SubMainVisual.vue'
</script>

<style scoped lang="scss"></style>
