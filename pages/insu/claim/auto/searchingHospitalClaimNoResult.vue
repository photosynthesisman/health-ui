<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 신청"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <AutoClaimSearchingNoresult />
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="청구의신 앱 설치하기"
      class="lg w-full medium btn-sticky"
      @click="clickNext"
    />
  </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import AutoClaimSearchingNoresult from '~/components/publishing/insu/auto/AutoClaimSearchingNoresult.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '대리청구 안내'
  // utils: ['phone']
  // customTitle: 'logo',
})
</script>

<style scoped lang="scss"></style>
