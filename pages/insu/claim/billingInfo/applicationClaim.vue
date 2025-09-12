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
    <hr class="hr-section ml-n20 mr-n20" />
    <TotalItemSort :total="claimItems.length" :buttons="sortButtons" @button-click="clickButton" />
    <!-- ToDo: 기간 내, 청구내역이 없을때 활성화 -->
    <InsuEmpty v-if="!claimItems || claimItems.length === 0" title="조회한 기간 내에<br />청구한 내역이 없어요." />
    <CheckBillingItemAddDoc v-else :items="claimItems" />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import Button from '~/components/publishing/button/Button.vue'
import TotalItemSort from '~/components/publishing/insu/billingInfo/TotalItemSort.vue'
import CheckBillingItemAddDoc from '~/components/publishing/insu/billingInfo/CheckBillingItemAddDoc.vue'
import InsuEmpty from '~/components/insu/InsuEmpty.vue'

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

// Sort 버튼명 배열
const sortButtons = [
  { label: '전체', value: 'all' },
  { label: '최근 7일', value: '7days', icon: true }
]

const clickButton = () => {
  console.log('Sort Button Click')
}

// 청구내역 데아터
const claimItems = [
  {
    id: 1,
    date: '2025.03.25',
    insuranceLogo: '/_nuxt/assets/images/insu/logo_kbbank.svg',
    insuranceName: 'KB손해보험',
    designer: '박미란',
    insurant: '김레몬',
    beneficiary: '이헬스',
    billingReason: '[일반상해] 운동중 발목 접질림'
  },
  {
    id: 2,
    date: '2025.03.25',
    insuranceLogo: '/_nuxt/assets/images/insu/logo_kbbank.svg',
    insuranceName: 'KB손해보험',
    designer: '박미란',
    insurant: '김레몬',
    beneficiary: '이헬스',
    billingReason: '[일반상해] 운동중 발목 접질림'
  },
  {
    id: 3,
    date: '2025.03.25',
    insuranceLogo: '/_nuxt/assets/images/insu/logo_kbbank.svg',
    insuranceName: 'KB손해보험',
    designer: '박미란',
    insurant: '김레몬',
    beneficiary: '이헬스',
    billingReason: '[일반상해] 운동중 발목 접질림'
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
</style>
