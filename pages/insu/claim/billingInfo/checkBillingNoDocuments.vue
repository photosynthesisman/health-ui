<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구 내역"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
  >
    <TitleSection title="보험금 청구 내역을<br />확인할 수 있어요" class="mt-24 mb-24" />
    <Button btn-type="line" element-type="button" aria-label="처방전 조회" />
    <hr class="hr-section ml-n20 mr-n20 mb-8" />
    <LineTabsStyle :tabs="lineTabs" :active-index="lineActiveIndex" class="" @tab-click="handleLineTabClick" />
    <TotalItemSort :total="claimItems.length" :buttons="sortButtons" @button-click="clickSort" />
    <!-- ToDo: 기간 내, 청구내역이 없을때 활성화 -->
    <InsuEmpty v-if="!claimItems || claimItems.length === 0" title="조회한 기간 내에<br />청구한 내역이 없어요." />
    <CheckBillingItem v-else :items="claimItems" />
    <Teleport to="body">
      <BottomModal
        :is-visible="isShowSortModal"
        title="조회 조건 설정"
        :is-show-cancel-button="false"
        confirm-button-text="조회하기"
        @close="isShowSortModal = false"
      >
        <template #content>
          <NoticeBox :text="'청구내역은 최대 3년전까지 가능해요'" />
          <FlexSection class="gap-12 mt-16">
            <FlexColDiv class="gap-6">
              <InputLabelText label="조회기간" />
              <SegmentedTabs
                :tabs="segmentedTabs1"
                :active-key="activeSegmentedTab1"
                @tab-change="onSegmentedTabChange1"
              />
            </FlexColDiv>
            <FlexColDiv class="gap-6">
              <InputLabelText label="조회기간" />
              <SegmentedTabs
                :tabs="segmentedTabs2"
                :active-key="activeSegmentedTab2"
                @tab-change="onSegmentedTabChange2"
              />
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
    </Teleport>
  </BaseBody>
</template>

<script setup lang="ts">
import TitleSection from '~/components/insu/TitleSection.vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
import SegmentedTabs from '~/components/tabbar/SegmentedTabs.vue'
import SegmentedTabsStyle from '~/components/common/tab/SegmentedTabs.vue'
import NoticeBox from '~/components/insu/NoticeBox.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import Button from '~/components/publishing/button/Button.vue'
import LineTabsStyle, { type Tab } from '~/components/common/tab/LineTabs.vue'
import type { BaseModalProps } from '~/types/common/modal.type'
import TotalItemSort from '~/components/publishing/insu/billingInfo/TotalItemSort.vue'
import InsuEmpty from '~/components/insu/InsuEmpty.vue'
import CheckBillingItem from '~/components/publishing/insu/billingInfo/CheckBillingItem.vue'

// LineTabs 데이터
const lineTabs: Tab[] = [
  { name: '서류없이 청구', code: 'no-docs' },
  { name: '사진찍어 청구', code: 'photo-claim' },
  { name: '대리청구', code: 'proxy-claim' }
]
const lineActiveIndex = ref(0)
// 이벤트 핸들러들
const handleLineTabClick = (index: number) => {
  lineActiveIndex.value = index
  console.log('Line 탭 클릭:', lineTabs[index])
}

const agentList = ref([
  { id: 'all', label: '전체', value: 'all' },
  { id: '1', label: '설계사1', value: 1 },
  { id: '2', label: '설계사2', value: 2 },
  { id: '3', label: '설계사3', value: 3 },
  { id: '4', label: 'agent4', value: 4 }
])

// Select 컴포넌트용 옵션들
const selectOptions = ref([
  { value: '전체보기', label: '전체보기' },
  { value: '설계사1', label: '설계사1' },
  { value: '설계사2', label: '설계사2' },
  { value: '설계사3', label: '설계사3' },
  { value: '설계사4', label: '설계사4' },
  { value: '설계사5', label: '설계사5' }
])

const selectedAgent = ref<any>(agentList.value[0])
// 커스텀 Select 컴포넌트용 상태
const selectedAgentValue = ref('전체보기')
const selectedAgentLabel = ref('전체보기')
const isShowCustomSelect = ref(false)

const openCustomSelect = () => {
  isShowCustomSelect.value = true
}

const closeCustomSelect = () => {
  isShowCustomSelect.value = false
}

