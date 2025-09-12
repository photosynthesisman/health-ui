<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI분석 숨은 보상금 찾기 결과"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <FlexSection class="mt-56">
      <SearchProgress
        :date="'2025.04.11 12:12'"
        :progress-status="1"
        :texts="{ progress: 'AI가 숨은 보상금을 찾고 있어요', complete: '보상금 찾기 분석을 완료했어요' }"
        :steps="[{ text: '전송시작', subText: '계약보험/질병명' }, { text: 'AI분석중' }, { text: 'AI분석완료' }]"
        :hospital="'경북대학교병원'"
        :img-src="'/_nuxt/assets/images/insu/logo_KUMedicine.svg'"
        :info-txt="'숨은 보상금 찾기 분석이 완료되면 알림으로 보내드려요.'"
        :info-list="[
          '실손보험 이외의 계약보험 약관 및 담보 내용을 바탕으로 AI가 숨은 보상금 수령 가능성 유무를 분석 하고 있어요.',
          '숨은 보상금 찾기 분석 결과 확인은 30분 정도 소요될 수 있어요.',
          '<span>AI 분석 숨은 보상금 찾기 결과</span> 화면에서 숨은 보상금 수령가능성 여부를 확인하세요.'
        ]"
      />
    </FlexSection>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import SearchProgress from '~/components/insu/SearchProgress.vue'
</script>

<style scoped lang="scss"></style>
