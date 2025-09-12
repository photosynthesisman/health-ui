<template>
  <div class="dailyMission-check">
    <ul>
      <li v-for="step in steps" :key="step.id">
        <button
          :ref="step.status === 'active' ? setActiveRef : null"
          :class="getButtonClass(step.status)"
          :disabled="step.status === 'locked'"
          @click="handleClick(step)"
        >
          <span v-if="step.status === 'checked'"
            ><i>10P</i><strong class="step-label">{{ step.label }}</strong></span
          >
          <span v-else-if="step.status === 'active'"
            ><i></i><strong class="step-label">{{ step.label }}</strong
            ><span
              class="get-point-coin"
              :class="{ 'is-animating': animatingStepId === step.id }"
              v-show="!step.isClicked || animatingStepId === step.id"
              >10P</span
            ></span
          >
          <span v-else
            ><i class="current-progress" :style="{ '--progress': step.progressPercent + '%' }"></i
            ><strong class="step-label">{{ step.label }}</strong></span
          >
        </button>
      </li>
    </ul>
    <div class="info-txt">
      매일 목표 걸음 달성시 마다 포인트 버튼이 활성화되요.<br />
      목표 걸음을 달성했다면 잊지말고 포인트를 받아가세요!
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick, reactive, computed } from 'vue'
interface DayItem {
  id: number
  label: string
  status: 'checked' | 'active' | 'locked'
  goalSteps: number
  progressPercent?: number
  isClicked?: boolean // 클릭 여부 추적
}

const emit = defineEmits<{
  updateGoalSteps: [steps: number]
  updateCurrentCount: [count: number]
}>()

// 애니메이션 상태 관리
const animatingStepId = ref<number | null>(null)

// 클릭된 단계 ID 저장 (localStorage에서 불러오기) 코인 습득 테스트
const getClickedSteps = (): number[] => {
  const saved = localStorage.getItem('clickedSteps')
  return saved ? JSON.parse(saved) : []
}
const clickedStepIds = ref<number[]>(getClickedSteps())

// 총 목표 걸음수와 단계 수 계산
const totalGoal = 50000
const stepUnit = 3000 // 각 단계별 증가 단위
const stepsCount = totalGoal / stepUnit // 총 단계 수
const currentCount = 9100 // 현재 걸음수

const steps = ref<DayItem[]>(
  Array.from({ length: stepsCount }, (_, i) => {
    const stepsNumber = i + 1
    const goalSteps = stepUnit + i * stepUnit
    let status: DayItem['status'] = 'locked'

    // 현재 걸음수에 따른 상태 설정 및 진행률 계산
    let progressPercent = 0

    // 현재 걸음수가 첫 번째 단계(3000)를 넘었는지 확인
    const hasReachedFirstStep = currentCount >= stepUnit

    // 클릭 여부 확인
    const isStepClicked = clickedStepIds.value.includes(stepsNumber)

    if (currentCount >= goalSteps && isStepClicked) {
      // 달성하고 클릭도 한 단계만 checked
      status = 'checked'
      progressPercent = 100
    } else if (currentCount >= goalSteps && !isStepClicked) {
      // 달성했지만 클릭하지 않은 단계는 active
      status = 'active'
      progressPercent = 100
    } else if (hasReachedFirstStep) {
      // 첫 번째 단계를 넘은 경우
      // currentActiveStep은 현재 달성 중인 단계 (1부터 시작)
      const currentActiveStep = Math.floor(currentCount / stepUnit)
      const nextTargetStep = currentActiveStep + 1

      if (i === currentActiveStep - 1) {
        // 현재 활성 단계 (마지막으로 완료한 단계)
        status = 'active'
        const baseForCurrent = stepUnit * (currentActiveStep - 1)
        progressPercent = ((currentCount - baseForCurrent) / stepUnit) * 100
      } else if (i === nextTargetStep - 1) {
        // 다음 목표 단계에 진행률 표시
        const overflow = currentCount % stepUnit
        progressPercent = (overflow / stepUnit) * 100
      }
    } else if (i === 0 && currentCount > 0) {
      // 첫 번째 단계 미달성 시 진행률
      progressPercent = (currentCount / stepUnit) * 100
    }

    // 만걸음 넘어가면 n만 n천걸음으로 변환
    const formatSteps = (steps: number) => {
      if (steps >= 10000) {
        const man = Math.floor(steps / 10000)
        const cheon = (steps % 10000) / 1000
        if (cheon === 0) {
          return `${man}만걸음`
        }
        return `${man}만${cheon.toFixed(0).replace(/\.0$/, '')}천걸음`
      }
      return `${(steps / 1000).toFixed(0)}천걸음`
    }

    return {
      id: stepsNumber,
      label: formatSteps(goalSteps),
      status,
      goalSteps,
      progressPercent,
      isClicked: clickedStepIds.value.includes(stepsNumber) // localStorage에서 확인
    }
  })
)

const handleClick = (step: DayItem) => {
  if (step.status === 'active' && !step.isClicked) {
    // 클릭 상태 기록
    step.isClicked = true
    clickedStepIds.value.push(step.id)

    // localStorage에 저장(코인 습득 테스트)
    localStorage.setItem('clickedSteps', JSON.stringify(clickedStepIds.value))

    // 애니메이션 시작
    animatingStepId.value = step.id

    // 애니메이션 종료 후 상태 변경
    setTimeout(() => {
      step.status = 'checked'
      animatingStepId.value = null
    }, 1000) // 애니메이션 duration과 동일

    // 클릭 이벤트 (필요시)
    console.log(`${step.id}단계 / clicked:`, step.isClicked)
  }
}

