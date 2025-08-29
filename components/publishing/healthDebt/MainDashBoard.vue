<template>
  <section class="main-dashboard" :class="dashboardClass">
    <MainPointNotice />
    <MainHealthGrade :last-week-score="lastWeekScore" :current-score="currentScore" />
  </section>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import MainPointNotice from '~/components/publishing/healthDebt/MainPointNotice.vue'
import MainHealthGrade from '~/components/publishing/healthDebt/MainHealthGrade.vue'

// 점수 데이터 관리
const lastWeekScore = ref(60.0)
const currentScore = ref(55.5)

// 점수에 따른 대시보드 클래스(70이상은 good , 40밑으로는 critical)
const dashboardClass = computed(() => {
  if (currentScore.value >= 70) return 'health-good'
  if (currentScore.value >= 40) return 'health-warning'
  return 'health-critical'
})
</script>
<style lang="scss" scoped>
@keyframes bg-to-good {
  from {
    background: #f4f4f4;
  }
  to {
    background: #00b68b;
  }
}

@keyframes bg-to-warning {
  from {
    background: #f4f4f4;
  }
  to {
    background: #7878d5;
  }
}

@keyframes bg-to-critical {
  from {
    background: #f4f4f4;
  }
  to {
    background: #f37d5c;
  }
}

@keyframes gradient-to-good {
  from {
    background: transparent;
  }
  to {
    background: linear-gradient(180deg, rgba(0, 125, 134, 0.5) 0%, rgba(0, 125, 134, 0) 100%);
  }
}

@keyframes gradient-to-warning {
  from {
    background: transparent;
  }
  to {
    background: linear-gradient(180deg, #5454cb 0%, rgba(84, 84, 203, 0) 100%);
  }
}

@keyframes gradient-to-critical {
  from {
    background: transparent;
  }
  to {
    background: linear-gradient(180deg, #f8683f 0%, rgba(248, 104, 63, 0) 100%);
  }
}

.main-dashboard {
  margin: -5.6rem -2rem 0;
  padding: 5.6rem 2rem 3.2rem;
  position: relative;
  background: #eee;
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 26rem;
    position: absolute;
    background: transparent;
    left: 0;
    top: 0;
  }
  &.health-good {
    animation: bg-to-good 0.8s ease-in-out forwards;
    &::before {
      animation: gradient-to-good 0.8s ease-in-out forwards;
    }
  }
  &.health-warning {
    animation: bg-to-warning 0.8s ease-in-out forwards;
    &::before {
      animation: gradient-to-warning 0.8s ease-in-out forwards;
    }
  }
  &.health-critical {
    animation: bg-to-critical 0.8s ease-in-out forwards;
    &::before {
      animation: gradient-to-critical 0.8s ease-in-out forwards;
    }
  }
}
</style>
