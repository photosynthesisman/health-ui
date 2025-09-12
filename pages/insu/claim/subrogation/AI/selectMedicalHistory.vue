<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI 실손 예상 보험금 확인"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="pt-24 pb-32">
      <TitleSection
        title="진료내역을 선택해 주세요"
        :description="'최근 3년간 진료내역만 분석 가능해요.'"
        :tooltip="'MY병원을 연결해 최근 진료 내역을 업데이트할 수 있어요.'"
      />
    </div>
    <Button btn-type="line" element-type="button" aria-label="MY병원 연결하기" />
    <hr class="hr-section mt-32 ml-n20 mr-n20" />

    <AiMedicalHistoryAccordion :medical-histories="medicalHistoriesData" @sort-click="clickSort" />

    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup v-if="medicalHistoriesData.length" class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="1건 AI 실손 보험금 예상 분석"
        class="lg w-full medium btn-sticky"
        @click="clickNext"
      />
    </ButtonGroup>
  </BaseBody>
  <BottomModal
    :is-visible="isShowSortModal"
    title="조회조건 설정"
    :is-show-cancel-button="false"
    confirm-button-text="확인"
    @close="isShowSortModal = false"
    @confirm="isShowSortModal = false"
  >
    <template #content>
      <div class="wrap-bottom-sort">
        <InputLabelText label="MY병원" class="mb-6" />
        <Select
          modal-title="병원선택"
          select-placeholder="MY 병원을 선택해주세요."
          :is-show-cancel-btn="false"
          :custom-opts="[
            { value: 'all', label: '전체' },
            { value: '경북대학병원', label: '경북대학병원' },
            { value: '연세대학병원', label: '연세대학병원' }
          ]"
        />
        <InputLabelText label="조회기간" class="mt-12 mb-6" />
        <!-- 기간 선택 탭 -->
        <div class="date-range-tabs">
          <SegmentedTabs :tabs="segmentedTabs" :active-key="activeSegmentedTab" @tab-change="onSegmentedTabChange" />
        </div>

        <!-- 날짜 입력 영역 -->
        <div class="date-input-section mt-8">
          <InputCalendarFromTo
            v-model:from-date="startDate"
            v-model:to-date="endDate"
            placeholder="시작일"
            placeholder2="종료일"
            :readonly="!isDirectInput"
            :disabled="!isDirectInput"
          />
        </div>
        <InputLabelText label="정렬순서" class="mt-12 mb-6" />
        <SegmentedTabsStyle
          :tabs="segmentedTabsSort"
          :active-index="segmentedActiveIndex"
          @tab-click="handleSegmentedTabClick"
        />
      </div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import TitleSection from '~/components/insu/TitleSection.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
import { computed, ref } from 'vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import Select from '~/components/publishing/input/Select.vue'
import type { BaseModalProps, ModalEmitEvent } from '~/types/common/modal.type'
import SegmentedTabs, { type SegmentTab } from '~/components/tabbar/SegmentedTabs.vue'
import InputCalendarFromTo from '~/components/publishing/input/InputCalendarFromTo.vue'
import SegmentedTabsStyle, { type SegmentTabSort } from '~/components/common/tab/SegmentedTabs.vue'
import AiMedicalHistoryAccordion from '~/components/insu/AiMedicalHistoryAccordion.vue'
const segmentedTabsSort: SegmentTab[] = [
  { name: '최신순', code: 'latest' },
  { name: '과거순', code: 'past' }
]
const segmentedActiveIndex = ref(0)
const handleSegmentedTabClick = (index: number) => {
  segmentedActiveIndex.value = index
  console.log('Segmented 탭 클릭:', segmentedTabsSort[index])
}

// 타입 정의
export interface DateRange {
  startDate: Date
  endDate: Date
  periodType: 'custom' | '3months' | '6months' | '12months'
  label: string
}

interface DateRangeModalProps extends BaseModalProps {
  initialStartDate?: Date | null
  initialEndDate?: Date | null
  initialPeriodType?: string
}

const props = withDefaults(defineProps<DateRangeModalProps>(), {
  title: '기간 선택',
  isVisible: false,
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false,
  autoClose: true,
  initialStartDate: null,
  initialEndDate: null,
  initialPeriodType: 'segment1'
})

