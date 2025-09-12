<template>
  <div class="main-sector">
    <MainTopGraph
      ref="mainTopGraphRef"
      :current-status="currentStatus"
      :is-profile-set="healthCondition !== 'noProfileSet'"
      :is-smart-ring-connect="vitalityCondition !== 'noSmartRingConnect'"
      @allow-access-click="handleAllowAccessClick"
    />
    <section
      class="main-section"
      :class="[
        currentStatus,
        {
          dragging: isDragging,
          'health-good': currentStatus === 'health-status' && healthCondition === 'good',
          'health-careful': currentStatus === 'health-status' && healthCondition === 'careful',
          'health-warning': currentStatus === 'health-status' && healthCondition === 'warning',
          'health-no-profile': currentStatus === 'health-status' && healthCondition === 'noProfileSet',
          'vitality-good': currentStatus === 'vitality-status' && vitalityCondition === 'good',
          'vitality-careful': currentStatus === 'vitality-status' && vitalityCondition === 'careful',
          'vitality-warning': currentStatus === 'vitality-status' && vitalityCondition === 'warning',
          'vitality-no-ring': currentStatus === 'vitality-status' && vitalityCondition === 'noSmartRingConnect'
        }
      ]"
    >
      <div class="charactor">
        <span
          class="sector-swiper-area"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
          @mousedown="handleMouseDown"
          @mousemove="handleMouseMove"
          @mouseup="handleMouseUp"
          @mouseleave="handleMouseUp"
        ></span>
        <span class="charctor-txt" :class="{ 'animate-txt': !isTransitioning }" v-html="characterText"></span>
        <LottieAnimation
          :src="animationSrc"
          width="100%"
          height="100%"
          :speed="1.2"
          :loop="true"
          aria-label="건강의 신 케릭터 이미지"
        />
        <i class="charactor-shadow" aria-hidden="true"></i>

        <div v-if="currentStatus === 'walking-status'" class="charctor-option">
          <button type="button" class="cbtn btn-white">걷기통계</button>
          <button type="button" class="cbtn btn-white">친구랭킹</button>
        </div>

        <div v-if="currentStatus === 'health-status'" class="charctor-option">
          <button v-if="healthCondition !== 'noProfileSet'" type="button" class="cbtn btn-white">자세히보기</button>
          <div v-if="healthCondition === 'noProfileSet'" class="info-text" :class="{ 'animate-txt': !isTransitioning }">
            건강 프로필 정보 AI분석을 통해<br />
            레몬건강지수가 산정됩니다.
          </div>
        </div>

        <div v-if="currentStatus === 'vitality-status'" class="charctor-option">
          <button v-if="vitalityCondition !== 'noSmartRingConnect'" type="button" class="cbtn btn-white">
            자세히보기
          </button>
          <div
            v-if="vitalityCondition === 'noSmartRingConnect'"
            class="info-text"
            :class="{ 'animate-txt': !isTransitioning }"
          >
            생체데이터를 종합적으로 분석하여<br />
            Aura Vival Score를 제공합니다.
          </div>
        </div>
      </div>
      <!-- 걸음영역 - walking-status일 때만 표시 -->
      <WalkingStatus v-if="currentStatus === 'walking-status'" />
      <!-- 건강영역 - health-status일 때만 표시 -->
      <HealthStatus v-if="currentStatus === 'health-status' && healthCondition !== 'noProfileSet'" />
      <!-- 활력영역 - vitality-status일 때만 표시 -->
      <VitalityStatus v-if="currentStatus === 'vitality-status' && vitalityCondition !== 'noSmartRingConnect'" />

      <!-- 건강 상태 프로필 없을 때 배너 -->
      <div v-if="currentStatus === 'health-status' && healthCondition === 'noProfileSet'" class="banner-box health">
        <nuxt-link to="javascript:void(0)" class="box-content">
          <strong
            >내 건강 프로필 맞춤 AI 건강미션 매일 완료하고 포인트 받으세요!
            <span class="arrow-txt">건강프로필 작성하기</span>
          </strong>
          <img src="~/assets/images/home/img-gift.svg" alt="" />
        </nuxt-link>
      </div>

      <!-- 활력 상태 스마트링 없을 때 배너 -->
      <div v-if="currentStatus === 'vitality-status' && vitalityCondition === 'noSmartRingConnect'" class="banner-box">
        <nuxt-link to="javascript:void(0)" class="box-content">
          <strong class="blue-txt"
            >실시간 건강데이터 모니터링으로 구체적인 목표를 제시합니다.<span class="arrow-txt"
              >레몬스마트링 알아보기</span
            ></strong
          >
          <img src="~/assets/images/home/img-ring.svg" alt="" />
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import MainTopGraph from '~/components/publishing/home/MainTopGraph.vue'

