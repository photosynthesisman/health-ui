<template>
  <BaseBody page-title="의료영상발급" :show-back-button="true" :has-notification="true">
    <TitleSection
      title="발급 요청하실 영상을<br/>선택해 주세요."
      description="1개월 기준 영상데이터를 조회합니다.<br/>최대 5년까지 기간을 설정하여 조회해보세요"
      class="mt-24 mb-32"
    />

    <HospitalInfoField :name="hospitalName" :logo-src="logoSrc" />
    <FlexSection class="mt-12">
      <InputLabelText label="조회기간" class="mb-6" />
      <SegmentedTabs :tabs="segmentedTabs" :active-key="activeSegmentedTab" @tab-change="onSegmentedTabChange" />
      <InputCalendarFromTo
        v-model:from-date="startDate"
        v-model:to-date="endDate"
        class="mt-8 mb-8"
        placeholder="시작일"
        placeholder2="종료일"
        :readonly="!isDirectInput"
        :disabled="!isDirectInput"
      />
      <Button btn-type="primary" element-type="button" aria-label="조회하기" class="medium" />
    </FlexSection>
    <hr class="hr-section ml-n20 mr-n20 mt-32 mb-0" />
    <TotalItemSort :total="3" :buttons="sortButtons" @button-click="clickSort" />

    <MedicalVideoHistoryWithCheckBox v-if="medicalHistory.length" :medical-history="medicalHistory" class="mt-20" />

    <InsuEmpty v-else title="검색 결과가 없어요." sub-title="검사기간을 확인하여 다시 선택해주세요." />

    <ButtonGroup class="is-fixed">
      <Button
        v-if="hasSelectedDate"
        aria-label="의료영상 발급 신청하기"
        btn-type="primary"
        element-type="button"
        class="w-full lg"
      />
      <Button v-else aria-label="의료영상 조회" btn-type="primary" element-type="button" class="w-full lg" disabled />
    </ButtonGroup>

    <BottomModal
      :is-visible="isShowSortModal"
      title="조회 조건 설정"
      :is-show-cancel-button="false"
      confirm-button-text="조회하기"
      @close="isShowSortModal = false"
      @confirm="clickNext"
    >
      <template #content>
        <FlexSection class="gap-12 mt-16">
          <FlexColDiv class="gap-6">
            <InputLabelText label="발급 종류" />
            <div class="grid_card">
              <Checkbox
                id="checkBox1"
                v-model="allChecked"
                custom-style="small buttonType2 flex-11"
                aria-label="전체"
              />
              <Checkbox
                id="checkBox2"
                v-model="checkboxes.mri"
                custom-style="small buttonType2 flex-11"
                aria-label="MRI"
              />
              <Checkbox
                id="checkBox3"
                v-model="checkboxes.ct"
                custom-style="small buttonType2 flex-11"
                aria-label="CT"
              />
              <Checkbox
                id="checkBox4"
                v-model="checkboxes.xray"
                custom-style="small buttonType2 flex-11"
                aria-label="X-RAY"
              />
              <Checkbox
                id="checkBox5"
                v-model="checkboxes.endoscopy"
                custom-style="small buttonType2 flex-11"
                aria-label="내시경"
              />
              <Checkbox
                id="checkBox6"
                v-model="checkboxes.ultrasound"
                custom-style="small buttonType2 flex-11"
                aria-label="초음파"
              />
            </div>
          </FlexColDiv>
          <FlexColDiv class="gap-6">
            <InputLabelText label="정렬순서" />
            <SegmentedTabsStyle
              :tabs="segmentedTabsSort"
              :active-index="segmentedActiveIndex"
              @tab-click="handleSegmentedTabClick"
            />
          </FlexColDiv>
        </FlexSection>
      </template>
    </BottomModal>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import InsuEmpty from '~/components/insu/InsuEmpty.vue'
