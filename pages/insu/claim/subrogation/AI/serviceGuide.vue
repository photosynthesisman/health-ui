<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI분석 숨은 보상금 찾기"
    logo-type="text"
    :has-notification="true"
    :has-add-text-left="true"
    class="pb-60"
  >
    <section class="pt-24 pb-32">
      <TitleSection
        title="AI가 계약된 보험에서<br/>숨은 보상금을 찾기 위해 고객님의<br/>통원/입원 진료내역을 가져옵니다"
        description="MY병원의 최근 3년간 통원/입원 진료내역으로<br/>AI가 추가 보상금 수령 가능성 유무를 분석해요."
      />
    </section>
    <img class="img-main" src="/assets/images/insu/ai/img-serviceGuide.png" alt="이미지:서비스 안내" />
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="MY병원 진료내역 가져오기"
      class="lg w-full medium btn-sticky"
      @click="clickAgree"
    />
  </ButtonGroup>

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
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal, FullModal } from '@lemonhc/fo-ui/components/modal'
import TitleSection from '~/components/insu/TitleSection.vue'
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
  // 서류없이 청구
  return navigateTo('/insu/claim/inputDefaultInfoData')
  // // 사진찍어 청구 && 본인 방문
  // return navigateTo('/insu/claim/inputDefaultInfoData')
  // // 사진찍어 청구 && 최초청구일 경우: 가족 방문
  // return navigateTo('/insu/claim/picture/inputFamilyData')
}
</script>

<style scoped lang="scss">
.img-main {
  margin: 9.6rem auto 0;
  width: 23rem;
}
</style>
