<template>
  <BaseBody
    :show-back-button="false"
    page-title=""
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <SearchProgress
      :date="'2025.04.11 12:12'"
      :progress-status="progressStatus"
      :texts="{ progress: 'AI가 숨은 보상금을 찾고 있어요', complete: '보상금 찾기 분석을 완료했어요' }"
      :steps="[{ text: '전송시작', subText: '계약보험/질병명' }, { text: 'AI분석중' }, { text: 'AI분석완료' }]"
      :hospital="'경북대학교병원'"
      :guide-txt="true"
      :img-src="'/_nuxt/assets/images/insu/logo_KUMedicine.svg'"
      :info-list="[
        '숨은 보상금 찾기 분석 결과 확인은 30분 정도 소요될 수 있어요.',
        '숨은 보상금 수령가능 여부는 <span>AI 분석 숨은 보상금 찾기 결과</span> 화면에서 확인하세요.'
      ]"
    />
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <SearchGuideBanner />

    <ButtonGroup class="is-fixed">
      <Button
        v-if="progressStatus !== 2"
        btn-type="primary"
        element-type="button"
        aria-label="청구의신 홈으로"
        class="lg w-full medium btn-sticky"
        @click="goHome"
      />
      <Button
        v-else
        btn-type="primary"
        element-type="button"
        aria-label="숨은 보상금 찾기 결과 보기"
        class="lg w-full medium btn-sticky"
        @click="clickNext"
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import SearchProgress from '~/components/insu/SearchProgress.vue'
import SearchGuideBanner from '~/components/insu/SearchGuideBanner.vue'

// progressStatus를 반응형 상태로 정의
const progressStatus = ref(1)
const goHome = () => {
  return navigateTo('/insu/')
}
const clickNext = () => {
  return navigateTo('/insu/claim/subrogation/ai/findConpensationResult')
}
</script>

<style scoped lang="scss"></style>
