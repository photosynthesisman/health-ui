<template>
  <BaseBody
    :show-back-button="true"
    page-title="MY병원 / 보험사 관리"
    logo-type="text"
    :has-notification="false"
    :has-close-btn="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <LineTabs :tabs="tabs" />
    <ManageMyInsuItemList />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'

import ManageMyInsuItemList from '~/components/publishing/insu/auto/ManageMyInsuItemList.vue'

const activeLineTab = ref('accountInfo')
const tabs = ref<Tab[]>([
  { title: 'MY병원', to: '/insu/claim/auto/manageHospital' },
  { title: 'MY보험사', to: '/insu/claim/auto/manageInsurance' }
])
</script>

<style scoped lang="scss"></style>
