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
    <div class="pt-24 pb-32">
      <TitleSection title="AI가 분석한<br/>숨은 보상금 찾기 결과예요" />
    </div>
    <FindResultHideItem
      :hospital-data="hospitalData"
      @item-click-complete="toResultPage"
      @item-click-progress="toProgress"
    />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import FindResultHideItem from '~/components/insu/FindResultHideItem.vue'

const hospitalData = ref([
  {
    hospitalName: '고려대학교 안암병원',
    count: 2,
    date: '2024.04.18 12:12',
    badges: [{ text: '분석중', class: 'badge-brown badge-solid' }]
  },
  {
    hospitalName: '고려대학교 안암병원',
    count: 2,
    date: '2024.04.18 12:12',
    badges: [
      { text: '분석완료', class: 'badge-dark-green badge-solid' },
      { text: '상담 신청완료', class: 'badge-green' },
      { text: '숨은 보상금 수령불가', class: '' }
    ]
  },
  {
    hospitalName: '고려대학교 안암병원',
    count: 2,
    date: '2024.04.18 12:12',
    badges: [
      { text: '분석완료', class: 'badge-dark-green badge-solid' },
      { text: '상담 취소', class: '' },
      { text: '숨은 보상금 수령가능', class: 'badge-blue' }
    ]
  }
])
const toProgress = () => {
  return navigateTo('/insu/claim/subrogation/ai/findConpensationApplicationCompleted')
}
const toResultPage = () => {
  return navigateTo('/insu/claim/subrogation/AI/findConpensationApplicationDetail')
}
</script>

<style scoped lang="scss"></style>
