<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구 안내"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
  >
    <CompleteTitleSection :title="'대리청구 서비스 가입을<br />완료했어요'" class="flex-1 justify-center" />

    <div class="wrap-success-adv">
      <div class="adv-info">
        <div class="tit">가입 고객을 위한 선물</div>
        <div class="tit-sub">대리청구 <strong>무제한 이용!</strong><br />보험 영업 지원 혜택까지!!</div>
      </div>
      <FlexColDiv>
        <Button
          btn-type="primary"
          element-type="button"
          aria-label="구독 신청하고 혜택받기"
          class="mt-16 w-full medium"
          @click="movePage"
        />
        <Button
          btn-type="text"
          element-type="button"
          aria-label="나중에 이용하기"
          class="hasLine xs mt-12"
          @click="movePage"
        />
      </FlexColDiv>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import CompleteTitleSection from '~/components/insu/CompleteTitleSection.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
const movePage = () => {
  // 로그인 화면으로 이동 (로그아웃 처리 필요?)
  navigateTo('/common/login')
}
</script>

<style scoped lang="scss">
.wrap-success-adv {
  padding: 2.4rem 2rem 2rem;
  border-radius: 1.2rem;
  background: url('/assets/images/insu/subrogation/img-success-bg.png') top 0.8rem right no-repeat #e8eefa;
  background-size: auto;
  .adv-info {
    .tit {
      font-weight: 500;
      color: #555555;
    }
    .tit-sub {
      margin-top: 0.6rem;
      font-size: 2.2rem;
      font-weight: 700;
      line-height: 130%;
      strong {
        color: #4c7ff7;
      }
    }
  }
}
</style>
