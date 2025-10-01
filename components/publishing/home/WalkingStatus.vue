<template>
  <div class="walking-status">
    <div class="current-step-status">
      <ul>
        <li>
          <span class="tit">이동거리</span>
          <strong class="text">2.1Km</strong>
        </li>
        <li>
          <span class="tit">소모칼로리</span>
          <strong class="text">99Kcal</strong>
        </li>
        <li>
          <span class="tit">걸은시간</span>
          <strong class="text">55분</strong>
        </li>
      </ul>
    </div>
    <div class="step-goal-process">
      <ol>
        <li v-for="goal in stepGoals" :key="goal.id">
          <button
            v-if="goal.status === 'pointGet'"
            type="button"
            class="reward pointGet"
            title="포인트 받기"
            @click="handlePointGet(goal)"
          >
            <i class="reward-icon"></i>
            <span class="tooltip">포인트 받기</span>
          </button>
          <i v-if="goal.status === 'pointGet'" class="pointGet-shadow" aria-hidden="true"></i>
          <span
            v-else
            class="reward"
            :class="goal.status"
            :style="goal.status === 'processing' ? { '--progress': goal.progress || 0 } : {}"
          >
            <svg v-if="goal.status === 'processing'" viewBox="0 0 52 52" class="processing-circle">
              <!-- 배경 원 (완전한 원) -->
              <circle
                class="circle-bg"
                cx="26"
                cy="26"
                r="24"
                fill="transparent"
                stroke="rgba(255, 255, 255, 1)"
                stroke-width="3"
              />
              <!-- 진행률 원 (완전한 원) -->
              <circle
                class="circle-progress"
                cx="26"
                cy="26"
                r="24"
                fill="transparent"
                stroke="#4C7FF7"
                stroke-width="3"
                stroke-linecap="round"
                :stroke-dasharray="`${2 * Math.PI * 24}`"
                :stroke-dashoffset="`${2 * Math.PI * 24 * (1 - (goal.progress || 0) / 100)}`"
                transform="rotate(90 26 26)"
              />
            </svg>
            <i class="reward-icon"></i>
          </span>
          <span class="txt">{{ goal.label }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, toRef } from 'vue'

// Props 정의
interface Props {
  currentSteps?: number
}

const props = withDefaults(defineProps<Props>(), {
  currentSteps: 0 // 0부터 시작
})

// Emit 정의
const emit = defineEmits<{
  'update:currentSteps': [value: number]
}>()

interface StepGoal {
  id: number
  steps: number
  label: string
  status: 'completed' | 'pointGet' | 'processing' | ''
  progress?: number // 진행률 (0-100)
}

// props를 반응형으로 사용
const currentSteps = toRef(props, 'currentSteps')

const stepGoals = ref<StepGoal[]>([
  { id: 1, steps: 2000, label: '2천걸음', status: '' },
  { id: 2, steps: 4000, label: '4천걸음', status: '' },
  { id: 3, steps: 6000, label: '6천걸음', status: '' },
  { id: 4, steps: 8000, label: '8천걸음', status: '' },
  { id: 5, steps: 10000, label: '1만걸음', status: '' }
])

// currentSteps에 따라 상태와 진행률 업데이트
const updateGoalStatus = () => {
  const current = currentSteps.value

  stepGoals.value.forEach((goal, index) => {
    // 이미 completed 상태인 경우 유지 (사용자가 클릭한 경우)
    if (goal.status === 'completed') {
      return
    }

    if (current >= goal.steps) {
      // 목표 달성 - pointGet 상태로 설정
      goal.status = 'pointGet'
      goal.progress = 100
    } else if (index === 0 && current < goal.steps) {
      // 첫 번째 목표를 아직 달성하지 못한 경우
      if (current > 0) {
        goal.status = 'processing'
        goal.progress = (current / goal.steps) * 100
      } else {
        goal.status = ''
        goal.progress = 0
      }
    } else {
      const prevGoal = stepGoals.value[index - 1]
      if (current > prevGoal.steps && current < goal.steps) {
        // 이전 목표는 달성했지만 현재 목표는 진행 중
        goal.status = 'processing'
        const rangeSteps = goal.steps - prevGoal.steps
        const progressSteps = current - prevGoal.steps
        goal.progress = (progressSteps / rangeSteps) * 100
      } else {
        // 아직 도달하지 못한 목표
        goal.status = ''
        goal.progress = 0
      }
    }
  })
}

// pointGet 클릭 핸들러
const handlePointGet = (goal: StepGoal) => {
  goal.status = 'completed'
  console.log(`${goal.label} 포인트 획득!`)
}

// 초기 상태 설정
updateGoalStatus()

// currentSteps 변경 시 상태 업데이트
watch(currentSteps, () => {
  updateGoalStatus()
})
</script>