const selectCustomOption = (option: any) => {
  selectedAgentValue.value = option.value
  selectedAgentLabel.value = option.label
  selectedAgent.value = option
  closeCustomSelect()
}
interface DateRangeModalProps extends BaseModalProps {
  initialStartDate?: Date | null
  initialEndDate?: Date | null
  initialPeriodType1?: string
  initialPeriodType2?: string
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
  initialPeriodType1: 'segment1',
  initialPeriodType2: 'segment5'
})

const isShowSortModal = ref(false)
const clickSort = () => {
  isShowSortModal.value = !isShowSortModal.value
}

// Sort 버튼명 배열
const sortButtons = [
  { label: '전체', value: 'all' },
  { label: '6개월', value: '6months' },
  { label: '최신순', value: 'latest', icon: true }
]

// SegmentedTabs 설정
const segmentedTabs1 = ref([
  { title: '전체', key: 'segment1' },
  { title: '통원', key: 'segment2' },
  { title: '입원', key: 'segment3' },
  { title: '자동청구', key: 'segment4' }
])
const segmentedTabs2 = ref([
  { title: '6개월', key: 'segment5' },
  { title: '1년', key: 'segment6' },
  { title: '2년', key: 'segment7' },
  { title: '3년', key: 'segment8' }
])
const segmentedTabsSort = [
  { name: '최신순', code: 'latest' },
  { name: '과거순', code: 'past' }
]
const segmentedActiveIndex = ref(0)
const handleSegmentedTabClick = (index: number) => {
  segmentedActiveIndex.value = index
  console.log('Segmented 탭 클릭:', segmentedTabsSort[index])
}
//SegmentedTabs 이벤트 핸들러
const onSegmentedTabChange1 = (key: string) => {
  activeSegmentedTab1.value = key
}
const onSegmentedTabChange2 = (key: string) => {
  activeSegmentedTab2.value = key
}
// 반응형 상태
const activeSegmentedTab1 = ref(props.initialPeriodType1 || 'segment1')
const activeSegmentedTab2 = ref(props.initialPeriodType2 || 'segment5')

// 청구내역 데아터
const claimItems = [
  {
    id: 1,
    treatmentType: 'out',
    claimStatus: 'done',
    autoBilling: true,
    date: '2025.03.25',
    insuranceLogo: '/_nuxt/assets/images/insu/logo_kbbank.svg',
    insuranceName: 'KB손해보험',
    designer: '박미란',
    insurant: '김레몬',
    beneficiary: '이헬스',
    billingReason: '[일반상해] 운동중 발목 접질림',
    details: [
      { department: '안과', visitDate: '2025.03.29' },
      { department: '정형외과', visitDate: '2025.03.18' }
    ]
  },
  {
    id: 2,
    treatmentType: 'in',
    claimStatus: 'able',
    autoBilling: true,
    date: '2025.03.25',
    insuranceLogo: '/_nuxt/assets/images/insu/logo_kbbank.svg',
    insuranceName: 'KB손해보험',
    designer: '박미란',
    insurant: '김레몬',
    beneficiary: '이헬스',
    billingReason: '[일반상해] 운동중 발목 접질림',
    details: [{ department: '안과', visitDate: '2025.03.29' }]
  },
  {
    id: 3,
    treatmentType: 'out',
    claimStatus: 'fail',
    autoBilling: false,
    date: '2025.03.25',
    insuranceLogo: '/_nuxt/assets/images/insu/logo_kbbank.svg',
    insuranceName: 'KB손해보험',
    designer: '박미란',
    insurant: '김레몬',
    beneficiary: '이헬스',
    billingReason: '[일반상해] 운동중 발목 접질림',
    details: [{ department: '피부과', visitDate: '2025.03.29' }]
  }
]
</script>
<style scoped lang="scss">
// .custom-select-options {
//   margin: 0 -2rem;
//   .custom-option-item {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 1.6rem 2rem;
//     cursor: pointer;
//     transition: background-color 0.2s ease;

//     &:hover {
//       background-color: #f6f9ff;
//     }

//     &.selected {
//       background-color: #f6f9ff;

//       .option-label {
//         color: #4c7ff7;
//         font-weight: 700;
//       }
//     }

//     .option-label {
//       font-size: 1.6rem;
//       font-weight: 500;
//       color: #555555;
//     }

//     .check-icon {
//       color: #4c7ff7;
//       font-weight: bold;
//       font-size: 1.4rem;
//     }
//   }
// }
</style>