const getButtonClass = (status: DayItem['status']) => {
  return {
    'mission-button': true,
    'is-checked': status === 'checked',
    'is-active': status === 'active',
    'is-locked': status === 'locked'
  }
}

const activeButtonRef = ref<HTMLElement | null>(null)

const setActiveRef = (el: HTMLElement | null) => {
  if (el) activeButtonRef.value = el
}

// 현재 active 상태의 goalSteps 계산
const activeGoalSteps = computed(() => {
  const activeDay = steps.value.find(step => step.status === 'active')
  return activeDay ? activeDay.goalSteps : 10000
})

onMounted(() => {
  nextTick(() => {
    if (activeButtonRef.value) {
      activeButtonRef.value.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      })
    }
    // active 상태의 goalSteps를 emit
    emit('updateGoalSteps', activeGoalSteps.value)
    // 현재 걸음수를 emit
    emit('updateCurrentCount', currentCount)
  })
})
</script>

<style scoped lang="scss">
.dailyMission-check {
  background: #4776e5;
  ul {
    display: flex;
    gap: 1.6rem;
    overflow-x: auto;
    padding: 1.6rem;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      flex: 0 0 auto;
      width: 5.2rem;
    }
  }
  .mission-button {
    width: 100%;
    &:after {
      display: none;
    }

    &.is-locked {
      i.current-progress {
        position: relative;
        background-image: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='51' height='50' viewBox='0 0 51 50' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.7494 15C22.0718 15 19.9012 17.1706 19.9012 19.8483V21.933C18.4818 22.4929 17.4775 23.8766 17.4775 25.4949V31.1724C17.4775 33.2863 19.1912 35 21.3051 35H28.1947C30.3086 35 32.0223 33.2863 32.0223 31.1724V25.4949C32.0223 23.8762 31.0175 22.4922 29.5977 21.9326V19.8483C29.5977 17.1706 27.427 15 24.7494 15ZM22.3248 19.8474V21.6673H27.1731V19.8474C27.1731 18.5086 26.0877 17.4233 24.7489 17.4233C23.4101 17.4233 22.3248 18.5086 22.3248 19.8474ZM25.9615 26.5132C25.9615 26.9621 25.7175 27.3539 25.355 27.5634V29.5443C25.355 29.879 25.0836 30.1503 24.7489 30.1503C24.4142 30.1503 24.1429 29.879 24.1429 29.5443V27.5629C23.7809 27.3532 23.5374 26.9617 23.5374 26.5132C23.5374 25.8438 24.08 25.3012 24.7494 25.3012C25.4188 25.3012 25.9615 25.8438 25.9615 26.5132Z' fill='%2394B2FA'/%3E%3Crect x='1.25' y='1' width='48' height='48' rx='24' stroke='%2394B2FA' stroke-width='2' stroke-linecap='round' stroke-dasharray='3 6'/%3E%3C/svg%3E");
        background-color: transparent;
        overflow: hidden;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: var(--progress, 0%);
          opacity: 0;
          background: linear-gradient(to top, hsl(76, 84%, 59%), #dd600d);
          transition: height 0.3s ease;
          border-radius: 0 0 50% 50%;
        }
      }
    }
    i {
      display: block;
      margin: auto;
      width: 4.8rem;
      height: 4.8rem;
      line-height: 5rem;
      border-radius: 50%;
      margin-bottom: 0.6rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-color: #3e68cb;
      box-shadow: 0 0 0.7rem 0 rgba(0, 0, 0, 0.1) inset;
      font-family: 'Jalnan2', sans-serif;
      color: #dbe5fd;
    }
    span {
      color: #fff;
      position: relative;
    }
    .step-label {
      white-space: nowrap;
      position: relative;
      font-weight: 600;
      display: flex;
      align-self: center;
      font-size: 1.4rem;
      justify-self: center;
      text-align: center;
    }
    .get-point-coin {
      &.is-animating {
        animation: coin-spin-dynamic 0.8s ease-in-out;
        opacity: 0;
      }
      width: 5.1rem;
      height: 5.1rem;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #2b2b2b;
      line-height: 4.8rem;
      z-index: 10;
      pointer-events: none;
      font-size: 1.4rem;
      margin-left: -1rem;
      margin-top: -1rem;
      text-indent: -0.6rem;
      font-family: 'Jalnan2', sans-serif;
      text-align: center;
      font-weight: bold;
      position: absolute;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 7rem;
      background-image: url('~/assets/images/benefit/img-point-coin.png');
      backface-visibility: hidden;
    }
  }

  @keyframes coin-spin-dynamic {
    0% {
      transform: translate(-50%, -50%) rotateY(-3600deg) scale(1);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) rotateY(-1800deg) scale(1.5);
    }
    100% {
      transform: translate(-50%, -50%) rotateY(0deg) scale(1);
      opacity: 0;
    }
  }
  .info-txt {
    text-align: center;
    font-size: 1.3rem;
    margin-top: 0.4rem;
    font-weight: 500;
    color: #fff;
    padding-bottom: 2.4rem;
  }
}
</style>
