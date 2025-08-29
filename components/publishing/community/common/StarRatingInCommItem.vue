<template>
  <div class="star-rating">
    <p class="score">{{ score.toFixed(1) }}</p>
    <div v-for="starIndex in 5" :key="starIndex" class="star-wrapper">
      <div class="star-bg"></div>
      <div class="star-fill" :style="{ width: getStarFillWidth(starIndex) }"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  score: number
}>()

const getStarFillWidth = (starIndex: number): string => {
  const currentRating = props.score ?? 0 // 'props.score'를 사용

  if (starIndex <= currentRating) {
    return '100%'
  } else if (starIndex - 0.5 <= currentRating) {
    return '50%'
  }
  return '0%'
}
</script>

<style scoped lang="scss">
.star-rating {
  display: flex;
  flex-direction: row;
  gap: 0 0.4rem;
  padding: 0.7rem 0;
  .score {
    margin-right: 0.8rem;
    font-weight: 700;
    line-height: 2.2rem;
  }
  .star-wrapper {
    position: relative;
    width: 2rem;
    height: 2rem;
    .star-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none'%3E%3Cpath d='M15.8268 3.6185C16.1022 3.06044 16.898 3.06044 17.1734 3.6185L20.7387 10.8427C20.8481 11.0643 21.0595 11.2179 21.3041 11.2534L29.2764 12.4119C29.8923 12.5013 30.1382 13.2582 29.6926 13.6926L23.9237 19.3158C23.7467 19.4883 23.666 19.7368 23.7078 19.9804L25.0696 27.9205C25.1748 28.5339 24.531 29.0016 23.9802 28.712L16.8495 24.9632C16.6308 24.8482 16.3694 24.8482 16.1507 24.9632L9.02002 28.712C8.46918 29.0016 7.82538 28.5339 7.93059 27.9205L9.29242 19.9804C9.3342 19.7368 9.25345 19.4883 9.07648 19.3158L3.30764 13.6926C2.86201 13.2582 3.10792 12.5013 3.72377 12.4119L11.6961 11.2534C11.9407 11.2179 12.1521 11.0643 12.2615 10.8427L15.8268 3.6185Z' fill='%23F4F4F4' stroke='%23E2E2E2' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-size: 2rem;
    }
    .star-fill {
      position: absolute;
      overflow: hidden;
      width: 0;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none'%3E%3Cpath d='M15.8268 3.6185C16.1022 3.06044 16.898 3.06044 17.1734 3.6185L20.7387 10.8427C20.8481 11.0643 21.0595 11.2179 21.3041 11.2534L29.2764 12.4119C29.8923 12.5013 30.1382 13.2582 29.6926 13.6926L23.9237 19.3158C23.7467 19.4883 23.666 19.7368 23.7078 19.9804L25.0696 27.9205C25.1748 28.5339 24.531 29.0016 23.9802 28.712L16.8495 24.9632C16.6308 24.8482 16.3694 24.8482 16.1507 24.9632L9.02002 28.712C8.46918 29.0016 7.82538 28.5339 7.93059 27.9205L9.29242 19.9804C9.3342 19.7368 9.25345 19.4883 9.07648 19.3158L3.30764 13.6926C2.86201 13.2582 3.10792 12.5013 3.72377 12.4119L11.6961 11.2534C11.9407 11.2179 12.1521 11.0643 12.2615 10.8427L15.8268 3.6185Z' fill='%23FCD233' stroke='%23FBC700' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-size: 2rem;
    }
  }
}
</style>
