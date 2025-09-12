<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구/피보험자 관리 검색"
    logo-type="text"
    :show-search="true"
    :search-with-select="true"
    :search-select-options="searchOptions"
    :search-select-title="'검색 구분을 선택해 주세요.'"
  >
    <FlexColDiv v-if="personList.length" class="flex-1">
      <TotalItemSort
        :total="personList.length"
        :buttons="sortButtons"
        :unit="'명'"
        @button-click="isShowFilterModal = true"
      />
      <CustomerList :person-list="personList" @button-click="handleItemButtonClick" @add-click="movePage" />
    </FlexColDiv>
    <InsuEmpty v-else :title="'검색 결과가 없어요.'" />

    <ConfirmModal
      :is-visible="isShowRequestModal"
      title="안내"
      :html="requestModalContent"
      cancel-button-text="나중에 보내기"
      confirm-button-text="알림톡 보내기"
      @confirm="sendNoti"
      @close="isShowRequestModal = false"
      @cancel="isShowRequestModal = false"
    />
    <BottomModal
      title="조회조건 설정"
      :is-visible="isShowFilterModal"
      :is-show-cancel-button="false"
      @confirm="handleFilterModalClose"
      @close="isShowFilterModal = false"
    >
      <template #content>
        <div class="wrap-inquiry-condition">
          <InputLabelText label="대리청구 상태" class="mb-6" />
          <SegmentedTabsStyle
            :tabs="segmentedTabs"
            :active-index="segmentedActiveIndex"
            @tab-click="handleSegmentedTabClick"
          />
          <FlexRowDiv class="space-between align-end mt-20 mb-6">
            <InputLabelText label="보험사 선택" />
            <Checkbox id="checkBox2" v-model="isAllInsurancesSelected" aria-label="전체 선택" />
          </FlexRowDiv>
          <AutoClaimAvailableItem v-model:items="insuranceList" />
        </div>
      </template>
    </BottomModal>
  </BaseBody>
</template>

<script setup lang="ts">
import Checkbox from '~/components/publishing/input/check.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import CustomerList from '~/components/insu/CustomerList.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import SegmentedTabsStyle, { type SegmentTab } from '~/components/common/tab/SegmentedTabs.vue'
import { inject, onMounted, ref } from 'vue'
import AutoClaimAvailableItem from '~/components/publishing/insu/auto/AutoClaimAvailableItem.vue'
import TotalItemSort from '~/components/publishing/insu/billingInfo/TotalItemSort.vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
const sortButtons = ref([
  { label: '전체', value: 'all' },
  { label: '보험사', value: 'latest', icon: true }
])
const segmentedTabs: SegmentTab[] = [
  { name: '전체', code: 'all' },
  { name: '청구 가능', code: 'possible' },
  { name: '서명 요청', code: 'request' },
  { name: '서명 대기', code: 'waiting' }
]
const segmentedActiveIndex = ref(0)
const handleSegmentedTabClick = (index: number) => {
  segmentedActiveIndex.value = index
}

const isShowFilterModal = ref(false)
const selectedInsurances = computed(() => {
  return insuranceList.value.filter(item => item.isActive)
})
const isAllInsurancesSelected = computed({
  get: () => insuranceList.value.every(item => item.isActive),
  set: newValue => {
    insuranceList.value.forEach(item => {
      item.isActive = newValue
    })
  }
})

const handleFilterModalClose = () => {
  isShowFilterModal.value = false
  const selectedList = selectedInsurances.value

  const baseButtons = []
  let insuranceButton

  if (segmentedActiveIndex.value === 0 && isAllInsurancesSelected.value) {
    sortButtons.value = [{ label: '전체', value: 'all', icon: true }]
    return
  }

  if (segmentedActiveIndex.value === 0) {
    baseButtons.push({ label: '전체', value: 'all' })
  } else {
    baseButtons.push({
      label: segmentedTabs[segmentedActiveIndex.value].name,
      value: segmentedTabs[segmentedActiveIndex.value].code
    })
  }

  if (selectedList.length === 1) {
    insuranceButton = { label: selectedList[0].name, value: selectedList[0].name, icon: true }
    baseButtons.push(insuranceButton)
  } else {
    insuranceButton = { label: '전체', value: 'latest', icon: true }
    baseButtons.push(insuranceButton)
  }

  sortButtons.value = baseButtons
}
// 검색 옵션 정의
const searchOptions = [
  { value: 'all', label: '고객' },
  { value: 'name', label: '나의가족/제3자' }
]

const personList = ref([
  {
    name: '김레몬',
    phone: '010****5555',
    isSelectable: true,
    insurances: ['KB손해보험', '삼성화재', '삼성화재'],
    memo: '메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다.',
    buttonType: 'primary',
    buttonLabel: '청구하기',
    buttonDisabled: false
  },
  {
    name: '김레몬',
    phone: '010****5555',
    isSelectable: false,
    insurances: ['KB손해보험', '삼성화재'],
    memo: '메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다.',
    buttonType: 'secondary',
    buttonLabel: '서명요청',
    buttonDisabled: false
  },
  {
    name: '김레몬',
    phone: '010****5555',
    isSelectable: false,
    insurances: ['KB손해보험', '삼성화재'],
    memo: '메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다.',
    buttonType: 'primary',
    buttonLabel: '서명대기',
    buttonDisabled: true
  }
])

const insuranceList = ref([
  { name: 'DB손해', isActive: false, checked: false },
  { name: 'DB손해', isActive: false, checked: false },
  { name: 'DB손해', isActive: false, checked: false },
  { name: 'DB손해', isActive: false, checked: false },
  { name: 'DB손해', isActive: false, checked: false },
  { name: 'DB손해', isActive: false, checked: false },
  { name: 'DB손해', isActive: false, checked: false },
  { name: 'DB손해', isActive: false, checked: false },
  { name: 'DB손해', isActive: false, checked: false }
])
const handleItemButtonClick = (personData: any) => {
  if (personData.buttonLabel === '청구하기') {
    clickClaim()
  } else if (personData.buttonLabel === '서명요청') {
    requestSign(personData)
  }
}
const sendNoti = () => {
  console.log('알림톡 발송')
  isShowRequestModal.value = false
}
const isShowBottomModal = ref(false)
const isShowRequestModal = ref(false)
const clickClaim = () => {
  isShowBottomModal.value = true
}
const requestModalContent = ref('')
const requestSign = (personData: any) => {
  isShowRequestModal.value = true
  requestModalContent.value = `<div style="font-weight:700; font-size:1.6rem" class="mb-16">${personData.name}님께 청구에 필요한 개인정보 활용동의 알림톡을 발송합니다.</div>
  <div class="pd-13y pd-16x fz-16" style="border: .1rem solid #e2e2e2; border-radius:.8rem; font-weight: 500; line-height: 2.2rem;"><span>${personData.name}</span>&nbsp;<span>${personData.phone}</span></div>
  <div class="mt-6 fz-13" style="color:#F14960 ">반드시 고객 동의 및 서명이 이루어져야 대리청구를 진행할 수 있습니다.</div>`
}
const movePage = () => {
  navigateTo('/insu/claim/subrogation/serviceInUse/addInsuredData')
}
</script>

<style scoped lang="scss"></style>
