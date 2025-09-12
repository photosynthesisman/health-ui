<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI 실손 예상 보험금 확인 결과"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="pt-24 pb-32">
      <TitleSection title="AI가 분석한<br/>숨은 보상금 예상 결과에요." />
    </div>
    <FindResultHideItem :hospital-data="hospitalData" @item-click="clickNext" @item-click-complete="clickNext" />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import FindResultHideItem from '~/components/insu/FindResultHideItem.vue'

const hospitalData = ref([
  {
    price: 1123456,
    count: 2,
    date: '2024.04.18 12:12',
    badges: [{ text: '분석실패', class: 'badge-red badge-solid' }]
  },
  {
    price: 1123456,
    count: 2,
    date: '2024.04.18 12:12',
    badges: [{ text: '분석완료', class: 'badge-dark-green badge-solid' }]
  },
  {
    price: 1123456,
    count: 2,
    date: '2024.04.18 12:12',
    badges: [{ text: '분석완료', class: 'badge-dark-green badge-solid' }]
  }
])
const clickNext = () => {
  return navigateTo('/insu/claim/subrogation/ai/checkAnalysisResults')
}
</script>

<style scoped lang="scss"></style>
