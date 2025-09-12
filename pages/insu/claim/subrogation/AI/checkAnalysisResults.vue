<template>
  <BaseBody>
    <SearchResult v-if="successCount === 0" :tit="'AI 실손 예상 보험금<br/>분석에 실패했어요.'" :success="false" />
    <SearchResult v-else :tit="'AI가 분석한 실손 예상 보험금은<br/><span>1,234,567원</span>이에요'" />

    <AiAnalysisResultItem :analysis-results="analysisResultsData" />

    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="AI분석 숨은보상금 찾기 신청"
        class="lg w-full medium btn-sticky"
      />
      <div class="btn-group-info">가입한 보험에서 숨은 보상금을 찾아보세요!</div>
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import SearchResult from '~/components/insu/SearchResult.vue'
import AiAnalysisResultItem from '~/components/insu/AiAnalysisResultItem.vue'

const analysisResultsData = ref([
  {
    hospitalName: '경북대학교병원',
    logoSrc: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    date: '2025.05.10',
    department: '안과',
    type: '통원',
    details: [
      { tit: '총 금액', price: '1,123,456원' },
      { tit: '급여', price: '456,789원' },
      { tit: '비급여', price: '456,789원' },
      { tit: '환자부담금액', price: '456,789원' }
    ],
    analysisStatus: true,
    expectedReward: '956,789원',
    failMessage: '실손 예상 보험금 분석에 실패했어요'
  },
  {
    hospitalName: '경북대학교병원',
    logoSrc: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    date: '2025.05.10',
    department: '안과',
    type: '입원',
    details: [
      { tit: '총 금액', price: '1,123,456원' },
      { tit: '급여', price: '456,789원' },
      { tit: '비급여', price: '456,789원' },
      { tit: '환자부담금액', price: '456,789원' }
    ],
    analysisStatus: false,
    failMessage: '실손 예상 보험금 분석에 실패했어요'
  }
])

const successCount = computed(() => {
  return analysisResultsData.value.filter(item => item.analysisStatus === true).length
})
</script>

<style scoped lang="scss">
.btn-group {
  .btn-group-info {
    position: absolute;
    top: -85%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 130%;
    color: #fff;
    padding: 1.2rem;
    border-radius: 0.8rem;
    background-color: #4f5561;
    width: max-content;
    &::before {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 0.5rem solid transparent;
      border-top-color: #4f5561;
    }
  }
}
</style>
