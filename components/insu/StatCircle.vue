<template>
  <div class="stat-circle-wrap">
    <svg class="stat-circle" width="72" height="72" viewBox="0 0 72 72">
      <circle class="bg" :cx="center" :cy="center" :r="radius" />
      <circle class="progress" :cx="center" :cy="center" :r="radius" :style="{ strokeDashoffset: progressOffset }" />
    </svg>
    <div class="text">
      <p>{{ current }}일</p>
      <span>남음</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    default: 100,
    validator: (value: number) => value > 0
  },
  current: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0
  }
})

// SVG 크기 관련 상수 정의
const svgSize = 72 // SVG의 width, height, viewBox의 가로/세로 값
const strokeWidth = 8 // 원의 굵기
const radius = svgSize / 2 - strokeWidth / 2
const center = svgSize / 2

// 화면에 표시될 percentage 값
const displayedPercentage = ref(0)

// 실제 계산된 percentage 값
const percentage = computed(() => {
  if (props.total === 0) return 0
  const calculatedPercentage = Math.round((props.current / props.total) * 100)
  return calculatedPercentage > 100 ? 100 : calculatedPercentage
})

const circumference = 2 * Math.PI * radius

// displayedPercentage에 따라 stroke-dashoffset을 계산
const progressOffset = computed(() => {
  const dashoffset = circumference - (circumference * displayedPercentage.value) / 100
  return dashoffset
})

onMounted(() => {
  setTimeout(() => {
    let currentVal = 0
    const interval = setInterval(() => {
      if (currentVal >= percentage.value) {
        clearInterval(interval)
      } else {
        currentVal++
        displayedPercentage.value = currentVal
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.stat-circle-wrap {
  position: relative;
  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    p {
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 2.2rem;
    }
    span {
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1.6rem;
    }
  }
}
.stat-circle {
  transform: rotate(-90deg) rotateX(180deg);
  circle.bg {
    fill: none;
    stroke: #ececec;
    stroke-width: v-bind('strokeWidth');
  }

  circle.progress {
    fill: none;
    stroke: var(--blue-primary);
    stroke-width: v-bind('strokeWidth');
    stroke-dasharray: v-bind('circumference') v-bind('circumference');
    stroke-dashoffset: v-bind('progressOffset');
    stroke-linecap: round;
    transition: stroke-dashoffset 0.6s ease-in-out;
  }
}
</style>
