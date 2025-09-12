<template>
  <BaseBody
    :show-back-button="true"
    page-title="내 보험 정보"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
  >
    <AiAnalysisMainCard :sub-tooltip="true" @reload="handleReload" />

    <MyInsuranceList
      v-if="dataList.length"
      :insurance-list="dataList"
      :need-update="true"
      @click-sort="clickSort"
      @to-detail="toDetail"
    />

    <div v-else class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="아이콘:검색없음" />
      <div class="text">조회할 수 있는 보험 정보가 없어요</div>
      <Button
        btn-type="line"
        element-type="button"
        aria-label="내 보험 업데이트"
        class="xs mt-16"
        :width="12"
        @click="handleReload"
      />
    </div>
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
  </BaseBody>
  <BottomModal
    :is-visible="isShowSortModal"
    title="조회조건 설정"
    :is-show-cancel-button="false"
    confirm-button-text="확인"
    @close="isShowSortModal = false"
  >
    <template #content>
      <SetFilterConditions />
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import AiAnalysisMainCard from '~/components/insu/AiAnalysisMainCard.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import MyInsuranceList from '~/components/insu/MyInsuranceList.vue'
import SetFilterConditions from '~/components/insu/SetFilterConditions.vue'

const isConnected = ref(false)
const showConfirmModal = ref(false)
const closeConfirmModal = () => {
  showConfirmModal.value = false
}
const handleReload = () => {
  showConfirmModal.value = true
  isConnected.value = true
}
const isShowSortModal = ref(false)

const dataList = ref([
  {
    companyLogo: '/_nuxt/assets/images/insu/logo_kbbank.svg',
    companyName: 'KB손해보험',
    productName: '무배당 카테이션 하나로보험',
    status: '정상',
    type: '질병(건강)보험',
    price: '956,789'
  },
  {
    companyLogo: '/_nuxt/assets/images/insu/logo-alert-db.png',
    companyName: 'DB손해보험',
    productName: '무배당 카테이션 하나로보험',
    status: '만기',
    type: '자동차보험',
    price: '956,789'
  },
  {
    companyLogo: '/_nuxt/assets/images/insu/logo_kbbank.svg',
    companyName: 'KB손해보험',
    productName: '무배당 카테이션 하나로보험',
    status: '정상',
    type: '질병(건강)보험',
    price: '956,789'
  }
])

const clickSort = () => {
  isShowSortModal.value = !isShowSortModal.value
}
const toDetail = (insurance: { type: string }) => {
  if (insurance.type === '자동차보험') {
    return navigateTo('/insu/claim/subrogation/ai/myCarInsuranceDetail')
  } else {
    return navigateTo('/insu/claim/subrogation/ai/myInsuranceDetail')
  }
}
</script>
<style scoped lang="scss">
.wrap-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1%;
  img {
    width: 8rem;
    height: 8rem;
  }
  .text {
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    color: #555555;
    text-align: center;
  }
}
</style>
