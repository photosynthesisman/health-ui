<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 신청"
    logo-type="text"
    :has-notification="true"
    :has-tel-btn="true"
    class="pb-60"
  >
    <TitleSection
      title="신분증을<br />준비해 주세요."
      description="청구의신에서 실손보험을 청구하시려면<br />관련 법규에 의거, 고객님의 신분증이 필요해요."
      class="mt-24"
    />
    <PictureIdItem />
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import PictureIdItem from '~/components/publishing/insu/auto/PictureIdItem.vue'
</script>

<style scoped lang="scss"></style>
