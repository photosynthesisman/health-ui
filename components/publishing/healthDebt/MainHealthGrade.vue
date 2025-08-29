<template>
  <div class="main-health-grade">
    <h5 class="grade-tit">
      <span>{{ titleText.sub }}</span>
      <strong>{{ titleText.main }}</strong>
    </h5>
    <div class="grade-box">
      <i class="box-char" :class="characterClass"></i>
      <div class="grade-graph">
        <div class="graph-tit">
          <div class="tit">레몬지수 <CommonBadge color="red" variant="round"> 정밀 </CommonBadge></div>
          <div class="grade">
            <button type="button" class="btn-refresh" title=""></button>
            <strong class="score">{{ animatedScore }}</strong>
            <button type="button" class="btn-history" title="레몬지수 분석이력"></button>
          </div>
        </div>
        <div class="graph-wrap">
          <div class="bar-bg">
            <i
              class="last-week-graph"
              :class="{ animate: animateGraph }"
              :title="props.lastWeekScore.toString()"
              :style="{ width: animateGraph ? lastWeekWidth : '0', zIndex: lastWeekZIndex }"
            ></i>
            <i
              class="current-graph"
              :class="{ animate: animateGraph }"
              :title="props.currentScore.toString()"
              :style="{ width: animateGraph ? currentWidth : '0', zIndex: currentZIndex }"
            ></i>
          </div>
          <div class="graph-label">
            <span class="label-txt">0</span>
            <span class="label-txt">100</span>
          </div>

          <span class="week-grade-info" :class="{ show: showWeekInfo }"
            >지난주보다 {{ Math.abs(Number(scoreDiff)) }}점 {{ Number(scoreDiff) >= 0 ? '올랐어요' : '내렸어요' }}</span
          >
        </div>
      </div>
      <div class="btn-wrap">
        <button type="button" class="btn-grade">
          <i class="icon ico-diary" aria-hidden="true"></i>레몬지수 다이어리
        </button>
        <button type="button" class="btn-grade">
          <i class="icon ico-chart" aria-hidden="true"></i>건강지수 자세히보기
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Props 정의
interface Props {
  lastWeekScore?: number
  currentScore?: number
}

const props = withDefaults(defineProps<Props>(), {
  lastWeekScore: 0,
  currentScore: 0
})

// 애니메이션용 점수
const animatedScore = ref(0)

// 애니메이션 트리거
const animateGraph = ref(false)
const showWeekInfo = ref(false) // week-grade-info 표시 상태

// width 계산 computed
const lastWeekWidth = computed(() => `${props.lastWeekScore}%`)
const currentWidth = computed(() => `${props.currentScore}%`)

// z-index 계산 computed
const lastWeekZIndex = computed(() => (props.lastWeekScore > props.currentScore ? 1 : 2))
const currentZIndex = computed(() => (props.currentScore >= props.lastWeekScore ? 1 : 2))

// 점수 차이 계산
const scoreDiff = computed(() => (props.currentScore - props.lastWeekScore).toFixed(1))

// 점수에 따른 캐릭터 클래스
const characterClass = computed(() => {
  if (props.currentScore >= 70) return 'good'
  if (props.currentScore >= 40) return 'warning'
  return 'critical'
})

// 점수에 따른 타이틀 텍스트
const titleText = computed(() => {
  if (props.currentScore >= 70) {
    return {
      sub: '조금씩 조금씩',
      main: '건강해지는 중입니다'
    }
  } else if (props.currentScore >= 40) {
    return {
      sub: '조금 더',
      main: '고민해 주세요'
    }
  } else {
    return {
      sub: '건강에 대한',
      main: '고민이 시급합니다'
    }
  }
})

// 숫자 카운팅 애니메이션
const animateNumber = (start: number, end: number, duration: number) => {
  const startTime = Date.now()
  const endTime = startTime + duration

  const step = () => {
    const now = Date.now()
    const remaining = Math.max(0, endTime - now)
    const progress = 1 - remaining / duration

    if (progress < 1) {
      animatedScore.value = Number((start + (end - start) * progress).toFixed(1))
      requestAnimationFrame(step)
    } else {
      animatedScore.value = end
    }
  }

  requestAnimationFrame(step)
}

