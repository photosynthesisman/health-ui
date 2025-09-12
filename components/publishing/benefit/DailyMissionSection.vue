<template>
  <div class="daily-mission">
    <DailyMissionInfo :total-goal-steps="currentGoalSteps" :current-count="currentStepCount" />
    <DailyMissionCheck @update-goal-steps="handleUpdateGoalSteps" @update-current-count="handleUpdateCurrentCount" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import DailyMissionInfo from '~/components/publishing/benefit/DailyMissionInfo.vue'
import DailyMissionCheck from '~/components/publishing/benefit/DailyMissionCheck.vue'

// 목표 걸음 달성 수치
const currentGoalSteps = ref(0)
const currentStepCount = ref(0)

const handleUpdateGoalSteps = (steps: number) => {
  currentGoalSteps.value = steps
}

const handleUpdateCurrentCount = (count: number) => {
  currentStepCount.value = count
}
</script>
<style scoped lang="scss">
.daily-mission {
  overflow: hidden;
  border-radius: 1.2rem;
  box-shadow: 0 0 2.177rem 0 rgba(0, 0, 0, 0.1);
}
</style>