import WalkingStatus from '~/components/publishing/home/WalkingStatus.vue'
import HealthStatus from '~/components/publishing/home/HealthStatus.vue'
import VitalityStatus from '~/components/publishing/home/VitalityStatus.vue'

// 상태 관리
const statusList = ['walking-status', 'vitality-status', 'health-status']
const currentIndex = ref(0)
const currentStatus = ref(statusList[0])
const mainTopGraphRef = ref<InstanceType<typeof MainTopGraph> | null>(null)

// 애니메이션 소스 맵핑
const animationMap = {
  'walking-status': '/animations/character/walk.json',
  'vitality-status': '/animations/character/default.json',
  'health-status': '/animations/character/cry.json'
}

// 캐릭터 텍스트 맵핑
const textMap = {
  'walking-status': '다음미션까지 <br />1240 걸음',
  'vitality-status': '가볍게 스트레칭 <br />해보세요',
  'health-status': '건강에 주의해야해요!!'
}

// 현재 상태에 따른 애니메이션 소스
const animationSrc = computed(() => {
  if (currentStatus.value === 'health-status') {
    switch (healthCondition.value) {
      case 'good':
        return '/animations/character/happy.json'
      case 'careful':
        return '/animations/character/worry.json'
      case 'warning':
        return '/animations/character/cry.json'
      case 'noProfileSet':
        return '/animations/character/default.json'
      default:
        return '/animations/character/default.json'
    }
  } else if (currentStatus.value === 'vitality-status') {
    switch (vitalityCondition.value) {
      case 'good':
        return '/animations/character/happy.json'
      case 'careful':
        return '/animations/character/worry.json'
      case 'warning':
        return '/animations/character/cry.json'
      case 'noSmartRingConnect':
        return '/animations/character/default.json'
      default:
        return '/animations/character/default.json'
    }
  } else {
    return animationMap[currentStatus.value] || '/animations/character/walk.json'
  }
})

// 현재 상태에 따른 캐릭터 텍스트
const characterText = computed(() => {
  if (currentStatus.value === 'health-status') {
    switch (healthCondition.value) {
      case 'good':
        return '지금 잘 하고 있어요!'
      case 'careful':
        return '건강에 조금 더 신경써주세요!'
      case 'warning':
        return '건강에 주의해야해요!!'
      case 'noProfileSet':
        return '건강프로필을 <br />작성해주세요!'
      default:
        return '건강프로필을 <br />작성해주세요!'
    }
  } else if (currentStatus.value === 'vitality-status') {
    switch (vitalityCondition.value) {
      case 'good':
        return '활력지수 좋음'
      case 'careful':
        return '가볍게 스트레칭 <br />해보세요'
      case 'warning':
        return '활력지수 나쁨'
      case 'noSmartRingConnect':
        return '레몬스마트링을 <br />연결해보세요'
      default:
        return '레몬스마트링을 <br />연결해보세요'
    }
  } else {
    // walking-status
    return textMap[currentStatus.value] || '다음미션까지 <br />1240 걸음'
  }
})

// 터치/마우스 이벤트 관리
const startX = ref(0)
const currentX = ref(0)
const startTime = ref(0) // 스와이프 시작 시간
const isDragging = ref(false)
const isMouseDragging = ref(false) // 마우스 드래그 상태 추가
const minSwipeDistance = 30 // 최소 스와이프 거리 (50 -> 30으로 감소)
const minSwipeVelocity = 0.5 // 최소 스와이프 속도 (px/ms)
const dragOffset = ref(0) // 드래그 오프셋
const isTransitioning = ref(false) // 전환 중 상태
const swipeDirection = ref('') // 스와이프 방향 ('left', 'right', '')

