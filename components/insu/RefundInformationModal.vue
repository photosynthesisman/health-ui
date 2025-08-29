<template>
  <IssuanceHistoryDetail :details-list="detailInfos" />
  <MedicalVideoHistory :medical-history="medicalHistory" class="mt-12" />
</template>

<script setup lang="ts">
import IssuanceHistoryDetail from '~/components/insu/IssuanceHistoryDetail.vue'
import MedicalVideoHistory from '~/components/insu/MedicalVideoHistory.vue'
import type Detail from '~/pages/common/event/detail.vue'
const detailInfos = [
  {
    id: 1,
    title: '발급 병원',
    detail: '서울대학교병원'
  },
  {
    id: 2,
    title: '발급 일자',
    detail: '2025.06.27'
  },
  {
    id: 3,
    title: '발급 상태',
    detail: '발급완료'
  },
  {
    id: 4,
    title: '공유 기간',
    detail: '2025.06.27~2025.08.31'
  },
  {
    id: 5,
    title: '영상 발급료',
    price: 10000
  },
  {
    id: 6,
    title: '클라우드 사용료',
    price: 3000
  },
  {
    id: 7,
    title: '부가세',
    price: 3000
  },
  {
    id: 8,
    title: '총 결제금액',
    price: 3000
  },
  {
    id: 8,
    title: '환불 금액',
    price: 21000,
    isRefunded: true
  },
  {
    id: 8,
    title: '환불 사유',
    detail: '의료 영상이 필요없어져서 환불합니다.',
    hasReason: true
  }
]
const medicalHistory = ref([
  {
    departments: [
      {
        id: 1,
        department: '영상의학과',
        examinations: [
          {
            id: 1,
            name: 'CT 검사',
            date: '2025.05.24'
          },
          {
            id: 2,
            name: 'MRI 검사',
            date: '2025.05.24'
          }
        ]
      },
      {
        id: 2,
        department: '가정의학과',
        examinations: [
          {
            id: 3,
            name: 'X-Ray 검사',
            date: '2025.05.24'
          }
        ]
      },
      {
        id: 3,
        department: '내과',
        examinations: [
          {
            id: 4,
            name: '초음파 검사',
            date: '2025.05.24'
          }
        ]
      }
    ]
  }
])
</script>

<style lang="scss" scoped></style>
