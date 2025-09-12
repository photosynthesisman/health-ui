<template>
  <BaseBody>
    <CompleteTitleSection :title="'의료영상 환불을 완료하였어요.'" />
    <IssuanceHistoryDetail :details-list="detailInfos" />
    <MedicalHistoryAccordion
      :medical-history="medicalInfos"
      :is-label-title="true"
      :is-share-date="true"
      :is-issue-date="true"
      :label-title="'환불할 의료영상 발급내역'"
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
import IssuanceHistoryDetail from '~/components/insu/IssuanceHistoryDetail.vue'
import MedicalHistoryAccordion from '~/components/insu/MedicalHistoryAccordion.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
const detailInfos = [
  {
    id: 1,
    title: '영상 발급료',
    price: 10000
  },
  {
    id: 2,
    title: '클라우드 사용료',
    price: 3000
  },
  {
    id: 3,
    title: '부가세',
    price: 3000
  },
  {
    id: 4,
    title: '총 결제금액',
    price: 3000
  },
  {
    id: 5,
    title: '환불 금액',
    price: 21000,
    isRefunded: true
  },
  {
    id: 6,
    title: '환불 사유',
    detail: '의료 영상이 필요없어져서 환불합니다.',
    hasReason: true
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
<style scoped></style>
