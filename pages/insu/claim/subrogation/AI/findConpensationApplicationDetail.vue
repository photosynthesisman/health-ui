<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI분석 숨은 보상금 찾기 결과"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
  >
    <!-- 건별 상세(수령가능) -->
    <div v-if="success">
      <SearchResult
        :tit="'축하드려요!'"
        :sub-tit="'신청한 진료내역에서<br/>숨은 보상금을 받을 <span>가능성이 매우 높아요.</span>'"
        :hospital="'경북대학교병원'"
        :img-src="'/_nuxt/assets/images/insu/logo_KUMedicine.svg'"
      />
      <SearchResultItem :medical-histories="medicalHistoriesData" />
    </div>
    <!-- 건별 상세(수령불가) -->
    <div v-else>
      <SearchResult
        :tit="'아쉬워요!'"
        :has-sub="true"
        :success="false"
        :hospital="'경북대학교병원'"
        :img-src="'/_nuxt/assets/images/insu/logo_KUMedicine.svg'"
      />
      <SearchResultItem :medical-histories="medicalHistoriesData" :info-text="''" />
    </div>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="확인"
        class="lg w-full medium btn-sticky"
        @click="clickToResult"
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import SearchResult from '~/components/insu/SearchResult.vue'
import SearchResultItem from '~/components/insu/SearchResultItem.vue'
import { ref, computed } from 'vue'
const success = ref(false)
// 진료 내역 데이터
const medicalHistoriesData = ref([
  {
    department: '영상의학과',
    date: '2021.07.05',
    type: '입원',
    status: '수령가능',
    details: [
      { name: 'DB손해보험', desc: '무배당카데이션하나로보험', label: '보상금 수령가능' },
      { name: 'DB손해보험', desc: '무배당카데이션하나로보험', label: '보상금 수령불가' }
    ]
  },
  {
    department: '영상의학과',
    date: '2021.07.05',
    type: '통원',
    status: '수령가능',
    details: [
      { name: 'DB손해보험', desc: '무배당카데이션하나로보험', label: '보상금 수령가능' },
      { name: 'DB손해보험', desc: '무배당카데이션하나로보험', label: '보상금 수령불가' }
    ]
  },
  {
    department: '영상의학과',
    date: '2021.07.05',
    type: '입원',
    status: '수령불가',
    details: [
      { name: 'DB손해보험', desc: '무배당카데이션하나로보험', label: '보상금 수령가능' },
      { name: 'DB손해보험', desc: '무배당카데이션하나로보험', label: '보상금 수령불가' }
    ]
  }
])

const clickToResult = () => {
  return navigateTo('/insu/claim/subrogation/AI/findConpensationResult')
}
</script>

<style scoped lang="scss"></style>
