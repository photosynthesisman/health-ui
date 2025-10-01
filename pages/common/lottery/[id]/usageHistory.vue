<template>
  <BaseBody :show-back-button="true" page-title="리워드/아이템 전체 사용 내역" logo-type="text">
    <div>
      <TotalCountDateRangeType
        :data="allData"
        class="pt-20 pb-20"
        :active-option="currentPeriod"
        modal-title="조회 기간 선택"
        confirm-button-text="조회하기"
        @filtered-data-change="handleFilteredDataChange"
        @period-change="handlePeriodChange"
      />

      <UsageList :data="displayData" />
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import TotalCountDateRangeType from '~/components/publishing/common/temp/TotalCountDateRangeType.vue'
import UsageList from '~/components/publishing/common/lottery/UsageList.vue'

interface UsageItem {
  id: number
  name: string
  date: string
  image: string
  status: string
  leftDate: string
}

const currentPeriod = ref('all')
const filteredData = ref<UsageItem[]>([])
const allData = ref<UsageItem[]>([
  {
    id: 1,
    name: '챌린지참가권',
    image: 'lottery/img-lucky-ticket-1.png',
    status: '사용완료',
    date: '2025.09.12 11:47:12'
  },
  {
    id: 2,
    name: '챌린지참가권',
    image: 'lottery/img-ticket-1.png',
    status: '사용취소',
    date: '2025.09.12 11:47:12',
    leftDate: '2025.10.12까지 적용'
  },
  {
    id: 3,
    name: '스타벅스 교환권',
    image: 'lottery/img-reward-1.png',
    status: '사용완료',
    date: '2025.09.12 11:47:12'
  },
  {
    id: 4,
    name: '달성티켓',
    image: 'lottery/img-lucky-ticket-2.png',
    status: '기한만료(소멸)',
    date: '2025.09.12 11:47:12'
  },
  {
    id: 5,
    name: '첫걸음 환영 패키지',
    image: 'lottery/img-package.png',
    status: '사용완료',
    date: '2025.09.12 11:47:12'
  },
  {
    id: 6,
    name: '챌린지참가권',
    image: 'lottery/img-ticket-2.svg',
    status: '사용완료',
    date: '2025.09.12 11:47:12',
    leftDate: '2025.10.12까지 적용'
  }
] as UsageItem[])

// 표시할 데이터 (필터링된 데이터가 있으면 그것을, 없으면 전체 데이터를 표시)
const displayData = computed(() => {
  return filteredData.value.length > 0 ? filteredData.value : allData.value
})

// 필터링된 데이터 받기
const handleFilteredDataChange = (data: UsageItem[]) => {
  filteredData.value = data
  console.log(`필터링 완료: ${data.length}개 데이터`)
}

// 기간 변경 처리
const handlePeriodChange = (period: string) => {
  currentPeriod.value = period
  console.log(`기간 변경: ${period}`)
}
</script>

<style scoped lang="scss"></style>
