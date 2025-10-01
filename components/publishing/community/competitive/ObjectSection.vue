<template>
  <FlexColDiv class="object-section gap-12">
    <p class="fz-14 medium fc-body-03">20대 여성 사용자 7일 평균 대비</p>
    <!-- <AverageStatusCard title="심박수" main-data="85bpm" card-type="heart-beep">
      <AverageCurve :heart-rate-data="heartRateData" />
    </AverageStatusCard> -->
    <FlexRowDiv class="status-list">
      <CommonStatusCard title="심박수" class="has-graph" chart
        ><!-- chart있으면 true -->
        <!-- <AverageCurve :heart-rate-data="heartRateData" /> -->
        <div class="heartbeat-graph-wrap" :class="heartBeatGraphClasses">
          <div class="score average">
            <p>{{ heartAverage }}bpm</p>
            <span>또래 멤버 평균</span>
          </div>
          <div class="score me">
            <p>{{ heartMy }}bpm</p>
            <span>나</span>
          </div>
          <div class="img-box">
            <div class="point average"></div>
            <div class="point me"></div>
            <img src="/assets/images/community/img-heartbeat-graph.png" alt="심박수 그래프" />
          </div>
        </div>
      </CommonStatusCard>

      <CommonStatusCard title="산소포화도" sub-title="또래 평균" main-data="92%" sub-data="95.3%" />
      <!-- 09-23 이모지 제거 -->
      <CommonStatusCard title="심박변이도" sub-title="또래 평균" main-data="73ms" sub-data="?" />

      <CommonStatusCard title="스트레스 점수" class="has-graph" chart>
        <div class="stress-graph-wrap" :class="stressGraphClasses">
          <div class="score average">
            <p>{{ stressAverage }}</p>
            <span>또래 멤버 평균</span>
          </div>
          <div class="score me">
            <p>{{ stressMy }}</p>
            <span>나</span>
          </div>
          <div class="graph-box">
            <div class="bar"></div>
            <p>10</p>
          </div>
          <div class="graph-box">
            <div class="bar" style="height: 1rem"></div>
            <p>20</p>
          </div>
          <div class="graph-box">
            <div class="bar" style="height: 2rem"></div>
            <p>30</p>
          </div>
          <div class="graph-box">
            <div class="bar" style="height: 3rem"></div>
            <p>40</p>
          </div>
          <div class="graph-box" :class="isStressUnderAverage ? 'me' : ''">
            <div class="bar" style="height: 4rem"></div>
            <p>50</p>
          </div>
          <div class="graph-box average">
            <div class="bar" style="height: 4.6rem"></div>
            <p>60</p>
          </div>
          <div class="graph-box" :class="isStressUnderAverage ? '' : 'me'">
            <div class="bar" style="height: 3rem"></div>
            <p>70</p>
          </div>
          <div class="graph-box">
            <div class="bar" style="height: 2.5rem"></div>
            <p>80</p>
          </div>
          <div class="graph-box">
            <div class="bar"></div>
            <p>90</p>
          </div>
        </div>
      </CommonStatusCard>

      <CommonStatusCard title="이번 달 응원 수" text="매달 1일~오늘" sub-num="2280" />
      <CommonStatusCard title="Today 게시글" text="자정~현재" sub-num="45" />
    </FlexRowDiv>
    <CompareBarStatusCard
      title="인기 키워드"
      card-type="fire"
      :keyword-data="[
        { keyword: '위고비', keywordNum: '13212', barWidth: 80 },
        { keyword: '단백질', keywordNum: '10480', barWidth: 60 },
        { keyword: '위고비', keywordNum: '8752', barWidth: 90 }
      ]"
    />
  </FlexColDiv>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import CommonStatusCard from '~/components/common/statusCard/CommonStatusCard.vue'
