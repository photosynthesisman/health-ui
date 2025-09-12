<template>
  <BaseBody page-title="시상/경품내역" :show-back-button="true" class="pb-28">
    <ChallengeAwardsTop title="출퇴근 러닝 챌린지" date="2025. 06. 15 ~ 2025. 06. 30" />
    <hr class="hr-section mt-0 mb-8 ml-n20 mr-n20" />
    <LineTabsStyle :tabs="lineTabs" :active-index="lineActiveIndex" @tab-click="handleLineTabClick" />
    <ChallengeAwardsList v-if="lineActiveIndex === 0" />
    <ChallengePrizeList v-else />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import ChallengeAwardsTop from '~/components/publishing/walkking/ChallengeAwardsTop.vue'
import LineTabsStyle, { type Tab } from '~/components/common/tab/LineTabs.vue'
import ChallengeAwardsList from '~/components/publishing/walkking/ChallengeAwardsList.vue'
import ChallengePrizeList from '~/components/publishing/walkking/ChallengePrizeList.vue'

// LineTabs 데이터
const lineTabs: Tab[] = [
  { name: '상금 시상 내역', code: 'awards' },
  { name: '경품 당첨 내역', code: 'prize' }
]
const lineActiveIndex = ref(0)

// LineTabs 핸들러
const handleLineTabClick = (index: number) => {
  lineActiveIndex.value = index
  console.log('Line 탭 클릭:', lineTabs[index])
}
</script>
