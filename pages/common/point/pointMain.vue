<template>
  <BaseBody
    :show-back-button="true"
    page-title="레몬포인트"
    logo-type="text"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="<span style='color:#555;font-size:1.4rem'><i class='icon ico-gift'></i>아이템 스토어</span>"
  >
    <PointMainCard />
    <hr class="hr-section mt-32 ml-n20 mr-n20 mb-8" />
    <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />

    <TotalItemSort :total="6" :buttons="sortButtons" @button-click="clickSort" />
    <PointHistoryList />
    <BottomModal
      :is-visible="isShowSortModal"
      title="조회기간"
      :is-show-cancel-button="false"
      confirm-button-text="확인"
      @close="isShowSortModal = false"
      @confirm="isShowSortModal = false"
    >
      <template #content>
        <div class="wrap-bottom-sort">
          <div class="date-range-tabs">
            <SegmentedTabs :tabs="segmentedTabs" :active-key="activeSegmentedTab" @tab-change="onSegmentedTabChange" />
          </div>

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
        </div>
      </template>
    </BottomModal>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import TotalItemSort from '~/components/publishing/insu/billingInfo/TotalItemSort.vue'
import PointMainCard from '~/components/publishing/point/PointMainCard.vue'
import type { BaseModalProps, ModalEmitEvent } from '~/types/common/modal.type'
import PointHistoryList from '~/components/publishing/point/PointHistoryList.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import SegmentedTabs, { type SegmentTab } from '~/components/tabbar/SegmentedTabs.vue'
import InputCalendarFromTo from '~/components/publishing/input/InputCalendarFromTo.vue'

const clickSort = () => {
  isShowSortModal.value = !isShowSortModal.value
}

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

const isShowSortModal = ref(false)

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

// `SegmentedTabs` 설정
const segmentedTabs = ref<SegmentTab[]>([
  { title: '3개월', key: 'segment1' },
  { title: '6개월', key: 'segment2' },
  { title: '12개월', key: 'segment3' },
  { title: '직접설정', key: 'segment4' }
])

// `activeSegmentedTab` 상태
const activeSegmentedTab = ref(props.initialPeriodType || 'segment2')

const sortButtons = computed(() => {
  const selectedTab = segmentedTabs.value.find(tab => tab.key === activeSegmentedTab.value)
  const label = selectedTab ? selectedTab.title : '기간 선택'
  return [{ label, value: activeSegmentedTab.value, iconArrow: true }]
})

// `SegmentedTabs` 이벤트 핸들러
const onSegmentedTabChange = (key: string) => {
  activeSegmentedTab.value = key
}
const isDirectInput = computed(() => activeSegmentedTab.value === 'segment4')

// 초기값 설정
const startDate = ref<string>('')
const endDate = ref<string>('')
const activeLineTab = ref('all')
const lineTabs = ref<Tab[]>([
  { title: '전체', key: 'all' },
  { title: '적립내역', key: 'credit' },
  { title: '사용내역', key: 'used' }
])
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}

onMounted(() => {
  if (props.initialPeriodType) {
    activeSegmentedTab.value = props.initialPeriodType
  } else {
    activeSegmentedTab.value = 'segment1'
  }
})
</script>

<style scoped lang="scss"></style>
