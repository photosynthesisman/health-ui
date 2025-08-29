<template>
  <div class="profile-wrap">
    <FlexColDiv class="mt-n32">
      <ChallengeProfileBox :profile-data="profileData" />
    </FlexColDiv>
    <FlexRowDiv class="gap-8 mt-18">
      <ChallengeStepsBox
        v-for="(step, index) in stepsData"
        :key="index"
        :title="step.title"
        :steps="step.steps"
        :type="step.type"
      />
    </FlexRowDiv>
  </div>
</template>

<script setup lang="ts">
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import ChallengeProfileBox from '~/components/publishing/walkking/ChallengeProfileBox.vue'
import ChallengeStepsBox from '~/components/publishing/walkking/ChallengeStepsBox.vue'

interface ProfileData {
  rankUp?: boolean
  rank?: string
  currentRank: string
  name: string
  location: string
  reward: number
}
interface StepData {
  title: string
  steps: string
  type: string
}

const props = defineProps<{
  profileData: ProfileData
  stepsData: StepData[]
}>()
</script>

<style scoped lang="scss">
.profile-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2rem;
  background-color: #fff;
  border-radius: 3.2rem 3.2rem 0 0;
}
</style>
