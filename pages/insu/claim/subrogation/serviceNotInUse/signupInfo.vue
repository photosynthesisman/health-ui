<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구 안내"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <TitleSection
      title="보험금 청구 <strong class='blue'>1건당 50원?</strong><br />구독 서비스로 해결!"
      :description="'구독 가입으로 무제한으로 청구 서비스<br />이용하고 인슈어링크(커뮤니티)에서<br />보험 영업을 더 스마트하게!'"
      class="mt-24"
    />

    <img class="img-main" src="/assets/images/insu/subrogation/img-signup-main.png" alt="이미지:서비스 안내" />

    <InfoText text="고객(피보험자)은 앱 설치 없이 카카오톡 인증만 하면 돼요." class="mt-16 justify-center" gray />
    <FlexColDiv class="gap-8 mt-4">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="설계사 가입하기"
        class="medium"
        @click="clickSignup('consultant')"
      />
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="설계사 대리인 가입하기"
        class="btn-darkgray medium"
        @click="clickSignup('agent')"
      />
    </FlexColDiv>
    <DotInfoList :items="infoItems" class="mt-12" />
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import InfoText from '~/components/insu/InfoText.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import DotInfoList from '~/components/publishing/insu/billingInfo/DotInfoList.vue'
const infoItems = ['보험 설계사 및 대리인의 개인정보는 보험사로 전달되지않으며, 청구의 편의를 위해서만 사용됩니다.']
const clickSignup = (type: string) => {
  // 설계사, 설계사 대리인에 따라 동의화면 이후 분기처리
  navigateTo('/insu/claim/subrogation/serviceNotInUse/term')
}
</script>

<style scoped lang="scss">
.img-main {
  margin: 3.7rem auto;
  width: 23rem;
}

.claim-info {
  margin-top: 3.6rem;
  padding-left: 1rem;
  font-weight: 1.4rem;
  color: #555555;
  position: relative;
  &::before {
    content: '';
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    background-color: #959595;
    position: absolute;
    top: 1rem;
    left: 0rem;
  }
}
</style>
