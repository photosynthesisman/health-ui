<template>
  <div class="ml-n20 mr-n20">
    <!-- 총 건수 -->
    <!-- <TotalCountSelectType :count="props.medicalInfos.length || 0" /> -->
    <div class="mg-20x">
      <TotalItemSort :total="props.medicalInfos.length || 0" :buttons="sortButtons" @button-click="clickSort" />
    </div>
    <div class="list">
      <!-- 신규 영상 내역 컴포넌트 -->
      <MedicalVideoHistoryAccordion
        :medical-history="props.medicalInfos"
        :is-share-date="true"
        @status-click="handleStatusClick"
        @history-click="handleHistoryClick"
        @share-click="handleShareClick"
        @cd-click="handleCdClick"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import TotalItemSort from '~/components/publishing/insu/billingInfo/TotalItemSort.vue'
import MedicalVideoHistoryAccordion from '~/components/insu/MedicalVideoHistoryAccordion.vue'
// Sort 버튼명 배열
const sortButtons = [
  { label: '전체', value: 'all' },
  { label: '3개월 ', value: '6months', icon: true }
]
interface Examination {
  id: number
  name: string
  date: string
}
interface Department {
  id: number
  department: string
  examinations: Examination[]
}
interface MedicalHistory {
  id: number
  hospitalName: string
  logo: string
  status?: string
  arrowType?: boolean
  accessDate?: string
  shareFrom?: string
  shareTo?: string
  buttonCount?: 0 | 1 | 2 | 3
  buttonKeys?: ('share' | 'cd' | 'history')[]
  departments: Department[]
}

const props = defineProps<{ medicalInfos: MedicalHistory[] }>()

const emit = defineEmits<{
  'history-click': [hospital: MedicalHistory]
  'status-click': [hospital: MedicalHistory]
  'share-click': [hospital: MedicalHistory]
  'cd-click': [hospital: MedicalHistory]
  'click-sort': []
}>()
const clickSort = () => {
  emit('click-sort')
}
const handleStatusClick = (hospital: MedicalHistory) => {
  emit('status-click', hospital)
}
const handleHistoryClick = (hospital: MedicalHistory) => {
  emit('history-click', hospital)
}
const handleShareClick = (hospital: MedicalHistory) => {
  emit('share-click', hospital)
}
const handleCdClick = (hospital: MedicalHistory) => {
  emit('cd-click', hospital)
}
</script>
<style lang="scss" scoped>
.c-count-box {
  padding: 2rem;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem 2rem 4.8rem;
  background: #f4f4f4;
}
@media (max-width: 420px) {
  :deep(.c-inpType) {
    .c-inp-el {
      .custom-select {
        .select-display {
          font-size: 1.6rem;
          min-width: auto;
        }
      }
    }
  }
}
</style>
