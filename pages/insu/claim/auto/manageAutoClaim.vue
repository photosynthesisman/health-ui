<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 안내"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <TitleSection title="내 자동청구 정보" class="mt-24" />
    <MyAutoClaimTooltip />
    <InsuInfoBorderType />
    <hr class="hr-section mt-0 ml-n20 mr-n20" />
    <AutoClaimCancel />
    <button class="btn-unsubscribe" @click="unsubscribeModal">
      자동청구 서비스 해지
      <i class="icon-arrow-right"></i>
    </button>
    <div class="wrap-alert">고려학교 안암병원<br />실손보험 자동청구가 해지되었어요.</div>
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import MyAutoClaimTooltip from '~/components/publishing/insu/auto/MyAutoClaimTooltip.vue'
import AutoClaimCancel from '~/components/publishing/insu/auto/AutoClaimCancel.vue'
import InsuInfoBorderType from '~/components/publishing/insu/auto/InsuInfoBorderType.vue'
import { ConfirmModal } from '@lemonhc/fo-ui/components/modal'

const unsubscribeModal = async () => {
  const modalContent = `
    <div style="display: flex; flex-direction: column; gap: 1rem; text-align: center; margin-bottom: -2rem;">
      <div style="color: #555555;text-align: left;">서비스를 해지 하시면 등록한 병원에 더이상<br />실손보험 자동청구를 하지 않아요.</div>
    </div>`
  await ConfirmModal.open({
    isVisible: true,
    html: modalContent,
    title: '자동청구 서비스 해지',
    confirmButtonText: '해지하기'
  })
}
definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: 'AI분석 숨은 보상금 찾기'
  // utils: ['phone']
  // customTitle: 'logo',
})

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
.btn-unsubscribe {
  margin-top: 2.4rem;
  font-size: 1.4rem;
  color: #555555;
  @include mixin.flex-container(justify-center items-center);
  gap: 0.2rem;
  .icon-arrow-right {
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
    background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
    background-size: 100%;
  }
}
.wrap-alert {
  padding: 1.5rem 2rem;
  width: calc(100% - 4rem);
  text-align: center;
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  border-radius: 1.2rem;
  background: var(--Semantic-Background-BG-Dimmed, #000000b2);
}
</style>
