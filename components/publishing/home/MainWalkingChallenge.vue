<template>
  <div class="main-challenge-wrap">
    <!-- 참여 전 챌린지 -->
    <MainBeforeChallenge />

    <!-- 내가 참여하고 있는 챌린지 -->
    <MainMyChallenge />
    <!-- 진행 중 챌린지 -->
    <MainParticipateChallenge />
    <!-- 예정 챌린지 -->
    <MainPlanedChallenge />

    <!-- 프라이빗 걷기 게임 만들기 -->
    <MainPrivateGame />
  </div>
</template>

<script setup lang="ts">
import MainBeforeChallenge from '~/components/publishing/home/MainBeforeChallenge.vue'

import MainMyChallenge from '~/components/publishing/home/MainMyChallenge.vue'
import MainParticipateChallenge from '~/components/publishing/home/MainParticipateChallenge.vue'
import MainPlanedChallenge from '~/components/publishing/home/MainPlanedChallenge.vue'

import MainPrivateGame from '~/components/publishing/home/MainPrivateGame.vue'
</script>

<style lang="scss" scoped>
.main-challenge-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.2rem 0;
  overflow: hidden; // 메인 좌우스크롤 문제 수정
  margin: 1.2rem -2rem 0; // 메인 좌우스크롤 문제 수정
  padding: 0 2rem 3.2rem; // 메인 좌우스크롤 문제 수정
}
</style>
