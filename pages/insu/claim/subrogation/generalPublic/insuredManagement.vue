<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구/피보험자 관리"
    logo-type="text"
    :has-search="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="<span class='icon ico-edit'></span>"
    @search="handleSearch"
  >
    <TitleSection title="청구할 피보험자를 선택해 주세요" class="mt-24 mb-32" />

    <TotalItemSort :total="3" :buttons="sortButtons" :unit="'명'" @button-click="clickSort" />
    <CustomerList
      :person-list="personList"
      :add-text="'고객 추가'"
      @button-click="handleItemButtonClick"
      @add-click="movePage"
    />
  </BaseBody>

  <BottomModal
    title="설계사를 선택해 주세요"
    :is-visible="isShowAgentModal"
    :is-show-cancel-button="false"
    :is-show-confirm-button="false"
    @close="isShowAgentModal = false"
  >
    <template #content>
      <template style="display: flex; flex-direction: column; gap: 0.75rem">
        <button v-for="item in agentList" :key="item.id" class="c-btn outline" @click="selectAgent(item)">
          {{ item.label }}
        </button>
      </template>
    </template>
  </BottomModal>

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

  <BottomModal
    :is-visible="isShowRequestModal"
    title="안내"
    :html="requestModalContent"
    cancel-button-text="나중에 보내기"
    confirm-button-text="알림톡 보내기"
    @confirm="sendNoti"
    @close="isShowRequestModal = false"
    @cancel="isShowRequestModal = false"
  />

  <FullModal
    title="피보험자 편집"
    :confirm-button-text="`${selectedCount}개 삭제하기`"
    :is-show-close-button="true"
    :is-visible="isShowEditFullModal"
    :is-show-cancel-button="false"
    :is-show-confirm-button="true"
    @confirm="clickConfirmModal"
    @close="closeEditFullModal"
  >
    <template #content>
      <EditInsuredPersonList
        v-model="insuredPersonSelections"
        :person-list="insuredPersonList"
        @edit-click="editInsuredData"
      />
    </template>
  </FullModal>
  <ConfirmModal
    :is-visible="isShowConfirmModal"
    :html="confirmModalContent"
    :is-show-cancel-button="true"
    :is-show-confirm-button="true"
    :is-show-footer="true"
    cancel-button-text="취소"
    confirm-button-text="삭제"
    @close="isShowConfirmModal = false"
    @cancel="isShowConfirmModal = false"
    @confirm="handleDeleteConfirm"
    style="z-index: 9999"
  />
</template>

<script setup lang="ts">
import CustomerList from '~/components/insu/CustomerList.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import { HEADER_UTILS_BUTTON } from '~/constants/header.constants'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import FullModal from '~/components/common/modal/FullModal.vue'
import SegmentedTabsStyle, { type SegmentTab } from '~/components/common/tab/SegmentedTabs.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import warnIcon from '~/assets/images/insu/subrogation/icon-warn.png'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import TotalItemSort from '~/components/publishing/insu/billingInfo/TotalItemSort.vue'
import EditInsuredPersonList from '~/components/insu/EditInsuredPersonList.vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
import AutoClaimAvailableItem from '~/components/publishing/insu/auto/AutoClaimAvailableItem.vue'

const insuranceList = ref([
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false }
])

