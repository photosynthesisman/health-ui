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
    <ManageMyHospitaltemList />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import ManageMyHospitaltemList from '~/components/publishing/insu/auto/ManageMyHospitaltemList.vue'

const tabs = ref<Tab[]>([
  { title: 'MY병원', to: '/insu/claim/auto/manageHospital' },
  { title: 'MY보험사', to: '/insu/claim/auto/manageInsurance' }
])
</script>

<style scoped lang="scss"></style>
