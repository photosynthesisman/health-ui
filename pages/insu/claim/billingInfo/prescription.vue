<template>
  <BaseBody
    :show-back-button="true"
    page-title="처방전 조회"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
  >
    <TitleSection title="처방전을 확인해 주세요" class="mt-24" />
    <DotInfoList :items="infoItems" />
    <InputLabelText label="병원 선택" class="mt-12 mb-6" />
    <Select
      modal-title="병원"
      select-placeholder="병원을 선택해주세요"
      cancel-button-text="선택"
      :is-show-cancel-btn="false"
      :custom-opts="hospitalOptions"
    />
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <TotalItemSort :total="prescriptionItems.length" :buttons="sortButtons" @button-click="clickSort" />
    <!-- ToDo: 조회가능한 처방전 없을때 활성화 -->
    <InsuEmpty v-if="!prescriptionItems || prescriptionItems.length === 0" title="조회 가능한<br />처방전이 없어요." />
    <PrescriptionItem v-else :items="prescriptionItems" />
    <Teleport to="body">
      <BottomModal
        :is-visible="isShowSortModal"
        title="조회조건 설정"
        :is-show-cancel-button="false"
        confirm-button-text="확인"
        @close="isShowSortModal = false"
        @confirm="clickNext"
      >
        <template #content>
          <div class="wrap-bottom-sort">
            <div class="tit-sort">조회기간</div>
            <!-- 기간 선택 탭 -->
            <div class="date-range-tabs">
              <SegmentedTabs
                :tabs="segmentedTabs"
                :active-key="activeSegmentedTab"
                @tab-change="onSegmentedTabChange"
              />
            </div>
            <div class="tit-sort">정렬순서</div>
            <SegmentedTabsStyle
              :tabs="segmentedTabsSort"
              :active-index="segmentedActiveIndex"
              @tab-click="handleSegmentedTabClick"
            />
          </div>
        </template>
      </BottomModal>
    </Teleport>
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
import Select from '~/components/publishing/input/Select.vue'
import TotalItemSort from '~/components/publishing/insu/billingInfo/TotalItemSort.vue'
import InsuEmpty from '~/components/insu/InsuEmpty.vue'
import PrescriptionItem from '~/components/publishing/insu/billingInfo/PrescriptionItem.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import type { BaseModalProps, ModalEmitEvent } from '~/types/common/modal.type'
import SegmentedTabs, { type SegmentTab } from '~/components/tabbar/SegmentedTabs.vue'
import SegmentedTabsStyle, { type SegmentTabSort } from '~/components/common/tab/SegmentedTabs.vue'
import DotInfoList from '~/components/publishing/insu/billingInfo/DotInfoList.vue'

definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '처방전 조회/발급'
  // utils: ['phone']
  // customTitle: 'logo',
})
const hospitalOptions = [
  { value: '강동성심병원', label: '강동성심병원' },
  { value: '삼성서울병원', label: '삼성서울병원' },
  { value: '서울아산병원', label: '서울아산병원' },
  { value: '세브란스병원', label: '세브란스병원' },
  { value: '한양대병원', label: '한양대병원' }
]

// Sort 버튼명 배열
const sortButtons = [
  { label: '6개월', value: '6months' },
  { label: '진료일 기준', value: 'medicalDate', icon: true }
]

const segmentedTabsSort: SegmentTab[] = [
  { name: '진료일 기준', code: 'treatment' },
  { name: '청구일 기준', code: 'billing' }
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
  initialPeriodType: 'segment4'
})

const emit = defineEmits<{
  (e: ModalEmitEvent, dateRange?: DateRange): void
  (e: 'update:startDate', date: Date): void
  (e: 'update:endDate', date: Date): void
}>()

// 반응형 상태
const activeSegmentedTab = ref(props.initialPeriodType || 'segment4')
const startDate = ref<string>('')
const endDate = ref<string>('')

// body 스크롤 방지를 위한 상태
const originalBodyStyle = ref<string>('')