<style lang="scss" scoped>
.walking-status {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem 0;
  padding-bottom: 3.2rem;
  .current-step-status {
    ul {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-items: center;
      li {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        position: relative;
        gap: 0.2rem 0;
        &::before {
          content: '';
          position: absolute;
          width: 0.1rem;
          height: 4.2rem;
          background: rgba(0, 0, 0, 0.1);
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        &:first-child {
          &::before {
            content: none;
          }
        }
        .tit {
          font-size: 1.3rem;
          font-weight: 400;
          color: #2b2b2b;
        }
        .text {
          font-size: 1.6rem;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }
  .step-goal-process {
    width: calc(100% - 4.8rem);
    margin: auto;
    ol {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      position: relative;
      &::before {
        content: '';
        width: calc(100% - 4.8rem);
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        top: 1.8rem;
        height: 1.2rem;
        background: rgba(0, 0, 0, 0.1);
        mix-blend-mode: multiply;
      }
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem 0;
        position: relative;
        .reward {
          display: block;
          position: relative;
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
          background: #9dccc5;
          .reward-icon {
            font-family: 'Jalnan2', sans-serif;
            position: absolute;
            width: 4rem;
            height: 4rem;
            text-align: center;
            background: #fff;
            border-radius: 50%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1) inset;
            &::before {
              content: '';
              position: absolute;
              display: block;
              left: 0;
              top: 0;
              bottom: 0;
              right: 0;
              border-radius: 50%;
              z-index: 2;
              mix-blend-mode: luminosity;
              background: url('~/assets/images/home/img-main-diamond.svg') 50% / 2.6rem no-repeat;
            }
          }
          &.completed {
            .reward-icon {
              background: #4c7ff7;
              &::after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.4);
                background-position: center;
                background-repeat: no-repeat;
                background-size: 3rem;
                background-image: url('~/assets/images/home/img-main-completed.svg');
                animation: getPoint 0.5s ease-in forwards;
                z-index: 2;
              }
              &::before {
                mix-blend-mode: normal;
                background-size: 2.6rem;
              }
            }
            // 포인트 get 애니메이션
            @keyframes getPoint {
              from {
                opacity: 0;
                background-size: 6rem;
              }
              to {
                opacity: 1;
                background-size: 3rem;
              }
            }
          }
          &.processing {
            background: none;
            position: relative;

            .reward-icon {
              background: #31519e;
              &::before {
                mix-blend-mode: normal;
                background-size: 2.6rem;
              }
            }

            .processing-circle {
              position: absolute;
              width: 5.2rem;
              height: 5.2rem;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              z-index: 3;
              pointer-events: none;

              .circle-progress {
                transition: stroke-dashoffset 0.3s ease;
              }
            }
          }
          &.pointGet {
            cursor: pointer;
            position: relative;
            animation: pointBounce 1.5s ease-in-out infinite;

            .tooltip {
              position: absolute;
              top: -1.5rem;
              left: 50%;
              right: auto;
              transform: translateX(-50%);
              background: rgba(0, 0, 0, 0.8);
              color: #fff;
              padding: 0.4rem 0.8rem;
              border-radius: 2rem;
              width: auto;
              font-size: 1.2rem;
              line-height: 1;
              white-space: nowrap;
              pointer-events: none;
              &::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border: 0.5rem solid transparent;
                border-top-color: rgba(0, 0, 0, 0.8);
              }
            }
            .reward-icon {
              width: 5rem;
              height: 5rem;
              background-color: #4c7ff7;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='46' height='25' viewBox='0 0 46 25' fill='none'%3E%3Cg filter='url(%23filter0_f_22677_19485)'%3E%3Cpath d='M23.001 1C35.1515 1.00014 45.001 10.8503 45.001 23.001C45.001 23.0433 44.9993 23.0856 44.999 23.1279C44.9302 11.0361 35.1088 1.25502 23.001 1.25488C10.893 1.25488 1.06982 11.036 1.00098 23.1279C1.00074 23.0856 1 23.0433 1 23.001C1 10.8502 10.8503 1 23.001 1Z' fill='white'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f_22677_19485' x='0' y='0' width='46.001' height='24.1279' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='0.5' result='effect1_foregroundBlur_22677_19485'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E"); // 흰색 반짝
              background-size: contain;
              background-repeat: no-repeat;
              border: 0.05rem solid #4c7ff7;
              box-shadow: -0.1rem -0.1rem 1rem 0 #1448c3 inset;
              filter: drop-shadow(0 8px 8px rgba(0, 0, 0, 0.04));

              &::before {
                mix-blend-mode: normal;
                background-size: 3.6rem;
              }
            }
          }

          @keyframes pointBounce {
            0%,
            100% {
              top: -0.5rem;
            }
            50% {
              top: 0;
            }
          }
        }
        .pointGet-shadow {
          display: block;
          position: absolute;
          left: 50%;
          margin-left: -1.5rem;
          bottom: 2.2rem;
          border-radius: 50%;
          width: 3rem;
          height: 0.2rem;
          opacity: 0.3;
          background: #000;
          z-index: 2;
          filter: blur(0.2rem);
          animation: pointBounceShadow 1.5s ease-in-out infinite;
          @keyframes pointBounceShadow {
            0%,
            100% {
              opacity: 0.2;
              width: 4rem;
              height: 0.5rem;
              margin-left: -2rem;
            }
            50% {
              opacity: 0.8;
              width: 2rem;
              height: 0.2rem;
              margin-left: -1rem;
            }
          }
        }
        .txt {
          font-size: 1.3rem;
          font-weight: 500;
          color: #2b2b2b;
        }
      }
    }
  }
}
</style>
