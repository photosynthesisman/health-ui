<template>
  <BaseBody :show-back-button="true" page-title="의료영상공유" :has-notification="true">
    <section class="issue-history">
      <TitleSection
        title="배송내역을<br/>확인한 후 결제해주세요."
        description="결제 후 배송내역에서 배송 진행사항을<br/>확인할 수 있어요."
        class="mt-24 mb-32"
      />
    </section>
    <HistoryDetail :details-list="detailInfos" :total-price="totalPrice" />
    <MedicalHistoryAccordion
      :medical-history="medicalInfos"
      :is-label-title="true"
      :is-share-date="true"
      :is-issue-date="true"
      :label-title="'의료영상 발급내역'"
      class="mt-32"
    />
    <ButtonGroup class="is-fixed half">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky">취소</Button>
      <Button btn-type="primary" element-type="button" class="lg btn-sticky">결제하기</Button>
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import HistoryDetail from '~/components/insu/HistoryDetail.vue'
import MedicalHistoryAccordion from '~/components/insu/MedicalHistoryAccordion.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'

const detailInfos = ref([
  {
    id: 1,
    title: '배송지 주소',
    detail: '서울시 금천구 가산디지털1로 145, 1005호 (에이스하이엔드타워 3차)'
  },
  {
    id: 2,
    title: '휴대폰 번호',
    detail: '010-1234-5678'
  },
  {
    id: 3,
    title: '배송 전달사항',
    detail: '조심히 배송 부탁드립니다.'
  },
  {
    id: 4,
    title: '상품명',
    detail: '의료영상 CD(2장)'
  },
  {
    id: 5,
    title: '상품결제금액',
    price: 20000
  },
  {
    id: 6,
    title: '배송 수수료',
    price: 4000
  }
])
const totalPrice = computed(() => {
  const payment = detailInfos.value.find(item => item.id === 5)?.price ?? 0
  const shipping = detailInfos.value.find(item => item.id === 6)?.price ?? 0
  return payment + shipping
})

const medicalInfos = [
  {
    id: 1,
    title: '공유 병원명',
    hospitalName: '고려대학병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    accessDate: '2025.06.25',
    shareFrom: '2025.08.20',
    shareTo: '2025.08.22',
    departments: [
      {
        id: 101,
        department: '내과',
        examinations: [
          {
            id: 1001,
            name: 'CT (컴퓨터단층촬영)',
            date: '2024.11.20'
          },
          {
            id: 1002,
            name: 'MRI (자기공명영상)',
            date: '2024.11.15'
          }
        ]
      },
      {
        id: 102,
        department: '정형외과',
        examinations: [
          {
            id: 1003,
            name: 'X-ray (엑스레이)',
            date: '2024.11.10'
          }
        ]
      }
    ]
  }
]
</script>
<style scoped></style>
