<template>
  <BaseBody page-title="레몬건강지수" :is-transparent="true" :show-back-button="true" :white-logo="true">
    <MainDashBoard />
    <MainDebtInfo />

    <!-- 맞춤미션 영역 -->
    <MainCustomMisson />
    <!-- 하단 배너 -->
    <MainBottomBanner />
    <MainHealthTip />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import MainDashBoard from '~/components/publishing/healthDebt/MainDashBoard.vue'
import MainDebtInfo from '~/components/publishing/healthDebt/MainDebtInfo.vue'
import MainCustomMisson from '~/components/publishing/healthDebt/MainCustomMission.vue'

import MainBottomBanner from '~/components/publishing/healthDebt/MainBottomBanner.vue'
import MainHealthTip from '~/components/publishing/healthDebt/MainHealthTip.vue'
</script>

<style scoped lang="scss"></style>