const selectedInsurances = computed(() => {
  return insuranceList.value.filter(item => item.checked)
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

const requestModalContent = ref('')
const requestSign = (personData: any) => {
  isShowRequestModal.value = true
  requestModalContent.value = `<div style="font-weight:700; font-size:1.6rem" class="mb-16">${personData.name}님께 청구에 필요한 개인정보 활용동의 알림톡을 발송합니다.</div>
  <div class="pd-13y pd-16x fz-16" style="border: .1rem solid #e2e2e2; border-radius:.8rem; font-weight: 500; line-height: 2.2rem;"><span>${personData.name}</span>&nbsp;<span>${personData.phone}</span></div>
  <div class="mt-6 fz-13" style="color:#F14960 ">반드시 고객 동의 및 서명이 이루어져야 대리청구를 진행할 수 있습니다.</div>`
}

const handleItemButtonClick = (personData: any) => {
  if (personData.buttonLabel === '청구하기') {
    clickClaim()
  } else if (personData.buttonLabel === '서명요청') {
    requestSign(personData)
  }
}
const sortButtons = ref([
  { label: '전체', value: 'all' },
  { label: 'DB손해', value: 'DB손해', icon: true }
])
const setAddTextClickHandler = inject<(handler: () => void) => void>('setAddTextClickHandler')
onMounted(() => {
  if (setAddTextClickHandler) {
    setAddTextClickHandler(clickFullModal)
  }
})

const isShowConfirmModal = ref(false)
const confirmModalContent = ref('')
const clickConfirmModal = async () => {
  confirmModalContent.value = `
    <div style="display: flex; flex-direction: column; text-align: center">
      <img src="${warnIcon}" alt="경고" style="width: 7.2rem; height: 7.2rem;margin: 0 auto;">
      <div style="font-weight: 700;font-size: var(--num-18);text-align: left;;margin-top:0.6rem;">선택한 피보험자 ${selectedCount.value}명을 삭제하시겠어요?</div>
      <div style="font-size: var(--num-14);text-align: center;color: #555555;margin-top:0.8rem;">삭제하시면 복구가 불가능해요.</div>
    </div>`

  isShowConfirmModal.value = true
}

const handleDeleteConfirm = () => {
  console.log('선택한 피보험자들 삭제:', selectedCount.value, '명')
  insuredPersonSelections.value.clear()
  isShowConfirmModal.value = false
  isShowEditFullModal.value = false
}

const insuredPersonSelections = ref(new Set<number>())

const selectedCount = computed(() => insuredPersonSelections.value.size)

const isAllInsurancesSelected = computed({
  get: () => insuranceList.value.every(item => item.checked),
  set: newValue => {
    insuranceList.value.forEach(item => {
      item.checked = newValue
    })
  }
})

const segmentedTabs: SegmentTab[] = [
  { name: '전체', code: 'all' },
  { name: '청구 가능', code: 'possible' },
  { name: '서명 요청', code: 'request' },
  { name: '서명 대기', code: 'waiting' }
]
const segmentedActiveIndex = ref(0)
const handleSegmentedTabClick = (index: number) => {
  segmentedActiveIndex.value = index
  console.log('Segmented 탭 클릭:', segmentedTabs[index])
}

definePageMeta({
  title: '대리청구/피보험자 관리',
  utils: [HEADER_UTILS_BUTTON.SEARCH, HEADER_UTILS_BUTTON.EDIT]
})

const agentList = ref([
  { id: 'all', label: '전체', value: 'all' },
  { id: '1', label: '설계사1', value: 1 },
  { id: '2', label: '설계사2', value: 2 },
  { id: '3', label: '설계사3', value: 3 },
  { id: '4', label: 'agent4', value: 4 }
])

const insuredPersonList = ref([
  {
    id: 1,
    name: '김레몬',
    phone: '010****5555',
    insurances: ['KB손해보험', '삼성화재'],
    memo: '메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다.'
  },
  {
    id: 2,
    name: '김레몬',
    phone: '010****5555',
    insurances: ['KB손해보험', '삼성화재'],
    memo: '메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다.'
  },
  {
    id: 3,
    name: '김레몬',
    phone: '010****5555',
    insurances: ['KB손해보험', '삼성화재'],
    memo: '메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다.'
  }
])
const isShowAgentModal = ref(false)
const isShowFilterModal = ref(false)
const isShowRequestModal = ref(false)
const selectedAgent = ref<any>(agentList.value[0])
const clickSort = () => {
  isShowFilterModal.value = true
}

const isShowEditFullModal = ref(false)
const closeEditFullModal = () => {
  isShowEditFullModal.value = false
}
const toggleFullModal = () => {
  isShowEditFullModal.value = !isShowEditFullModal.value
}

const clickFullModal = () => {
  if (!isShowEditFullModal.value) {
    insuredPersonSelections.value.clear()
  }
  toggleFullModal()
}

const selectAgent = (selectValue: any) => {
  selectedAgent.value = selectValue
  isShowAgentModal.value = false
}

const clickClaim = () => {
  navigateTo('/insu/claim/subrogation/serviceInUse/selectInsurance01')
}

const movePage = () => {
  navigateTo('/insu/claim/subrogation/serviceInUse/addInsuredData')
}

const editInsuredData = () => {
  navigateTo('/insu/claim/subrogation/serviceInUse/EditInsuredData')
}
const sendNoti = () => {
  console.log('알림톡 발송')
  isShowRequestModal.value = false
}

const setSearchHandler = inject<(handler: (query?: string, type?: string) => void) => void>('setSearchHandler')

const handleSearch = (query: any, type: any) => {
  navigateTo('/insu/claim/subrogation/serviceInUse/insuredManagementSearch')
}

onMounted(() => {
  if (setSearchHandler) {
    setSearchHandler(handleSearch)
  }
})
</script>

<style scoped lang="scss"></style>