// SegmentedTabs 설정
const segmentedTabs = ref<SegmentTab[]>([
  { title: '6개월', key: 'segment1' },
  { title: '1년', key: 'segment2' },
  { title: '2년', key: 'segment3' },
  { title: '3년', key: 'segment4' }
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
    case 'segment1': // 6개월
      start = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
      break
    case 'segment2': // 1년
      start = new Date(now.getFullYear(), now.getMonth() - 12, now.getDate())
      break
    case 'segment3': // 2년개월
      start = new Date(now.getFullYear(), now.getMonth() - 24, now.getDate())
      break
    case 'segment4': // 3년개월
      start = new Date(now.getFullYear(), now.getMonth() - 36, now.getDate())
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

// 필터 변경 핸들러
const handleFilterChange = () => {
  // 전체 선택 로직
  if (selectedFilters.value.all) {
    // 전체가 선택되면 다른 모든 옵션들도 선택
    selectedFilters.value.normal = true
    selectedFilters.value.expired = true
    selectedFilters.value.maturity = true
    selectedFilters.value.extinct = true
    selectedFilters.value.cancel = true
  } else {
    // 전체가 해제되면 다른 모든 옵션들도 해제
    selectedFilters.value.normal = false
    selectedFilters.value.expired = false
    selectedFilters.value.maturity = false
    selectedFilters.value.extinct = false
    selectedFilters.value.cancel = false
  }

  // 개별 옵션들이 모두 선택되면 전체도 선택
  if (
    selectedFilters.value.normal &&
    selectedFilters.value.expired &&
    selectedFilters.value.maturity &&
    selectedFilters.value.extinct &&
    selectedFilters.value.cancel
  ) {
    selectedFilters.value.all = true
  }

  // 개별 옵션 중 하나라도 해제되면 전체도 해제
  if (
    !selectedFilters.value.normal ||
    !selectedFilters.value.expired ||
    !selectedFilters.value.maturity ||
    !selectedFilters.value.extinct ||
    !selectedFilters.value.cancel
  ) {
    selectedFilters.value.all = false
  }
}

// 개별 필터 변경 핸들러
const handleIndividualFilterChange = (filterName: string) => {
  // 개별 옵션 변경 시 전체 상태 업데이트
  if (filterName !== 'all') {
    // 개별 옵션들이 모두 선택되면 전체도 선택
    if (
      selectedFilters.value.normal &&
      selectedFilters.value.expired &&
      selectedFilters.value.maturity &&
      selectedFilters.value.extinct &&
      selectedFilters.value.cancel
    ) {
      selectedFilters.value.all = true
    } else {
      selectedFilters.value.all = false
    }
  }
}
const clickSort = () => {
  isShowSortModal.value = !isShowSortModal.value
}

// 탭 변경 핸들러
const onSegmentedTabChange = (key: string) => {
  activeSegmentedTab.value = key
  updatePredefinedDates()

  console.log(`📅 기간 탭 변경: ${getPeriodLabel()}`)
}

// 다음 버튼 클릭 핸들러
const clickNext = () => {
  console.log('다음 버튼 클릭')
  // 여기에 다음 페이지로 이동하는 로직을 추가할 수 있습니다
}

// 상단 유의사항 데이터
const infoItems = [
  '청구의신 ‘서류없이 청구’에서 실손 보험 청구가 완료된 <br />진료내역에 한 해 처방전이 조회되어요',
  '진료일/청구일 기준 최근 3년까지 조회가 가능해요'
]

// 처방전 내역 데이터
const prescriptionItems = [
  {
    id: 1,
    insuranceLogo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    insuranceName: '강남성심병원 내분비대사내과',
    medicalDate: '2025.03.25',
    claimDate: '2025.05.14'
  },
  {
    id: 2,
    insuranceLogo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    insuranceName: '강남성심병원 내분비대사내과',
    medicalDate: '2025.03.25',
    claimDate: '2025.05.14'
  },
  {
    id: 3,
    insuranceLogo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    insuranceName: '강남성심병원 내분비대사내과',
    medicalDate: '2025.03.25',
    claimDate: '2025.05.14'
  }
]
</script>

<style scoped lang="scss">
// sort 관련
.total-claim {
  width: 100%;
  padding: 2.1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .total {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 140%;
    color: #2b2b2b;
    strong {
      font-weight: 700;
    }
  }
  .sort-insurance {
    .item {
      position: relative;
      padding: 0 1.2rem;
      font-weight: 500;
      color: #555555;
      i.icon-arrow-down {
        margin-left: 0.4rem;
        display: inline-block;
        width: 2rem;
        height: 2rem;
        background: url('/assets/images/insu/icon-arrow-down.svg') no-repeat center center;
        background-size: 100%;
        transition: transform 0.3s ease;
        transform-origin: center center;

        &.rotated {
          transform: rotate(180deg);
        }
      }
      &:not(:first-child) {
        &::before {
          content: '';
          width: 0.1rem;
          height: 1.2rem;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background-color: #e2e2e2;
        }
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
}
// sort - bottomModal 관련
.wrap-bottom-sort {
  .tit-sort {
    margin: 1.2rem 0 0.8rem;
    font-size: 1.2rem;
    line-height: 130%;
    color: #555555;
    text-align: left;
  }
}
.wrap-empty {
  margin-top: 2rem;
  padding: 24rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    width: 8rem;
    height: 8rem;
  }
  .tit {
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 140%;
    color: #555555;
  }
  .sut-tit {
    margin-top: 0.8rem;
    margin-bottom: 1.6rem;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 140%;
    color: #555;
    text-align: center;
  }
}
</style>
