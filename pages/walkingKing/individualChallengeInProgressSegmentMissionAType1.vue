<template>
  <BaseBody
    :has-share-type2="true"
    page-title="16th 하이워킹 챌린지 하프 마라 하이워킹 챌린지 하프 마라 하이워킹 챌린지 하프 마라"
    :show-back-button="true"
    :is-transparent="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="<span class='icon ico-menu'>메뉴 아이콘</span>"
  >
    <ChallengeSteps />

    <IntervalMissionProfile :profile-data="userProfile" :steps-data="userSteps" />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChallengeSteps from '~/components/publishing/walkking/ChallengeSteps.vue'
import IntervalMissionProfile from '~/components/publishing/walkking/IntervalMissionProfile.vue'
import BaseBody from '~/components/layout/BaseBody.vue'

const userProfile = ref({
  rankUp: true,
  rank: '121',
  name: '장동건',
  location: '서울강남',
  reward: 12,
  currentRank: '138'
})

const userSteps = ref([
  { title: '건강걸음', steps: '954,298', type: '' },
  { title: '플러스걸음', steps: '26,300', type: '' },
  { title: '총 걸음', steps: '980,589', type: 'total' }
])
</script>

<style scoped lang="scss"></style>
