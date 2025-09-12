<template>
  <FlexColDiv class="dailyMission-info"> 매일목표 {{ formattedCurrentCount }}걸음 달성</FlexColDiv>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'

const props = defineProps<{
  //totalGoalSteps: number
  currentCount: number
}>()

// const formattedGoalSteps = computed(() => {
//   return props.totalGoalSteps.toLocaleString()
// })

const formattedCurrentCount = computed(() => {
  return props.currentCount.toLocaleString()
})
</script>
<style scoped lang="scss">
.dailyMission-info {
  justify-content: center;
  align-items: center;
  padding: 2.4rem 0 2rem;
  background: #4c7ff7;
  font-size: var(--num-18);
  font-weight: vars.$bold;
  line-height: 2.5rem;
  color: #fff;
}
</style>
