<template>
  <BaseBody>
    <ClaimCompletedTop :status="claimStatus" time="2025.04.11 12:12" :insurance-detail="testDetail.insuranceDetail" />
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <ClaimDetailsList list-title="진료비 청구 내용" :items="billingInfoList" />
    <hr class="hr-section mt-8 ml-n20 mr-n20" />
    <ClaimCompletedPointList list-title="포인트 사용내역" :count="testDetail.autoPoint" :items="pointList" />
    <ClaimCompletedAdv />
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="청구의신 홈으로"
        class="lg w-full medium btn-sticky"
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import ClaimCompletedTop from '~/components/publishing/insu/paperless/ClaimCompletedTop.vue'
import ClaimDetailsList from '~/components/publishing/insu/paperless/ClaimDetailsList.vue'
import ClaimCompletedPointList from '~/components/publishing/insu/paperless/ClaimCompletedPointList.vue'
import ClaimCompletedAdv from '~/components/publishing/insu/paperless/ClaimCompletedAdv.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

// 상태 정의
type ClaimStatus = 'generating' | 'sending' | 'success' | 'fail'
const claimStatus = ref<ClaimStatus>('fail')

interface ClaimDetail {
  id: number
  insuranceDetail: {
    insuranceLogo: string
    insuranceName: string
    label: string
    count: number
  }
  status: ClaimStatus
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
    totalPrice: number
  }
  autoPoint: number
  pointInfo: {
    nowPoint: number
    usePoint: number
    remainPoint: number
  }
}

const testDetail: ClaimDetail = {
  id: 1,
  insuranceDetail: {
    insuranceLogo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    insuranceName: '강동성심병원',
    label: 'price',
    count: 1
  },
  status: claimStatus.value,
  billingInfo: {
    insurant: '이레몬',
    beneficiary: '이레몬',
    billCount: '강남성심병원 1건',
    account: {
      bank: '국민은행',
      owner: '이레몬',
      number: '12345678910'
    },
    insurance: '신한라이프',
    totalPrice: 350000
  },
  autoPoint: 1,
  pointInfo: {
    nowPoint: 12000,
    usePoint: 500,
    remainPoint: 11500
  }
}

const billingInfoList = [
  { label: '피보험자(치료 받은 분)', value: testDetail.billingInfo.insurant },
  { label: '수익자(보험금 받는 분)', value: testDetail.billingInfo.beneficiary },
  { label: '청구건수', value: testDetail.billingInfo.billCount },
  {
    label: '보험금 수령계좌',
    value: `${testDetail.billingInfo.account.bank}(${testDetail.billingInfo.account.owner})<br/>${testDetail.billingInfo.account.number}`
  },
  { label: '청구 보험사', value: testDetail.billingInfo.insurance },
  { label: '총 청구 진료비', value: testDetail.billingInfo.totalPrice.toLocaleString() + '원' }
]

const pointList = [
  { label: '보유 포인트', value: `${testDetail.pointInfo.nowPoint.toLocaleString()}P` },
  { label: '사용 포인트', value: `${testDetail.pointInfo.usePoint.toLocaleString()}P` },
  { label: '잔여 포인트', value: `<strong class="blue">${testDetail.pointInfo.remainPoint.toLocaleString()}P</strong>` }
]
</script>

<style scoped lang="scss">
.wrap-claim-detail:deep {
  margin-bottom: 0 !important;
}
</style>
