<template>
  <BaseBody
    :show-back-button="false"
    page-title=""
    logo-type="text"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <CompleteTitleSection :title="completeTitle" />
    <MedicalPayment :payment-infos="paymentInfos" :total-price="totalPriceFormatted" :point="point" />
    <InfoText :text="'발급한 서류는 보관함에서 확인 가능해요.'" class="mt-48 justify-center" />
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" aria-label="보관함 바로가기" class="lg w-full medium btn-sticky" />
  </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import MedicalPayment from '~/components/insu/MedicalPayment.vue'
import CompleteTitleSection from '~/components/insu/CompleteTitleSection.vue'
import InfoText from '~/components/insu/InfoText.vue'

const paymentInfos = ref([
  { id: 1, title: '결제수단', detail: '국민카드' },
  { id: 2, title: '카드번호', detail: '5570-42**-****-4021' },
  { id: 3, title: '결제구분', detail: '일시불' },
  { id: 4, title: '승인일시', detail: '2025.06.12 12:58' },
  { id: 5, title: '승인번호', detail: '13246578648' },
  {
    id: 6,
    hospitals: [
      { id: 1, name: '충북대학교병원', paperTit: '외래진료확인서', paperCost: 20000 },
      { id: 2, name: '서울삼성병원', paperTit: '진료비영수증', paperCost: 15000 }
    ]
  }
])
const point = ref(1000)
const totalPrice = computed(() => {
  let totalCost = 0

  paymentInfos.value.forEach(paymentInfo => {
    if (paymentInfo.hospitals && Array.isArray(paymentInfo.hospitals)) {
      // hospitals 배열이 있다면, 그 안의 paperCost 값을 모두 더합니다.
      const hospitalCosts = paymentInfo.hospitals.reduce((acc, hospital) => acc + hospital.paperCost, 0)
      totalCost += hospitalCosts
    }
  })
  return totalCost - point.value
})
const totalPriceFormatted = computed(() => {
  return totalPrice.value.toLocaleString()
})
const completeTitle = computed(() => {
  return `<span>${totalPrice.value.toLocaleString()}원</span><br/>결제를 완료했어요.`
})
</script>

<style scoped lang="scss"></style>