// 마운트 시 애니메이션 시작
onMounted(() => {
  animateGraph.value = true
  // 점수 카운팅 애니메이션 (0.4초 뒤 시작, 2초 동안)
  setTimeout(() => {
    animateNumber(0, props.currentScore, 2000)
  }, 400)
  // week-grade-info 2초 후 표시
  setTimeout(() => {
    showWeekInfo.value = true
  }, 2000)
})
</script>
<style lang="scss" scoped>
@keyframes stripeMove {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0.7rem 0;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-1rem);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
.main-health-grade {
  position: relative;
  .grade-tit {
    font-size: 2.2rem;
    font-weight: 400;
    color: vars.$white;
    padding: 0 1.2rem;
    margin-bottom: 2.7rem;
    strong {
      font-weight: 700;
      font-size: 2.4rem;
      display: block;
    }
  }
  .grade-box {
    position: relative;
    border-radius: 1.2rem;
    background: vars.$white;
    .box-char {
      display: inline-block;
      position: absolute;
      right: 0;
      top: -10rem;
      width: 12.8rem;
      height: 12.8rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      &.good {
        background-image: url('~/assets/images/lemonChar/char-happy-lemon.svg');
      }
      &.warning {
        background-image: url('~/assets/images/lemonChar/char-worry-lemon.svg');
      }
      &.critical {
        background-image: url('~/assets/images/lemonChar/char-cry-lemon.svg');
      }
    }
    .grade-graph {
      padding: 2.8rem 2.4rem 2rem;
      .graph-tit {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .tit {
          display: flex;
          align-items: center;
          gap: 0 0.6rem;
          font-size: 1.4rem;
          font-weight: 600;
          color: #2b2b2b;
        }
        .grade {
          display: flex;
          align-items: center;
          .btn-refresh {
            display: inline-block;
            width: 2rem;
            border-radius: 50%;
            height: 2rem;
            position: relative;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M16.1851 6.67824C15.0268 4.67865 12.8619 3.33333 10.3823 3.33333C7.57094 3.33333 5.16405 5.06279 4.17028 7.51447M14.1505 7.51447H17.5V4.16956M4.64823 13.3681C5.80651 15.3676 7.97144 16.713 10.451 16.713C13.2624 16.713 15.6693 14.9835 16.6631 12.5318M6.68283 12.5318H3.33333V15.8767' stroke='%23555555' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            @include mixin.rippleEffectPrimary;
          }
          .btn-history {
            width: 2.4rem;
            height: 2.4rem;
            margin-left: 0.8rem;
            display: inline-block;
            position: relative;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M8.39959 7.20001H15.5996M8.39959 10.8H15.5996M8.39959 14.4H11.9996M6.59931 2.40001H17.3995C18.725 2.40001 19.7996 3.47455 19.7995 4.80005L19.7993 19.2001C19.7992 20.5255 18.7247 21.6 17.3993 21.6L6.59921 21.6C5.27372 21.5999 4.19921 20.5254 4.19922 19.1999L4.19931 4.79999C4.19932 3.47451 5.27383 2.40001 6.59931 2.40001Z' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            @include mixin.rippleEffectPrimary;
          }
          .score {
            font-size: 2.8rem;
            font-weight: 600;
            display: inline-block;
            width: 6rem;
            text-align: right;
            color: #2b2b2b;
          }
        }
      }
      .graph-wrap {
        display: flex;
        flex-direction: column;
        gap: 0.6rem 0;
        margin-top: 0.8rem;
        position: relative;
        .bar-bg {
          position: relative;
          width: 100%;
          height: 1.2rem;
          overflow: hidden;
          border-radius: 3.2rem;
          background-color: #ececec;
          .last-week-graph,
          .current-graph {
            position: absolute;
            left: 0;
            height: 100%;
            width: 0;
            border-radius: 3.2rem;
            &.animate {
              transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
            }
          }
          .last-week-graph {
            background: #94b2fa;
            background-size: 0.7rem 1.5rem;
            background-repeat: repeat-x;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='12' viewBox='0 0 7 12' fill='none'%3E%3Cpath d='M6 -1.5L1 13.5' stroke='%237099F9'/%3E%3C/svg%3E");
            animation: stripeMove 1s linear infinite;
            &.animate {
              transition-delay: 0.2s;
            }
          }
          .current-graph {
            background: #4c7ff7;
            &.animate {
              transition-delay: 0.4s;
            }
          }
        }
        .graph-label {
          display: flex;
          justify-content: space-between;
          .label-txt {
            font-size: 1.1rem;
            color: #959595;
            font-weight: 400;
          }
        }
        .week-grade-info {
          position: absolute;
          bottom: -1rem;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 3rem;
          background-color: #4f5561;
          color: #fff;
          font-size: 1.2rem;
          font-weight: 500;
          padding: 0 0.8rem;
          line-height: 2.4rem;
          white-space: nowrap;
          opacity: 0;
          &.show {
            animation: slideDown 0.5s ease-out forwards;
          }
          &::before {
            content: '';
            display: block;
            position: absolute;
            top: -0.4rem;
            left: 50%;
            transform: translateX(-50%);
            width: 0.8rem;
            height: 0.4rem;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='4' viewBox='0 0 8 4' fill='none'%3E%3Cpath d='M2.26758 1C3.03744 -0.333174 4.96168 -0.33328 5.73145 1L7.46387 4H0.535156L2.26758 1Z' fill='%234F5561'/%3E%3C/svg%3E");
          }
        }
      }
    }
    .btn-wrap {
      display: flex;
      border-top: 0.1rem solid #eee;
      .btn-grade {
        flex: 1;
        padding: 1.8rem 2rem;
        font-size: 1.4rem;
        font-weight: 500;
        position: relative;
        display: flex;
        gap: 0 0.4rem;
        justify-content: center;
        align-items: center;
        @include mixin.rippleEffectPrimary;
        .icon {
          display: inline-block;
          flex: 0 0 auto;
          width: 2rem;
          height: 2rem;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }
        & + .btn-grade:before {
          content: '';
          width: 0.1rem;
          height: 1.4rem;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          position: absolute;
          background: #e2e2e2;
        }
      }
    }
  }
}
@media (max-width: 360px) {
  .main-health-grade {
    .grade-box {
      .box-char {
        width: 10rem;
        height: 10rem;
        right: -1.2rem;
        top: -8rem;
      }
    }
  }
}
</style>
