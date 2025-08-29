<template>
  <div class="c-count-box">
    <div>
      총 <strong>{{ count }}</strong
      >건
    </div>
    <!-- 버튼 타입 -->
    <div class="select-option btn-type">
      <!-- SegmentedTabs 선택 값 -->
      <button type="button" class="select-item" @click="clickBottomModal">{{ selectedPeriodLabel }}</button>

      <!-- 라디오 선택 값 -->
      <button type="button" class="select-item arrow-down" @click="clickBottomModal">{{ selectedMethod }}</button>
    </div>
    <Teleport to="body">
      <BottomModal
        :is-visible="isShowSortModal"
        title="조회조건 설정"
        :is-show-cancel-button="false"
        confirm-button-text="조회하기"
        @close="isShowSortModal = false"
        @confirm="clickNext"
      >
        <template #content>
          <div class="wrap-bottom-sort">
            <div class="tit-sort">조회기간</div>
            <!-- 기간 선택 탭 -->
            <div class="date-range-tabs">
              <SegmentedTabs
                :key="activeSegmentedTab"
                :tabs="segmentedTabs"
                :active-key="activeSegmentedTab"
                @tab-change="onSegmentedTabChange"
              />
            </div>
            <div class="tit-sort">정렬순서</div>
            <div class="flex gap-8">
              <Radio
                id="rdo1"
                v-model="selectedMethod"
                name="rdo1"
                custom-style="button small"
                value="진료일 기준"
                aria-label="진료일 기준"
                class="w-full"
              />
              <Radio
                id="rdo2"
                v-model="selectedMethod"
                name="rdo1"
                custom-style="button small"
                value="청구일 기준"
                aria-label="청구일 기준"
                class="w-full"
              />
            </div>
          </div>
        </template>
      </BottomModal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import type { BaseModalProps, ModalEmitEvent } from '~/types/common/modal.type'
import SegmentedTabs, { type SegmentTab } from '~/components/tabbar/SegmentedTabs.vue'
import Radio from '~/components/publishing/input/radio.vue'

// Props
interface Props {
  count?: number
}

export interface DateRange {
  startDate: Date
  endDate: Date
  periodType: 'custom' | '3months' | '6months' | '12months'
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// Reactive data
const isShowSortModal = ref(false)
const selectedMethod = ref('진료일 기준')
const activeSegmentedTab = ref('6months')
const startDate = ref<string>('')
const endDate = ref<string>('')

// Segmented tabs configuration
const segmentedTabs = ref<SegmentTab[]>([
  { title: '6개월', key: '6months' },
  { title: '1년', key: '1year' },
  { title: '2년', key: '2years' },
  { title: '3년', key: '3years' }
])

// 선택된 기간 라벨 계산
const selectedPeriodLabel = computed(() => {
  const selected = segmentedTabs.value.find(tab => tab.key === activeSegmentedTab.value)
  return selected ? selected.title : '6개월'
})

// Methods
const clickBottomModal = () => {
  isShowSortModal.value = true
}

// SegmentedTab 변경 핸들러
const onSegmentedTabChange = (key: string) => {
  activeSegmentedTab.value = key
}

// 조회하기 버튼 클릭 (선택된 값 적용)
const clickNext = () => {
  // 선택된 값이 적용됨
  isShowSortModal.value = false

  // 필요시 emit으로 부모 컴포넌트에 전달
  // emit('update:period', activeSegmentedTab.value)
  // emit('update:sortMethod', selectedMethod.value)
}
</script>

<style scoped lang="scss">
.c-count-box {
  display: flex;
  flex-direction: row;
  padding: 2rem 0;
  .select-option {
    display: flex;
    flex-direction: row;
    gap: 0 2.4rem;
    margin-left: auto;

    &.btn-type {
      .select-item {
        position: relative;
        font-size: 1.6rem;
        font-weight: 500;
        display: flex;
        gap: 0 0.4rem;
        & + .select-item {
          &::before {
            content: '';
            display: block;
            left: -1.2rem;
            top: 50%;
            transform: translateY(-50%);
            position: absolute;
            width: 0.1rem;
            height: 1.2rem;
            background-color: #e2e2e2;
          }
        }
        &.arrow-down {
          &:after {
            content: '';
            display: block;
            width: 2rem;
            height: 2rem;
            background-position: center;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5.83301 8.33398L10.0004 12.1507L14.1663 8.33398' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          }
        }
      }
    }
  }
}
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
</style>