// 조건부 상태 전역 상태 관리
// health 상태: 'good', 'careful', 'warning', 'noProfileSet'
// vitality 상태: 'good', 'careful', 'warning', 'noSmartRingConnect'
const vitalityCondition = ref('noSmartRingConnect') // 기본값을 noSmartRingConnect로 설정
const healthCondition = ref('noProfileSet') // 기본값을 noProfileSet로 설정

// 터치 이벤트 핸들러
const handleTouchStart = (e: TouchEvent) => {
  startX.value = e.touches[0].clientX
  startTime.value = Date.now()
  isDragging.value = true
  isTransitioning.value = false
  swipeDirection.value = ''

  // 가벼운 햄틱 피드백
  triggerHapticFeedback('light')

  // 기본 스와이프 동작 방지
  e.preventDefault()
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  currentX.value = e.touches[0].clientX

  const deltaX = currentX.value - startX.value
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 375
  const maxOffset = screenWidth * 0.4 // 30% -> 40%로 증가

  // 탄성 효과 적용 (경계에서 저항 증가)
  const resistance = 0.3
  if (Math.abs(deltaX) > maxOffset) {
    const overflow = Math.abs(deltaX) - maxOffset
    const resistedOverflow = overflow * resistance
    dragOffset.value = deltaX > 0 ? maxOffset + resistedOverflow : -(maxOffset + resistedOverflow)
  } else {
    dragOffset.value = deltaX
  }

  // 스와이프 방향 업데이트
  if (Math.abs(deltaX) > 10) {
    swipeDirection.value = deltaX > 0 ? 'right' : 'left'
  }

  e.preventDefault()
}

const handleTouchEnd = () => {
  if (!isDragging.value) return

  const deltaX = currentX.value - startX.value
  const deltaTime = Date.now() - startTime.value
  const velocity = Math.abs(deltaX) / Math.max(deltaTime, 1) // 속도 계산

  isTransitioning.value = true

  // 속도 기반 또는 거리 기반 전환 결정
  const shouldSwipe = Math.abs(deltaX) > minSwipeDistance || velocity > minSwipeVelocity

  if (shouldSwipe && deltaX !== 0) {
    if (deltaX > 0) {
      goToPrevious()
    } else {
      goToNext()
    }
  } else {
    // 스와이프 조건 미충족 시 스프링 백 애니메이션
    dragOffset.value = 0
    setTimeout(() => {
      isTransitioning.value = false
      swipeDirection.value = ''
    }, 300)
  }

  isDragging.value = false
  swipeDirection.value = ''
}

// 마우스 이벤트 핸들러 (데스크톱 지원)
const handleMouseDown = (e: MouseEvent) => {
  startX.value = e.clientX
  currentX.value = e.clientX
  startTime.value = Date.now()
  isDragging.value = true
  isMouseDragging.value = false
  isTransitioning.value = false
  swipeDirection.value = ''
  e.preventDefault()
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return

  const deltaX = e.clientX - startX.value
  if (Math.abs(deltaX) > 5) {
    // 10px -> 5px로 감소
    isMouseDragging.value = true
  }

  currentX.value = e.clientX

  if (isMouseDragging.value) {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 375
    const maxOffset = screenWidth * 0.4

    // 탄성 효과 적용
    const resistance = 0.3
    if (Math.abs(deltaX) > maxOffset) {
      const overflow = Math.abs(deltaX) - maxOffset
      const resistedOverflow = overflow * resistance
      dragOffset.value = deltaX > 0 ? maxOffset + resistedOverflow : -(maxOffset + resistedOverflow)
    } else {
      dragOffset.value = deltaX
    }

    // 스와이프 방향 업데이트
    if (Math.abs(deltaX) > 10) {
      swipeDirection.value = deltaX > 0 ? 'right' : 'left'
    }
  }

  e.preventDefault()
}

const handleMouseUp = () => {
  if (!isDragging.value) return

  if (isMouseDragging.value) {
    const deltaX = currentX.value - startX.value
    const deltaTime = Date.now() - startTime.value
    const velocity = Math.abs(deltaX) / Math.max(deltaTime, 1)

    isTransitioning.value = true

    // 속도 기반 또는 거리 기반 전환
    const shouldSwipe = Math.abs(deltaX) > minSwipeDistance || velocity > minSwipeVelocity

    if (shouldSwipe && deltaX !== 0) {
      if (deltaX > 0) {
        goToPrevious()
      } else {
        goToNext()
      }
    } else {
      dragOffset.value = 0
      setTimeout(() => {
        isTransitioning.value = false
        swipeDirection.value = ''
      }, 300)
    }
  } else {
    isTransitioning.value = false
  }

  isDragging.value = false
  isMouseDragging.value = false
  swipeDirection.value = ''
}

