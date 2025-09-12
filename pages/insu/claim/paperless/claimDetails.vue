<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류없이 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <TitleSection title="청구할 내용을 확인해 주세요" class="mt-24 mb-32" />
    <ClaimDetailsTop
      :hospital-logo="testDetail.hospitalLogo"
      :hospital-name="testDetail.hospitalName"
      :status="testDetail.status"
      :total-count="testDetail.totalCount"
      :total-price="testDetail.totalBill"
    />
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <ClaimDetailsList list-title="청구내역" :items="listItems" />
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="청구하기"
        class="lg w-full medium btn-sticky"
        :disabled="hasSelectedHospitals"
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import ClaimDetailsTop from '~/components/publishing/insu/paperless/ClaimDetailsTop.vue'
import ClaimDetailsList from '~/components/publishing/insu/paperless/ClaimDetailsList.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

interface ClaimDetail {
  id: number
  hospitalLogo: string
  hospitalName: string
  status: string
  totalCount: number
  totalBill: number
  billingInfo: {
    insurant: string
    beneficiary: string
    billCount: string
    account: {
      bank: string
      owner: string
      number: string
    }
    insurance: string
  }
}

const testDetail: ClaimDetail = {
  id: 1,
  hospitalLogo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
  hospitalName: '강동성심병원',
  status: 'in',
  totalCount: 12,
  totalBill: 8600,
  billingInfo: {
    insurant: '이레몬',
    beneficiary: '이레몬',
    billCount: '강남성심병원 1건',
    account: {
      bank: '국민은행',
      owner: '이레몬',
      number: '12345678910'
    },
    insurance: '신한라이프'
  }
}

const listItems = [
  { label: '피보험자(치료 받은 분)', value: testDetail.billingInfo.insurant },
  { label: '수익자(보험금 받는 분)', value: testDetail.billingInfo.beneficiary },
  { label: '청구건수', value: testDetail.billingInfo.billCount },
  {
    label: '보험금 수령계좌',
    value: `${testDetail.billingInfo.account.bank}(${testDetail.billingInfo.account.owner})<br/>${testDetail.billingInfo.account.number}`
  },
  { label: '청구 보험사', value: testDetail.billingInfo.insurance }
]
</script>

<style scoped lang="scss"></style>
