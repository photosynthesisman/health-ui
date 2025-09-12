<template>
  <BaseBody
    :show-back-button="true"
    page-title="병원서류 발급신청"
    logo-type="text"
    :has-cart="true"
    :cart-count="2"
    class="pb-36"
  >
    <TitleSection title="발급할 진료내역을<br />선택해 주세요." class="mt-24" />
    <PaperMedicalHistoryAccordion :insurances="dummyInsurances" @payment="handlePayment" />
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        :aria-label="`장바구니 담기(${selectedCount}건)`"
        class="lg w-full medium btn-sticky"
      />
    </ButtonGroup>
  </BaseBody>
  <BottomModal
    :is-visible="isShowPaymentModal"
    title="결제 방법을 선택해 주세요."
    :is-show-cancel-button="false"
    :is-show-confirm-button="false"
    confirm-button-text="확인"
    @close="isShowPaymentModal = false"
    @confirm="clickNext"
  >
    <template #content>
      <PaymentModalContent :total-price="totalPrice" />
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { computed, ref } from 'vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import TitleSection from '~/components/insu/TitleSection.vue'
import PaperMedicalHistoryAccordion from '~/components/insu/PaperMedicalHistoryAccordion.vue'
import PaymentModalContent from '~/components/insu/PaymentModalContent.vue'

const totalPrice = ref()
const isShowPaymentModal = ref(false)
const handlePayment = (payload: { index: number; totalCost: string }) => {
  isShowPaymentModal.value = true
  totalPrice.value = payload.totalCost
}
const clickNext = () => {
  // return navigateTo('/insu/')
}

// 진료내역 선택 상태 관리 (실제 체크박스 개수에 맞춤)
const insuranceSelections = ref([false, false])

// 전체 선택 상태 계산
const isAllSelected = computed(() => {
  return insuranceSelections.value.every((selected: boolean) => selected)
})

// 선택된 진료내역이 있는지 확인
const hasSelectedHospitals = computed(() => {
  return insuranceSelections.value.some((selected: boolean) => selected)
})

// 선택된 개수 계산
const selectedCount = computed(() => {
  return insuranceSelections.value.filter((selected: boolean) => selected).length
})

// 전체 선택 토글 함수
const toggleAllSelection = () => {
  const newValue = !isAllSelected.value
  insuranceSelections.value = insuranceSelections.value.map(() => newValue)
}
const clickRegisterHospitals = () => {
  console.log('선택한 병원 등록 후 청구의신 서브메인으로 이동')
  navigateTo('/insu/claim/paperless/successFindHospitals')
}
const dummyInsurances = [
  {
    date: '2025.01.20',
    department: '신경내과',
    doctor: '이현정',
    type: '통원',
    totalCost: 456789,
    detail: {
      benefitCost: 178000,
      nonBenefitCost: 178000,
      patientCost: 178000
    }
  },
  {
    date: '2025.01.25',
    department: '정형외과',
    doctor: '김철수',
    type: '입원',
    totalCost: 1234500,
    detail: {
      benefitCost: 500000,
      nonBenefitCost: 734500,
      patientCost: 1000000
    }
  },
  {
    date: '2025.02.01',
    department: '내과',
    doctor: '박영희',
    type: '통원',
    totalCost: 78000,
    detail: {
      benefitCost: 50000,
      nonBenefitCost: 28000,
      patientCost: 60000
    }
  },
  {
    date: '2025.02.10',
    department: '피부과',
    doctor: '최민준',
    type: '통원',
    totalCost: 35000,
    detail: {
      benefitCost: 20000,
      nonBenefitCost: 15000,
      patientCost: 30000
    }
  }
]
</script>

<style scoped lang="scss"></style>