// 상태 변경 함수
const goToNext = () => {
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 375

  // MainTopGraph 셔플 애니메이션 트리거
  if (mainTopGraphRef.value) {
    mainTopGraphRef.value.triggerShuffle('left')
  }

  // 1단계: 현재 화면을 완전히 밀어내기
  dragOffset.value = -screenWidth * 1.2 // 더 멀리 밀어내기
  isTransitioning.value = true

  setTimeout(() => {
    // 햄틱 피드백
    triggerHapticFeedback('medium')

    // 2단계: 상태 변경 후 반대편에서 슬라이드 인
    currentIndex.value = (currentIndex.value + 1) % statusList.length
    currentStatus.value = statusList[currentIndex.value]
    dragOffset.value = screenWidth * 0.8 // 오른쪽에서 시작

    setTimeout(() => {
      // 3단계: 제자리로 슬라이드 인
      dragOffset.value = 0
      setTimeout(() => {
        isTransitioning.value = false
      }, 400)
    }, 20)
  }, 200)
}

const goToPrevious = () => {
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 375

  // MainTopGraph 셔플 애니메이션 트리거
  if (mainTopGraphRef.value) {
    mainTopGraphRef.value.triggerShuffle('right')
  }

  // 1단계: 현재 화면을 완전히 밀어내기
  dragOffset.value = screenWidth * 1.2 // 더 멀리 밀어내기
  isTransitioning.value = true

  setTimeout(() => {
    // 햄틱 피드백
    triggerHapticFeedback('medium')

    // 2단계: 상태 변경 후 반대편에서 슬라이드 인
    currentIndex.value = (currentIndex.value - 1 + statusList.length) % statusList.length
    currentStatus.value = statusList[currentIndex.value]
    dragOffset.value = -screenWidth * 0.8 // 왼쪽에서 시작

    setTimeout(() => {
      // 3단계: 제자리로 슬라이드 인
      dragOffset.value = 0
      setTimeout(() => {
        isTransitioning.value = false
      }, 400)
    }, 20)
  }, 200)
}

// 조건 상태 변경 함수(건강)
const setHealthCondition = (condition: 'good' | 'careful' | 'warning' | 'noProfileSet') => {
  healthCondition.value = condition
}
// 조건 상태 변경 함수(활력)
const setVitalityCondition = (condition: 'good' | 'careful' | 'warning' | 'noSmartRingConnect') => {
  vitalityCondition.value = condition
}

// 외부에서 사용할 수 있도록 export
defineExpose({
  setHealthCondition,
  setVitalityCondition,
  healthCondition,
  vitalityCondition
})

// 라이프사이클
onMounted(() => {
  // Edge 브라우저 오버스크롤 방지를 위한 전역 스타일 적용
  document.body.style.overscrollBehaviorX = 'none'
  document.documentElement.style.overscrollBehaviorX = 'none'

  // iOS Safari 바운스 효과 방지
  document.body.style.webkitOverflowScrolling = 'auto'
  document.documentElement.style.webkitOverflowScrolling = 'auto'

  // 터치 동작 제어 (모든 브라우저)
  document.body.style.touchAction = 'pan-y pinch-zoom'

  // 모바일 최적화 추가 설정
  document.body.style.webkitTapHighlightColor = 'transparent'
  document.body.style.webkitTouchCallout = 'none'
  document.body.style.webkitUserSelect = 'none'
  document.body.style.msUserSelect = 'none'
  document.body.style.userSelect = 'none'

  // iOS에서 메타 브이포트 추가 설정
  const viewport = document.querySelector('meta[name="viewport"]')
  if (viewport && /iPhone|iPad|iPod|iOS/i.test(navigator.userAgent)) {
    const currentContent = viewport.getAttribute('content') || ''
    if (!currentContent.includes('user-scalable=no')) {
      viewport.setAttribute('content', currentContent + ', user-scalable=no')
    }
  }

  // 다크 모드 대응을 위한 컬러 스키마 감지
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleColorSchemeChange = () => {
    // 필요시 다크 모드 처리 로직 추가
  }
  mediaQuery.addEventListener('change', handleColorSchemeChange)
})
// 햄틱 피드백 함수 (지원되는 디바이스에서만 동작)
const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30]
    }
    navigator.vibrate(patterns[type])
  }

  // iOS Safari 햄틱 지원 (추후 지원 예정)
  // if ('HapticFeedback' in window) {
  //   window.HapticFeedback.impactOccurred(type)
  // }
}