import CompareBarStatusCard from '~/components/common/statusCard/CompareBarStatusCard.vue'
import AverageCurve from '~/components/publishing/community/competitive/AverageCurve.vue'
const heartAverage = ref(85) // 심박수 또래 멤버 평균
const heartMy = ref(90)
const stressAverage = ref(62.4) // 스트레스 또래 멤버 평균
const stressMy = ref(64.2)
const isStressUnderAverage = computed(() => {
  return stressMy.value < stressAverage.value
})

const stressGraphClasses = computed(() => {
  return {
    'under-average': isStressUnderAverage.value
  }
})
const isHeartUnderAverage = computed(() => {
  return heartMy.value < heartAverage.value
})

const heartBeatGraphClasses = computed(() => {
  return {
    'under-average': isHeartUnderAverage.value
  }
})
const heartRateData = ref([
  { value: 0, timestamp: new Date('2024-01-01 09:00') },
  { value: 0, timestamp: new Date('2024-01-01 10:00') },
  { value: 0, timestamp: new Date('2024-01-01 11:00') },
  { value: 0, timestamp: new Date('2024-01-01 12:00') },
  { value: 0, timestamp: new Date('2024-01-01 15:00') }
])

// 심박수 범위 설정
const maxHeartRate = ref(100)
const minHeartRate = ref(60)

// 평균 심박수 계산
const averageHeartRate = computed(() => {
  if (!heartRateData.value || heartRateData.value.length === 0) return 0
  const sum = heartRateData.value.reduce((acc, data) => acc + data.value, 0)
  return Math.round(sum / heartRateData.value.length)
})

// 실시간 데이터 업데이트 함수 (필요시 사용)
function updateHeartRateData(newData) {
  heartRateData.value = newData
}

// 외부에서 사용할 수 있도록 expose
defineExpose({
  updateHeartRateData,
  heartRateData,
  averageHeartRate
})
</script>
<style scoped lang="scss">
.status-list {
  gap: 1.2rem;
  flex-wrap: wrap;
  .status-card {
    width: calc(37.5% - 0.6rem);
    flex-grow: 1;
    &.has-graph {
      width: calc(62.5% - 0.6rem);
      :deep(.icon) {
        display: none;
      }
    }
  }

  .bar-wrap {
    display: flex;
    justify-content: center;
    gap: 1.6rem;
    .bar-area {
      display: flex;
      align-items: flex-end;
      height: 5.6rem;
    }
    .box {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: flex-end;
      gap: 0.6rem;
    }
    span {
      display: block;
      font-size: 1.1rem;
      font-weight: 400;
      line-height: 1.5rem;
      color: #959595;
    }
    .bar {
      width: 4rem;
      height: 0%;
      border-radius: 0.8rem;
      height: 0.6rem;
    }
  }
  .my-box {
    .bar {
      background: #4c7ff7;
    }
  }
  .average-box {
    position: relative;
    .bar {
      position: relative;
      background: #ececec;
      .tooltip {
        position: absolute;
        bottom: 100%; // bar 상단 바로 위
        left: 50%;
        transform: translateX(-50%) translateY(-0.8rem); // 위로 띄우기
        background: #4f5561;
        border-radius: 1.2rem;
        padding: 0.4rem 0.8rem;
        font-size: 1.2rem;
        font-weight: 500;
        color: #fff;
        white-space: nowrap;
        z-index: 10;

        &::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 0.7rem;
          height: 0.4rem;
          background-image: url("data:image/svg+xml,%3Csvg width='7' height='4' viewBox='0 0 7 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.23228 3C4.46248 4.33333 2.53798 4.33333 1.76818 3L0.0361328 0H6.96433L5.23228 3Z' fill='%234F5561'/%3E%3C/svg%3E%0A");
        }
      }
    }
  }
}

@media (max-width: 375px) {
  .status-list {
    .status-card {
      width: calc(50% - 0.6rem);
      &.has-graph {
        width: 100%;
      }
    }
  }
}