import InsuCategorySelector from '~/components/insu/CategorySelector.vue'
import HospitalInfoField from '~/components/insu/HospitalInfoField.vue'
import SegmentedTabs, { type SegmentTab } from '~/components/tabbar/SegmentedTabs.vue'
import SegmentedTabsStyle from '~/components/common/tab/SegmentedTabs.vue'
import InputCalendarFromTo from '~/components/publishing/input/InputCalendarFromTo.vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
import type { BaseModalProps, ModalEmitEvent } from '~/types/common/modal.type'
import FlexSection from '~/components/page/FlexSection.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import Checkbox from '~/components/publishing/input/check.vue'
import TotalItemSort from '~/components/publishing/insu/billingInfo/TotalItemSort.vue'
import MedicalVideoHistoryWithCheckBox from '~/components/insu/MedicalVideoHistoryWithCheckBox.vue'
const medicalHistory = ref([
  {
    id: 1,
    accessDate: '2025.06.25',
    departments: [
      {
        id: 2,
        department: '영상의학과',
        examinations: [
          {
            id: 3,
            tit: '검사 종류',
            name: 'CT'
          },
          {
            id: 4,
            tit: '검사명',
            name: '복부CT'
          }
        ]
      },
      {
        id: 5,
        department: '가정의학과',
        examinations: [
          {
            id: 6,
            tit: '검사종류',
            name: '초음파'
          }
        ]
      }
    ]
  },
  {
    id: 7,
    accessDate: '2025.06.25',
    departments: [
      {
        id: 8,
        department: '영상의학과',
        examinations: [
          {
            id: 9,
            tit: '검사 종류',
            name: 'CT'
          },
          {
            id: 10,
            tit: '검사명',
            name: '복부CT'
          }
        ]
      },
      {
        id: 11,
        department: '가정의학과',
        examinations: [
          {
            id: 12,
            tit: '검사종류',
            name: '초음파'
          }
        ]
      }
    ]
  }
])
// 달력관련
export interface DateRange {
  startDate: Date
  endDate: Date
  periodType: 'custom' | '1months' | '3months' | '6months'
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
// 조회조건 설정 체크박스 초기 설정
const checkboxes = ref({
  mri: false,
  ct: false,
  xray: false,
  endoscopy: false,
  ultrasound: false
})
// 조회조건 설정 체크박스 라벨 값 설정
const checkboxLabels = {
  mri: 'MRI',
  ct: 'CT',
  xray: 'X-RAY',
  endoscopy: '내시경',
  ultrasound: '초음파'
}
// 조회조건 설정 전체 선택 / 해제
const allChecked = computed({
  get: () => {
    return Object.values(checkboxes.value).every(Boolean)
  },
  set: (value: boolean) => {
    for (const key in checkboxes.value) {
      checkboxes.value[key as keyof typeof checkboxes.value] = value
    }
  }
})
// 조회조건 설정 정렬순서 초기 값
const segmentedTabsSort = [
  { name: '최신순', code: 'latest' },
  { name: '과거순', code: 'past' }
]
const segmentedActiveIndex = ref(0)
// 조회조건 설정 선택시
const handleSegmentedTabClick = (index: number) => {
  segmentedActiveIndex.value = index
  console.log('Segmented 탭 클릭:', segmentedTabsSort[index])
}
// 조회조건 설정 모달 상태관리
const isShowSortModal = ref(false)
// 조회조건 클릭시 모달 열림
const clickSort = () => {
  isShowSortModal.value = !isShowSortModal.value
}

// TotalItemSort에 표기되는 반응형 값
const sortButtons = ref([
  { label: '전체', value: 'all' },
  { label: '최신순', value: 'latest', icon: true }
])

// 조회하기 버튼 클릭 (선택된 값 적용)
const clickNext = () => {
  const selectedSortName = segmentedTabsSort[segmentedActiveIndex.value].name

  const selectedTypes = []
  if (allChecked.value) {
    selectedTypes.push('전체')
  } else {
    for (const key in checkboxes.value) {
      if (checkboxes.value[key as keyof typeof checkboxes.value]) {
        selectedTypes.push(checkboxLabels[key as keyof typeof checkboxLabels])
      }
    }
  }
  const typeString = selectedTypes.length > 0 ? selectedTypes.join(' · ') : '전체'
  sortButtons.value[0].label = typeString
  sortButtons.value[1].label = selectedSortName
  isShowSortModal.value = false
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
  { title: '기간선택', key: 'segment4' }
])
// 직접 입력 모드 여부
const isDirectInput = computed(() => activeSegmentedTab.value === 'segment4')
// 상태 관리
const hospitalName = ref('경북대학교병원')
const logoSrc = ref('/_nuxt/assets/images/insu/logo_KUMedicine.svg')

const hasSelectedDate = ref(true)

// 기간 라벨 계산
const getPeriodLabel = (): string => {
  switch (activeSegmentedTab.value) {
    case 'segment1':
      return '1개월'
    case 'segment2':
      return '3개월'
    case 'segment3':
      return '6개월'
    case 'segment4':
      return '기간선택'
    default:
      return '1개월' // 기본값 설정
  }
}
// 탭 변경 핸들러
const onSegmentedTabChange = (key: string) => {
  activeSegmentedTab.value = key
  updatePredefinedDates()
  console.log(`클릭된 탭 키: ${key}`)
  console.log(`현재 활성화된 탭: ${activeSegmentedTab.value}`)
  console.log(`📅 기간 탭 변경: ${getPeriodLabel()}`)
}
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
// 날짜 포맷팅 유틸리티
const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}
</script>

<style lang="scss" scoped>
.wrap-input {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
</style>
