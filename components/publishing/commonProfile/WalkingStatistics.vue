<template>
  <div class="steps-statistics">
    <div class="flex flex-row mb-8">
      <strong class="tit">걷기 통계</strong>
      <span class="date ml-auto">{{ time }} 기준</span>
    </div>
    <div class="steps-dashboard">
      <div v-for="(stat, index) in statistics" :key="index" class="box">
        <strong class="box-tit">{{ stat.title }}</strong>
        <div class="box-figure">
          <span class="steps"> {{ stat.steps ? stat.steps.toLocaleString() : '-' }} 걸음</span>
          <span class="distance">{{ stat.distance }} km</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'

interface StatisticsItem {
  title: string
  steps: number
  distance: string
}

const props = withDefaults(
  defineProps<{
    time?: string
    statistics?: StatisticsItem[]
  }>(),
  {
    time: '16:15',
    statistics: () => [
      {
        title: '오늘 걸음',
        steps: 4532,
        distance: '4.84'
      },
      {
        title: '총 걸음',
        steps: 4532,
        distance: '4.84'
      },
      {
        title: '최고 걸음수(일 기준)',
        steps: 4532,
        distance: '4.84'
      },
      {
        title: '일 평균',
        steps: 4532,
        distance: '4.84'
      }
    ]
  }
)
</script>

<style lang="scss" scoped>
.steps-statistics {
  .tit {
    font-size: 1.4rem;
    font-weight: 600;
  }
  .date {
    font-size: 1.1rem;
    font-weight: 400;
    color: #959595;
  }
  .steps-dashboard {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    .box {
      width: calc(50% - 0.6rem);
      background: #f9f9f9;
      border-radius: 0.8rem;
      padding: 1.2rem 1.6rem;
      .box-tit {
        display: block;
        text-align: left;
        font-size: 1.2rem;
        font-weight: 500;
        color: #555;
      }
      .box-figure {
        display: flex;
        flex-direction: column;
        font-size: 1.2rem;
        color: #2b2b2b;
        text-align: right;
        line-height: 130%;
        .steps {
          font-size: 1.4rem;
          line-height: 140%;
          font-weight: 600;
        }
        .distance {
          font-size: 1.2rem;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
