<template>
  <BaseBody
    page-title="내보내기 상세 내역"
    logo-type="text"
    :has-close-btn="true"
    :has-reward="false"
    :has-add-text-left="true"
  >
    <HospitalInfoField :name="hospitalName" :logo-src="logoSrc" :label="''" class="mt-16" />
    <hr class="hr-section ml-n20 mr-n20 mt-32" />
    <ExportDetail v-model:export-list="myExportData" />
  </BaseBody>
</template>

<script setup lang="ts">
import HospitalInfoField from '~/components/insu/HospitalInfoField.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import ExportDetail from '~/components/insu/ExportDetail.vue'

const hospitalName = ref('서울대학교병원 진료비영수증')
const logoSrc = ref('/_nuxt/assets/images/insu/logo_KUMedicine.svg')
const myExportData = ref([
  {
    id: 1,
    label: 'SNS 공유',
    isPasswordVisible: false,
    password: '12345678',
    checked: false,
    exportDate: '2025.04.20 17:18:26',
    emailAddress: null
  },
  {
    id: 2,
    label: '다운로드',
    isPasswordVisible: true,
    password: '44866845',
    checked: true,
    exportDate: '2025.04.20 17:18:26',
    emailAddress: null
  },
  {
    id: 3,
    label: '이메일',
    isPasswordVisible: false,
    password: '87654321',
    checked: false,
    exportDate: '2025.04.20 17:18:26',
    emailAddress: 'Hospital@naver.com'
  }
])
</script>

<style scoped lang="scss"></style>
