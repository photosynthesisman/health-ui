<template>
  <section class="main-debt-compare">
    <div class="debt-tit-wrap tooltip-tit">
      <h5 class="tit">
        지금까지 상환된 건강부채는<br />
        총 {{ totalRepaidAmount.toLocaleString() }}원 입니다.
      </h5>
      <TooltipIcon
        icon-type="question"
        tooltip-text="최초 건강부채와 건강지수를 분석한 이후, 맞춤미션 등을 이용하여 감소된 부채 금액의 총합입니다. 
해당 금액은 건강지수를 상승시키는 데 가장 중요한 역할을 하니 꾸준히 관리해 보세요!"
      />
    </div>
    <!-- 최근 5일 그래프 -->
    <div class="debt-bar-graph">
      <div v-for="(data, index) in graphData" :key="index" :class="['bar-graph', { current: data.isCurrent }]">
        <div class="bar-wrap">
          <i
            class="bar"
            :style="{ '--bar-height': `${getBarHeight(data.amount)}%` }"
            :title="`${data.amount.toLocaleString()}원`"
          ></i>
          <strong v-if="data.isCurrent" class="current-debt" :style="{ bottom: `${getBarHeight(data.amount)}%` }"
            >{{ data.amount.toLocaleString() }}원</strong
          >
        </div>

        <span class="date-txt">{{ data.date }}</span>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import TooltipIcon from '~/components/common/TooltipIcon.vue'

interface GraphDataItem {
  date: string
  amount: number
  isCurrent?: boolean
}

// 총 상환 금액
const totalRepaidAmount = ref(245000)

// 최근 5일 그래프 데이터
const graphData = ref<GraphDataItem[]>([
  { date: '28일', amount: 20000 },
  { date: '29일', amount: 13620 },
  { date: '30일', amount: 12080 },
  { date: '31일', amount: 2540 },
  { date: '1일', amount: 15000, isCurrent: true }
])

// 막대 높이 계산 (최대값 기준으로 백분율 계산)
const getBarHeight = (amount: number): number => {
  const maxAmount = Math.max(...graphData.value.map(item => item.amount))
  return Math.round((amount / maxAmount) * 100)
}
</script>
<style lang="scss" scoped>
.main-debt-compare {
  background: #fff;
  padding: 2.4rem;
  border-radius: 1.2rem;
  box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
  .debt-tit-wrap {
    display: flex;
    justify-content: space-between;
    .tit {
      font-size: 2rem;
      font-weight: 700;
      line-height: 130%;
      color: #2b2b2b;
    }
  }
  .debt-bar-graph {
    display: flex;
    align-content: center;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 3.2rem;
    .bar-graph {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      gap: 0.8rem 0;
      position: relative;
      height: 100%;

      &:nth-child(1) .bar {
        animation-delay: 0s;
      }
      &:nth-child(2) .bar {
        animation-delay: 0.1s;
      }
      &:nth-child(3) .bar {
        animation-delay: 0.2s;
      }
      &:nth-child(4) .bar {
        animation-delay: 0.3s;
      }
      &:nth-child(5) .bar {
        animation-delay: 0.4s;
      }
      .bar-wrap {
        height: 9.6rem;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-end;
        position: relative;
      }
      .bar {
        display: block;
        width: 4rem;
        height: 0;
        border-radius: 0.8rem;
        background-color: #ececec;
        animation: barRise 0.8s ease-out forwards;
      }
      .date-txt {
        font-size: 1.1rem;
        font-weight: 400;
        color: #959595;
        text-align: center;
        line-height: 1.5rem;
      }
      &.current {
        .bar {
          background-color: vars.$blue-primary;
        }
      }
    }
    .current-debt {
      position: absolute;
      padding: 0 0.8rem;
      line-height: 2.4rem;
      border-radius: 1.2rem;
      font-size: 1.2rem;
      margin-bottom: 0.6rem;
      color: vars.$white;
      font-weight: 500;
      left: 50%;
      transform: translateX(-50%);
      background: #4f5561;
      opacity: 0;
      animation: opacity 0.8s 0.8s ease-out forwards;
      &:after {
        content: '';
        display: block;
        width: 0.7rem;
        height: 0.4rem;
        position: absolute;
        bottom: -0.3rem;
        left: 50%;
        transform: translateX(-50%);
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='4' viewBox='0 0 8 4' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.73131 3C4.96151 4.33333 3.03701 4.33333 2.26721 3L0.535156 0H7.46336L5.73131 3Z' fill='%234F5561'/%3E%3C/svg%3E");
      }
    }
  }
}

@keyframes barRise {
  from {
    height: 0;
  }
  to {
    height: var(--bar-height);
  }
}

@keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 360px) {
  .main-debt-compare {
    .debt-bar-graph {
      .bar-graph {
        .bar {
          width: 3.2rem;
        }
      }
    }
  }
}
</style>
