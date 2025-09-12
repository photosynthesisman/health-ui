<template>
  <BaseBody page-title="연간랭킹" :is-transparent="true" :show-back-button="true" class="pb-56">
    <AnnualRankingTop
      :status="challengeStatus"
      top-title="왕좌에 오른 당신께, <br />벤츠 G-Class"
      top-sub-title="뜨거운 보상과 함께 <br />걷기왕 챌린지 역사를 써봐요"
      top-img="/_nuxt/assets/images/walkingking/img-annual-reward.png"
    />
    <AnnualRankingTopList v-if="challengeStatus === 'joined'" :rank-user="topRankUsers" />
    <AnnualChallengeList v-else />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import AnnualRankingTop from '~/components/publishing/walkking/AnnualRankingTop.vue'
import AnnualChallengeList from '~/components/publishing/walkking/AnnualChallengeList.vue'
import AnnualRankingTopList from '~/components/publishing/walkking/AnnualRankingTopList.vue'

// 챌린지 참가 여부 상태
type ChallengeStatus = 'joined' | 'notJoined'
const challengeStatus = ref<ChallengeStatus>('joined')

// 탑30위 데이터
const topRankUsers = [
  {
    name: '나이키 에어퐁퐁',
    imgUrl: '/_nuxt/assets/images/img-community-01.png',
    point: 83.567
  },
  {
    name: '정교한 산수유',
    imgUrl: '/_nuxt/assets/images/img-community-01.png',
    point: 82.092
  },
  {
    name: '우승좀할라니깐비켜',
    imgUrl: '/_nuxt/assets/images/img-community-01.png',
    point: 81.487
  },
  {
    name: '나이키 에어퐁퐁',
    imgUrl: '/_nuxt/assets/images/img-community-01.png',
    point: 80.012
  },
  {
    name: '정교한 산수유',
    imgUrl: '/_nuxt/assets/images/img-community-01.png',
    point: 80.004
  }
]
</script>
