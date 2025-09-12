<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI 보상금 분석"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
  >
    <AiAnalysisMainCard
      @toggle-more-info="toggleMoreInfo"
      @close-more-info="closeMoreInfo"
      @reload="handleReload"
      @to-my-insurance="clickNext"
    />
    <AiAnalysisLinkedWrap @item-click="handleMissionClick" />
    <ConfirmModal
      :is-visible="showConfirmModal"
      :title="'내 보험정보를 업데이트 해요'"
      :content="'보험 정보를 업데이트 하려면 금융 마이데이터에 연결해야 해요'"
      :confirm-button-text="'연결하기'"
      :cancel-button-text="'취소'"
      @close="closeConfirmModal"
      @cancel="closeConfirmModal"
      @confirm="closeConfirmModal"
    />
    <!-- AI분석 서비스 이용시 case별 팝업 -->
    <ConfirmModal
      :is-visible="showConfirmModal2"
      :title="modalTitle"
      :content="modalContent"
      :confirm-button-text="modalConfrimBtn"
      :cancel-button-text="'취소'"
      @close="closeConfirmModal2"
      @cancel="closeConfirmModal2"
      @confirm="closeConfirmModal2"
    />
  </BaseBody>
</template>

<script setup lang="ts">
import AiAnalysisLinkedWrap from '~/components/insu/AiAnalysisLinkedWrap.vue'
import AiAnalysisMainCard from '~/components/insu/AiAnalysisMainCard.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
const isConnected = ref(false)
const isMoreInfoActive = ref(false)
const showConfirmModal = ref(false)
const closeConfirmModal = () => {
  showConfirmModal.value = false
}
const toggleMoreInfo = () => {
  isMoreInfoActive.value = !isMoreInfoActive.value
}
const closeMoreInfo = () => {
  isMoreInfoActive.value = false
}
const handleReload = () => {
  showConfirmModal.value = true
  isConnected.value = true
}
const clickNext = () => {
  return navigateTo('/insu/claim/subrogation/ai/myInsuranceList')
}

const showConfirmModal2 = ref(false)
const closeConfirmModal2 = () => {
  showConfirmModal2.value = false
}
const modalTitle = ref()
const modalContent = ref()
const modalConfrimBtn = ref()
const handleMissionClick = (clickedItem: { title: any; subtitle: string }, index: any) => {
  if (clickedItem.subtitle === '숨은 보상금 찾기 신청') {
    showConfirmModal2.value = true
    modalTitle.value = 'MY 병원 연결이 필요해요'
    modalContent.value = 'AI 분석 숨은 보상금 찾기 서비스를 이용 하시려면 MY 병원 연결이 필요해요'
    modalConfrimBtn.value = '연결하기'
  } else if (clickedItem.subtitle === '실손 예상 보험금 확인') {
    showConfirmModal2.value = true
    modalTitle.value = '내 보험 정보가 필요해요'
    modalContent.value =
      'AI 분석 서비스를 이용 하시려면 보험 정보가 필요해요. 보험 정보를 가져오기 위해서 금융 마이데이터 사업자인 (주)헥토데이터와 연결할게요.'
    modalConfrimBtn.value = '연결하기'
  } else if (clickedItem.subtitle === '숨은 보상금 찾기 결과') {
    return navigateTo('/insu/claim/subrogation/ai/findConpensationResult')
  } else if (clickedItem.subtitle === '실손 예상 보험금 분석 결과') {
    return navigateTo('/insu/claim/subrogation/ai/expectedResult')
  }
}
</script>
<style scoped lang="scss"></style>