.stress-graph-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: end;
  height: 100%;
  .score {
    position: absolute;
    display: flex;
    flex-direction: column;
    p {
      font-weight: 700;
    }
    span {
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.6rem;
      color: #959595;
    }
    &.average {
      left: 0;
      top: 0;
      p {
        font-size: 2rem;
        line-height: 2.6rem;
      }
    }
    &.me {
      right: 0;
      top: 1.2rem;
      p {
        font-size: 1.4rem;
        line-height: 2rem;
        color: var(--blue-primary);
      }
      span {
        text-align: right;
      }
    }
  }
  &.under-average {
    .graph-box {
      &.me {
        .bar {
          &::before {
            left: 49%;
            right: 0;
          }
        }
      }
    }
  }
  .graph-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    &.average {
      .bar {
        background-color: #2b2b2b;
        &::before {
          content: '';
          position: absolute;
          bottom: 4.5rem;
          left: 0rem;
          right: 37.5%;
          height: 0.1rem;
          border-top: 0.1rem dashed #2b2b2b;
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 4.5rem;
          left: 0rem;
          height: 1.5rem;
          border-left: 0.1rem dashed #2b2b2b;
        }
      }
    }
    &.me {
      .bar {
        background-color: var(--blue-primary);
        &::before {
          content: '';
          position: absolute;
          bottom: 3.8rem;
          left: 72.5%;
          right: 0;
          height: 0.1rem;
          border-top: 0.1rem dashed var(--blue-primary);
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 3.8rem;
          right: 0rem;
          height: 1.5rem;
          border-left: 0.1rem dashed var(--blue-primary);
        }
      }
    }
    .bar {
      width: 0.8rem;
      background-color: #ececec;
      border-top-left-radius: 0.4rem;
      border-top-right-radius: 0.4rem;
    }
    p {
      font-size: 1.1rem;
      font-weight: 400;
      line-height: 1.5rem;
      color: #959595;
      text-align: center;
    }
  }
}
.heartbeat-graph-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  &.under-average {
    .img-box {
      .point {
        &.me {
          left: calc(50% - 3.6rem);
          right: 0;
          &::before {
            left: 0;
          }
        }
      }
    }
  }
  .img-box {
    position: relative;
    bottom: -2.4rem;
    max-height: 8rem;
    img {
      width: 18rem;
      margin: 0 auto;
      object-fit: contain;
    }
    .point {
      position: absolute;
      &::before {
        content: '';
        position: absolute;
        width: 1.9rem;
        height: 1.9rem;
      }
      &.average {
        top: 0.3rem;
        left: 0;
        right: calc(50% - 0.6rem);
        border-bottom: 0.1rem dashed #2b2b2b;
        &::before {
          right: 0;
          transform: translate(50%, -50%);
          background: url('~/assets/images/community/ico-average-bullet.png') center / contain no-repeat;
        }
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2.3rem;
          border-right: 0.1rem dashed #2b2b2b;
        }
      }
      &.me {
        top: 2.4rem;
        left: calc(50% + 4.4rem);
        right: 0;
        border-bottom: 0.1rem dashed var(--blue-primary);
        &::before {
          left: 0;
          transform: translate(-50%, -50%);
          background: url('~/assets/images/community/ico-my-bullet.png') center / contain no-repeat;
        }
        &::after {
          content: '';
          position: absolute;
          right: 0;
          bottom: 0;
          height: 3.2rem;
          border-right: 0.1rem dashed var(--blue-primary);
        }
      }
    }
  }
  .score {
    position: absolute;
    display: flex;
    flex-direction: column;
    p {
      font-weight: 700;
    }
    span {
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.6rem;
      color: #959595;
    }
    &.average {
      left: 0;
      top: 0;
      p {
        font-size: 2rem;
        line-height: 2.6rem;
      }
    }
    &.me {
      right: 0;
      top: 1.2rem;
      p {
        font-size: 1.4rem;
        line-height: 2rem;
        color: var(--blue-primary);
      }
      span {
        text-align: right;
      }
    }
  }
}
</style>
