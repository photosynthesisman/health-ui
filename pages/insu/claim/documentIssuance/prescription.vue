<template>
  <BaseBody
    :show-back-button="true"
    page-title="처방전 조회/발급"
    logo-type="text"
    :has-cart="true"
    :cart-count="2"
    :has-add-text-left="true"
  >
    <!-- 병원 선택 -->
    <SelectHospital />
    <!-- 기준일 선택 -->
    <TotalCountSelectInsuType />
    <!-- 처방전 리스트 -->
    <PrescriptionList />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'

import SelectHospital from '~/components/publishing/insu/documentIssuance/SelectHospital.vue'
import TotalCountSelectInsuType from '~/components/publishing/common/temp/TotalCountSelectInsuType.vue'

import PrescriptionList from '~/components/publishing/insu/documentIssuance/PrescriptionList.vue'
</script>

<style scoped lang="scss"></style>
