<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI분석 숨은 보상금 찾기"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="병원 없음" class="img" />
      <div class="tit">
        <span>숨은 보상금 찾기<br />신청 가능한 진료내역이 없어요.</span>
        <p>
          진료내역을 업데이트 해서<br />
          최근 진료내역을 가져올 수 있어요.
        </p>
      </div>

      <Button
        btn-type="line"
        element-type="button"
        aria-label="진료내역 다시 가져오기"
        class="xs"
        :width="15.4"
        @click="clickAgree"
      />
    </div>
    <BottomModal
      :is-visible="isShowAgreeModal"
      title="약관동의"
      :is-show-cancel-button="false"
      confirm-button-text="다음"
      @close="isShowAgreeModal = false"
      @confirm="clickNext"
    >
      <template #content>
        <AiAnalysisAgreeTerms
          :title="'진료내역을 가져오기 위해 동의가 필요해요.'"
          :terms-data="termsData"
          @term-click="showDetailTerm"
        />
      </template>
    </BottomModal>

    <FullModal
      :is-visible="isShowDetailTerm"
      title="보험사 약관 동의"
      :is-show-cancel-button="false"
      confirm-button-text="동의하기"
      @close="isShowDetailTerm = false"
      @confirm="clickAgreeTerm"
    >
      <template #content>
        <AiAnalysisTermsDetail />
      </template>
    </FullModal>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import { BottomModal, FullModal } from '@lemonhc/fo-ui/components/modal'
import AiAnalysisAgreeTerms from '~/components/insu/AiAnalysisAgreeTerms.vue'
import AiAnalysisTermsDetail from '~/components/insu/AiAnalysisTermsDetail.vue'
const isShowAgreeModal = ref(false)
const isShowDetailTerm = ref(false)

const clickAgree = () => {
  isShowAgreeModal.value = !isShowAgreeModal.value
}

const showDetailTerm = () => {
  isShowDetailTerm.value = !isShowDetailTerm.value
}

const clickAgreeTerm = () => {
  isShowDetailTerm.value = !isShowDetailTerm.value
}

const termsData = ref([
  {
    id: 'checkBox2',
    label: '개인(신용)정보 수집 및 동의',
    checked: false
  },
  {
    id: 'checkBox3',
    label: '민감정보(진료정보) 수집 및 이용 동의',
    checked: false
  }
])

const clickNext = () => {
  return navigateTo('/insu/claim/inputDefaultInfoData')
}
</script>

<style scoped lang="scss">
.wrap-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 18.4rem 0;
  text-align: center;
  color: #555;
  .img {
    width: 8rem;
    height: 8rem;
  }
  .tit {
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.5rem;
    p {
      margin-top: 0.8rem;
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 2.2rem;
    }
  }
}
</style>
