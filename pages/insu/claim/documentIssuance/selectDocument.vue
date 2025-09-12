<template>
  <BaseBody
    :show-back-button="true"
    page-title="장바구니"
    logo-type="text"
    :has-reward="false"
    :has-add-text-left="true"
  >
    <PaperMedicalHistoryToggle v-model:total-cost="totalCost" v-model:total-count="totalCount" :hospitals="hospitals" />
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" class="lg w-full medium btn-sticky" @click="clickNext"
        >{{ totalCost.toLocaleString() }}원 결제하기({{ totalCount }}건)</Button
      >
    </ButtonGroup>
  </BaseBody>
</template>

<script setup>
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import PaperMedicalHistoryToggle from '~/components/insu/PaperMedicalHistoryToggle.vue'
const totalCost = ref(0)
const totalCount = ref(0)
const hospitals = ref([
  {
    name: '충북대학교병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    documents: [
      {
        name: '진료비영수증',
        creationDate: '2024.02.20',
        treatmentDate: '2023.10.23',
        department: '신경내과',
        doctor: '이현정',
        count: 1,
        issuanceCost: 20000,
        agencyFee: 1000,
        agencyFeeVat: 100
      },
      {
        name: '외래진료확인서',
        creationDate: '2024.02.20',
        treatmentDate: '2023.10.23',
        department: '신경내과',
        doctor: '이현정',
        count: 1,
        issuanceCost: 20000,
        agencyFee: 1000,
        agencyFeeVat: 100
      }
    ]
  },
  {
    name: '충북대학교병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    documents: [
      {
        name: '진료비영수증',
        creationDate: '2024.02.20',
        treatmentDate: '2023.10.23',
        department: '신경내과',
        doctor: '이현정',
        count: 1,
        issuanceCost: 30000,
        agencyFee: 1000,
        agencyFeeVat: 100
      }
    ]
  }
])
</script>
<style lang="scss" scoped></style>
