<template>
  <BaseBody>
    <CompleteTitleSection :title="'배송 신청이 완료되었어요.'" />
    <HistoryDetail :details-list="detailInfos" :total-price="13000" />
    <MedicalHistoryAccordion
      :medical-history="medicalInfos"
      :is-label-title="true"
      :is-share-date="true"
      :is-issue-date="true"
      :label-title="'의료영상 발급내역'"
      class="mt-32"
    />
    <ButtonGroup class="is-fixed half">
      <Button btn-type="primary" element-type="button" class="lg btn-sticky w-full">의료영상 내역으로</Button>
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import CompleteTitleSection from '~/components/insu/CompleteTitleSection.vue'
import HistoryDetail from '~/components/insu/HistoryDetail.vue'
import MedicalHistoryAccordion from '~/components/insu/MedicalHistoryAccordion.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
const detailInfos = [
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
    title: '배송 전달사항',
    price: 10000
  },
  {
    id: 6,
    title: '배송 수수료',
    price: 3000
  }
]
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
<style scoped>
.issue-history {
  padding: 2.4rem 0 3.2rem;
}
</style>
