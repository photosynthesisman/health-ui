<template>
  <BaseBody
    :show-back-button="false"
    page-title=""
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text-left="false"
    class="pb-60"
  >
    <AutoClaimSearching />
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import AutoClaimSearching from '~/components/publishing/insu/auto/AutoClaimSearching.vue'

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