const handleAllowAccessClick = () => {
  triggerHapticFeedback('light')
  console.log()
}

onUnmounted(() => {
  // 정리 시 스타일 복원
  document.body.style.overscrollBehaviorX = ''
  document.documentElement.style.overscrollBehaviorX = ''
  document.body.style.webkitOverflowScrolling = ''
  document.documentElement.style.webkitOverflowScrolling = ''
  document.body.style.touchAction = ''
  document.body.style.webkitTapHighlightColor = ''
  document.body.style.webkitTouchCallout = ''
  document.body.style.webkitUserSelect = ''
  document.body.style.msUserSelect = ''
  document.body.style.userSelect = ''

  // 브라우저 이벤트 리스너 정리
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.removeEventListener('change', () => {})
})
</script>

<style scoped lang="scss">
.main-sector {
  height: 58.7rem;
  margin: -5.6rem -2rem 3.2rem;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('~/assets/images/home/bg-main-sector.png');

  // Edge 브라우저 스와이프 바운스 효과 방지
  overscroll-behavior-x: none;
  -ms-scroll-chaining: none;
  -ms-overflow-style: none;

  // iOS Safari 바운스 효과 방지
  -webkit-overflow-scrolling: auto;
  overflow-scrolling: auto;

  .main-section {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    position: relative;
    transition: background 0.3s ease-in-out;
    user-select: none;
    will-change: transform, opacity; // GPU 가속 최적화

    // 드래그 중일 때 시각적 효과
    &.dragging {
      transform-origin: center;

      .swipe-animation {
        &::after {
          opacity: 1;
        }

        &::before {
          background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.04) 50%,
            transparent 80%
          );
        }
      }

      .charactor {
        &::before,
        &::after {
          animation-play-state: paused;
          opacity: 0.6;
          filter: brightness(1.2);
        }
      }
    }

    // 터치 및 스크롤 동작 제어 (모바일 최적화)
    touch-action: pan-y pinch-zoom;
    overscroll-behavior: none;
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: transparent; // iOS 탭 하이라이트 제거
    -webkit-touch-callout: none; // iOS 링크 옵션 제거
    // .swipe-animation {
    //   display: block;
    //   bottom: 0;
    //   position: absolute;
    //   left: -10%;
    //   top: 0;
    //   right: -10%;
    //   backdrop-filter: blur(10px);
    //   -webkit-backdrop-filter: blur(10px);
    //   mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
    //   -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
    //   transition: background 0.3s 0.3s ease-in-out;
    //   &::before {
    //     // content: '';
    //     position: absolute;
    //     inset: 0;
    //     z-index: 2;
    //     pointer-events: none;
    //     background: transparent;
    //     transition: background 0.3s ease;
    //   }

    //   &::after {
    //     //  content: '';
    //     position: absolute;
    //     top: 50%;
    //     left: 2rem;
    //     right: 2rem;
    //     height: 2px;
    //     transform: translateY(-50%);
    //     background: linear-gradient(
    //       90deg,
    //       transparent 0%,
    //       rgba(255, 255, 255, 0.6) 20%,
    //       rgba(255, 255, 255, 0.8) 50%,
    //       rgba(255, 255, 255, 0.6) 80%,
    //       transparent 100%
    //     );
    //     border-radius: 1px;
    //     opacity: 0;
    //     transition: all 0.3s ease;
    //     box-shadow: 0 0 6px rgba(255, 255, 255, 0.3);
    //   }
    // }

    &.walking-status {
      // background-color: transparent;
      background: linear-gradient(to bottom, rgba(175, 226, 217, 0) 0%, rgba(175, 226, 217, 0) 50%, #afe2d9 100%);

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 40%;
        background: linear-gradient(180deg, #76cdff 0%, rgba(118, 205, 255, 0) 100%);
      }
    }

    &.vitality-status {
      background-color: #f2dd92;
    }

    &.health-status {
      background-color: #56e2c1;

      &.health-careful {
        background-color: #a9a0fd;
      }
      &.health-warning {
        background-color: #ff8e75;
      }
    }

    &.vitality-no-ring,
    &.health-no-profile {
      background-color: #dadee7;
    }

    .charactor {
      width: 100%;
      height: 20rem;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -2rem;
      transform: translate(-50%, -50%);

      // 메인 좌우 섹터 스와이프 영역
      .sector-swiper-area {
        display: block;
        position: absolute;
        cursor: grab; // 스와이프 가능 영역 표시
        user-select: none;
        touch-action: pan-x; // 가로 스와이프만 허용
        z-index: 10; // 다른 요소보다 위에 배치
        height: 40rem;
        // width: calc(100% - 10rem);
        left: 0;
        right: 0;
        top: 50%;
        // background: rgba(188, 11, 11, 0.2); 영역 확인용
        // left: 50%;
        transform: translateY(-50%);
      }

      background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%);
      .charactor-shadow {
        position: absolute;
        bottom: 3rem;
        left: 50%;
        transform: translateX(-50%);
        width: 7rem;
        border-radius: 50%;
        height: 1rem;
        filter: blur(2px);
        background: radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, transparent 100%);
      }
      &::before,
      &:after {
        content: '';
        display: block;
        position: absolute;
        width: 3.2rem;
        height: 3.2rem;
        top: 50%;
        background-size: 2.4rem;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='21' viewBox='0 0 25 21' fill='none'%3E%3C!-- 왼쪽 화살표 --%3E%3Cpath d='M0.506498 11.3207L9.07083 19.7512C9.23007 19.9093 9.41951 20.0347 9.62824 20.1203C9.83697 20.2059 10.0608 20.25 10.287 20.25C10.5131 20.25 10.737 20.2059 10.9457 20.1203C11.1544 20.0347 11.3439 19.9093 11.5031 19.7512C11.6636 19.5945 11.7911 19.408 11.878 19.2026C11.965 18.9971 12.0098 18.7767 12.0098 18.5541C12.0098 18.3315 11.965 18.1111 11.878 17.9057C11.7911 17.7002 11.6636 17.5137 11.5031 17.357L4.13778 10.1236L11.5031 2.89015C11.6628 2.73294 11.7895 2.5463 11.8759 2.3409C11.9624 2.13549 12.0068 1.91534 12.0068 1.69301C12.0068 1.24399 11.8256 0.813371 11.5031 0.49587C11.1806 0.178369 10.7431 0 10.287 0C10.0611 0 9.83747 0.0437899 9.6288 0.128872C9.42014 0.213953 9.23054 0.33866 9.07083 0.49587L0.506498 8.92642C0.345954 9.08317 0.218523 9.26965 0.131563 9.47512C0.0446033 9.68059 -0.000165939 9.90097 -0.000165939 10.1236C-0.000165939 10.3461 0.0446033 10.5665 0.131563 10.772C0.218523 10.9775 0.345954 11.164 0.506498 11.3207Z' fill='white'%3E%3Canimate attributeName='fill-opacity' values='1;0.3;1' keyTimes='0;0.5;1' dur='1s' repeatCount='indefinite'/%3E%3C/path%3E%3C!-- 오른쪽 화살표 --%3E%3Cpath d='M12.507 11.3207L21.0713 19.7512C21.2306 19.9093 21.42 20.0347 21.6287 20.1203C21.8375 20.2059 22.0613 20.25 22.2875 20.25C22.5136 20.25 22.7375 20.2059 22.9462 20.1203C23.1549 20.0347 23.3444 19.9093 23.5036 19.7512C23.6641 19.5945 23.7916 19.408 23.8785 19.2026C23.9655 18.9971 24.0103 18.7767 24.0103 18.5541C24.0103 18.3315 23.9655 18.1111 23.8785 17.9057C23.7916 17.7002 23.6641 17.5137 23.5036 17.357L16.1383 10.1236L23.5036 2.89015C23.6633 2.73294 23.79 2.5463 23.8764 2.3409C23.9628 2.13549 24.0073 1.91534 24.0073 1.69301C24.0073 1.24399 23.8261 0.813371 23.5036 0.49587C23.1811 0.178369 22.7436 0 22.2875 0C22.0616 0 21.838 0.0437899 21.6293 0.128872C21.4206 0.213953 21.231 0.33866 21.0713 0.49587L12.507 8.92642C12.3464 9.08317 12.219 9.26965 12.1321 9.47512C12.0451 9.68059 12.0003 9.90097 12.0003 10.1236C12.0003 10.3461 12.0451 10.5665 12.1321 10.772C12.219 10.9775 12.3464 11.164 12.507 11.3207Z' fill='white' fill-opacity='0.3'%3E%3Canimate attributeName='fill-opacity' values='0.3;1;0.3' keyTimes='0;0.5;1' dur='1s' repeatCount='indefinite'/%3E%3C/path%3E%3C/svg%3E%0A");
      }
      &::before {
        left: 1.2rem;
      }
      &::after {
        right: 1.2rem;
        transform: scaleX(-1);
      }
      &:active {
        cursor: grabbing;
      }
      .lottie-animation {
        position: absolute;
        width: 20rem;
        height: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
      }
      .charctor-txt {
        position: absolute;
        right: 50%;
        text-align: left;
        margin-right: 2.5rem;
        top: 0;
        opacity: 0;
        border-radius: 1.2rem;
        padding: 1.1rem 1.6rem;
        background: rgba(2, 2, 2, 0.85);
        box-shadow: 0 0.4rem 0.8rem 0 rgba(0, 0, 0, 0.04);
        backdrop-filter: blur(1.5rem);
        font-size: 1.3rem;
        color: vars.$white;
        white-space: nowrap;

        &.animate-txt {
          animation: charTxt 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes charTxt {
          0% {
            top: 2rem;
            opacity: 0;
            transform: scale(0.5);
          }

          100% {
            top: 3.7rem;
            opacity: 0.8;
            transform: scale(1);
          }
        }
      }
    }
    .charctor-option {
      display: flex;
      flex-direction: row;
      gap: 0 0.6rem;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: -2rem;
      left: 0;
      right: 0;
      z-index: 10;
      .btn-white {
        border-radius: 2rem;
        border: 0.1rem solid #fff;
        font-size: 1.4rem;
        font-weight: 600;
        color: #2b2b2b;
        line-height: 2rem;
        padding: 0.8rem 1.6rem;
        position: relative;
        background: rgba(255, 255, 255, 0.7);
        @include mixin.rippleEffectPrimary;
      }
      .info-text {
        font-size: 1.4rem;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.7);
        text-align: center;
        opacity: 0;
        &.animate-txt {
          animation: charTxt 0.5s 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      }
    }
    .banner-box {
      position: absolute;
      bottom: 3.2rem;
      left: 2rem;
      right: 2rem;
      border-radius: 1.2rem;
      border: 0.1rem solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(10px);
      .box-content {
        padding: 2.4rem;
        padding-right: 13.2rem;
        position: relative;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        img {
          position: absolute;
          right: 0;
          top: 0;
          width: 13.2rem;
        }
        strong {
          display: flex;
          flex-direction: column;
          gap: 2rem 0;
          font-size: 1.6rem;
          font-weight: 700;
          &.blue-txt {
            color: #31519e;
          }
          .arrow-txt {
            font-weight: 400;
            color: #2b2b2b;
            display: inline-flex;
            align-items: center;
            gap: 0 0.2rem;
            &:after {
              content: '';
              width: 2rem;
              height: 2rem;
              display: inline-block;
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7.49984 5.83301L11.6665 9.99967L7.49984 14.1663' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            }
          }
        }
      }
    }
  }
}
// 모바일 반응형 디자인 최적화
@media (max-width: 390px) {
  .main-sector {
    .main-section {
      .charactor {
        // 터치 영역 더 넣게 확대
        .sector-swiper-area {
          // height: 20rem; // 18rem -> 20rem
          // width: calc(100% - 3rem); // 5rem -> 3rem
        }

        .charctor-txt {
          font-size: 1.2rem;
          top: 1.5rem;
          padding: 1.1rem;
          margin-right: 4rem;
          // 작은 화면에서 가독성 향상
          box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.15);
        }
      }
      .banner-box {
        .box-content {
          padding: 1.6rem;
          padding-right: 8rem;
          strong {
            font-size: 1.4rem;
            line-height: 1.4;
          }
          img {
            width: 8rem;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}
</style>
