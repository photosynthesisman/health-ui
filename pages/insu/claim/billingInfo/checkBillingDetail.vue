<template>
  <BaseBody
    :show-back-button="true"
    page-title="청구 상세내역 조회"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
  >
    <FlexSection>
      <BillingDetailHead
        :logo="testDetail.insuranceLogo"
        :name="testDetail.insuranceName"
        :status="testDetail.status"
      />
    </FlexSection>
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <BillingDetailList :summary="testDetail.billingInfo" />
    <BillingDetailHospital
      :logo="testDetail.hospitalInfo.hospitalLogo"
      :name="testDetail.hospitalInfo.hospitalName"
      :visit-label="testDetail.hospitalInfo.visitLabel"
      :auto-billing="testDetail.hospitalInfo.autoBilling"
      :details="testDetail.hospitalInfo.details"
    />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import BillingDetailHead from '~/components/publishing/insu/billingInfo/BillingDetailHead.vue'
import BillingDetailList from '~/components/publishing/insu/billingInfo/BillingDetailList.vue'
import BillingDetailHospital from '~/components/publishing/insu/billingInfo/BillingDetailHospital.vue'

// 타입 정의
interface BillingDetail {
  id: number
  insuranceLogo: string
  insuranceName: string
  status: string
  billingInfo: {
    billingDate: string
    insurant: string
    beneficiary: string
    accidentType: string
    accidentDetail: string
    account: {
      bank: string
      owner: string
      number: string
    }
    contact: {
      name: string
      role: string
      phone: string
    }
    totalBill: number
    memo?: string
  }
  hospitalInfo: {
    hospitalLogo: string
    hospitalName: string
    visitLabel: string
    autoBilling: boolean
    details: {
      department: string
      date: string
      amount: number
    }[]
  }
}

// 테스트 데이터
const testDetail: BillingDetail = {
  id: 1,
  insuranceLogo: '/_nuxt/assets/images/insu/logo_kbbank.svg',
  insuranceName: 'KB손해보험',
  status: 'done',
  billingInfo: {
    billingDate: '2025.04.01',
    insurant: '김레몬',
    beneficiary: '이헬스',
    accidentType: '질병',
    accidentDetail: '감기',
    account: {
      bank: '국민은행',
      owner: '이레몬',
      number: '12345678910'
    },
    contact: {
      name: '박미란',
      role: '설계자',
      phone: '010-1234-5678'
    },
    totalBill: 300000,
    memo: '메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다.'
  },
  hospitalInfo: {
    hospitalLogo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    hospitalName: '강남성심병원',
    visitLabel: 'visit',
    autoBilling: true,
    details: [
      { department: '안과', date: '2025.03.25', amount: 150000 },
      { department: '내과', date: '2025.03.26', amount: 150000 }
    ]
  }
}
</script>

<style scoped lang="scss"></style>