const emit = defineEmits<{
  (e: ModalEmitEvent, dateRange?: DateRange): void
  (e: 'update:startDate', date: Date): void
  (e: 'update:endDate', date: Date): void
}>()
//SegmentedTabs 이벤트 핸들러
const onSegmentedTabChange = (key: string) => {
  activeSegmentedTab.value = key
  console.log('Segmented tab changed to:', key)
}

// 반응형 상태
const activeSegmentedTab = ref(props.initialPeriodType || 'segment4')
const startDate = ref<string>('')
const endDate = ref<string>('')

// SegmentedTabs 설정
const segmentedTabs = ref<SegmentTab[]>([
  { title: '1개월', key: 'segment1' },
  { title: '3개월', key: 'segment2' },
  { title: '6개월', key: 'segment3' },
  { title: '직접입력', key: 'segment4' }
])

// 직접 입력 모드 여부
const isDirectInput = computed(() => activeSegmentedTab.value === 'segment4')

// 날짜 포맷팅 유틸리티
const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null
  const cleanedDate = dateStr.replace(/\./g, '-')
  const date = new Date(cleanedDate)
  return isNaN(date.getTime()) ? null : date
}

// 미리 정의된 기간에 따른 날짜 계산
const updatePredefinedDates = () => {
  const now = new Date()
  let start: Date
  let end: Date = new Date(now)

  switch (activeSegmentedTab.value) {
    case 'segment1': // 3개월
      start = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
      break
    case 'segment2': // 6개월
      start = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
      break
    case 'segment3': // 12개월
      start = new Date(now.getFullYear(), now.getMonth() - 12, now.getDate())
      break
    default:
      // 직접설정의 경우 기존 값 유지 또는 초기값 사용
      if (props.initialStartDate) {
        start = new Date(props.initialStartDate)
      } else {
        start = new Date(now.getFullYear(), now.getMonth(), 1) // 이번 달 1일
      }
      if (props.initialEndDate) {
        end = new Date(props.initialEndDate)
      }
      break
  }

  startDate.value = formatDate(start)
  endDate.value = formatDate(end)
}

// 선택된 기간 표시
const formattedPeriod = computed(() => {
  if (!startDate.value || !endDate.value) return ''

  const start = parseDate(startDate.value)
  const end = parseDate(endDate.value)

  if (!start || !end) return ''

  const startFormatted = formatDate(start)
  const endFormatted = formatDate(end)

  return `${startFormatted} ~ ${endFormatted}`
})

// 기간 라벨 계산
const getPeriodLabel = (): string => {
  switch (activeSegmentedTab.value) {
    case 'segment1':
      return '최근 3개월'
    case 'segment2':
      return '최근 6개월'
    case 'segment3':
      return '최근 12개월'
    default:
      return '사용자 지정'
  }
}

const isShowSortModal = ref(false)

// 필터 상태 관리
const selectedFilters = ref({
  all: false,
  normal: false,
  expired: false,
  maturity: false,
  extinct: false,
  cancel: false
})

const clickSort = () => {
  isShowSortModal.value = !isShowSortModal.value
}
const clickNext = () => {
  return navigateTo('/insu/claim/subrogation/ai/checkAnalysisResults')
}
// 데이터 없는 경우 케이스
// const medicalHistoriesData = ref([])

const medicalHistoriesData = ref([
  {
    id: 1,
    hospitalName: '경북대학교병원',
    logoSrc: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    type: '통원',
    dateRange: '2025. 01. 20 ~ 2025. 05. 30',
    department: '내과',
    insurance: { name: 'DB손해보험', date: '2024.02.08' },
    price: {
      total: '456,789원',
      details: [
        { title: '급여', desc: '178,000원' },
        { title: '비급여', desc: '178,000원' },
        { title: '환자부담금액', desc: '178,000원' }
      ]
    }
  },
  {
    id: 2,
    hospitalName: '경북대학교병원',
    logoSrc: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    type: '입원',
    dateRange: '2025. 01. 20 ~ 2025. 05. 30',
    department: '내과',
    insurance: { name: 'DB손해보험', date: '2024.02.08' },
    price: {
      total: '456,789원',
      details: [
        { title: '급여', desc: '178,000원' },
        { title: '비급여', desc: '178,000원' },
        { title: '환자부담금액', desc: '178,000원' }
      ]
    }
  }
])
</script>

<style scoped lang="scss"></style>
